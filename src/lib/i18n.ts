// Internationalization (i18n) configuration for JeevanSetu

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.consult': 'Consult',
      'nav.medicines': 'Medicines',
      'nav.symptoms': 'Symptoms',
      'nav.records': 'Records',
      'nav.admin': 'Admin',
      
      // Dashboard
      'dashboard.title': 'Rural Health Dashboard',
      'dashboard.subtitle': 'Multilingual telemedicine platform for rural healthcare access',
      'dashboard.activeConsultations': 'Active Consultations',
      'dashboard.patientsServed': 'Patients Served Today',
      'dashboard.offlineRecords': 'Offline Records Synced',
      'dashboard.medicineAvailability': 'Medicine Availability',
      
      // Telemedicine
      'telemedicine.title': 'Video Consultations',
      'telemedicine.startConsultation': 'Start New Consultation',
      'telemedicine.recentConsultations': 'Recent Consultations',
      'telemedicine.active': 'Active',
      'telemedicine.completed': 'Completed',
      'telemedicine.scheduled': 'Scheduled',
      
      // AI Symptom Checker
      'symptoms.title': 'AI Symptom Checker',
      'symptoms.subtitle': 'Optimized for low-bandwidth areas and multilingual input',
      'symptoms.describeSymptoms': 'Describe your symptoms',
      'symptoms.analyze': 'Analyze',
      'symptoms.clear': 'Clear',
      'symptoms.lowDataMode': 'Low Data Mode',
      'symptoms.possibleConditions': 'Possible Conditions',
      'symptoms.nextSteps': 'Next Steps',
      'symptoms.severity': {
        'low': 'Low',
        'moderate': 'Moderate',
        'high': 'High',
        'critical': 'Critical'
      },
      
      // Medicine Availability
      'medicines.title': 'Medicine Availability',
      'medicines.subtitle': 'Real-time stock updates at nearby pharmacies',
      'medicines.filters': 'Filters',
      'medicines.search': 'Search medicine or pharmacy',
      'medicines.navigate': 'Navigate',
      'medicines.stock': {
        'high': 'High',
        'medium': 'Medium',
        'low': 'Low'
      },
      
      // Emergency
      'emergency.title': 'Emergency Services',
      'emergency.sos': 'SOS',
      'emergency.callAmbulance': 'Call Ambulance',
      'emergency.nearestHospital': 'Nearest Hospital',
      'emergency.emergencyNumber': 'Emergency Number',
      
      // Admin Dashboard
      'admin.title': 'Admin Dashboard',
      'admin.subtitle': 'Comprehensive overview of JeevanSetu platform analytics',
      'admin.accessDenied': 'Access Denied',
      'admin.noPermission': 'You don\'t have permission to access the admin dashboard.',
      'admin.refreshData': 'Refresh Data',
      'admin.consultationTrends': 'Consultation Trends',
      'admin.medicineStock': 'Medicine Stock Levels',
      'admin.outbreakPatterns': 'Outbreak Patterns',
      'admin.recentActivity': 'Recent Activity',
      
      // Chatbot
      'chatbot.title': 'Health Assistant',
      'chatbot.placeholder': 'Type your message...',
      'chatbot.thinking': 'Thinking...',
      'chatbot.clearChat': 'Clear chat',
      'chatbot.language': 'Language',
      'chatbot.greeting': 'Hi! I\'m your health assistant. How can I help you today?',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.cancel': 'Cancel',
      'common.save': 'Save',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.view': 'View',
      'common.close': 'Close',
      'common.online': 'Online',
      'common.offline': 'Offline',
      'common.offlineMode': 'Offline Mode'
    }
  },
  hi: {
    translation: {
      // Navigation
      'nav.home': 'होम',
      'nav.consult': 'परामर्श',
      'nav.medicines': 'दवाएं',
      'nav.symptoms': 'लक्षण',
      'nav.records': 'रिकॉर्ड',
      'nav.admin': 'एडमिन',
      
      // Dashboard
      'dashboard.title': 'ग्रामीण स्वास्थ्य डैशबोर्ड',
      'dashboard.subtitle': 'ग्रामीण स्वास्थ्य सेवा तक पहुंच के लिए बहुभाषी टेलीमेडिसिन प्लेटफॉर्म',
      'dashboard.activeConsultations': 'सक्रिय परामर्श',
      'dashboard.patientsServed': 'आज सेवित रोगी',
      'dashboard.offlineRecords': 'ऑफलाइन रिकॉर्ड सिंक',
      'dashboard.medicineAvailability': 'दवा उपलब्धता',
      
      // Telemedicine
      'telemedicine.title': 'वीडियो परामर्श',
      'telemedicine.startConsultation': 'नया परामर्श शुरू करें',
      'telemedicine.recentConsultations': 'हाल के परामर्श',
      'telemedicine.active': 'सक्रिय',
      'telemedicine.completed': 'पूर्ण',
      'telemedicine.scheduled': 'निर्धारित',
      
      // AI Symptom Checker
      'symptoms.title': 'AI लक्षण जांचकर्ता',
      'symptoms.subtitle': 'कम बैंडविड्थ क्षेत्रों और बहुभाषी इनपुट के लिए अनुकूलित',
      'symptoms.describeSymptoms': 'अपने लक्षणों का वर्णन करें',
      'symptoms.analyze': 'विश्लेषण करें',
      'symptoms.clear': 'साफ करें',
      'symptoms.lowDataMode': 'कम डेटा मोड',
      'symptoms.possibleConditions': 'संभावित स्थितियां',
      'symptoms.nextSteps': 'अगले कदम',
      'symptoms.severity': {
        'low': 'कम',
        'moderate': 'मध्यम',
        'high': 'उच्च',
        'critical': 'गंभीर'
      },
      
      // Medicine Availability
      'medicines.title': 'दवा उपलब्धता',
      'medicines.subtitle': 'पास के फार्मेसियों में रियल-टाइम स्टॉक अपडेट',
      'medicines.filters': 'फिल्टर',
      'medicines.search': 'दवा या फार्मेसी खोजें',
      'medicines.navigate': 'नेविगेट करें',
      'medicines.stock': {
        'high': 'उच्च',
        'medium': 'मध्यम',
        'low': 'कम'
      },
      
      // Emergency
      'emergency.title': 'आपातकालीन सेवाएं',
      'emergency.sos': 'SOS',
      'emergency.callAmbulance': 'एम्बुलेंस बुलाएं',
      'emergency.nearestHospital': 'निकटतम अस्पताल',
      'emergency.emergencyNumber': 'आपातकालीन नंबर',
      
      // Admin Dashboard
      'admin.title': 'एडमिन डैशबोर्ड',
      'admin.subtitle': 'JeevanSetu प्लेटफॉर्म एनालिटिक्स का व्यापक अवलोकन',
      'admin.accessDenied': 'पहुंच अस्वीकृत',
      'admin.noPermission': 'आपके पास एडमिन डैशबोर्ड तक पहुंच की अनुमति नहीं है।',
      'admin.refreshData': 'डेटा रिफ्रेश करें',
      'admin.consultationTrends': 'परामर्श रुझान',
      'admin.medicineStock': 'दवा स्टॉक स्तर',
      'admin.outbreakPatterns': 'प्रकोप पैटर्न',
      'admin.recentActivity': 'हाल की गतिविधि',
      
      // Chatbot
      'chatbot.title': 'स्वास्थ्य सहायक',
      'chatbot.placeholder': 'अपना संदेश टाइप करें...',
      'chatbot.thinking': 'सोच रहा है...',
      'chatbot.clearChat': 'चैट साफ करें',
      'chatbot.language': 'भाषा',
      'chatbot.greeting': 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
      
      // Common
      'common.loading': 'लोड हो रहा है...',
      'common.error': 'त्रुटि',
      'common.success': 'सफलता',
      'common.cancel': 'रद्द करें',
      'common.save': 'सहेजें',
      'common.delete': 'हटाएं',
      'common.edit': 'संपादित करें',
      'common.view': 'देखें',
      'common.close': 'बंद करें',
      'common.online': 'ऑनलाइन',
      'common.offline': 'ऑफलाइन',
      'common.offlineMode': 'ऑफलाइन मोड'
    }
  },
  pa: {
    translation: {
      // Navigation
      'nav.home': 'ਘਰ',
      'nav.consult': 'ਸਲਾਹ',
      'nav.medicines': 'ਦਵਾਈਆਂ',
      'nav.symptoms': 'ਲੱਛਣ',
      'nav.records': 'ਰਿਕਾਰਡ',
      'nav.admin': 'ਐਡਮਿਨ',
      
      // Dashboard
      'dashboard.title': 'ਪੇਂਡੂ ਸਿਹਤ ਡੈਸ਼ਬੋਰਡ',
      'dashboard.subtitle': 'ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾ ਪਹੁੰਚ ਲਈ ਬਹੁਭਾਸ਼ੀ ਟੈਲੀਮੈਡੀਸਨ ਪਲੇਟਫਾਰਮ',
      'dashboard.activeConsultations': 'ਸਰਗਰਮ ਸਲਾਹ',
      'dashboard.patientsServed': 'ਅੱਜ ਸੇਵਾ ਕੀਤੇ ਮਰੀਜ਼',
      'dashboard.offlineRecords': 'ਆਫਲਾਈਨ ਰਿਕਾਰਡ ਸਿੰਕ',
      'dashboard.medicineAvailability': 'ਦਵਾਈ ਉਪਲਬਧਤਾ',
      
      // Telemedicine
      'telemedicine.title': 'ਵੀਡੀਓ ਸਲਾਹ',
      'telemedicine.startConsultation': 'ਨਵੀਂ ਸਲਾਹ ਸ਼ੁਰੂ ਕਰੋ',
      'telemedicine.recentConsultations': 'ਹਾਲੀਆ ਸਲਾਹ',
      'telemedicine.active': 'ਸਰਗਰਮ',
      'telemedicine.completed': 'ਪੂਰਾ',
      'telemedicine.scheduled': 'ਨਿਰਧਾਰਿਤ',
      
      // AI Symptom Checker
      'symptoms.title': 'AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
      'symptoms.subtitle': 'ਘੱਟ ਬੈਂਡਵਿਡਥ ਖੇਤਰਾਂ ਅਤੇ ਬਹੁਭਾਸ਼ੀ ਇਨਪੁੱਟ ਲਈ ਅਨੁਕੂਲਿਤ',
      'symptoms.describeSymptoms': 'ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ',
      'symptoms.analyze': 'ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
      'symptoms.clear': 'ਸਾਫ਼ ਕਰੋ',
      'symptoms.lowDataMode': 'ਘੱਟ ਡੇਟਾ ਮੋਡ',
      'symptoms.possibleConditions': 'ਸੰਭਾਵਿਤ ਸਥਿਤੀਆਂ',
      'symptoms.nextSteps': 'ਅਗਲੇ ਕਦਮ',
      'symptoms.severity': {
        'low': 'ਘੱਟ',
        'moderate': 'ਮੱਧਮ',
        'high': 'ਉੱਚ',
        'critical': 'ਗੰਭੀਰ'
      },
      
      // Medicine Availability
      'medicines.title': 'ਦਵਾਈ ਉਪਲਬਧਤਾ',
      'medicines.subtitle': 'ਨੇੜਲੇ ਫਾਰਮੇਸੀਆਂ ਵਿੱਚ ਰੀਅਲ-ਟਾਈਮ ਸਟਾਕ ਅਪਡੇਟ',
      'medicines.filters': 'ਫਿਲਟਰ',
      'medicines.search': 'ਦਵਾਈ ਜਾਂ ਫਾਰਮੇਸੀ ਖੋਜੋ',
      'medicines.navigate': 'ਨੈਵੀਗੇਟ ਕਰੋ',
      'medicines.stock': {
        'high': 'ਉੱਚ',
        'medium': 'ਮੱਧਮ',
        'low': 'ਘੱਟ'
      },
      
      // Emergency
      'emergency.title': 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ',
      'emergency.sos': 'SOS',
      'emergency.callAmbulance': 'ਐਂਬੂਲੈਂਸ ਬੁਲਾਓ',
      'emergency.nearestHospital': 'ਨੇੜਲਾ ਹਸਪਤਾਲ',
      'emergency.emergencyNumber': 'ਐਮਰਜੈਂਸੀ ਨੰਬਰ',
      
      // Admin Dashboard
      'admin.title': 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ',
      'admin.subtitle': 'JeevanSetu ਪਲੇਟਫਾਰਮ ਐਨਾਲਿਟਿਕਸ ਦਾ ਵਿਆਪਕ ਜਾਇਜ਼ਾ',
      'admin.accessDenied': 'ਪਹੁੰਚ ਇਨਕਾਰ',
      'admin.noPermission': 'ਤੁਹਾਡੇ ਕੋਲ ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ ਤੱਕ ਪਹੁੰਚ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਹੈ।',
      'admin.refreshData': 'ਡੇਟਾ ਰਿਫਰੈਸ਼ ਕਰੋ',
      'admin.consultationTrends': 'ਸਲਾਹ ਰੁਝਾਨ',
      'admin.medicineStock': 'ਦਵਾਈ ਸਟਾਕ ਪੱਧਰ',
      'admin.outbreakPatterns': 'ਪ੍ਰਕੋਪ ਪੈਟਰਨ',
      'admin.recentActivity': 'ਹਾਲੀਆ ਗਤੀਵਿਧੀ',
      
      // Chatbot
      'chatbot.title': 'ਸਿਹਤ ਸਹਾਇਕ',
      'chatbot.placeholder': 'ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ...',
      'chatbot.thinking': 'ਸੋਚ ਰਿਹਾ ਹੈ...',
      'chatbot.clearChat': 'ਚੈਟ ਸਾਫ਼ ਕਰੋ',
      'chatbot.language': 'ਭਾਸ਼ਾ',
      'chatbot.greeting': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਸਿਹਤ ਸਹਾਇਕ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
      
      // Common
      'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      'common.error': 'ਗਲਤੀ',
      'common.success': 'ਸਫਲਤਾ',
      'common.cancel': 'ਰੱਦ ਕਰੋ',
      'common.save': 'ਸੇਵ ਕਰੋ',
      'common.delete': 'ਹਟਾਓ',
      'common.edit': 'ਸੰਪਾਦਨ ਕਰੋ',
      'common.view': 'ਦੇਖੋ',
      'common.close': 'ਬੰਦ ਕਰੋ',
      'common.online': 'ਆਨਲਾਈਨ',
      'common.offline': 'ਆਫਲਾਈਨ',
      'common.offlineMode': 'ਆਫਲਾਈਨ ਮੋਡ'
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;

