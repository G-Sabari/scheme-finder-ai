 import React, { useState } from 'react';
 import { Input } from '@/components/ui/input';
 import { Button } from '@/components/ui/button';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { Search, Mic, X } from 'lucide-react';
 import { useNavigate } from 'react-router-dom';
 
 interface SearchBarProps {
   onSearch?: (query: string) => void;
   placeholder?: string;
   size?: 'default' | 'lg';
   showVoice?: boolean;
 }
 
 const SearchBar: React.FC<SearchBarProps> = ({
   onSearch,
   placeholder,
   size = 'default',
   showVoice = true,
 }) => {
   const [query, setQuery] = useState('');
   const { t } = useLanguage();
   const navigate = useNavigate();
 
   const handleSearch = (e: React.FormEvent) => {
     e.preventDefault();
     if (onSearch) {
       onSearch(query);
     } else {
       navigate(`/schemes?search=${encodeURIComponent(query)}`);
     }
   };
 
   const handleVoiceClick = () => {
     navigate('/voice');
   };
 
   const clearSearch = () => {
     setQuery('');
     if (onSearch) {
       onSearch('');
     }
   };
 
   const isLarge = size === 'lg';
 
   return (
     <form onSubmit={handleSearch} className="relative w-full">
       <div className={`relative flex items-center ${isLarge ? 'h-14' : 'h-10'}`}>
         <div className="absolute left-4 pointer-events-none">
           <Search className={`${isLarge ? 'h-5 w-5' : 'h-4 w-4'} text-muted-foreground`} />
         </div>
         
         <Input
           type="text"
           value={query}
           onChange={(e) => setQuery(e.target.value)}
           placeholder={placeholder || t('hero.search.placeholder')}
           className={`
             w-full pl-12 pr-24 
             ${isLarge ? 'h-14 text-lg' : 'h-10'} 
             rounded-full border-2 border-muted
             focus:border-primary focus:ring-4 focus:ring-primary/10
             transition-all duration-200
             bg-background/80 backdrop-blur-sm
           `}
         />
 
         <div className="absolute right-2 flex items-center gap-1">
           {query && (
             <Button
               type="button"
               variant="ghost"
               size="icon"
               className="h-8 w-8 rounded-full"
               onClick={clearSearch}
             >
               <X className="h-4 w-4" />
             </Button>
           )}
           
           {showVoice && (
             <Button
               type="button"
               variant="ghost"
               size="icon"
               className="h-8 w-8 rounded-full text-secondary hover:text-secondary hover:bg-secondary/10"
               onClick={handleVoiceClick}
             >
               <Mic className="h-4 w-4" />
             </Button>
           )}
           
           <Button
             type="submit"
             size={isLarge ? 'default' : 'sm'}
             className={`rounded-full gradient-primary ${isLarge ? 'px-6' : 'px-4'}`}
           >
             <Search className="h-4 w-4 mr-2" />
             <span className="hidden sm:inline">Search</span>
           </Button>
         </div>
       </div>
     </form>
   );
 };
 
 export default SearchBar;