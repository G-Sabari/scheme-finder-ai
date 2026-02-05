 import React from 'react';
 import { Link } from 'react-router-dom';
 import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { Scheme } from '@/types';
 import { 
   CheckCircle2, 
   Sparkles, 
   ArrowRight, 
   Calendar,
   Building2,
   MapPin,
   ExternalLink
 } from 'lucide-react';
 
 interface SchemeCardProps {
   scheme: Scheme;
   isEligible?: boolean;
   isRecommended?: boolean;
   recommendationReason?: string;
   matchScore?: number;
 }
 
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
 
 const SchemeCard: React.FC<SchemeCardProps> = ({
   scheme,
   isEligible = false,
   isRecommended = false,
   recommendationReason,
   matchScore,
 }) => {
   const { language, t } = useLanguage();
 
   const getName = () => {
     if (language === 'ta' && scheme.nameTranslated?.ta) {
       return scheme.nameTranslated.ta;
     }
     return scheme.name;
   };
 
   const getDescription = () => {
     if (language === 'ta' && scheme.descriptionTranslated?.ta) {
       return scheme.descriptionTranslated.ta;
     }
     return scheme.description;
   };
 
   const getBenefits = () => {
     if (language === 'ta' && scheme.benefitsTranslated?.ta) {
       return scheme.benefitsTranslated.ta;
     }
     return scheme.benefits;
   };
 
   return (
     <Card className="scheme-card group overflow-hidden">
       <CardHeader className="pb-3">
         <div className="flex items-start justify-between gap-4">
           <div className="flex items-start gap-3">
             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl shrink-0">
               {categoryIcons[scheme.category] || '📋'}
             </div>
             <div className="space-y-1">
               <h3 className="font-display font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                 {getName()}
               </h3>
               <div className="flex flex-wrap gap-2">
                 <Badge variant="outline" className="badge-category text-xs">
                   {t(`category.${scheme.category}`)}
                 </Badge>
                 {scheme.level === 'central' ? (
                   <Badge variant="outline" className="text-xs">
                     <Building2 className="h-3 w-3 mr-1" />
                     {t('scheme.level.central')}
                   </Badge>
                 ) : (
                   <Badge variant="outline" className="text-xs">
                     <MapPin className="h-3 w-3 mr-1" />
                     {scheme.state}
                   </Badge>
                 )}
               </div>
             </div>
           </div>
           
           {/* Status Badges */}
           <div className="flex flex-col gap-1">
             {isEligible && (
               <Badge className="bg-accent text-accent-foreground">
                 <CheckCircle2 className="h-3 w-3 mr-1" />
                 {t('scheme.eligible')}
               </Badge>
             )}
             {isRecommended && (
               <Badge className="bg-secondary text-secondary-foreground">
                 <Sparkles className="h-3 w-3 mr-1" />
                 AI
               </Badge>
             )}
           </div>
         </div>
       </CardHeader>
 
       <CardContent className="space-y-4">
         <p className="text-sm text-muted-foreground line-clamp-2">
           {getDescription()}
         </p>
 
         {/* Key Benefits Preview */}
         <div className="space-y-2">
           <h4 className="text-sm font-semibold">{t('scheme.benefits')}</h4>
           <ul className="grid grid-cols-1 gap-1">
             {getBenefits().slice(0, 2).map((benefit, index) => (
               <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                 <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                 <span className="line-clamp-1">{benefit}</span>
               </li>
             ))}
           </ul>
         </div>
 
         {/* Recommendation reason */}
         {recommendationReason && (
           <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/10 border border-secondary/20">
             <Sparkles className="h-4 w-4 text-secondary shrink-0" />
             <span className="text-xs text-secondary font-medium">{recommendationReason}</span>
           </div>
         )}
 
         {/* Deadline */}
         {scheme.deadline && (
           <div className="flex items-center gap-2 text-sm text-warning">
             <Calendar className="h-4 w-4" />
             <span>{t('scheme.deadline')}: {new Date(scheme.deadline).toLocaleDateString()}</span>
           </div>
         )}
       </CardContent>
 
       <CardFooter className="pt-0 flex gap-2">
         <Link to={`/scheme/${scheme.id}`} className="flex-1">
           <Button variant="outline" className="w-full group/btn">
             {t('scheme.details')}
             <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
           </Button>
         </Link>
         <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
           <Button className="gradient-secondary text-secondary-foreground">
             {t('scheme.apply')}
             <ExternalLink className="h-4 w-4 ml-2" />
           </Button>
         </a>
       </CardFooter>
     </Card>
   );
 };
 
 export default SchemeCard;