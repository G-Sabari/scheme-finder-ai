 import React, { useEffect, useState } from 'react';
 import { Link, useNavigate } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { UserProfile } from '@/types';
 import { getEligibleSchemes, getRecommendedSchemes, EligibilityResult } from '@/lib/eligibility';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import SchemeCard from '@/components/SchemeCard';
 import { 
   CheckCircle2, 
   Sparkles, 
   ArrowLeft, 
   Filter,
   Download,
   Share2,
   AlertCircle
 } from 'lucide-react';
 
 const Results: React.FC = () => {
   const { t } = useLanguage();
   const navigate = useNavigate();
   const [profile, setProfile] = useState<UserProfile | null>(null);
   const [allResults, setAllResults] = useState<EligibilityResult[]>([]);
   const [recommendedResults, setRecommendedResults] = useState<EligibilityResult[]>([]);
 
   useEffect(() => {
     const savedProfile = sessionStorage.getItem('userProfile');
     if (savedProfile) {
       const parsed = JSON.parse(savedProfile) as UserProfile;
       setProfile(parsed);
       
       // Run eligibility check
       const results = getEligibleSchemes(parsed);
       setAllResults(results);
       
       // Get AI recommendations
       const recommended = getRecommendedSchemes(parsed, 5);
       setRecommendedResults(recommended);
     } else {
       navigate('/eligibility');
     }
   }, [navigate]);
 
   if (!profile) {
     return null;
   }
 
   const eligibleCount = allResults.filter(r => r.isEligible).length;
   const notEligibleCount = allResults.filter(r => !r.isEligible).length;
 
   return (
     <div className="min-h-screen flex flex-col bg-muted/30">
       <Header />
       
       <main className="flex-1 py-8">
         <div className="container">
           {/* Header */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
             <div>
               <Link to="/eligibility">
                 <Button variant="ghost" size="sm" className="mb-2">
                   <ArrowLeft className="h-4 w-4 mr-2" />
                   {t('back')}
                 </Button>
               </Link>
               <h1 className="text-3xl font-display font-bold">
                 Your Scheme Results
               </h1>
               <p className="text-muted-foreground mt-1">
                 Based on your profile: {profile.name || 'User'}, {profile.age} years, {profile.state}
               </p>
             </div>
 
             <div className="flex gap-2">
               <Button variant="outline" size="sm">
                 <Download className="h-4 w-4 mr-2" />
                 Download
               </Button>
               <Button variant="outline" size="sm">
                 <Share2 className="h-4 w-4 mr-2" />
                 Share
               </Button>
             </div>
           </div>
 
           {/* Stats Cards */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
             <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
               <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
                   <CheckCircle2 className="h-6 w-6 text-accent" />
                 </div>
                 <div>
                   <div className="text-3xl font-bold text-accent">{eligibleCount}</div>
                   <div className="text-sm text-muted-foreground">Eligible Schemes</div>
                 </div>
               </div>
             </div>
 
             <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6">
               <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                   <Sparkles className="h-6 w-6 text-secondary" />
                 </div>
                 <div>
                   <div className="text-3xl font-bold text-secondary">{recommendedResults.length}</div>
                   <div className="text-sm text-muted-foreground">AI Recommended</div>
                 </div>
               </div>
             </div>
 
             <div className="bg-muted rounded-2xl p-6">
               <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-xl bg-muted-foreground/10 flex items-center justify-center">
                   <AlertCircle className="h-6 w-6 text-muted-foreground" />
                 </div>
                 <div>
                   <div className="text-3xl font-bold">{notEligibleCount}</div>
                   <div className="text-sm text-muted-foreground">Not Eligible</div>
                 </div>
               </div>
             </div>
           </div>
 
           {/* Results Tabs */}
           <Tabs defaultValue="recommended" className="space-y-6">
             <TabsList className="grid w-full max-w-md grid-cols-3">
               <TabsTrigger value="recommended" className="gap-2">
                 <Sparkles className="h-4 w-4" />
                 Recommended
               </TabsTrigger>
               <TabsTrigger value="eligible" className="gap-2">
                 <CheckCircle2 className="h-4 w-4" />
                 Eligible ({eligibleCount})
               </TabsTrigger>
               <TabsTrigger value="all" className="gap-2">
                 All ({allResults.length})
               </TabsTrigger>
             </TabsList>
 
             {/* AI Recommended */}
             <TabsContent value="recommended" className="space-y-6">
               <div className="flex items-center gap-2 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                 <Sparkles className="h-5 w-5 text-secondary" />
                 <p className="text-sm">
                   <span className="font-medium">AI Recommendations</span> - These schemes are specially selected based on your profile, location, and popularity.
                 </p>
               </div>
 
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {recommendedResults.map((result) => (
                   <SchemeCard
                     key={result.scheme.id}
                     scheme={result.scheme}
                     isEligible={result.isEligible}
                     isRecommended={true}
                     recommendationReason={result.recommendationReason}
                     matchScore={result.score}
                   />
                 ))}
               </div>
             </TabsContent>
 
             {/* Eligible Schemes */}
             <TabsContent value="eligible" className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {allResults
                   .filter(r => r.isEligible)
                   .map((result) => (
                     <SchemeCard
                       key={result.scheme.id}
                       scheme={result.scheme}
                       isEligible={true}
                       matchScore={result.score}
                     />
                   ))}
               </div>
             </TabsContent>
 
             {/* All Schemes */}
             <TabsContent value="all" className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {allResults.map((result) => (
                   <div key={result.scheme.id} className="relative">
                     {!result.isEligible && (
                       <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center">
                         <Badge variant="outline" className="bg-background">
                           Not Eligible
                         </Badge>
                       </div>
                     )}
                     <SchemeCard
                       scheme={result.scheme}
                       isEligible={result.isEligible}
                       matchScore={result.score}
                     />
                   </div>
                 ))}
               </div>
             </TabsContent>
           </Tabs>
 
           {/* CTA */}
           <div className="mt-12 text-center">
             <p className="text-muted-foreground mb-4">
               Need help understanding these schemes?
             </p>
             <Link to="/chatbot">
               <Button className="gradient-primary">
                 Chat with AI Assistant
               </Button>
             </Link>
           </div>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Results;