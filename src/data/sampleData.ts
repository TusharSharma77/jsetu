// Comprehensive sample data for JeevanSetu platform

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  languages: string[];
  availability: {
    days: string[];
    timeSlots: string[];
  };
  consultationFee: number;
  avatar: string;
  hospital: string;
  qualifications: string[];
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: Date;
  duration: number;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  type: 'video' | 'audio' | 'chat';
  symptoms: string;
  diagnosis: string;
  prescription: string[];
  followUpRequired: boolean;
  followUpDate?: Date;
  language: string;
  rating?: number;
  feedback?: string;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  dosage: string;
  form: 'tablet' | 'syrup' | 'injection' | 'cream' | 'drops';
  category: string;
  price: number;
  prescriptionRequired: boolean;
  sideEffects: string[];
  indications: string[];
  contraindications: string[];
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  location: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  rating: number;
  operatingHours: {
    open: string;
    close: string;
    days: string[];
  };
  services: string[];
  stock: MedicineStock[];
}

export interface MedicineStock {
  medicineId: string;
  medicineName: string;
  available: boolean;
  quantity: number;
  maxQuantity: number;
  lastUpdated: Date;
  price: number;
  expiryDate: Date;
}

export interface AIQuery {
  id: string;
  userId: string;
  query: string;
  language: string;
  timestamp: Date;
  response: {
    possibleConditions: Array<{
      condition: string;
      confidence: number;
      severity: 'low' | 'moderate' | 'high' | 'critical';
      description: string;
    }>;
    recommendations: string[];
    urgency: 'low' | 'moderate' | 'high' | 'critical';
    nextSteps: string[];
  };
  followUpActions: string[];
}

export interface BlockchainRecord {
  id: string;
  patientId: string;
  recordType: 'consultation' | 'prescription' | 'lab_report' | 'vaccination' | 'emergency';
  data: any;
  hash: string;
  previousHash: string;
  timestamp: Date;
  doctorId?: string;
  hospitalId?: string;
  isEncrypted: boolean;
  accessLevel: 'patient' | 'doctor' | 'hospital' | 'emergency';
}

export interface EmergencyContact {
  id: string;
  name: string;
  type: 'ambulance' | 'hospital' | 'police' | 'fire' | 'general';
  phone: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  available24x7: boolean;
  specializations: string[];
  rating: number;
  responseTime: number; // in minutes
}

export interface HealthAlert {
  id: string;
  title: string;
  description: string;
  type: 'disease' | 'vaccination' | 'camp' | 'general' | 'emergency';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  date: Date;
  expiryDate: Date;
  location: string;
  targetAudience: string[];
  actionRequired: boolean;
  actionText?: string;
  actionUrl?: string;
  affectedAreas: string[];
  preventiveMeasures: string[];
  symptoms: string[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  patientAge: number;
  location: string;
  rating: number;
  comment: string;
  language: string;
  consultationType: string;
  doctorName: string;
  date: Date;
  avatar: string;
}

// Sample Doctors Data
export const sampleDoctors: Doctor[] = [
  {
    id: 'doc_001',
    name: 'Dr. Priya Sharma',
    specialization: 'General Medicine',
    experience: 12,
    rating: 4.8,
    languages: ['en', 'hi', 'pa'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['09:00-12:00', '14:00-17:00']
    },
    consultationFee: 500,
    avatar: '/avatars/doctor1.jpg',
    hospital: 'Rural Health Center',
    qualifications: ['MBBS', 'MD General Medicine', 'Diploma in Rural Health']
  },
  {
    id: 'doc_002',
    name: 'Dr. Amit Singh',
    specialization: 'Pediatrics',
    experience: 8,
    rating: 4.9,
    languages: ['en', 'hi'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      timeSlots: ['10:00-13:00', '15:00-18:00']
    },
    consultationFee: 600,
    avatar: '/avatars/doctor2.jpg',
    hospital: 'District Hospital',
    qualifications: ['MBBS', 'MD Pediatrics', 'Child Health Specialist']
  },
  {
    id: 'doc_003',
    name: 'Dr. Neha Gupta',
    specialization: 'Gynecology',
    experience: 15,
    rating: 4.7,
    languages: ['en', 'hi', 'pa'],
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['09:00-12:00', '16:00-19:00']
    },
    consultationFee: 800,
    avatar: '/avatars/doctor3.jpg',
    hospital: 'Women\'s Health Center',
    qualifications: ['MBBS', 'MS Obstetrics & Gynecology', 'Family Planning Specialist']
  },
  {
    id: 'doc_004',
    name: 'Dr. Rajesh Kumar',
    specialization: 'Emergency Medicine',
    experience: 10,
    rating: 4.9,
    languages: ['en', 'hi'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      timeSlots: ['24x7']
    },
    consultationFee: 1000,
    avatar: '/avatars/doctor4.jpg',
    hospital: 'Emergency Medical Center',
    qualifications: ['MBBS', 'MD Emergency Medicine', 'Trauma Specialist']
  }
];

