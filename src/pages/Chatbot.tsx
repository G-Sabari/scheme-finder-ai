 import React, { useState, useRef, useEffect } from 'react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Card } from '@/components/ui/card';
 import { useLanguage } from '@/contexts/LanguageContext';
 import Header from '@/components/Header';
 import { Send, Bot, User, Mic, Loader2 } from 'lucide-react';
 import { ChatMessage } from '@/types';
 
 const Chatbot: React.FC = () => {
   const { t } = useLanguage();
   const [messages, setMessages] = useState<ChatMessage[]>([
     { id: '1', role: 'assistant', content: t('chatbot.welcome'), timestamp: new Date().toISOString() }
   ]);
   const [input, setInput] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const messagesEndRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);
 
   const handleSend = async () => {
     if (!input.trim()) return;
     const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date().toISOString() };
     setMessages(prev => [...prev, userMsg]);
     setInput('');
     setIsLoading(true);
     
     setTimeout(() => {
       const responses = [
         "I can help you find the right government scheme! Based on your query, PM-KISAN might be suitable if you're a farmer. Would you like more details?",
         "To check your eligibility, please use our Eligibility Checker tool. It will analyze your profile against 500+ schemes.",
         "The required documents typically include Aadhaar Card, Income Certificate, and Bank Account details. Specific schemes may need additional documents.",
       ];
       const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)], timestamp: new Date().toISOString() };
       setMessages(prev => [...prev, botMsg]);
       setIsLoading(false);
     }, 1500);
   };
 
   return (
     <div className="min-h-screen flex flex-col bg-muted/30">
       <Header />
       <main className="flex-1 container max-w-3xl py-6 flex flex-col">
         <h1 className="text-2xl font-display font-bold mb-4">{t('chatbot.title')}</h1>
         <Card className="flex-1 flex flex-col overflow-hidden">
           <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {messages.map((msg) => (
               <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                 {msg.role === 'assistant' && <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center shrink-0"><Bot className="h-4 w-4 text-white" /></div>}
                 <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                   {msg.content}
                 </div>
                 {msg.role === 'user' && <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0"><User className="h-4 w-4 text-white" /></div>}
               </div>
             ))}
             {isLoading && <div className="flex gap-3"><div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center"><Loader2 className="h-4 w-4 text-white animate-spin" /></div><div className="bg-muted p-3 rounded-2xl">Typing...</div></div>}
             <div ref={messagesEndRef} />
           </div>
           <div className="p-4 border-t flex gap-2">
             <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={t('chatbot.placeholder')} className="flex-1" />
             <Button onClick={handleSend} className="gradient-primary"><Send className="h-4 w-4" /></Button>
           </div>
         </Card>
       </main>
     </div>
   );
 };
 
 export default Chatbot;