 import React, { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { useLanguage } from '@/contexts/LanguageContext';
 import Header from '@/components/Header';
 import VoiceInput from '@/components/VoiceInput';
 import { Mic, ArrowLeft, Search } from 'lucide-react';
 
 const Voice: React.FC = () => {
   const { t } = useLanguage();
   const navigate = useNavigate();
   const [transcript, setTranscript] = useState('');
 
   const handleVoiceResult = (text: string) => {
     setTranscript(text);
   };
 
   const handleSearch = () => {
     if (transcript) navigate(`/schemes?search=${encodeURIComponent(transcript)}`);
   };
 
   return (
     <div className="min-h-screen flex flex-col bg-muted/30">
       <Header />
       <main className="flex-1 container max-w-lg py-12 flex flex-col items-center justify-center text-center">
         <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8"><ArrowLeft className="h-4 w-4 mr-2" />{t('back')}</Button>
         <h1 className="text-2xl font-display font-bold mb-2">{t('hero.voice')}</h1>
         <p className="text-muted-foreground mb-8">Speak to search for government schemes</p>
         <div className="mb-8"><VoiceInput onResult={handleVoiceResult} size="lg" /></div>
         {transcript && (
           <div className="w-full space-y-4 animate-slide-up">
             <div className="p-4 rounded-xl bg-card border text-left"><p className="text-sm text-muted-foreground mb-1">You said:</p><p className="font-medium">"{transcript}"</p></div>
             <Button onClick={handleSearch} className="w-full gradient-secondary"><Search className="h-4 w-4 mr-2" />Search Schemes</Button>
           </div>
         )}
       </main>
     </div>
   );
 };
 
 export default Voice;