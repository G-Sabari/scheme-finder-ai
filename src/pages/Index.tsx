 import React, { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { useLanguage } from '@/contexts/LanguageContext';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import SearchBar from '@/components/SearchBar';
 import StatsCard from '@/components/StatsCard';
 import CategoryCard from '@/components/CategoryCard';
 import SchemeCard from '@/components/SchemeCard';
 import VoiceInput from '@/components/VoiceInput';
 import { schemes } from '@/data/schemes';
 import { SchemeCategory } from '@/types';
 import { 
   ArrowRight, 
   CheckCircle2, 
   Sparkles, 
   Shield, 
   Globe, 
   MessageCircle,
   FileSearch,
   Bell
 } from 'lucide-react';
 
 const categories: SchemeCategory[] = [
   'education',
   'agriculture',
   'healthcare',
   'housing',
   'employment',
   'women_welfare',
   'senior_citizen',
   'financial_inclusion',
   'skill_development',
   'social_security',
 ];
 
 const features = [
   {
     icon: Sparkles,
     title: 'AI-Powered Recommendations',
     description: 'Get personalized scheme suggestions based on your profile',
   },
   {
     icon: Globe,
     title: 'Multi-Language Support',
     description: 'Access information in English and Tamil',
   },
   {
     icon: MessageCircle,
     title: 'Smart Chatbot',
     description: '24/7 AI assistant to answer your scheme queries',
   },
   {
     icon: FileSearch,
     title: 'Document Scanner',
     description: 'Upload and verify documents with OCR technology',
   },
   {
     icon: Bell,
     title: 'Smart Notifications',
     description: 'Get alerts for new schemes and deadlines',
   },
   {
     icon: Shield,
     title: 'Aadhaar Verification',
     description: 'Secure identity verification for faster processing',
   },
 ];
 
 const Index: React.FC = () => {
   const { t } = useLanguage();
   const [searchQuery, setSearchQuery] = useState('');
 
   const popularSchemes = schemes.slice(0, 4);
 
   const handleVoiceResult = (text: string) => {
     setSearchQuery(text);
   };
 
   return (
     <div className="min-h-screen flex flex-col">
       <Header />
       
       <main className="flex-1">
         {/* Hero Section */}
         <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
           {/* Background Pattern */}
           <div className="absolute inset-0 opacity-10">
             <div className="absolute inset-0" style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }} />
           </div>
 
           <div className="container relative">
             <div className="max-w-4xl mx-auto text-center text-white space-y-8">
               {/* Badge */}
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                 <Sparkles className="h-4 w-4 text-secondary" />
                 <span>AI-Powered • Multi-Language • Voice Enabled</span>
               </div>
 
               {/* Title */}
               <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight animate-slide-up">
                 {t('hero.title')}
               </h1>
 
               <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                 {t('hero.subtitle')}
               </p>
 
               {/* Search Bar */}
               <div className="max-w-2xl mx-auto space-y-4">
                 <SearchBar size="lg" placeholder={t('hero.search.placeholder')} />
                 
                 {/* Voice Search */}
                 <div className="flex items-center justify-center gap-4">
                   <span className="text-white/60 text-sm">or</span>
                   <VoiceInput onResult={handleVoiceResult} />
                   <span className="text-white/60 text-sm">{t('hero.voice')}</span>
                 </div>
               </div>
 
               {/* CTA Buttons */}
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link to="/eligibility">
                   <Button size="lg" className="gradient-secondary text-secondary-foreground shadow-glow group">
                     <CheckCircle2 className="h-5 w-5 mr-2" />
                     {t('hero.cta.check')}
                     <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </Link>
                 <Link to="/schemes">
                   <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                     {t('hero.cta.explore')}
                   </Button>
                 </Link>
               </div>
             </div>
           </div>
 
           {/* Wave Decoration */}
           <div className="absolute bottom-0 left-0 right-0">
             <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
               <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
             </svg>
           </div>
         </section>
 
         {/* Stats Section */}
         <section className="py-12 -mt-8 relative z-10">
           <div className="container">
             <StatsCard />
           </div>
         </section>
 
         {/* Categories Section */}
         <section className="py-16 bg-muted/30">
           <div className="container">
             <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                 Explore Scheme Categories
               </h2>
               <p className="text-muted-foreground max-w-2xl mx-auto">
                 Find government welfare schemes across various categories designed for different needs
               </p>
             </div>
 
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
               {categories.map((category) => (
                 <CategoryCard 
                   key={category} 
                   category={category}
                   count={schemes.filter(s => s.category === category).length}
                 />
               ))}
             </div>
           </div>
         </section>
 
         {/* Popular Schemes Section */}
         <section className="py-16">
           <div className="container">
             <div className="flex items-center justify-between mb-8">
               <div>
                 <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                   Popular Schemes
                 </h2>
                 <p className="text-muted-foreground">
                   Most accessed government welfare schemes
                 </p>
               </div>
               <Link to="/schemes">
                 <Button variant="outline" className="group">
                   View All
                   <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
             </div>
 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {popularSchemes.map((scheme) => (
                 <SchemeCard key={scheme.id} scheme={scheme} />
               ))}
             </div>
           </div>
         </section>
 
         {/* Features Section */}
         <section className="py-16 bg-muted/30">
           <div className="container">
             <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                 Smart Features for Easy Access
               </h2>
               <p className="text-muted-foreground max-w-2xl mx-auto">
                 Our AI-powered platform makes finding and applying for government schemes simple and accessible
               </p>
             </div>
 
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {features.map((feature, index) => (
                 <div
                   key={feature.title}
                   className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-lg transition-shadow"
                 >
                   <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                     <feature.icon className="h-6 w-6 text-primary-foreground" />
                   </div>
                   <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                   <p className="text-sm text-muted-foreground">{feature.description}</p>
                 </div>
               ))}
             </div>
           </div>
         </section>
 
         {/* CTA Section */}
         <section className="py-20">
           <div className="container">
             <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-16 text-center">
               <div className="absolute inset-0 opacity-10">
                 <div className="absolute inset-0" style={{
                   backgroundImage: `radial-gradient(circle at 25% 25%, white 2%, transparent 2%), radial-gradient(circle at 75% 75%, white 2%, transparent 2%)`,
                   backgroundSize: '60px 60px',
                 }} />
               </div>
 
               <div className="relative space-y-6 max-w-2xl mx-auto">
                 <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                   Ready to Find Your Benefits?
                 </h2>
                 <p className="text-lg text-white/80">
                   Check your eligibility for hundreds of government schemes in just 2 minutes
                 </p>
                 <Link to="/eligibility">
                   <Button size="lg" className="gradient-secondary text-secondary-foreground shadow-glow mt-4">
                     <CheckCircle2 className="h-5 w-5 mr-2" />
                     Check Eligibility Now
                     <ArrowRight className="h-5 w-5 ml-2" />
                   </Button>
                 </Link>
               </div>
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Index;
