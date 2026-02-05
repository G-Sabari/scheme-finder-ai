 import React from 'react';
 import { Link } from 'react-router-dom';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { SchemeCategory } from '@/types';
 
 interface CategoryCardProps {
   category: SchemeCategory;
   count?: number;
 }
 
 const categoryConfig: Record<SchemeCategory, { icon: string; gradient: string }> = {
   education: { icon: '📚', gradient: 'from-blue-500 to-blue-600' },
   agriculture: { icon: '🌾', gradient: 'from-green-500 to-green-600' },
   healthcare: { icon: '🏥', gradient: 'from-red-400 to-red-500' },
   housing: { icon: '🏠', gradient: 'from-amber-500 to-amber-600' },
   employment: { icon: '💼', gradient: 'from-purple-500 to-purple-600' },
   women_welfare: { icon: '👩', gradient: 'from-pink-500 to-pink-600' },
   senior_citizen: { icon: '👴', gradient: 'from-teal-500 to-teal-600' },
   disability: { icon: '♿', gradient: 'from-indigo-500 to-indigo-600' },
   financial_inclusion: { icon: '💰', gradient: 'from-yellow-500 to-yellow-600' },
   skill_development: { icon: '🎯', gradient: 'from-cyan-500 to-cyan-600' },
   social_security: { icon: '🛡️', gradient: 'from-slate-500 to-slate-600' },
 };
 
 const CategoryCard: React.FC<CategoryCardProps> = ({ category, count }) => {
   const { t } = useLanguage();
   const config = categoryConfig[category];
 
   return (
     <Link to={`/schemes?category=${category}`}>
       <div className="group relative overflow-hidden rounded-2xl p-6 bg-card shadow-card border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
         {/* Background gradient on hover */}
         <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
         
         <div className="relative flex flex-col items-center text-center gap-3">
           <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
             {config.icon}
           </div>
           <h3 className="font-semibold text-sm">
             {t(`category.${category}`)}
           </h3>
           {count !== undefined && (
             <span className="text-xs text-muted-foreground">
               {count} {count === 1 ? 'scheme' : 'schemes'}
             </span>
           )}
         </div>
       </div>
     </Link>
   );
 };
 
 export default CategoryCard;