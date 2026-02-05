 import React, { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { Switch } from '@/components/ui/switch';
 import { useLanguage } from '@/contexts/LanguageContext';
 import { UserProfile } from '@/types';
 import { states, getDistrictsByState } from '@/data/locations';
 import Header from '@/components/Header';
 import Footer from '@/components/Footer';
 import { 
   User, 
   Calendar, 
   Wallet, 
   GraduationCap, 
   Briefcase, 
   MapPin,
   CheckCircle2,
   ArrowRight,
   Loader2
 } from 'lucide-react';
 
 const Eligibility: React.FC = () => {
   const { language, t } = useLanguage();
   const navigate = useNavigate();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [step, setStep] = useState(1);
   
   const [profile, setProfile] = useState<Partial<UserProfile>>({
     name: '',
     age: 25,
     gender: 'male',
     income: 100000,
     education: 'graduate',
     occupation: 'salaried',
     category: 'general',
     state: '',
     district: '',
     maritalStatus: 'single',
     disability: false,
     bplCard: false,
     aadhaarVerified: true,
     language: language,
   });
 
   const districts = profile.state ? getDistrictsByState(profile.state) : [];
 
   const handleInputChange = (field: keyof UserProfile, value: any) => {
     setProfile(prev => ({ ...prev, [field]: value }));
     if (field === 'state') {
       setProfile(prev => ({ ...prev, district: '' }));
     }
   };
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     // Store profile in sessionStorage for results page
     sessionStorage.setItem('userProfile', JSON.stringify(profile));
     
     setTimeout(() => {
       navigate('/results');
     }, 1500);
   };
 
   const nextStep = () => {
     if (step < 3) setStep(step + 1);
   };
 
   const prevStep = () => {
     if (step > 1) setStep(step - 1);
   };
 
   return (
     <div className="min-h-screen flex flex-col bg-muted/30">
       <Header />
       
       <main className="flex-1 py-8">
         <div className="container max-w-3xl">
           {/* Progress Steps */}
           <div className="mb-8">
             <div className="flex items-center justify-center gap-4">
               {[1, 2, 3].map((s) => (
                 <React.Fragment key={s}>
                   <div className={`
                     flex items-center justify-center h-10 w-10 rounded-full font-semibold
                     ${step >= s ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                   `}>
                     {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                   </div>
                   {s < 3 && (
                     <div className={`h-1 w-16 rounded ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                   )}
                 </React.Fragment>
               ))}
             </div>
             <div className="flex justify-center gap-8 mt-2 text-sm text-muted-foreground">
               <span className={step >= 1 ? 'text-primary font-medium' : ''}>Personal</span>
               <span className={step >= 2 ? 'text-primary font-medium' : ''}>Details</span>
               <span className={step >= 3 ? 'text-primary font-medium' : ''}>Location</span>
             </div>
           </div>
 
           <Card className="shadow-card">
             <CardHeader className="text-center">
               <CardTitle className="text-2xl font-display">{t('nav.eligibility')}</CardTitle>
               <CardDescription>
                 Fill in your details to find schemes you are eligible for
               </CardDescription>
             </CardHeader>
 
             <CardContent>
               <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Step 1: Personal Info */}
                 {step === 1 && (
                   <div className="space-y-6 animate-fade-in">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="name" className="flex items-center gap-2">
                           <User className="h-4 w-4" />
                           {t('form.name')}
                         </Label>
                         <Input
                           id="name"
                           value={profile.name}
                           onChange={(e) => handleInputChange('name', e.target.value)}
                           placeholder="Enter your full name"
                           className="input-focus"
                         />
                       </div>
 
                       <div className="space-y-2">
                         <Label htmlFor="age" className="flex items-center gap-2">
                           <Calendar className="h-4 w-4" />
                           {t('form.age')}
                         </Label>
                         <Input
                           id="age"
                           type="number"
                           min={1}
                           max={120}
                           value={profile.age}
                           onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                           className="input-focus"
                         />
                       </div>
                     </div>
 
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label>{t('form.gender')}</Label>
                         <Select value={profile.gender} onValueChange={(v) => handleInputChange('gender', v)}>
                           <SelectTrigger className="input-focus">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="male">{t('form.gender.male')}</SelectItem>
                             <SelectItem value="female">{t('form.gender.female')}</SelectItem>
                             <SelectItem value="other">{t('form.gender.other')}</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
 
                       <div className="space-y-2">
                         <Label>{t('form.maritalStatus')}</Label>
                         <Select value={profile.maritalStatus} onValueChange={(v) => handleInputChange('maritalStatus', v)}>
                           <SelectTrigger className="input-focus">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="single">{t('marital.single')}</SelectItem>
                             <SelectItem value="married">{t('marital.married')}</SelectItem>
                             <SelectItem value="divorced">{t('marital.divorced')}</SelectItem>
                             <SelectItem value="widowed">{t('marital.widowed')}</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
 
                     <div className="space-y-2">
                       <Label htmlFor="income" className="flex items-center gap-2">
                         <Wallet className="h-4 w-4" />
                         {t('form.income')}
                       </Label>
                       <Input
                         id="income"
                         type="number"
                         min={0}
                         step={10000}
                         value={profile.income}
                         onChange={(e) => handleInputChange('income', parseInt(e.target.value))}
                         className="input-focus"
                       />
                       <p className="text-xs text-muted-foreground">
                         Annual family income from all sources
                       </p>
                     </div>
                   </div>
                 )}
 
                 {/* Step 2: Education & Occupation */}
                 {step === 2 && (
                   <div className="space-y-6 animate-fade-in">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label className="flex items-center gap-2">
                           <GraduationCap className="h-4 w-4" />
                           {t('form.education')}
                         </Label>
                         <Select value={profile.education} onValueChange={(v) => handleInputChange('education', v)}>
                           <SelectTrigger className="input-focus">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="below_10th">{t('education.below_10th')}</SelectItem>
                             <SelectItem value="10th_pass">{t('education.10th_pass')}</SelectItem>
                             <SelectItem value="12th_pass">{t('education.12th_pass')}</SelectItem>
                             <SelectItem value="graduate">{t('education.graduate')}</SelectItem>
                             <SelectItem value="post_graduate">{t('education.post_graduate')}</SelectItem>
                             <SelectItem value="professional">{t('education.professional')}</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
 
                       <div className="space-y-2">
                         <Label className="flex items-center gap-2">
                           <Briefcase className="h-4 w-4" />
                           {t('form.occupation')}
                         </Label>
                         <Select value={profile.occupation} onValueChange={(v) => handleInputChange('occupation', v)}>
                           <SelectTrigger className="input-focus">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="student">{t('occupation.student')}</SelectItem>
                             <SelectItem value="farmer">{t('occupation.farmer')}</SelectItem>
                             <SelectItem value="self_employed">{t('occupation.self_employed')}</SelectItem>
                             <SelectItem value="salaried">{t('occupation.salaried')}</SelectItem>
                             <SelectItem value="unemployed">{t('occupation.unemployed')}</SelectItem>
                             <SelectItem value="homemaker">{t('occupation.homemaker')}</SelectItem>
                             <SelectItem value="retired">{t('occupation.retired')}</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
 
                     <div className="space-y-2">
                       <Label>{t('form.category')}</Label>
                       <Select value={profile.category} onValueChange={(v) => handleInputChange('category', v)}>
                         <SelectTrigger className="input-focus">
                           <SelectValue />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="general">{t('category.general')}</SelectItem>
                           <SelectItem value="obc">{t('category.obc')}</SelectItem>
                           <SelectItem value="sc">{t('category.sc')}</SelectItem>
                           <SelectItem value="st">{t('category.st')}</SelectItem>
                           <SelectItem value="ews">{t('category.ews')}</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
 
                     <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                       <div className="flex items-center justify-between">
                         <Label htmlFor="disability" className="cursor-pointer">
                           {t('form.disability')}
                         </Label>
                         <Switch
                           id="disability"
                           checked={profile.disability}
                           onCheckedChange={(v) => handleInputChange('disability', v)}
                         />
                       </div>
 
                       <div className="flex items-center justify-between">
                         <Label htmlFor="bplCard" className="cursor-pointer">
                           {t('form.bplCard')}
                         </Label>
                         <Switch
                           id="bplCard"
                           checked={profile.bplCard}
                           onCheckedChange={(v) => handleInputChange('bplCard', v)}
                         />
                       </div>
                     </div>
                   </div>
                 )}
 
                 {/* Step 3: Location */}
                 {step === 3 && (
                   <div className="space-y-6 animate-fade-in">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label className="flex items-center gap-2">
                           <MapPin className="h-4 w-4" />
                           {t('form.state')}
                         </Label>
                         <Select value={profile.state} onValueChange={(v) => handleInputChange('state', v)}>
                           <SelectTrigger className="input-focus">
                             <SelectValue placeholder="Select state" />
                           </SelectTrigger>
                           <SelectContent>
                             {states.map((state) => (
                               <SelectItem key={state.code} value={state.name}>
                                 {language === 'ta' && state.nameTranslated?.ta 
                                   ? state.nameTranslated.ta 
                                   : state.name}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       </div>
 
                       <div className="space-y-2">
                         <Label>{t('form.district')}</Label>
                         <Select 
                           value={profile.district} 
                           onValueChange={(v) => handleInputChange('district', v)}
                           disabled={!profile.state}
                         >
                           <SelectTrigger className="input-focus">
                             <SelectValue placeholder="Select district" />
                           </SelectTrigger>
                           <SelectContent>
                             {districts.map((district) => (
                               <SelectItem key={district.code} value={district.name}>
                                 {language === 'ta' && district.nameTranslated?.ta 
                                   ? district.nameTranslated.ta 
                                   : district.name}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
 
                     {/* Summary */}
                     <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                       <h4 className="font-semibold text-accent mb-2">Profile Summary</h4>
                       <div className="grid grid-cols-2 gap-2 text-sm">
                         <span className="text-muted-foreground">Age:</span>
                         <span>{profile.age} years</span>
                         <span className="text-muted-foreground">Gender:</span>
                         <span className="capitalize">{profile.gender}</span>
                         <span className="text-muted-foreground">Income:</span>
                         <span>₹{profile.income?.toLocaleString()}/year</span>
                         <span className="text-muted-foreground">Category:</span>
                         <span className="uppercase">{profile.category}</span>
                         <span className="text-muted-foreground">Occupation:</span>
                         <span className="capitalize">{profile.occupation?.replace('_', ' ')}</span>
                       </div>
                     </div>
                   </div>
                 )}
 
                 {/* Navigation Buttons */}
                 <div className="flex justify-between pt-4">
                   {step > 1 ? (
                     <Button type="button" variant="outline" onClick={prevStep}>
                       {t('back')}
                     </Button>
                   ) : (
                     <div />
                   )}
 
                   {step < 3 ? (
                     <Button type="button" onClick={nextStep} className="gradient-primary">
                       {t('next')}
                       <ArrowRight className="h-4 w-4 ml-2" />
                     </Button>
                   ) : (
                     <Button 
                       type="submit" 
                       className="gradient-secondary text-secondary-foreground shadow-glow"
                       disabled={isSubmitting || !profile.state}
                     >
                       {isSubmitting ? (
                         <>
                           <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                           Finding Schemes...
                         </>
                       ) : (
                         <>
                           <CheckCircle2 className="h-4 w-4 mr-2" />
                           {t('form.submit')}
                         </>
                       )}
                     </Button>
                   )}
                 </div>
               </form>
             </CardContent>
           </Card>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Eligibility;