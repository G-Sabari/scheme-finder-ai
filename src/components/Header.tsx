 import React from 'react';
 import { Link, useLocation } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { 
   Home, 
   Search, 
   MessageCircle, 
   Bell, 
   FileText, 
   Menu,
   Globe,
   Mic
 } from 'lucide-react';
 import {
   Sheet,
   SheetContent,
   SheetTrigger,
 } from '@/components/ui/sheet';
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu';
 
 const Header: React.FC = () => {
   const { language, setLanguage, t } = useLanguage();
   const location = useLocation();
 
   const navItems = [
     { path: '/', label: t('nav.home'), icon: Home },
     { path: '/eligibility', label: t('nav.eligibility'), icon: Search },
     { path: '/chatbot', label: t('nav.chatbot'), icon: MessageCircle },
     { path: '/documents', label: t('nav.documents'), icon: FileText },
     { path: '/notifications', label: t('nav.notifications'), icon: Bell },
   ];
 
   const isActive = (path: string) => location.pathname === path;
 
   return (
     <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
       <div className="container flex h-16 items-center justify-between">
         {/* Logo */}
         <Link to="/" className="flex items-center gap-2">
           <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
             <span className="text-xl font-bold text-primary-foreground">जन</span>
           </div>
           <div className="hidden sm:block">
             <h1 className="text-lg font-display font-bold text-primary">
               {t('app.name')}
             </h1>
             <p className="text-xs text-muted-foreground">
               {t('app.tagline')}
             </p>
           </div>
         </Link>
 
         {/* Desktop Navigation */}
         <nav className="hidden md:flex items-center gap-1">
           {navItems.map((item) => (
             <Link key={item.path} to={item.path}>
               <Button
                 variant={isActive(item.path) ? 'default' : 'ghost'}
                 size="sm"
                 className={isActive(item.path) ? 'gradient-primary' : ''}
               >
                 <item.icon className="h-4 w-4 mr-2" />
                 {item.label}
               </Button>
             </Link>
           ))}
         </nav>
 
         {/* Actions */}
         <div className="flex items-center gap-2">
           {/* Language Toggle */}
           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="outline" size="sm" className="gap-2">
                 <Globe className="h-4 w-4" />
                 <span className="hidden sm:inline">{language === 'en' ? 'EN' : 'தமிழ்'}</span>
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end">
               <DropdownMenuItem onClick={() => setLanguage('en')}>
                 <span className={language === 'en' ? 'font-bold' : ''}>English</span>
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setLanguage('ta')}>
                 <span className={language === 'ta' ? 'font-bold' : ''}>தமிழ் (Tamil)</span>
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
 
           {/* Voice Search Button */}
           <Link to="/voice">
             <Button variant="outline" size="icon" className="relative">
               <Mic className="h-4 w-4" />
             </Button>
           </Link>
 
           {/* Notifications */}
           <Link to="/notifications">
             <Button variant="outline" size="icon" className="relative">
               <Bell className="h-4 w-4" />
               <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground flex items-center justify-center">
                 3
               </span>
             </Button>
           </Link>
 
           {/* Mobile Menu */}
           <Sheet>
             <SheetTrigger asChild>
               <Button variant="outline" size="icon" className="md:hidden">
                 <Menu className="h-4 w-4" />
               </Button>
             </SheetTrigger>
             <SheetContent side="right" className="w-[280px]">
               <div className="flex flex-col gap-4 mt-6">
                 {navItems.map((item) => (
                   <Link key={item.path} to={item.path}>
                     <Button
                       variant={isActive(item.path) ? 'default' : 'ghost'}
                       className={`w-full justify-start ${isActive(item.path) ? 'gradient-primary' : ''}`}
                     >
                       <item.icon className="h-4 w-4 mr-3" />
                       {item.label}
                     </Button>
                   </Link>
                 ))}
               </div>
             </SheetContent>
           </Sheet>
         </div>
       </div>
     </header>
   );
 };
 
 export default Header;