// Sample Consultations Data
export const sampleConsultations: Consultation[] = [
  {
    id: 'cons_001',
    patientId: 'pat_001',
    doctorId: 'doc_001',
    patientName: 'Rajesh Kumar',
    doctorName: 'Dr. Priya Sharma',
    date: new Date('2024-01-15T10:30:00'),
    duration: 25,
    status: 'completed',
    type: 'video',
    symptoms: 'Fever, headache, body ache for 3 days',
    diagnosis: 'Viral fever with mild dehydration',
    prescription: ['Paracetamol 500mg', 'ORS sachets', 'Rest and hydration'],
    followUpRequired: true,
    followUpDate: new Date('2024-01-18T10:30:00'),
    language: 'hi',
    rating: 5,
    feedback: 'Very helpful doctor, explained everything clearly in Hindi'
  },
  {
    id: 'cons_002',
    patientId: 'pat_002',
    doctorId: 'doc_002',
    patientName: 'Sunita Devi',
    doctorName: 'Dr. Amit Singh',
    date: new Date('2024-01-14T15:00:00'),
    duration: 20,
    status: 'completed',
    type: 'video',
    symptoms: 'Child has cough and cold for 5 days',
    diagnosis: 'Upper respiratory tract infection',
    prescription: ['Cough syrup', 'Steam inhalation', 'Warm fluids'],
    followUpRequired: false,
    language: 'hi',
    rating: 4,
    feedback: 'Good consultation, child is feeling better'
  },
  {
    id: 'cons_003',
    patientId: 'pat_003',
    doctorId: 'doc_003',
    patientName: 'Lakshmi Reddy',
    doctorName: 'Dr. Neha Gupta',
    date: new Date('2024-01-16T11:00:00'),
    duration: 30,
    status: 'scheduled',
    type: 'video',
    symptoms: 'Regular checkup and pregnancy consultation',
    diagnosis: '',
    prescription: [],
    followUpRequired: false,
    language: 'en',
    rating: undefined,
    feedback: undefined
  }
];

// Sample Medicines Data
export const sampleMedicines: Medicine[] = [
  {
    id: 'med_001',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    manufacturer: 'Cipla Ltd',
    dosage: '500mg',
    form: 'tablet',
    category: 'Analgesic',
    price: 2.50,
    prescriptionRequired: false,
    sideEffects: ['Nausea', 'Skin rash', 'Liver damage (overdose)'],
    indications: ['Fever', 'Pain relief', 'Headache'],
    contraindications: ['Liver disease', 'Alcoholism', 'Allergy to paracetamol']
  },
  {
    id: 'med_002',
    name: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin',
    manufacturer: 'Sun Pharma',
    dosage: '250mg',
    form: 'tablet',
    category: 'Antibiotic',
    price: 8.75,
    prescriptionRequired: true,
    sideEffects: ['Diarrhea', 'Nausea', 'Allergic reactions'],
    indications: ['Bacterial infections', 'Respiratory infections', 'UTI'],
    contraindications: ['Penicillin allergy', 'Kidney disease']
  },
  {
    id: 'med_003',
    name: 'Insulin Glargine',
    genericName: 'Insulin Glargine',
    manufacturer: 'Biocon',
    dosage: '100 units/ml',
    form: 'injection',
    category: 'Antidiabetic',
    price: 450.00,
    prescriptionRequired: true,
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Injection site reactions'],
    indications: ['Type 1 Diabetes', 'Type 2 Diabetes'],
    contraindications: ['Hypoglycemia', 'Allergy to insulin']
  },
  {
    id: 'med_004',
    name: 'Cough Syrup',
    genericName: 'Dextromethorphan + Guaifenesin',
    manufacturer: 'Himalaya',
    dosage: '5ml',
    form: 'syrup',
    category: 'Antitussive',
    price: 45.00,
    prescriptionRequired: false,
    sideEffects: ['Drowsiness', 'Nausea', 'Dizziness'],
    indications: ['Dry cough', 'Productive cough', 'Chest congestion'],
    contraindications: ['Severe liver disease', 'Pregnancy']
  }
];

