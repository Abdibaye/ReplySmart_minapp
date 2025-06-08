'use client';

import { useState } from 'react';
import ReplyCard from '@/components/ReplyCard';
import ToneSelector from '@/components/ToneSelector';
import Loader from '@/components/Loader';

export default function Home() {
  const [receivedMessage, setReceivedMessage] = useState('');
  const [draftResponse, setDraftResponse] = useState('');
  const [tone, setTone] = useState('professional');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receivedMessage.trim() || !draftResponse.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/generate-replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: receivedMessage,
          draftResponse,
          tone
        }),
      });
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-2 tracking-tight drop-shadow-sm">ReplySmart</h1>
        <p className="text-center text-gray-500 mb-8">Get AI-powered reply suggestions in seconds</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="receivedMessage" className="block text-base font-medium text-gray-700 mb-2">
              Message Received
            </label>
            <textarea
              id="receivedMessage"
              value={receivedMessage}
              onChange={(e) => setReceivedMessage(e.target.value)}
              className="w-full h-24 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none bg-white/80 shadow-inner"
              placeholder="Paste the message you received..."
            />
          </div>

          <div>
            <label htmlFor="draftResponse" className="block text-base font-medium text-gray-700 mb-2">
              Your Draft Response
            </label>
            <textarea
              id="draftResponse"
              value={draftResponse}
              onChange={(e) => setDraftResponse(e.target.value)}
              className="w-full h-24 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none bg-white/80 shadow-inner"
              placeholder="Write your draft response here..."
            />
          </div>

          <ToneSelector value={tone} onChange={setTone} />

          <button
            type="submit"
            disabled={loading || !receivedMessage.trim() || !draftResponse.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-md"
          >
            {loading ? <Loader /> : 'Improve Response'}
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Improved Responses</h2>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <ReplyCard key={index} text={suggestion} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
