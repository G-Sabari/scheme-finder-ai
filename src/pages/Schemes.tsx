 import React, { useState, useMemo } from 'react';
 import { useSearchParams } from 'react-router-dom';
 import { Input } from '@/components/ui/input';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { schemes } from '@/data/schemes';
 import { SchemeCategory } from '@/types';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import SchemeCard from '@/components/SchemeCard';
 import SearchBar from '@/components/SearchBar';
 import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
 
 const categories: SchemeCategory[] = [
   'education',
   'agriculture',
   'healthcare',
   'housing',
   'employment',
   'women_welfare',
   'senior_citizen',
   'disability',
   'financial_inclusion',
   'skill_development',
   'social_security',
 ];
 
 const Schemes: React.FC = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const { t } = useLanguage();
   
   const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
   const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
   const [selectedLevel, setSelectedLevel] = useState<string>('all');
   const [sortBy, setSortBy] = useState<string>('popularity');
 
   const filteredSchemes = useMemo(() => {
     let result = [...schemes];
 
     // Search filter
     if (searchQuery) {
       const query = searchQuery.toLowerCase();
       result = result.filter(scheme => 
         scheme.name.toLowerCase().includes(query) ||
         scheme.description.toLowerCase().includes(query) ||
         scheme.tags.some(tag => tag.toLowerCase().includes(query))
       );
     }
 
     // Category filter
     if (selectedCategory && selectedCategory !== 'all') {
       result = result.filter(scheme => scheme.category === selectedCategory);
     }
 
     // Level filter
     if (selectedLevel && selectedLevel !== 'all') {
       result = result.filter(scheme => scheme.level === selectedLevel);
     }
 
     // Sort
     switch (sortBy) {
       case 'popularity':
         result.sort((a, b) => b.popularity - a.popularity);
         break;
       case 'name':
         result.sort((a, b) => a.name.localeCompare(b.name));
         break;
       case 'recent':
         result.sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime());
         break;
     }
 
     return result;
   }, [searchQuery, selectedCategory, selectedLevel, sortBy]);
 
   const clearFilters = () => {
     setSearchQuery('');
     setSelectedCategory('all');
     setSelectedLevel('all');
     setSortBy('popularity');
     setSearchParams({});
   };
 
   const hasFilters = searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all';
 
   return (
     <div className="min-h-screen flex flex-col">
       <Header />
       
       <main className="flex-1 py-8 bg-muted/30">
         <div className="container">
           {/* Header */}
           <div className="mb-8">
             <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
               {t('nav.schemes')}
             </h1>
             <p className="text-muted-foreground">
               Browse and search through all available government welfare schemes
             </p>
           </div>
 
           {/* Search and Filters */}
           <div className="bg-card rounded-2xl p-6 shadow-card mb-8 space-y-4">
             <SearchBar 
               onSearch={setSearchQuery} 
               placeholder={t('hero.search.placeholder')}
             />
 
             <div className="flex flex-wrap items-center gap-4">
               <div className="flex items-center gap-2">
                 <Filter className="h-4 w-4 text-muted-foreground" />
                 <span className="text-sm font-medium">Filters:</span>
               </div>
 
               <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                 <SelectTrigger className="w-[180px]">
                   <SelectValue placeholder="Category" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Categories</SelectItem>
                   {categories.map(cat => (
                     <SelectItem key={cat} value={cat}>
                       {t(`category.${cat}`)}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
 
               <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                 <SelectTrigger className="w-[150px]">
                   <SelectValue placeholder="Level" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Levels</SelectItem>
                   <SelectItem value="central">{t('scheme.level.central')}</SelectItem>
                   <SelectItem value="state">{t('scheme.level.state')}</SelectItem>
                 </SelectContent>
               </Select>
 
               <Select value={sortBy} onValueChange={setSortBy}>
                 <SelectTrigger className="w-[150px]">
                   <SlidersHorizontal className="h-4 w-4 mr-2" />
                   <SelectValue placeholder="Sort by" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="popularity">Most Popular</SelectItem>
                   <SelectItem value="name">Name (A-Z)</SelectItem>
                   <SelectItem value="recent">Most Recent</SelectItem>
                 </SelectContent>
               </Select>
 
               {hasFilters && (
                 <Button variant="ghost" size="sm" onClick={clearFilters}>
                   <X className="h-4 w-4 mr-1" />
                   Clear all
                 </Button>
               )}
             </div>
 
             {/* Active Filters */}
             {hasFilters && (
               <div className="flex flex-wrap gap-2">
                 {searchQuery && (
                   <Badge variant="secondary" className="gap-1">
                     Search: {searchQuery}
                     <X 
                       className="h-3 w-3 cursor-pointer" 
                       onClick={() => setSearchQuery('')}
                     />
                   </Badge>
                 )}
                 {selectedCategory !== 'all' && (
                   <Badge variant="secondary" className="gap-1">
                     {t(`category.${selectedCategory}`)}
                     <X 
                       className="h-3 w-3 cursor-pointer" 
                       onClick={() => setSelectedCategory('all')}
                     />
                   </Badge>
                 )}
                 {selectedLevel !== 'all' && (
                   <Badge variant="secondary" className="gap-1">
                     {selectedLevel === 'central' ? t('scheme.level.central') : t('scheme.level.state')}
                     <X 
                       className="h-3 w-3 cursor-pointer" 
                       onClick={() => setSelectedLevel('all')}
                     />
                   </Badge>
                 )}
               </div>
             )}
           </div>
 
           {/* Results Count */}
           <div className="mb-6">
             <p className="text-muted-foreground">
               Showing <span className="font-semibold text-foreground">{filteredSchemes.length}</span> schemes
             </p>
           </div>
 
           {/* Schemes Grid */}
           {filteredSchemes.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {filteredSchemes.map((scheme) => (
                 <SchemeCard key={scheme.id} scheme={scheme} />
               ))}
             </div>
           ) : (
             <div className="text-center py-16">
               <div className="text-6xl mb-4">🔍</div>
               <h3 className="text-xl font-semibold mb-2">No schemes found</h3>
               <p className="text-muted-foreground mb-4">
                 Try adjusting your search or filters
               </p>
               <Button onClick={clearFilters}>Clear all filters</Button>
             </div>
           )}
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Schemes;