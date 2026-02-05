 import React from 'react';
 import { Link } from 'react-router-dom';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { 
   Phone, 
   Mail, 
   MapPin, 
   Facebook, 
   Twitter, 
   Youtube,
   MessageCircle
 } from 'lucide-react';
 
 const Footer: React.FC = () => {
   const { t } = useLanguage();
 
   return (
     <footer className="bg-primary text-primary-foreground">
       <div className="container py-12">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {/* Brand */}
           <div className="space-y-4">
             <div className="flex items-center gap-2">
               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                 <span className="text-xl font-bold">जन</span>
               </div>
               <div>
                 <h3 className="font-display font-bold text-lg">{t('app.name')}</h3>
               </div>
             </div>
             <p className="text-sm text-primary-foreground/80">
               {t('app.tagline')}
             </p>
             <div className="flex gap-3">
               <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                 <Facebook className="h-5 w-5" />
               </a>
               <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                 <Twitter className="h-5 w-5" />
               </a>
               <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                 <Youtube className="h-5 w-5" />
               </a>
               <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                 <MessageCircle className="h-5 w-5" />
               </a>
             </div>
           </div>
 
           {/* Quick Links */}
           <div className="space-y-4">
             <h4 className="font-semibold">Quick Links</h4>
             <ul className="space-y-2 text-sm text-primary-foreground/80">
               <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
               <li><Link to="/eligibility" className="hover:text-white transition-colors">{t('nav.eligibility')}</Link></li>
               <li><Link to="/schemes" className="hover:text-white transition-colors">{t('nav.schemes')}</Link></li>
               <li><Link to="/chatbot" className="hover:text-white transition-colors">{t('nav.chatbot')}</Link></li>
             </ul>
           </div>
 
           {/* Categories */}
           <div className="space-y-4">
             <h4 className="font-semibold">Scheme Categories</h4>
             <ul className="space-y-2 text-sm text-primary-foreground/80">
               <li><Link to="/schemes?category=education" className="hover:text-white transition-colors">{t('category.education')}</Link></li>
               <li><Link to="/schemes?category=agriculture" className="hover:text-white transition-colors">{t('category.agriculture')}</Link></li>
               <li><Link to="/schemes?category=healthcare" className="hover:text-white transition-colors">{t('category.healthcare')}</Link></li>
               <li><Link to="/schemes?category=women_welfare" className="hover:text-white transition-colors">{t('category.women_welfare')}</Link></li>
             </ul>
           </div>
 
           {/* Contact */}
           <div className="space-y-4">
             <h4 className="font-semibold">Contact Us</h4>
             <ul className="space-y-3 text-sm text-primary-foreground/80">
               <li className="flex items-center gap-2">
                 <Phone className="h-4 w-4" />
                 <span>1800-XXX-XXXX (Toll Free)</span>
               </li>
               <li className="flex items-center gap-2">
                 <Mail className="h-4 w-4" />
                 <span>help@janseva.gov.in</span>
               </li>
               <li className="flex items-start gap-2">
                 <MapPin className="h-4 w-4 shrink-0 mt-1" />
                 <span>Ministry of Social Justice, Shastri Bhawan, New Delhi - 110001</span>
               </li>
             </ul>
           </div>
         </div>
 
         <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
           <p>© {new Date().getFullYear()} {t('app.name')}. All rights reserved.</p>
           <p className="mt-2">
             An initiative under Digital India Programme | Government of India
           </p>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;