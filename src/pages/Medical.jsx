import { useState } from 'react';
import { Search, Map, Phone, AlertCircle, Stethoscope, ArrowRight } from 'lucide-react';
import { TextGeneration } from '@runanywhere/web-llamacpp'; // <-- IMPORT SDK

export default function Medical() {
  const [activeTab, setActiveTab] = useState('Symptoms');
  
  // New State for the AI Assessment
  const [symptoms, setSymptoms] = useState('');
  const [assessment, setAssessment] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomCheck = async () => {
    if (!symptoms.trim()) return;
    setIsAnalyzing(true);
    setAssessment('');

    try {
      // Call the SDK with a specific Medical Triage System Prompt
      const result = await TextGeneration.generate(symptoms, {
        maxTokens: 200,
        temperature: 0.3, // Lower temperature for more factual responses
        systemPrompt: "You are a medical triage assistant. The user will provide symptoms. Provide a brief, 2-sentence assessment of potential common causes, and ALWAYS end by recommending they see a real doctor if symptoms persist."
      });
      
      setAssessment(result.text);
    } catch (error) {
      console.error(error);
      setAssessment("Unable to process symptoms. Ensure AI models are loaded.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ... (Keep your doctors array here) ...

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 md:pt-10 pb-24">
      {/* ... (Keep header and tabs here) ... */}

      {activeTab === 'Symptoms' && (
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-3xl p-6 text-center border border-orange-100">
            <div className="text-4xl mb-4">🤒</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">How are you feeling?</h2>
            <p className="text-gray-600 text-sm mb-6 px-4">Describe your symptoms to get an instant AI assessment.</p>
            
            <input 
              type="text" 
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. headache, fever, rash..." 
              className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 mb-4 bg-white" 
            />
            
            <button 
              onClick={handleSymptomCheck}
              disabled={isAnalyzing || !symptoms.trim()}
              className="w-full bg-slate-900 text-white font-semibold py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-slate-800 transition disabled:opacity-70"
            >
              {isAnalyzing ? "Analyzing..." : "Start Check"} <ArrowRight size={18} />
            </button>

            {/* AI Results Box */}
            {assessment && (
              <div className="mt-6 bg-white p-4 rounded-2xl border border-orange-200 text-left shadow-sm">
                <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-2">
                  <Stethoscope size={16}/> AI Assessment
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{assessment}</p>
              </div>
            )}
          </div>

          {/* ... (Keep the rest of the Emergency/Conditions cards here) ... */}
        </div>
      )}
      
      {/* ... (Keep the Doctors Tab here) ... */}
    </div>
  );
}