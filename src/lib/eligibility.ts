 import { UserProfile, Scheme, EligibilityCriteria } from '@/types';
 import { schemes } from '@/data/schemes';
 
 export interface EligibilityResult {
   scheme: Scheme;
   isEligible: boolean;
   score: number;
   matchedCriteria: string[];
   unmatchedCriteria: string[];
   recommendationReason?: string;
 }
 
 export const checkSchemeEligibility = (
   profile: UserProfile,
   scheme: Scheme
 ): EligibilityResult => {
   const criteria = scheme.eligibility;
   const matchedCriteria: string[] = [];
   const unmatchedCriteria: string[] = [];
   let score = 0;
 
   // Age check
   if (criteria.minAge !== undefined) {
     if (profile.age >= criteria.minAge) {
       matchedCriteria.push(`Age ${profile.age} >= ${criteria.minAge}`);
       score += 10;
     } else {
       unmatchedCriteria.push(`Minimum age requirement: ${criteria.minAge}`);
     }
   }
 
   if (criteria.maxAge !== undefined) {
     if (profile.age <= criteria.maxAge) {
       matchedCriteria.push(`Age ${profile.age} <= ${criteria.maxAge}`);
       score += 10;
     } else {
       unmatchedCriteria.push(`Maximum age requirement: ${criteria.maxAge}`);
     }
   }
 
   // Gender check
   if (criteria.gender && criteria.gender.length > 0) {
     if (criteria.gender.includes(profile.gender)) {
       matchedCriteria.push(`Gender: ${profile.gender}`);
       score += 15;
     } else {
       unmatchedCriteria.push(`Gender requirement: ${criteria.gender.join(' or ')}`);
     }
   }
 
   // Income check
   if (criteria.maxIncome !== undefined) {
     if (profile.income <= criteria.maxIncome) {
       matchedCriteria.push(`Income ₹${profile.income.toLocaleString()} <= ₹${criteria.maxIncome.toLocaleString()}`);
       score += 20;
     } else {
       unmatchedCriteria.push(`Maximum income limit: ₹${criteria.maxIncome.toLocaleString()}`);
     }
   }
 
   if (criteria.minIncome !== undefined) {
     if (profile.income >= criteria.minIncome) {
       matchedCriteria.push(`Income ₹${profile.income.toLocaleString()} >= ₹${criteria.minIncome.toLocaleString()}`);
       score += 10;
     } else {
       unmatchedCriteria.push(`Minimum income requirement: ₹${criteria.minIncome.toLocaleString()}`);
     }
   }
 
   // Education check
   if (criteria.education && criteria.education.length > 0) {
     if (criteria.education.includes(profile.education)) {
       matchedCriteria.push(`Education: ${profile.education.replace('_', ' ')}`);
       score += 15;
     } else {
       unmatchedCriteria.push(`Education requirement: ${criteria.education.join(' or ')}`);
     }
   }
 
   // Occupation check
   if (criteria.occupation && criteria.occupation.length > 0) {
     if (criteria.occupation.includes(profile.occupation)) {
       matchedCriteria.push(`Occupation: ${profile.occupation.replace('_', ' ')}`);
       score += 15;
     } else {
       unmatchedCriteria.push(`Occupation requirement: ${criteria.occupation.join(' or ')}`);
     }
   }
 
   // Category check
   if (criteria.category && criteria.category.length > 0) {
     if (criteria.category.includes(profile.category)) {
       matchedCriteria.push(`Category: ${profile.category.toUpperCase()}`);
       score += 15;
     } else {
       unmatchedCriteria.push(`Category requirement: ${criteria.category.join(' or ')}`);
     }
   }
 
   // State check
   if (criteria.states && criteria.states.length > 0) {
     if (criteria.states.includes(profile.state)) {
       matchedCriteria.push(`State: ${profile.state}`);
       score += 10;
     } else {
       unmatchedCriteria.push(`State requirement: ${criteria.states.join(' or ')}`);
     }
   }
 
   // Scheme level check (central schemes available to all, state schemes only for that state)
   if (scheme.level === 'state' && scheme.state) {
     if (profile.state === scheme.state) {
       matchedCriteria.push(`State scheme for ${scheme.state}`);
       score += 10;
     } else {
       unmatchedCriteria.push(`Available only in ${scheme.state}`);
     }
   }
 
   // Marital status check
   if (criteria.maritalStatus && criteria.maritalStatus.length > 0) {
     if (criteria.maritalStatus.includes(profile.maritalStatus)) {
       matchedCriteria.push(`Marital status: ${profile.maritalStatus}`);
       score += 10;
     } else {
       unmatchedCriteria.push(`Marital status requirement: ${criteria.maritalStatus.join(' or ')}`);
     }
   }
 
   // Disability check
   if (criteria.requiresDisability) {
     if (profile.disability) {
       matchedCriteria.push('Person with disability');
       score += 20;
     } else {
       unmatchedCriteria.push('Requires disability certificate');
     }
   }
 
   // BPL check
   if (criteria.requiresBPL) {
     if (profile.bplCard) {
       matchedCriteria.push('BPL card holder');
       score += 20;
     } else {
       unmatchedCriteria.push('Requires BPL card');
     }
   }
 
   // Aadhaar check
   if (criteria.requiresAadhaar) {
     if (profile.aadhaarVerified) {
       matchedCriteria.push('Aadhaar verified');
       score += 5;
     } else {
       // Aadhaar is usually not a hard requirement for eligibility check
       matchedCriteria.push('Aadhaar verification will be required during application');
     }
   }
 
   // Calculate eligibility - user is eligible if there are no critical unmatched criteria
   // Critical criteria are: age, income, gender, category, state (for state schemes), occupation
   const criticalUnmatched = unmatchedCriteria.filter(c => 
     c.includes('age') || 
     c.includes('income') || 
     c.includes('Gender') || 
     c.includes('Category') || 
     c.includes('Available only in') ||
     c.includes('Occupation') ||
     c.includes('BPL') ||
     c.includes('Marital')
   );
 
   const isEligible = criticalUnmatched.length === 0;
 
   // Add popularity bonus to score
   score += (scheme.popularity / 10);
 
   return {
     scheme,
     isEligible,
     score,
     matchedCriteria,
     unmatchedCriteria,
   };
 };
 
 export const getEligibleSchemes = (profile: UserProfile): EligibilityResult[] => {
   const results = schemes.map(scheme => checkSchemeEligibility(profile, scheme));
   
   // Sort by eligibility first, then by score
   return results.sort((a, b) => {
     if (a.isEligible && !b.isEligible) return -1;
     if (!a.isEligible && b.isEligible) return 1;
     return b.score - a.score;
   });
 };
 
 export const getRecommendedSchemes = (
   profile: UserProfile,
   limit: number = 5
 ): EligibilityResult[] => {
   const eligibleSchemes = getEligibleSchemes(profile).filter(r => r.isEligible);
   
   // Add recommendation reasons
   return eligibleSchemes.slice(0, limit).map((result, index) => {
     let reason = '';
     
     if (profile.occupation === 'farmer' && result.scheme.category === 'agriculture') {
       reason = 'Highly relevant for farmers';
     } else if (profile.occupation === 'student' && result.scheme.category === 'education') {
       reason = 'Great for students';
     } else if (profile.age >= 60 && result.scheme.category === 'senior_citizen') {
       reason = 'Designed for senior citizens';
     } else if (profile.gender === 'female' && result.scheme.category === 'women_welfare') {
       reason = 'Specially for women';
     } else if (result.score > 70) {
       reason = 'Excellent profile match';
     } else if (result.scheme.popularity > 85) {
       reason = 'Popular scheme with high success rate';
     } else {
       reason = 'Recommended based on your profile';
     }
     
     return { ...result, recommendationReason: reason };
   });
 };