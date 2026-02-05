 import React, { useState } from 'react';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { useLanguage } from '@/contexts/LanguageContext';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import { Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';
 
 const Documents: React.FC = () => {
   const { t } = useLanguage();
   const [uploading, setUploading] = useState(false);
   const [uploaded, setUploaded] = useState<string[]>([]);
 
   const handleUpload = () => {
     setUploading(true);
     setTimeout(() => {
       setUploaded(prev => [...prev, `Document_${Date.now()}.pdf`]);
       setUploading(false);
     }, 2000);
   };
 
   return (
     <div className="min-h-screen flex flex-col bg-muted/30">
       <Header />
       <main className="flex-1 container max-w-2xl py-8">
         <h1 className="text-2xl font-display font-bold mb-6">{t('nav.documents')}</h1>
         <Card className="mb-6">
           <CardHeader><CardTitle>Upload Documents</CardTitle></CardHeader>
           <CardContent>
             <div className="border-2 border-dashed rounded-xl p-8 text-center">
               <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
               <p className="text-muted-foreground mb-4">Upload certificates for automatic OCR scanning</p>
               <Button onClick={handleUpload} disabled={uploading} className="gradient-primary">
                 {uploading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Processing...</> : <><Upload className="h-4 w-4 mr-2" />Upload Document</>}
               </Button>
             </div>
           </CardContent>
         </Card>
         {uploaded.length > 0 && (
           <Card>
             <CardHeader><CardTitle>Uploaded Documents</CardTitle></CardHeader>
             <CardContent className="space-y-3">
               {uploaded.map((doc, i) => (
                 <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                   <FileText className="h-5 w-5 text-primary" />
                   <span className="flex-1">{doc}</span>
                   <CheckCircle2 className="h-5 w-5 text-accent" />
                 </div>
               ))}
             </CardContent>
           </Card>
         )}
       </main>
       <Footer />
     </div>
   );
 };
 
 export default Documents;