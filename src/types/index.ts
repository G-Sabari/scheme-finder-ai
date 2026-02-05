 // User profile types
 export interface UserProfile {
   id?: string;
   name: string;
   age: number;
   gender: 'male' | 'female' | 'other';
   income: number;
   education: 'below_10th' | '10th_pass' | '12th_pass' | 'graduate' | 'post_graduate' | 'professional';
   occupation: 'student' | 'farmer' | 'self_employed' | 'salaried' | 'unemployed' | 'homemaker' | 'retired';
   category: 'general' | 'obc' | 'sc' | 'st' | 'ews';
   state: string;
   district: string;
   maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
   disability: boolean;
   bplCard: boolean;
   aadhaarVerified: boolean;
   language: 'en' | 'ta';
   phone?: string;
   email?: string;
 }
 
 // Government scheme types
 export interface Scheme {
   id: string;
   name: string;
   nameTranslated: Record<string, string>;
   description: string;
   descriptionTranslated: Record<string, string>;
   category: SchemeCategory;
   benefits: string[];
   benefitsTranslated: Record<string, string[]>;
   eligibility: EligibilityCriteria;
   requiredDocuments: string[];
   requiredDocumentsTranslated: Record<string, string[]>;
   applicationLink: string;
   applicationSteps: string[];
   applicationStepsTranslated: Record<string, string[]>;
   ministry: string;
   level: 'central' | 'state' | 'district';
   state?: string;
   district?: string;
   deadline?: string;
   launchDate: string;
   popularity: number;
   tags: string[];
   status: 'active' | 'upcoming' | 'closed';
 }
 
 export type SchemeCategory = 
   | 'education'
   | 'agriculture'
   | 'healthcare'
   | 'housing'
   | 'employment'
   | 'women_welfare'
   | 'senior_citizen'
   | 'disability'
   | 'financial_inclusion'
   | 'skill_development'
   | 'social_security';
 
 export interface EligibilityCriteria {
   minAge?: number;
   maxAge?: number;
   gender?: ('male' | 'female' | 'other')[];
   maxIncome?: number;
   minIncome?: number;
   education?: string[];
   occupation?: string[];
   category?: string[];
   states?: string[];
   districts?: string[];
   maritalStatus?: string[];
   requiresDisability?: boolean;
   requiresBPL?: boolean;
   requiresAadhaar?: boolean;
   customConditions?: string[];
 }
 
 // Notification types
 export interface Notification {
   id: string;
   userId: string;
   type: 'new_scheme' | 'deadline_reminder' | 'eligibility_update' | 'application_status' | 'priority_alert';
   title: string;
   titleTranslated: Record<string, string>;
   message: string;
   messageTranslated: Record<string, string>;
   schemeId?: string;
   read: boolean;
   priority: 'low' | 'medium' | 'high';
   createdAt: string;
 }
 
 // Chat types
 export interface ChatMessage {
   id: string;
   role: 'user' | 'assistant';
   content: string;
   timestamp: string;
   intent?: ChatIntent;
 }
 
 export type ChatIntent = 
   | 'scheme_query'
   | 'eligibility_check'
   | 'document_help'
   | 'application_help'
   | 'general_query'
   | 'greeting';
 
 // Document types
 export interface UploadedDocument {
   id: string;
   name: string;
   type: 'income_certificate' | 'caste_certificate' | 'id_proof' | 'address_proof' | 'education_certificate' | 'other';
   extractedData?: Record<string, string>;
   verified: boolean;
   uploadedAt: string;
 }
 
 // Location types
 export interface State {
   code: string;
   name: string;
   nameTranslated: Record<string, string>;
 }
 
 export interface District {
   code: string;
   name: string;
   nameTranslated: Record<string, string>;
   stateCode: string;
 }
 
 // Language context
 export type Language = 'en' | 'ta';
 
 export interface Translations {
   [key: string]: {
     en: string;
     ta: string;
   };
 }