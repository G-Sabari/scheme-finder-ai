 import React, { useState, useEffect } from 'react';
 import { Button } from '@/components/ui/button';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { Mic, MicOff, Loader2 } from 'lucide-react';
 
 interface VoiceInputProps {
   onResult: (text: string) => void;
   size?: 'default' | 'lg';
 }
 
 const VoiceInput: React.FC<VoiceInputProps> = ({ onResult, size = 'default' }) => {
   const [isListening, setIsListening] = useState(false);
   const [isSupported, setIsSupported] = useState(true);
   const { language, t } = useLanguage();
 
   useEffect(() => {
     // Check if speech recognition is supported
     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
     if (!SpeechRecognition) {
       setIsSupported(false);
     }
   }, []);
 
   const startListening = () => {
     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
     
     if (!SpeechRecognition) {
       alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
       return;
     }
 
     const recognition = new SpeechRecognition();
     recognition.continuous = false;
     recognition.interimResults = false;
     recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
 
     recognition.onstart = () => {
       setIsListening(true);
     };
 
     recognition.onresult = (event: any) => {
       const transcript = event.results[0][0].transcript;
       onResult(transcript);
       setIsListening(false);
     };
 
     recognition.onerror = (event: any) => {
       console.error('Speech recognition error:', event.error);
       setIsListening(false);
     };
 
     recognition.onend = () => {
       setIsListening(false);
     };
 
     recognition.start();
   };
 
   if (!isSupported) {
     return null;
   }
 
   const isLarge = size === 'lg';
 
   return (
     <Button
       type="button"
       variant={isListening ? 'default' : 'outline'}
       size={isLarge ? 'lg' : 'default'}
       className={`
         rounded-full relative
         ${isListening ? 'gradient-secondary animate-pulse-soft' : ''}
         ${isLarge ? 'h-20 w-20' : 'h-10 w-10'}
       `}
       onClick={startListening}
       disabled={isListening}
     >
       {isListening ? (
         <>
           <Loader2 className={`${isLarge ? 'h-8 w-8' : 'h-4 w-4'} animate-spin`} />
           {isLarge && (
             <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-secondary font-medium">
               {t('voice.listening')}
             </span>
           )}
         </>
       ) : (
         <>
           <Mic className={`${isLarge ? 'h-8 w-8' : 'h-4 w-4'}`} />
           {isLarge && (
             <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-muted-foreground">
               {t('voice.speak')}
             </span>
           )}
         </>
       )}
     </Button>
   );
 };
 
 export default VoiceInput;