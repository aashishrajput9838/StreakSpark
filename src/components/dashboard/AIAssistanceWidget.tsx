import React, { useState } from 'react';

const AIAssistanceWidget: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') return;

    setLoading(true);
    setResponse('');

    // Simulate AI response
    setTimeout(() => {
      const mockResponse = `AI response for: "${query}"`;
      setResponse(mockResponse);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything about your habits..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ease-in-out"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ease-in-out shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200 text-gray-700">
          <p className="font-medium">AI Response:</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistanceWidget; 