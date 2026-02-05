 import { State, District } from '@/types';
 
 export const states: State[] = [
   { code: 'AN', name: 'Andaman and Nicobar Islands', nameTranslated: { ta: 'அந்தமான் நிக்கோபார் தீவுகள்' } },
   { code: 'AP', name: 'Andhra Pradesh', nameTranslated: { ta: 'ஆந்திர பிரதேசம்' } },
   { code: 'AR', name: 'Arunachal Pradesh', nameTranslated: { ta: 'அருணாச்சல பிரதேசம்' } },
   { code: 'AS', name: 'Assam', nameTranslated: { ta: 'அசாம்' } },
   { code: 'BR', name: 'Bihar', nameTranslated: { ta: 'பீகார்' } },
   { code: 'CH', name: 'Chandigarh', nameTranslated: { ta: 'சண்டிகர்' } },
   { code: 'CT', name: 'Chhattisgarh', nameTranslated: { ta: 'சத்தீஸ்கர்' } },
   { code: 'DL', name: 'Delhi', nameTranslated: { ta: 'டெல்லி' } },
   { code: 'GA', name: 'Goa', nameTranslated: { ta: 'கோவா' } },
   { code: 'GJ', name: 'Gujarat', nameTranslated: { ta: 'குஜராத்' } },
   { code: 'HR', name: 'Haryana', nameTranslated: { ta: 'ஹரியானா' } },
   { code: 'HP', name: 'Himachal Pradesh', nameTranslated: { ta: 'இமாச்சல பிரதேசம்' } },
   { code: 'JK', name: 'Jammu and Kashmir', nameTranslated: { ta: 'ஜம்மு காஷ்மீர்' } },
   { code: 'JH', name: 'Jharkhand', nameTranslated: { ta: 'ஜார்கண்ட்' } },
   { code: 'KA', name: 'Karnataka', nameTranslated: { ta: 'கர்நாடகா' } },
   { code: 'KL', name: 'Kerala', nameTranslated: { ta: 'கேரளா' } },
   { code: 'MP', name: 'Madhya Pradesh', nameTranslated: { ta: 'மத்திய பிரதேசம்' } },
   { code: 'MH', name: 'Maharashtra', nameTranslated: { ta: 'மகாராஷ்டிரா' } },
   { code: 'MN', name: 'Manipur', nameTranslated: { ta: 'மணிப்பூர்' } },
   { code: 'ML', name: 'Meghalaya', nameTranslated: { ta: 'மேகாலயா' } },
   { code: 'MZ', name: 'Mizoram', nameTranslated: { ta: 'மிசோரம்' } },
   { code: 'NL', name: 'Nagaland', nameTranslated: { ta: 'நாகாலாந்து' } },
   { code: 'OR', name: 'Odisha', nameTranslated: { ta: 'ஒடிசா' } },
   { code: 'PY', name: 'Puducherry', nameTranslated: { ta: 'புதுச்சேரி' } },
   { code: 'PB', name: 'Punjab', nameTranslated: { ta: 'பஞ்சாப்' } },
   { code: 'RJ', name: 'Rajasthan', nameTranslated: { ta: 'ராஜஸ்தான்' } },
   { code: 'SK', name: 'Sikkim', nameTranslated: { ta: 'சிக்கிம்' } },
   { code: 'TN', name: 'Tamil Nadu', nameTranslated: { ta: 'தமிழ்நாடு' } },
   { code: 'TG', name: 'Telangana', nameTranslated: { ta: 'தெலங்கானா' } },
   { code: 'TR', name: 'Tripura', nameTranslated: { ta: 'திரிபுரா' } },
   { code: 'UP', name: 'Uttar Pradesh', nameTranslated: { ta: 'உத்தர பிரதேசம்' } },
   { code: 'UK', name: 'Uttarakhand', nameTranslated: { ta: 'உத்தராகண்ட்' } },
   { code: 'WB', name: 'West Bengal', nameTranslated: { ta: 'மேற்கு வங்காளம்' } },
 ];
 
 export const districts: District[] = [
   // Tamil Nadu Districts
   { code: 'CHN', name: 'Chennai', nameTranslated: { ta: 'சென்னை' }, stateCode: 'TN' },
   { code: 'CBE', name: 'Coimbatore', nameTranslated: { ta: 'கோயம்புத்தூர்' }, stateCode: 'TN' },
   { code: 'MDU', name: 'Madurai', nameTranslated: { ta: 'மதுரை' }, stateCode: 'TN' },
   { code: 'TRY', name: 'Tiruchirappalli', nameTranslated: { ta: 'திருச்சிராப்பள்ளி' }, stateCode: 'TN' },
   { code: 'SLM', name: 'Salem', nameTranslated: { ta: 'சேலம்' }, stateCode: 'TN' },
   { code: 'TVM', name: 'Tirunelveli', nameTranslated: { ta: 'திருநெல்வேலி' }, stateCode: 'TN' },
   { code: 'ERD', name: 'Erode', nameTranslated: { ta: 'ஈரோடு' }, stateCode: 'TN' },
   { code: 'VLR', name: 'Vellore', nameTranslated: { ta: 'வேலூர்' }, stateCode: 'TN' },
   { code: 'TJR', name: 'Thanjavur', nameTranslated: { ta: 'தஞ்சாவூர்' }, stateCode: 'TN' },
   { code: 'KCH', name: 'Kanchipuram', nameTranslated: { ta: 'காஞ்சிபுரம்' }, stateCode: 'TN' },
   // Delhi Districts
   { code: 'NDL', name: 'New Delhi', nameTranslated: { ta: 'புது டெல்லி' }, stateCode: 'DL' },
   { code: 'CDL', name: 'Central Delhi', nameTranslated: { ta: 'மத்திய டெல்லி' }, stateCode: 'DL' },
   { code: 'SDL', name: 'South Delhi', nameTranslated: { ta: 'தெற்கு டெல்லி' }, stateCode: 'DL' },
   // Maharashtra Districts
   { code: 'MUM', name: 'Mumbai', nameTranslated: { ta: 'மும்பை' }, stateCode: 'MH' },
   { code: 'PUN', name: 'Pune', nameTranslated: { ta: 'புனே' }, stateCode: 'MH' },
   { code: 'NAG', name: 'Nagpur', nameTranslated: { ta: 'நாக்பூர்' }, stateCode: 'MH' },
   // Karnataka Districts
   { code: 'BLR', name: 'Bengaluru', nameTranslated: { ta: 'பெங்களூரு' }, stateCode: 'KA' },
   { code: 'MYS', name: 'Mysuru', nameTranslated: { ta: 'மைசூர்' }, stateCode: 'KA' },
   // Andhra Pradesh Districts
   { code: 'VJW', name: 'Vijayawada', nameTranslated: { ta: 'விஜயவாடா' }, stateCode: 'AP' },
   { code: 'VSK', name: 'Visakhapatnam', nameTranslated: { ta: 'விசாகப்பட்டினம்' }, stateCode: 'AP' },
 ];
 
 export const getDistrictsByState = (stateCode: string): District[] => {
   return districts.filter(d => d.stateCode === stateCode);
 };
 
 export const getStateByCode = (code: string): State | undefined => {
   return states.find(s => s.code === code);
 };