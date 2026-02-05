 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { LanguageProvider } from "@/contexts/LanguageContext";
 import Index from "./pages/Index";
 import Eligibility from "./pages/Eligibility";
 import Results from "./pages/Results";
 import Schemes from "./pages/Schemes";
 import SchemeDetails from "./pages/SchemeDetails";
 import Chatbot from "./pages/Chatbot";
 import Notifications from "./pages/Notifications";
 import Voice from "./pages/Voice";
 import Documents from "./pages/Documents";
 import NotFound from "./pages/NotFound";
 
 const queryClient = new QueryClient();
 
 const App = () => (
   <QueryClientProvider client={queryClient}>
     <LanguageProvider>
       <TooltipProvider>
         <Toaster />
         <Sonner />
         <BrowserRouter>
           <Routes>
             <Route path="/" element={<Index />} />
             <Route path="/eligibility" element={<Eligibility />} />
             <Route path="/results" element={<Results />} />
             <Route path="/schemes" element={<Schemes />} />
             <Route path="/scheme/:id" element={<SchemeDetails />} />
             <Route path="/chatbot" element={<Chatbot />} />
             <Route path="/notifications" element={<Notifications />} />
             <Route path="/voice" element={<Voice />} />
             <Route path="/documents" element={<Documents />} />
             <Route path="*" element={<NotFound />} />
           </Routes>
         </BrowserRouter>
       </TooltipProvider>
     </LanguageProvider>
   </QueryClientProvider>
 );
 
 export default App;
