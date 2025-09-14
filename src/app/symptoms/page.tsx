'use client'
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';
import LanguageSelector from '@/components/language/LanguageSelector';
import { SymptomAnalysis } from '@/lib/gemini';

const SymptomChecker: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const results = [
    { label: 'Viral Fever', severity: 'low', recommendation: 'Home care and hydration', confidence: '78%' },
    { label: 'Malaria (possible)', severity: 'moderate', recommendation: 'Consult a doctor within 24 hours', confidence: '65%' },
    { label: 'Typhoid (unlikely)', severity: 'low', recommendation: 'Monitor symptoms, consult if persists', confidence: '40%' },
  ];

  return (
    <div className="min-h-screen dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('symptoms.title')}</h1>
            <p className="text-gray-600 dark:text-gray-300">{t('symptoms.subtitle')}</p>
          </div>
          <LanguageSelector variant="compact" />
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Describe your symptoms</label>
          {/* COMPONENT: <Textarea autosize lowDataMode /> */}
          <textarea className="w-full h-28 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="e.g., Fever for 3 days, headache, chills" value={input} onChange={(e) => setInput(e.target.value)} />

          {/* Controls */}
          <div className="mt-3 flex items-center gap-3">
            {/* COMPONENT: <Button loading={...}>Analyze</Button> */}
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-md">Analyze</button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600">Clear</button>
            {/* COMPONENT: toggle for Low Data Mode */}
            <label className="ml-auto text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700" /> Low Data Mode
            </label>
          </div>

          {/* ANIMATION: Shimmer placeholder while AI is analyzing */}
        </div>

        {/* Results */}
        <div className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('symptoms.possibleConditions')}</h2>
          {analysis ? (
            analysis.possibleConditions.map((condition, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{condition.condition}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{condition.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      condition.severity === 'critical' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                      condition.severity === 'high' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                      condition.severity === 'moderate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    }`}>
                      {t(`symptoms.severity.${condition.severity}`)}
                    </span>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Confidence: {condition.confidence}%</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            results.map((r, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{r.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{r.recommendation}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${r.severity === 'high' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : r.severity === 'moderate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'}`}>{r.severity}</span>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Confidence: {r.confidence}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Next Steps */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('symptoms.nextSteps')}</h3>
          {analysis ? (
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
              {analysis.nextSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          ) : (
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Schedule a video consultation for further guidance</li>
              <li>Find nearby pharmacies for over-the-counter medicines</li>
              <li>Save this assessment to your health records</li>
            </ul>
          )}
        </div>

        {/* Chatbot Interface */}
        <div className="mt-6">
          <ChatbotInterface 
            language={language}
            onSymptomAnalysis={(analysis) => {
              setAnalysis(analysis);
            }}
            onOutbreakAlert={(alert) => {
              console.log('Outbreak alert:', alert);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;


