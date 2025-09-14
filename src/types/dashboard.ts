// Dashboard and analytics types for JeevanSetu

export interface DashboardStats {
  telemedicine: {
    activeConsultations: number;
    totalConsultations: number;
    completedConsultations: number;
    averageConsultationTime: number;
    patientSatisfaction: number;
  };
  medicine: {
    totalPharmacies: number;
    lowStockMedicines: number;
    outOfStockMedicines: number;
    averageStockLevel: number;
  };
  ai: {
    totalSymptomChecks: number;
    accuracyRate: number;
    outbreakAlerts: number;
    predictionsGenerated: number;
  };
  blockchain: {
    totalRecords: number;
    syncedRecords: number;
    pendingRecords: number;
    lastSyncTime: Date;
  };
  emergency: {
    totalSOSCalls: number;
    activeEmergencies: number;
    averageResponseTime: number;
    resolvedEmergencies: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

export interface ConsultationTrend {
  period: 'daily' | 'weekly' | 'monthly';
  data: TimeSeriesData[];
  totalConsultations: number;
  growthRate: number;
}

export interface MedicineStockTrend {
  medicine: string;
  pharmacy: string;
  currentStock: number;
  maxStock: number;
  stockPercentage: number;
  lastUpdated: Date;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface OutbreakPattern {
  disease: string;
  region: string;
  cases: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  prediction: {
    confidence: number;
    expectedCases: number;
    timeframe: string;
  };
  recommendations: string[];
}

export interface AdminDashboardData {
  stats: DashboardStats;
  consultationTrends: ConsultationTrend;
  medicineStockTrends: MedicineStockTrend[];
  outbreakPatterns: OutbreakPattern[];
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  type: 'consultation' | 'medicine' | 'ai_prediction' | 'emergency' | 'blockchain_sync';
  description: string;
  user: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error' | 'success';
}
