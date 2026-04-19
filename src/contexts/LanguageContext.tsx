import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'English' | 'Hindi' | 'Marathi' | 'Gujarati';

const LOCALE_TO_LANGUAGE: Record<string, Language> = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  gu: 'Gujarati',
};

const LANGUAGE_TO_LOCALE: Record<Language, string> = {
  English: 'en',
  Hindi: 'hi',
  Marathi: 'mr',
  Gujarati: 'gu',
};

function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'English';
  try {
    const saved = localStorage.getItem('24x7nyaya.lang');
    if (saved && saved in LANGUAGE_TO_LOCALE) return saved as Language;
  } catch {}
  const candidates = [navigator.language, ...(navigator.languages || [])];
  for (const bcp of candidates) {
    if (!bcp) continue;
    const primary = bcp.toLowerCase().split('-')[0];
    if (LOCALE_TO_LANGUAGE[primary]) return LOCALE_TO_LANGUAGE[primary];
  }
  return 'English';
}

type Translations = Record<string, string>;

const translations: Record<Language, Translations> = {
  English: {
    "nav.findLawyer": "Find a Lawyer",
    "nav.knowledgeHub": "Knowledge Hub",
    "nav.forLawyers": "For Lawyers",
    "nav.dashboard": "Dashboard",
    "nav.signOut": "Sign Out",
    "hero.systemOnline": "24x7NYAYA System Online",
    "hero.subtitle": "India's leading digital platform providing Legal Assistance, Legal Consultations & Counselling.",
    "hero.bridge": "Bridging the gap between law seekers and law advisors.",
    "hero.cta": "Find Legal Help",
    "hero.scroll": "Scroll to Explore",
    "stats.impact": "Platform Impact",
    "stats.clients": "Clients Helped",
    "stats.reached": "People Reached",
    "stats.lawyers": "Expert Lawyers",
    "stats.global": "Global",
    "stats.globalDesc": "India, UAE, US",
    "services.title": "Our Services",
    "services.litigation": "Litigation Support",
    "services.litigationDesc": "Comprehensive support for legal proceedings and court cases.",
    "services.immigration": "Immigration",
    "services.immigrationDesc": "Expert guidance on visa, residency, and citizenship matters.",
    "services.research": "Legal Research",
    "services.researchDesc": "In-depth analysis and research for complex legal scenarios.",
    "services.drafting": "Contract Drafting",
    "services.draftingDesc": "Professional drafting, review, and management of legal contracts.",
    "services.dueDiligence": "Corporate Due Diligence",
    "services.dueDiligenceDesc": "Thorough investigation and auditing for business transactions.",
    "services.arbitration": "Arbitration & Mediation",
    "services.arbitrationDesc": "Alternative dispute resolution for quicker settlements.",
    "patron.title": "OUR CHIEF PATRON",
    "patron.name": "Honourable Mr. Justice K.G. Balakrishnan",
    "patron.role1": "Former Chief Justice of India",
    "patron.role2": "Former Chairman of National Human Rights Commission",
    "mission.title": "Our Mission",
    "mission.desc": "To build the world's most convenient, secure and cost-effective legal solution platform.",
    "vision.title": "Our Vision",
    "vision.desc": "To bring the legal system under one roof so that with a click of button people, internationally and domestically, can redress their queries through their chosen attorneys.",
    "laws.title": "Laws You Must Know",
    "gallery.title": "Photo Gallery",
    "segments.title": "Who We Serve",
    "segments.subtitle": "Catering to a diverse range of clients across sectors.",
    "segments.individuals": "Individuals",
    "segments.individualsDesc": "Direct legal aid for personal matters and rights protection.",
    "segments.corporates": "Corporates & PSUs",
    "segments.corporatesDesc": "Legal solutions for businesses, Govt bodies, and NGOs.",
    "segments.interns": "Law Interns",
    "segments.internsDesc": "Registration and placement assistance for budding lawyers.",
    "segments.getHelp": "Get Help",
    "segments.solutions": "Solutions",
    "segments.joinUs": "Join Us",
    "const.badge": "Supreme Law of the Land",
    "const.title": "Indian Constitution – Summary",
    "const.desc": "The Constitution of India, adopted on 26 November 1949 and enforced on 26 January 1950, is the supreme law of the country. It lays down the framework that defines political principles, establishes government institutions, and outlines the rights and duties of citizens.",
    "cta.title": "Simpler. Quicker. Resourceful.",
    "cta.desc": "Join the platform that has already helped over 60,000 clients find their path to justice.",
    "cta.button": "Find a Lawyer",
    "footer.tagline": "24X7Nyaya - Make Every Nyaya Counts",
    "footer.description": "We aim to provide a platform to the plethora of Legal advisors and people seeking legal aid. We are here to know your opinion and connect like-minded people. We are glad that we will be able to highlight all sides of subject matter to give wider perspective. Be You and Be with Us!",
    "footer.mainOffice": "MAIN OFFICE",
    "footer.location": "Gurugram, India",
    "footer.contactDetails": "CONTACT DETAILS",
    "footer.email": "info@24x7nyaya.com",
    "footer.phone": "+91 80903 02222",
    "footer.quickLinks": "QUICK LINKS",
    "footer.services": "Services",
    "footer.about": "About Us",
    "footer.contact": "Contact",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",
    "footer.disclaimer": "Disclaimer",
    "footer.rights": "© 2024 24x7NYAYA. All Rights Reserved."
  },
  Hindi: {
    "nav.findLawyer": "वकील खोजें",
    "nav.knowledgeHub": "ज्ञान केंद्र",
    "nav.forLawyers": "वकीलों के लिए",
    "nav.dashboard": "डैशबोर्ड",
    "nav.signOut": "साइन आउट",
    "hero.systemOnline": "24x7NYAYA सिस्टम ऑनलाइन",
    "hero.subtitle": "कानूनी सहायता, कानूनी परामर्श और काउंसलिंग प्रदान करने वाला भारत का अग्रणी डिजिटल प्लेटफॉर्म।",
    "hero.bridge": "कानून चाहने वालों और कानून सलाहकारों के बीच की खाई को पाटना।",
    "hero.cta": "कानूनी मदद खोजें",
    "hero.scroll": "अन्वेषण के लिए स्क्रॉल करें",
    "stats.impact": "प्लेटफ़ॉर्म प्रभाव",
    "stats.clients": "ग्राहकों की मदद की",
    "stats.reached": "लोगों तक पहुंचे",
    "stats.lawyers": "विशेषज्ञ वकील",
    "stats.global": "वैश्विक",
    "stats.globalDesc": "भारत, यूएई, अमेरिका",
    "services.title": "हमारी सेवाएँ",
    "services.litigation": "मुकदमेबाजी सहायता",
    "services.litigationDesc": "कानूनी कार्यवाही और अदालती मामलों के लिए व्यापक सहायता।",
    "services.immigration": "आप्रवासन",
    "services.immigrationDesc": "वीज़ा, निवास और नागरिकता मामलों पर विशेषज्ञ मार्गदर्शन।",
    "services.research": "कानूनी अनुसंधान",
    "services.researchDesc": "जटिल कानूनी परिदृश्यों के लिए गहन विश्लेषण और अनुसंधान।",
    "services.drafting": "अनुबंध प्रारूपण",
    "services.draftingDesc": "कानूनी अनुबंधों का पेशेवर प्रारूपण, समीक्षा और प्रबंधन।",
    "services.dueDiligence": "कॉर्पोरेट ड्यू डिलिजेंस",
    "services.dueDiligenceDesc": "व्यावसायिक लेनदेन के लिए गहन जांच और ऑडिटिंग।",
    "services.arbitration": "मध्यस्थता और सुलह",
    "services.arbitrationDesc": "त्वरित निपटान के लिए वैकल्पिक विवाद समाधान।",
    "patron.title": "हमारे मुख्य संरक्षक",
    "patron.name": "माननीय न्यायमूर्ति के.जी. बालकृष्णन",
    "patron.role1": "भारत के पूर्व मुख्य न्यायाधीश",
    "patron.role2": "राष्ट्रीय मानवाधिकार आयोग के पूर्व अध्यक्ष",
    "mission.title": "हमारा मिशन",
    "mission.desc": "दुनिया का सबसे सुविधाजनक, सुरक्षित और लागत प्रभावी कानूनी समाधान मंच बनाना।",
    "vision.title": "हमारी दृष्टि",
    "vision.desc": "कानूनी प्रणाली को एक छत के नीचे लाना ताकि एक बटन के क्लिक के साथ लोग, अंतरराष्ट्रीय और घरेलू स्तर पर, अपने चुने हुए वकीलों के माध्यम से अपने प्रश्नों का निवारण कर सकें।",
    "laws.title": "कानून जो आपको जानना चाहिए",
    "gallery.title": "फोटो गैलरी",
    "segments.title": "हम किसकी सेवा करते हैं",
    "segments.subtitle": "विभिन्न क्षेत्रों के विविध ग्राहकों की सेवा करना।",
    "segments.individuals": "व्यक्ति",
    "segments.individualsDesc": "व्यक्तिगत मामलों और अधिकारों की सुरक्षा के लिए प्रत्यक्ष कानूनी सहायता।",
    "segments.corporates": "कॉर्पोरेट्स और पीएसयू",
    "segments.corporatesDesc": "व्यवसायों, सरकारी निकायों और गैर सरकारी संगठनों के लिए कानूनी समाधान।",
    "segments.interns": "कानून इंटर्न",
    "segments.internsDesc": "उभरते वकीलों के लिए पंजीकरण और प्लेसमेंट सहायता।",
    "segments.getHelp": "मदद प्राप्त करें",
    "segments.solutions": "समाधान",
    "segments.joinUs": "हमसे जुड़ें",
    "const.badge": "देश का सर्वोच्च कानून",
    "const.title": "भारतीय संविधान - सारांश",
    "const.desc": "भारत का संविधान, 26 नवंबर 1949 को अपनाया गया और 26 जनवरी 1950 को लागू हुआ, यह देश का सर्वोच्च कानून है। यह राजनीतिक सिद्धांतों को परिभाषित करने वाले ढांचे को निर्धारण करता है, सरकारी संस्थानों की स्थापना करता है, और नागरिकों के अधिकारों और कर्तव्यों की रूपरेखा तैयार करता है।",
    "cta.title": "सरल। तेज़। साधन संपन्न।",
    "cta.desc": "उस प्लेटफ़ॉर्म से जुड़ें जिसने पहले ही 60,000 से अधिक ग्राहकों को न्याय का रास्ता खोजने में मदद की है।",
    "cta.button": "वकील खोजें",
    "footer.tagline": "24X7Nyaya - हर न्याय को गिनें",
    "footer.description": "हम कानूनी सलाहकारों और कानूनी सहायता चाहने वाले लोगों के लिए एक मंच प्रदान करने का लक्ष्य रखते हैं। हम आपकी राय जानने और समान विचारधारा वाले लोगों को जोड़ने के लिए यहां हैं।",
    "footer.mainOffice": "मुख्य कार्यालय",
    "footer.location": "गुरुग्राम, भारत",
    "footer.contactDetails": "संपर्क विवरण",
    "footer.email": "info@24x7nyaya.com",
    "footer.phone": "+91 80903 02222",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.services": "सेवाएं",
    "footer.about": "हमारे बारे में",
    "footer.contact": "संपर्क",
    "footer.terms": "नियम और शर्तें",
    "footer.privacy": "गोपनीयता नीति",
    "footer.disclaimer": "अस्वीकरण",
    "footer.rights": "© 2024 24x7NYAYA. सर्वाधिकार सुरक्षित।"
  },
  Marathi: {
    "nav.findLawyer": "वकील शोधा",
    "nav.knowledgeHub": "ज्ञान केंद्र",
    "nav.forLawyers": "वकिलांसाठी",
    "nav.dashboard": "डॅशबोर्ड",
    "nav.signOut": "साइन आउट",
    "hero.systemOnline": "24x7NYAYA सिस्टम ऑनलाइन",
    "hero.subtitle": "कायदेशीर सहाय्य, कायदेशीर सल्ला आणि समुपदेशन प्रदान करणारे भारताचे आघाडीचे डिजिटल प्लॅटफॉर्म.",
    "hero.bridge": "कायदा शोधणारे आणि कायदा सल्लागार यांच्यातील दरी कमी करणे.",
    "hero.cta": "कायदेशीर मदत मिळवा",
    "hero.scroll": "एक्सप्लोर करण्यासाठी स्क्रोल करा",
    "stats.impact": "प्लॅटफॉर्म प्रभाव",
    "stats.clients": "ग्राहकांना मदत केली",
    "stats.reached": "लोकांपर्यंत पोहोचलो",
    "stats.lawyers": "तज्ञ वकील",
    "stats.global": "जागतिक",
    "stats.globalDesc": "भारत, यूएई, यूएस",
    "services.title": "आमच्या सेवा",
    "services.litigation": "खटला समर्थन",
    "services.litigationDesc": "कायदेशीर कार्यवाही आणि न्यायालयीन खटल्यांसाठी सर्वसमावेशक समर्थन.",
    "services.immigration": "इमिग्रेशन",
    "services.immigrationDesc": "व्हिसा, रेसिडेन्सी आणि नागरित्व प्रकरणांवर तज्ञ मार्गदर्शन.",
    "services.research": "कानूनी संशोधन",
    "services.researchDesc": "जटिल कायदेशीर परिस्थितींसाठी सखोल विश्लेषण आणि संशोधन.",
    "services.drafting": "करार मसुदा",
    "services.draftingDesc": "कायदेशीर करारांचे व्यावसायिक मसुदा, पुनरावलोकन आणि व्यवस्थापन.",
    "services.dueDiligence": "कॉर्पोरेट ड्यू डिलिजन्स",
    "services.dueDiligenceDesc": "व्यापारी व्यवहारांसाठी सखोल तपास आणि ऑडिटिंग.",
    "services.arbitration": "लवाद आणि मध्यस्थी",
    "services.arbitrationDesc": "जलद निपटारा करण्यासाठी पर्यायी विवाद निराकरण.",
    "patron.title": "आमचे मुख्य आश्रयदाता",
    "patron.name": "माननीय न्यायमूर्ती के.जी. बालकृष्णन",
    "patron.role1": "भारताचे माजी सरन्यायाधीश",
    "patron.role2": "राष्ट्रव्यापी मानवाधिकार आयोगाचे माजी अध्यक्ष",
    "mission.title": "आमचे ध्येय",
    "mission.desc": "जगातील सर्वात सोयीस्कर, सुरक्षित आणि किफायतशीर कायदेशीर समाधान प्लॅटफॉर्म तयार करणे.",
    "vision.title": "आमची दृष्टी",
    "vision.desc": "कायदेशीर व्यवस्था एका छताखाली आणणे जेणेकरून एका बटणाच्या क्लिकवर लोक, आंतरराष्ट्रीय आणि देशांतर्गत, त्यांच्या निवडलेल्या वकिलांमार्फत त्यांच्या शंकांचे निरसन करू शकतील.",
    "laws.title": "कायदे जे तुम्हाला माहित असणे आवश्यक आहे",
    "gallery.title": "फोटो गॅलरी",
    "segments.title": "अमची सेवा कोणाची करतो",
    "segments.subtitle": "विविध क्षेत्रांतील विविध ग्राहकांना सेवा देणे.",
    "segments.individuals": "व्यक्ती",
    "segments.individualsDesc": "वैयक्तिक बाबी आणि हक्कांच्या संरक्षणासाठी थेट कायदेशीर मदत.",
    "segments.corporates": "कंपन्या आणि पीएसयू",
    "segments.corporatesDesc": "व्यवसाय, सरकारी संस्था आणि एनजीओसाठी कायदेशीर उपाय.",
    "segments.interns": "लॉ इंटर्न्स",
    "segments.internsDesc": "उभ्या वकिलांसाठी नोंदणी आणि प्लेसमेंट मदत.",
    "segments.getHelp": "मदत घ्या",
    "segments.solutions": "उपाय",
    "segments.joinUs": "आमच्याशी जोडा",
    "const.badge": "देशाचा सर्वोच्च कायदा",
    "const.title": "भारतीय संविधान - सारांश",
    "const.desc": "भारताचा संविधान, 26 नोव्हेंबर 1949 रोजी स्वीकारला गेला आणि 26 जानेवारी 1950 रोजी लागू केला गेला, हा देशाचा सर्वोच्च कायदा आहे. तो राजकीय तत्त्वांना परिभाषित करणारी चौकट मांडतो, सरकारी संस्था स्थापन करतो, आणि नागरिकांच्या हक्क आणि कर्तव्यांच्या कळीची रूपरेषा तयार करतो.",
    "cta.title": "सरळ. जलद. साधनसंपन्न.",
    "cta.desc": "या प्लॅटफॉर्ममध्ये सामील व्हा ज्याने आधीच 60,000 हून अधिक ग्राहकांना न्यायाचा मार्ग शोधण्यात मदत केली आहे.",
    "cta.button": "वकील शोधा",
    "footer.tagline": "24X7Nyaya - प्रत्येक न्याय मोजा",
    "footer.description": "आम्ही कायदेशीर सल्लागार आणि कायदेशीर मदत शोधणाऱ्या लोकांसाठी एक व्यासपीठ प्रदान करण्याचे उद्दिष्ट ठेवतो. आम्ही तुमचे मत जाणून घेण्यासाठी आणि समविचारी लोकांना जोडण्यासाठी येथे आहोत.",
    "footer.mainOffice": "मुख्य कार्यालय",
    "footer.location": "गुरुग्राम, भारत",
    "footer.contactDetails": "संपर्क तपशील",
    "footer.email": "info@24x7nyaya.com",
    "footer.phone": "+91 80903 02222",
    "footer.quickLinks": "द्रुत दुवे",
    "footer.services": "सेवाने",
    "footer.about": "आमच्या बद्दल",
    "footer.contact": "संपर्क करा",
    "footer.terms": "अटी व शर्ती",
    "footer.privacy": "गोपनीयता धोरण",
    "footer.disclaimer": "अस्वीकरण",
    "footer.rights": "© 2024 24x7NYAYA. सर्व अधिकार सुरक्षित."
  },
  Gujarati: {
    "nav.findLawyer": "વકીલ શોધો",
    "nav.knowledgeHub": "જ્ઞાન કેન્દ્ર",
    "nav.forLawyers": "વકીલો માટે",
    "nav.dashboard": "ડેશબોર્ડ",
    "nav.signOut": "સાઇન આઉટ",
    "hero.systemOnline": "24x7NYAYA સિસ્ટમ ઓનલાઇન",
    "hero.subtitle": "કાનૂની સહાય, કાનૂની પરામર્શ અને કાઉન્સેલિંગ પ્રદાન કરતું ભારતનું અગ્રણી ડિજિટલ પ્લેટફોર્મ.",
    "hero.bridge": "કાયદો શોધનારાઓ અને કાયદા સલાહકારો વચ્ચેનું અંતર દૂર કરવું.",
    "hero.cta": "કાનૂની મદદ શોધો",
    "hero.scroll": "અન્વેષણ માટે સ્ક્રોલ કરો",
    "stats.impact": "પ્લેટફોર્મ અસર",
    "stats.clients": "ગ્રાહકોને મદદ કરી",
    "stats.reached": "લોકો સુધી પહોંચ્યા",
    "stats.lawyers": "નિષ્ણાત વકીલો",
    "stats.global": "વૈશ્વિક",
    "stats.globalDesc": "ભારત, યુએઈ, યુએસ",
    "services.title": "અમારી સેવાઓ",
    "services.litigation": "લિટીગેશન સપોર્ટ",
    "services.litigationDesc": "કાયદેસર કાર્યવાહી અને કોર્ટ કેસો માટે વ્યાપક સમર્થન.",
    "services.immigration": "ઈમિગ્રેશન",
    "services.immigrationDesc": "વિઝા, નિવાસ અને નાગરિકત્વ કેસ પર નિષ્ણાત માર્ગદર્શન.",
    "services.research": "કાનૂની સંશોધન",
    "services.researchDesc": "જટિલ કાનૂની પરિદ્રશ્યો માટે ઊંડાણપૂર્વક વિશ્લેષણ અને સંશોધન.",
    "services.drafting": "કોન્ટ્રાક્ટ ડ્રાફ્ટિંગ",
    "services.draftingDesc": "કાયદેસર કરારોનું વ્યાવસાયિક ડ્રાફ્ટ, સમીક્ષા અને વ્યવસ્થાપન.",
    "services.dueDiligence": "કોર્પોરેટ ડ્યૂ ડિલિજન્સ",
    "services.dueDiligenceDesc": "વ્યાવસાયિક વ્યવહાર માટે ઊંડાણપૂર્વક તપાસ અને ઓડિટિંગ.",
    "services.arbitration": "લવાદ અને મધ્યસ્થતા",
    "services.arbitrationDesc": "ઝટપટ સમાધાન માટે વિકલ્પિક વિવાદ નિવારણ.",
    "patron.title": "અમેના મુખ્ય આશ્રયદાતા",
    "patron.name": "માનનીય ન્યાયમૂર્તિ કે.જી. બાલકૃષ્ણન",
    "patron.role1": "ભારતના મाजी સર્ફરચ ન્યાયમૂર્તિ",
    "patron.role2": "રાષ્ટ્રીય માનવાધિકાર કાર્યાલયના ભૂતપૂર્વ અધ્યક્ષ",
    "mission.title": "અમારું મિશન",
    "mission.desc": "વિશ્વનું સૌથી અનુકૂળ, સુરક્ષિત અને ખર્ચ-અસરકારક કાનૂની ઉકેલ પ્લેટફોર્મ બનાવવું.",
    "vision.title": "અમારી દ્રષ્ટિ",
    "vision.desc": "કાનૂની પ્રણાલીને એક છત નીચે લાવવી જેથી બટનના ક્લિક સાથે લોકો, આંતરરાષ્ટ્રીય અને સ્થાનિક રીતે, તેમના પસંદ કરેલા વકીલો દ્વારા તેમના પ્રશ્નોનું નિવારણ કરી શકે.",
    "laws.title": "કાયદા જે તમારે જાણવા જોઈએ",
    "gallery.title": "ફોટો ગેલેરી",
    "segments.title": "અમે કોની સેવા કરીએ છે",
    "segments.subtitle": "વિવિધ ક્ષેત્રના વિવિધ ગ્રાહકોને સેવા આપવી.",
    "segments.individuals": "વ્યક્તિઓ",
    "segments.individualsDesc": "વ્યક્તિગત મામલાઓ અને અધિકારો માટે સીધી કાનૂની સહાય.",
    "segments.corporates": "કોર્પોરેટ્સ અને પીએસયુ",
    "segments.corporatesDesc": "વ્યવસાયો, સરકારી સંસ્થાઓ અને એનજીઓ માટે કાનૂની સ્વૉલ્યુશન્સ.",
    "segments.interns": "લીગલ ઇન્ટર્ન્સ",
    "segments.internsDesc": "ઉભરતા વકીલો માટે નોંધણી અને પ્લેસમેન્ટ સહાય.",
    "segments.getHelp": "મદદ મેળવો",
    "segments.solutions": "ઉકેલો",
    "segments.joinUs": "અમારા સાથે જોડાઓ",
    "const.badge": "દેશનો સર્વોચ્ચ કાયદો",
    "const.title": "ભારતીય બંધારણ - સારાંશ",
    "const.desc": "ભારતનું બંધારણ, 26 નવેમ્બર 1949 ના રોજ સ્વીકારેલું અને 26 જાન્યુઆરી 1950 ને લાગુ પાડ્યું, તે દેશનો સર્વોચ્ચ કાયદો છે. આ રાજકીય સિદ્ધાંતો અને હક્કો અને ફરજો નું માળખું નિર્ધારિત કરે છે.",
    "cta.title": "સરળ. ઝડપી. સંસાધનયુક્ત.",
    "cta.desc": "તે પ્લેટફોર્મમાં જોડાઓ જેણે પહેલાથી જ 60,000 થી વધુ ગ્રાહકોને ન્યાયનો માર્ગ શોધવામાં મદદ કરી છે.",
    "cta.button": "વકીલ શોધો",
    "footer.tagline": "24X7Nyaya - દરેક ન્યાય ગણો",
    "footer.description": "અમે કાનૂની સલાહકારો અને કાનૂની સહાય શોધતા લોકો માટે એક પ્લેટફોર્મ પ્રદાન કરવાનો લક્ષ્ય રાખીએ છીએ. અમે તમારો અભિપ્રાય જાણવા અને સમાન વિચારધારા ધરાવતા લોકોને જોડવા માટે અહીં છીએ.",
    "footer.mainOffice": "મુખ્ય કાર્યાલય",
    "footer.location": "ગુરુગ્રામ, ભારત",
    "footer.contactDetails": "સંપર્ક વિગતો",
    "footer.email": "info@24x7nyaya.com",
    "footer.phone": "+91 80903 02222",
    "footer.quickLinks": "ઝડપી લિંક્સ",
    "footer.services": "સેવાઓ",
    "footer.about": "અમારા વિશે",
    "footer.contact": "સંપર્ક",
    "footer.terms": "નિયમો અને શરતો",
    "footer.privacy": "ગોપનીયતા નીતિ",
    "footer.disclaimer": "અસ્વીકરણ",
    "footer.rights": "© 2024 24x7NYAYA. સર્વાધિકાર સુરક્ષિત."
  }
};

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('English');

  useEffect(() => {
    const detected = detectLanguage();
    setLanguageState(detected);
    try { document.documentElement.lang = LANGUAGE_TO_LOCALE[detected] || 'en'; } catch {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem('24x7nyaya.lang', lang); } catch {}
    try { document.documentElement.lang = LANGUAGE_TO_LOCALE[lang] || 'en'; } catch {}
  };

  const t = (key: string) => {
    return translations[language][key] || translations.English[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === null) {
    // Return a default mock implementation to prevent crashes if used outside provider
    // This is useful for initial renders or error boundaries
    return {
      language: 'English',
      setLanguage: () => {},
      t: (key: string) => key
    };
  }
  return context;
}