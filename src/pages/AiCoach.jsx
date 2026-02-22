import { useState, useRef } from 'react';
import { Bot, Mic, Image as ImageIcon, Send } from 'lucide-react';
import { TextGeneration } from '@runanywhere/web-llamacpp'; // <-- IMPORT THE SDK

export default function AICoach() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your personal health AI assistant. I can help you with medical symptoms, fitness advice, or diet questions. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // To keep track of the streaming text
  const currentResponseRef = useRef('');

  const suggestions = ["Should I go for a run today?", "My knee hurts", "Healthy lunch ideas"];

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userText = input;
    setInput('');
    setIsGenerating(true);
    currentResponseRef.current = '';

    // 1. Add User Message & an empty AI Message to the UI
    setMessages((prev) => [
      ...prev, 
      { role: 'user', text: userText },
      { role: 'ai', text: '' } // Placeholder for the stream
    ]);

    try {
      // 2. Call the RunAnywhere SDK for streaming text
      const { stream } = await TextGeneration.generateStream(userText, {
        maxTokens: 150,
        temperature: 0.7,
        systemPrompt: "You are a helpful, empathetic, and concise AI Health Coach. Give brief, practical health, diet, and fitness advice."
      });

      // 3. Read the stream and update the UI token by token
      for await (const token of stream) {
        currentResponseRef.current += token;
        
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = currentResponseRef.current;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = "Sorry, I encountered an error. Please make sure the AI models are loaded.";
        return newMessages;
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100 shadow-sm flex items-center gap-3 shrink-0">
        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-md">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">AI Health Coach</h1>
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 mt-1 border border-blue-100">
                <Bot size={16} />
              </div>
            )}
            <div className={`p-4 rounded-2xl max-w-[80%] shadow-sm ${msg.role === 'user' ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none leading-relaxed'}`}>
              {msg.text}
              {/* Show a blinking cursor while generating */}
              {isGenerating && idx === messages.length - 1 && <span className="animate-pulse">...</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-4 shrink-0 pb-20 md:pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Suggestions */}
          <div className="flex overflow-x-auto gap-2 pb-3 scrollbar-hide">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => { setInput(s); }} disabled={isGenerating} className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 shadow-sm flex items-center gap-1">
                <span className="text-teal-500">✨</span> {s}
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSend} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full p-2 pr-2 pl-4">
            <button type="button" className="text-gray-400 hover:text-gray-600 p-2"><Mic size={20}/></button>
            <button type="button" className="text-gray-400 hover:text-gray-600 p-2"><ImageIcon size={20}/></button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..." 
              disabled={isGenerating}
              className="flex-1 bg-transparent focus:outline-none px-2"
            />
            <button type="submit" disabled={isGenerating || !input.trim()} className="w-10 h-10 bg-teal-400 text-white rounded-full flex items-center justify-center hover:bg-teal-500 transition disabled:opacity-50">
              <Send size={18} className="ml-1 shrink-0" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}