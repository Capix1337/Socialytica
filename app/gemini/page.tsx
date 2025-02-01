// app/page.tsx
'use client';
import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const callGemini = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Tell me 5 short jokes about programming',
        }),
      });

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while calling Gemini');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Gemini AI Demo</h1>
        
        <button
          onClick={callGemini}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Calling Gemini...' : 'Ask Gemini'}
        </button>

        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">Gemini&apos;s Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}