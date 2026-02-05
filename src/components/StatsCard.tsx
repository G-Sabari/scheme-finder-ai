 import React from 'react';
 import { useLanguage } from '@/contexts/LanguageContext';
 
 interface StatItem {
   value: string;
   labelKey: string;
   icon?: string;
 }
 
 const stats: StatItem[] = [
   { value: '500+', labelKey: 'stats.schemes', icon: '📋' },
   { value: '10Cr+', labelKey: 'stats.beneficiaries', icon: '👥' },
   { value: '36', labelKey: 'stats.states', icon: '🗺️' },
   { value: '12', labelKey: 'stats.languages', icon: '🌐' },
 ];
 
 const StatsCard: React.FC = () => {
   const { t } = useLanguage();
 
   return (
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       {stats.map((stat, index) => (
         <div
           key={stat.labelKey}
           className="relative overflow-hidden rounded-2xl bg-card p-6 shadow-card border border-border/50"
           style={{ animationDelay: `${index * 100}ms` }}
         >
           <div className="absolute top-2 right-2 text-3xl opacity-20">
             {stat.icon}
           </div>
           <div className="relative">
             <div className="text-3xl md:text-4xl font-display font-bold text-primary">
               {stat.value}
             </div>
             <div className="text-sm text-muted-foreground mt-1">
               {t(stat.labelKey)}
             </div>
           </div>
         </div>
       ))}
     </div>
   );
 };
 
 export default StatsCard;