// Sample Pharmacies Data
export const samplePharmacies: Pharmacy[] = [
  {
    id: 'pharm_001',
    name: 'Rural Health Center Pharmacy',
    address: 'Main Road, Village A, District B, State C',
    phone: '+91-9876543210',
    email: 'pharmacy@ruralhealth.com',
    location: {
      latitude: 28.6139,
      longitude: 77.2090
    },
    distance: 2.5,
    rating: 4.5,
    operatingHours: {
      open: '08:00',
      close: '20:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    services: ['Medicine delivery', 'Health consultation', 'Blood pressure check'],
    stock: [
      {
        medicineId: 'med_001',
        medicineName: 'Paracetamol 500mg',
        available: true,
        quantity: 45,
        maxQuantity: 100,
        lastUpdated: new Date(),
        price: 2.50,
        expiryDate: new Date('2025-12-31')
      },
      {
        medicineId: 'med_002',
        medicineName: 'Amoxicillin 250mg',
        available: true,
        quantity: 23,
        maxQuantity: 50,
        lastUpdated: new Date(),
        price: 8.75,
        expiryDate: new Date('2025-06-30')
      }
    ]
  },
  {
    id: 'pharm_002',
    name: 'Village Medical Store',
    address: 'Market Square, Village B, District B, State C',
    phone: '+91-9876543211',
    email: 'village@medicalstore.com',
    location: {
      latitude: 28.6140,
      longitude: 77.2091
    },
    distance: 1.8,
    rating: 4.2,
    operatingHours: {
      open: '09:00',
      close: '21:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    services: ['24x7 emergency', 'Medicine delivery', 'Health tips'],
    stock: [
      {
        medicineId: 'med_001',
        medicineName: 'Paracetamol 500mg',
        available: true,
        quantity: 78,
        maxQuantity: 100,
        lastUpdated: new Date(),
        price: 2.25,
        expiryDate: new Date('2025-11-30')
      },
      {
        medicineId: 'med_004',
        medicineName: 'Cough Syrup',
        available: true,
        quantity: 12,
        maxQuantity: 25,
        lastUpdated: new Date(),
        price: 45.00,
        expiryDate: new Date('2025-08-15')
      }
    ]
  }
];

// Sample AI Queries Data
export const sampleAIQueries: AIQuery[] = [
  {
    id: 'ai_001',
    userId: 'pat_001',
    query: 'I have fever for 3 days with headache and body ache',
    language: 'hi',
    timestamp: new Date('2024-01-15T09:00:00'),
    response: {
      possibleConditions: [
        {
          condition: 'Viral Fever',
          confidence: 85,
          severity: 'moderate',
          description: 'Common viral infection causing fever and body aches'
        },
        {
          condition: 'Dengue Fever',
          confidence: 65,
          severity: 'high',
          description: 'Mosquito-borne viral disease with similar symptoms'
        }
      ],
      recommendations: [
        'Take paracetamol for fever',
        'Stay hydrated with ORS',
        'Get adequate rest',
        'Monitor temperature regularly'
      ],
      urgency: 'moderate',
      nextSteps: [
        'Consult a doctor within 24 hours',
        'Get blood test if symptoms persist',
        'Avoid self-medication'
      ]
    },
    followUpActions: ['Consultation scheduled', 'Blood test recommended']
  },
  {
    id: 'ai_002',
    userId: 'pat_002',
    query: 'My child has cough and cold for 5 days',
    language: 'en',
    timestamp: new Date('2024-01-14T14:30:00'),
    response: {
      possibleConditions: [
        {
          condition: 'Upper Respiratory Tract Infection',
          confidence: 90,
          severity: 'low',
          description: 'Common viral infection in children'
        },
        {
          condition: 'Allergic Rhinitis',
          confidence: 40,
          severity: 'low',
          description: 'Allergic reaction causing nasal symptoms'
        }
      ],
      recommendations: [
        'Steam inhalation',
        'Warm fluids and honey',
        'Saline nasal drops',
        'Adequate rest'
      ],
      urgency: 'low',
      nextSteps: [
        'Monitor symptoms',
        'Consult pediatrician if fever develops',
        'Ensure proper hydration'
      ]
    },
    followUpActions: ['Pediatric consultation scheduled']
  }
];

// Sample Blockchain Records Data
export const sampleBlockchainRecords: BlockchainRecord[] = [
  {
    id: 'block_001',
    patientId: 'pat_001',
    recordType: 'consultation',
    data: {
      consultationId: 'cons_001',
      symptoms: 'Fever, headache, body ache',
      diagnosis: 'Viral fever',
      prescription: ['Paracetamol 500mg', 'ORS sachets']
    },
    hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    previousHash: '00000000000000000000000000000000',
    timestamp: new Date('2024-01-15T10:30:00'),
    doctorId: 'doc_001',
    hospitalId: 'hosp_001',
    isEncrypted: true,
    accessLevel: 'patient'
  },
  {
    id: 'block_002',
    patientId: 'pat_001',
    recordType: 'vaccination',
    data: {
      vaccine: 'COVID-19 Booster',
      date: '2024-01-10',
      batchNumber: 'COV-2024-001',
      sideEffects: 'Mild fever for 1 day'
    },
    hash: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7',
    previousHash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    timestamp: new Date('2024-01-10T14:00:00'),
    doctorId: 'doc_001',
    hospitalId: 'hosp_001',
    isEncrypted: true,
    accessLevel: 'patient'
  }
];

// Enhanced health records for the records page
export const sampleHealthRecordsForPage = [
  {
    id: 'rec_001',
    patientName: 'Rajesh Kumar',
    category: 'consultations',
    status: 'Synced',
    size: '2.4 MB',
    date: '2024-01-15',
    doctorName: 'Dr. Priya Sharma',
    blockchainHash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'rec_002',
    patientName: 'Sunita Devi',
    category: 'lab-reports',
    status: 'Pending',
    size: '1.8 MB',
    date: '2024-01-14',
    doctorName: 'Dr. Amit Singh',
    blockchainHash: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7',
    lastUpdated: '1 day ago'
  },
  {
    id: 'rec_003',
    patientName: 'Lakshmi Reddy',
    category: 'prescriptions',
    status: 'Synced',
    size: '0.9 MB',
    date: '2024-01-16',
    doctorName: 'Dr. Neha Gupta',
    blockchainHash: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8',
    lastUpdated: '30 minutes ago'
  },
  {
    id: 'rec_004',
    patientName: 'Manoj Singh',
    category: 'vaccinations',
    status: 'Synced',
    size: '1.2 MB',
    date: '2024-01-10',
    doctorName: 'Dr. Rajesh Kumar',
    blockchainHash: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9',
    lastUpdated: '5 days ago'
  },
  {
    id: 'rec_005',
    patientName: 'Priya Sharma',
    category: 'medical-history',
    status: 'Synced',
    size: '3.1 MB',
    date: '2024-01-12',
    doctorName: 'Dr. Amit Singh',
    blockchainHash: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    lastUpdated: '3 days ago'
  }
];

// Sample Emergency Contacts Data
export const sampleEmergencyContacts: EmergencyContact[] = [
  {
    id: 'emerg_001',
    name: 'Emergency Ambulance Service',
    type: 'ambulance',
    phone: '108',
    address: 'District Hospital, Main Road, District B',
    location: {
      latitude: 28.6145,
      longitude: 77.2095
    },
    distance: 5.2,
    available24x7: true,
    specializations: ['Emergency transport', 'Basic life support', 'Trauma care'],
    rating: 4.8,
    responseTime: 15
  },
  {
    id: 'emerg_002',
    name: 'Rural Health Center Emergency',
    type: 'hospital',
    phone: '+91-9876543200',
    address: 'Rural Health Center, Village A',
    location: {
      latitude: 28.6139,
      longitude: 77.2090
    },
    distance: 2.1,
    available24x7: true,
    specializations: ['Emergency medicine', 'General surgery', 'Pediatrics'],
    rating: 4.6,
    responseTime: 5
  },
  {
    id: 'emerg_003',
    name: 'Police Emergency',
    type: 'police',
    phone: '100',
    address: 'Police Station, District B',
    location: {
      latitude: 28.6142,
      longitude: 77.2092
    },
    distance: 3.8,
    available24x7: true,
    specializations: ['Law enforcement', 'Emergency response', 'Public safety'],
    rating: 4.3,
    responseTime: 10
  }
];

// Sample Health Alerts Data
export const sampleHealthAlerts: HealthAlert[] = [
  {
    id: 'alert_001',
    title: 'Dengue Prevention Campaign',
    description: 'High risk of dengue fever in your area. Take preventive measures and report symptoms immediately.',
    type: 'disease',
    severity: 'high',
    date: new Date('2024-01-15'),
    expiryDate: new Date('2024-02-15'),
    location: 'Rural District A',
    targetAudience: ['all'],
    actionRequired: true,
    actionText: 'Learn Prevention Tips',
    actionUrl: '/prevention/dengue',
    affectedAreas: ['Village A', 'Village B', 'Village C'],
    preventiveMeasures: [
      'Use mosquito repellent',
      'Wear long sleeves and pants',
      'Remove standing water',
      'Use mosquito nets'
    ],
    symptoms: ['High fever', 'Severe headache', 'Pain behind eyes', 'Muscle and joint pain']
  },
  {
    id: 'alert_002',
    title: 'COVID-19 Booster Vaccination Drive',
    description: 'COVID-19 booster shots available for eligible population. Book your appointment now.',
    type: 'vaccination',
    severity: 'moderate',
    date: new Date('2024-01-16'),
    expiryDate: new Date('2024-01-30'),
    location: 'District Hospital',
    targetAudience: ['adults', 'seniors'],
    actionRequired: true,
    actionText: 'Book Appointment',
    actionUrl: '/vaccination/covid-booster',
    affectedAreas: ['All villages in District B'],
    preventiveMeasures: [
      'Get vaccinated',
      'Wear masks in crowded places',
      'Maintain social distancing',
      'Wash hands frequently'
    ],
    symptoms: ['Fever', 'Cough', 'Shortness of breath', 'Loss of taste/smell']
  },
  {
    id: 'alert_003',
    title: 'Free Health Checkup Camp',
    description: 'Free health checkup camp organized by local health department. All are welcome.',
    type: 'camp',
    severity: 'low',
    date: new Date('2024-01-20'),
    expiryDate: new Date('2024-01-20'),
    location: 'Community Center',
    targetAudience: ['all'],
    actionRequired: true,
    actionText: 'Register Now',
    actionUrl: '/camps/health-checkup',
    affectedAreas: ['Village A', 'Village B'],
    preventiveMeasures: [
      'Regular health checkups',
      'Maintain healthy lifestyle',
      'Early detection of diseases'
    ],
    symptoms: []
  }
];

// Sample Testimonials Data
export const sampleTestimonials: Testimonial[] = [
  {
    id: 'test_001',
    patientName: 'Rajesh Kumar',
    patientAge: 45,
    location: 'Village A',
    rating: 5,
    comment: 'JeevanSetu saved my life! I got immediate medical help when I had chest pain. The doctor was very knowledgeable and explained everything in Hindi.',
    language: 'hi',
    consultationType: 'Emergency Consultation',
    doctorName: 'Dr. Priya Sharma',
    date: new Date('2024-01-10'),
    avatar: '/avatars/patient1.jpg'
  },
  {
    id: 'test_002',
    patientName: 'Sunita Devi',
    patientAge: 32,
    location: 'Village B',
    rating: 5,
    comment: 'My child was very sick and I couldn\'t travel to the city. Through JeevanSetu, I got expert pediatric care right at home. Highly recommended!',
    language: 'hi',
    consultationType: 'Pediatric Consultation',
    doctorName: 'Dr. Amit Singh',
    date: new Date('2024-01-08'),
    avatar: '/avatars/patient2.jpg'
  },
  {
    id: 'test_003',
    patientName: 'Lakshmi Reddy',
    patientAge: 28,
    location: 'Village C',
    rating: 4,
    comment: 'The AI symptom checker helped me understand my condition before consulting the doctor. The multilingual support is excellent for rural areas.',
    language: 'en',
    consultationType: 'AI Symptom Check',
    doctorName: 'AI Assistant',
    date: new Date('2024-01-05'),
    avatar: '/avatars/patient3.jpg'
  },
  {
    id: 'test_004',
    patientName: 'Manoj Singh',
    patientAge: 55,
    location: 'Village A',
    rating: 5,
    comment: 'The medicine availability feature helped me find my diabetes medication at a nearby pharmacy. Very useful for rural areas!',
    language: 'pa',
    consultationType: 'Medicine Search',
    doctorName: 'N/A',
    date: new Date('2024-01-03'),
    avatar: '/avatars/patient4.jpg'
  }
];

// Export individual arrays for direct import
export const sampleHealthRecords = sampleBlockchainRecords;

// Export all sample data
export const sampleData = {
  doctors: sampleDoctors,
  consultations: sampleConsultations,
  medicines: sampleMedicines,
  pharmacies: samplePharmacies,
  aiQueries: sampleAIQueries,
  blockchainRecords: sampleBlockchainRecords,
  emergencyContacts: sampleEmergencyContacts,
  healthAlerts: sampleHealthAlerts,
  testimonials: sampleTestimonials
};
