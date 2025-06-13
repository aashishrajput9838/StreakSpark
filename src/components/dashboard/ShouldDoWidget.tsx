import React from 'react';

const ShouldDoWidget: React.FC = () => {
  const suggestions = [
    { text: 'We go jimm! 💪', likes: '4.2k' },
    { text: 'The 5am club', likes: '5.4k' },
  ];
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
      <div className="font-semibold mb-2">Should Do!</div>
      {suggestions.map((s, i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
          <span>{s.text}</span>
          <span className="text-xs text-gray-400">{s.likes} love this</span>
        </div>
      ))}
    </div>
  );
};

export default ShouldDoWidget; 