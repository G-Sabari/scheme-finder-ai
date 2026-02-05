 import React from 'react';
 import { useParams, Link } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Separator } from '@/components/ui/separator';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { getSchemeById } from '@/data/schemes';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import { 
   ArrowLeft, 
   CheckCircle2, 
   FileText, 
   ExternalLink,
   Building2,
   MapPin,
   Calendar,
   Share2,
   Bookmark,
   MessageCircle
 } from 'lucide-react';
 
 const categoryIcons: Record<string, string> = {
   education: '📚',
   agriculture: '🌾',
   healthcare: '🏥',
   housing: '🏠',
   employment: '💼',
   women_welfare: '👩',
   senior_citizen: '👴',
   disability: '♿',
   financial_inclusion: '💰',
   skill_development: '🎯',
   social_security: '🛡️',
 };
 
 const SchemeDetails: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const { language, t } = useLanguage();
   
   const scheme = id ? getSchemeById(id) : null;
 
   if (!scheme) {
     return (
       <div className="min-h-screen flex flex-col">
         <Header />
         <main className="flex-1 flex items-center justify-center">
           <div className="text-center">
             <h1 className="text-2xl font-bold mb-4">Scheme not found</h1>
             <Link to="/schemes">
               <Button>Browse all schemes</Button>
             </Link>
           </div>
         </main>
         <Footer />
       </div>
     );
   }
 
   const getName = () => language === 'ta' && scheme.nameTranslated?.ta ? scheme.nameTranslated.ta : scheme.name;
   const getDescription = () => language === 'ta' && scheme.descriptionTranslated?.ta ? scheme.descriptionTranslated.ta : scheme.description;
   const getBenefits = () => language === 'ta' && scheme.benefitsTranslated?.ta ? scheme.benefitsTranslated.ta : scheme.benefits;
   const getDocuments = () => language === 'ta' && scheme.requiredDocumentsTranslated?.ta ? scheme.requiredDocumentsTranslated.ta : scheme.requiredDocuments;
   const getSteps = () => language === 'ta' && scheme.applicationStepsTranslated?.ta ? scheme.applicationStepsTranslated.ta : scheme.applicationSteps;
 
   return (
     <div className="min-h-screen flex flex-col bg-muted/30">
       <Header />
       
       <main className="flex-1 py-8">
         <div className="container max-w-4xl">
           {/* Back Button */}
           <Link to="/schemes">
             <Button variant="ghost" size="sm" className="mb-6">
               <ArrowLeft className="h-4 w-4 mr-2" />
               {t('back')} to schemes
             </Button>
           </Link>
 
           {/* Header Card */}
           <Card className="mb-6 overflow-hidden">
             <div className="gradient-primary p-8 text-primary-foreground">
               <div className="flex items-start gap-4">
                 <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0">
                   {categoryIcons[scheme.category] || '📋'}
                 </div>
                 <div className="flex-1">
                   <div className="flex flex-wrap gap-2 mb-3">
                     <Badge className="bg-white/20 text-white border-white/30">
                       {t(`category.${scheme.category}`)}
                     </Badge>
                     {scheme.level === 'central' ? (
                       <Badge className="bg-white/20 text-white border-white/30">
                         <Building2 className="h-3 w-3 mr-1" />
                         {t('scheme.level.central')}
                       </Badge>
                     ) : (
                       <Badge className="bg-white/20 text-white border-white/30">
                         <MapPin className="h-3 w-3 mr-1" />
                         {scheme.state}
                       </Badge>
                     )}
                     <Badge className={`${scheme.status === 'active' ? 'bg-accent' : 'bg-warning'} text-white border-0`}>
                       {scheme.status}
                     </Badge>
                   </div>
                   <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                     {getName()}
                   </h1>
                   <p className="text-white/80">{scheme.ministry}</p>
                 </div>
               </div>
             </div>
 
             <CardContent className="p-6">
               <div className="flex flex-wrap gap-4">
                 <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
                   <Button className="gradient-secondary text-secondary-foreground shadow-glow">
                     {t('scheme.apply')}
                     <ExternalLink className="h-4 w-4 ml-2" />
                   </Button>
                 </a>
                 <Button variant="outline">
                   <Bookmark className="h-4 w-4 mr-2" />
                   Save
                 </Button>
                 <Button variant="outline">
                   <Share2 className="h-4 w-4 mr-2" />
                   Share
                 </Button>
                 <Link to="/chatbot">
                   <Button variant="outline">
                     <MessageCircle className="h-4 w-4 mr-2" />
                     Ask AI
                   </Button>
                 </Link>
               </div>
 
               {scheme.deadline && (
                 <div className="mt-4 flex items-center gap-2 text-warning">
                   <Calendar className="h-4 w-4" />
                   <span className="font-medium">
                     {t('scheme.deadline')}: {new Date(scheme.deadline).toLocaleDateString()}
                   </span>
                 </div>
               )}
             </CardContent>
           </Card>
 
           {/* Description */}
           <Card className="mb-6">
             <CardHeader>
               <CardTitle>About this Scheme</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground leading-relaxed">
                 {getDescription()}
               </p>
             </CardContent>
           </Card>
 
           {/* Benefits */}
           <Card className="mb-6">
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <CheckCircle2 className="h-5 w-5 text-accent" />
                 {t('scheme.benefits')}
               </CardTitle>
             </CardHeader>
             <CardContent>
               <ul className="space-y-3">
                 {getBenefits().map((benefit, index) => (
                   <li key={index} className="flex items-start gap-3">
                     <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                       <CheckCircle2 className="h-4 w-4 text-accent" />
                     </div>
                     <span>{benefit}</span>
                   </li>
                 ))}
               </ul>
             </CardContent>
           </Card>
 
           {/* Eligibility Criteria */}
           <Card className="mb-6">
             <CardHeader>
               <CardTitle>Eligibility Criteria</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {scheme.eligibility.minAge && (
                   <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                     <span className="text-muted-foreground">Minimum Age:</span>
                     <span className="font-medium">{scheme.eligibility.minAge} years</span>
                   </div>
                 )}
                 {scheme.eligibility.maxAge && (
                   <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                     <span className="text-muted-foreground">Maximum Age:</span>
                     <span className="font-medium">{scheme.eligibility.maxAge} years</span>
                   </div>
                 )}
                 {scheme.eligibility.maxIncome && (
                   <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                     <span className="text-muted-foreground">Max Income:</span>
                     <span className="font-medium">₹{scheme.eligibility.maxIncome.toLocaleString()}/year</span>
                   </div>
                 )}
                 {scheme.eligibility.gender && (
                   <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                     <span className="text-muted-foreground">Gender:</span>
                     <span className="font-medium capitalize">{scheme.eligibility.gender.join(', ')}</span>
                   </div>
                 )}
                 {scheme.eligibility.category && (
                   <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                     <span className="text-muted-foreground">Category:</span>
                     <span className="font-medium uppercase">{scheme.eligibility.category.join(', ')}</span>
                   </div>
                 )}
                 {scheme.eligibility.occupation && (
                   <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                     <span className="text-muted-foreground">Occupation:</span>
                     <span className="font-medium capitalize">{scheme.eligibility.occupation.join(', ')}</span>
                   </div>
                 )}
               </div>
 
               {scheme.eligibility.customConditions && scheme.eligibility.customConditions.length > 0 && (
                 <div className="mt-4">
                   <h4 className="font-medium mb-2">Additional Conditions:</h4>
                   <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                     {scheme.eligibility.customConditions.map((condition, index) => (
                       <li key={index}>{condition}</li>
                     ))}
                   </ul>
                 </div>
               )}
             </CardContent>
           </Card>
 
           {/* Required Documents */}
           <Card className="mb-6">
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <FileText className="h-5 w-5 text-primary" />
                 {t('scheme.documents')}
               </CardTitle>
             </CardHeader>
             <CardContent>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {getDocuments().map((doc, index) => (
                   <li key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                     <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                     <span>{doc}</span>
                   </li>
                 ))}
               </ul>
               <div className="mt-4">
                 <Link to="/documents">
                   <Button variant="outline" size="sm">
                     Upload Documents
                   </Button>
                 </Link>
               </div>
             </CardContent>
           </Card>
 
           {/* Application Steps */}
           <Card>
             <CardHeader>
               <CardTitle>How to Apply</CardTitle>
             </CardHeader>
             <CardContent>
               <ol className="space-y-4">
                 {getSteps().map((step, index) => (
                   <li key={index} className="flex gap-4">
                     <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                       {index + 1}
                     </div>
                     <div className="flex-1 pt-1">
                       <p>{step}</p>
                     </div>
                   </li>
                 ))}
               </ol>
 
               <Separator className="my-6" />
 
               <div className="flex justify-center">
                 <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
                   <Button size="lg" className="gradient-secondary text-secondary-foreground shadow-glow">
                     Start Application
                     <ExternalLink className="h-4 w-4 ml-2" />
                   </Button>
                 </a>
               </div>
             </CardContent>
           </Card>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default SchemeDetails;