 import React from 'react';
 import { Card, CardContent } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { useLanguage } from '@/contexts/LanguageContext';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import { Bell, Calendar, Sparkles, AlertCircle } from 'lucide-react';
 
 const mockNotifications = [
   { id: '1', type: 'new_scheme', title: 'New Scheme Available', message: 'PM Vishwakarma Yojana launched for traditional artisans', priority: 'high', read: false, createdAt: '2024-01-15' },
   { id: '2', type: 'deadline_reminder', title: 'Application Deadline', message: 'Post Matric Scholarship deadline in 7 days', priority: 'medium', read: false, createdAt: '2024-01-14' },
   { id: '3', type: 'eligibility_update', title: 'You May Be Eligible', message: 'Based on your profile, check out PMEGP for entrepreneurs', priority: 'low', read: true, createdAt: '2024-01-10' },
 ];
 
 const Notifications: React.FC = () => {
   const { t } = useLanguage();
   const icons = { new_scheme: Sparkles, deadline_reminder: Calendar, eligibility_update: AlertCircle };
 
   return (
     <div className="min-h-screen flex flex-col bg-muted/30">
       <Header />
       <main className="flex-1 container max-w-2xl py-8">
         <h1 className="text-2xl font-display font-bold mb-6 flex items-center gap-2"><Bell className="h-6 w-6" />{t('nav.notifications')}</h1>
         <div className="space-y-4">
           {mockNotifications.map((notif) => {
             const Icon = icons[notif.type as keyof typeof icons] || Bell;
             return (
               <Card key={notif.id} className={`${!notif.read ? 'border-l-4 border-l-secondary' : ''}`}>
                 <CardContent className="p-4 flex gap-4">
                   <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${notif.priority === 'high' ? 'bg-destructive/10 text-destructive' : notif.priority === 'medium' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
                     <Icon className="h-5 w-5" />
                   </div>
                   <div className="flex-1">
                     <div className="flex items-center justify-between mb-1">
                       <h3 className="font-semibold">{notif.title}</h3>
                       <span className="text-xs text-muted-foreground">{notif.createdAt}</span>
                     </div>
                     <p className="text-sm text-muted-foreground">{notif.message}</p>
                   </div>
                 </CardContent>
               </Card>
             );
           })}
         </div>
       </main>
       <Footer />
     </div>
   );
 };
 
 export default Notifications;