import React from 'react';

interface Friend {
  id: string;
  name: string;
  streak: number;
  avatar: string;
}

const mockFriends: Friend[] = [
  { id: '1', name: 'Alice', streak: 365, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'Bob', streak: 280, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '3', name: 'Charlie', streak: 150, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '4', name: 'Diana', streak: 90, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '5', name: 'Eve', streak: 45, avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
];

const FriendsLeaderboardWidget: React.FC = () => {
  // In a real application, this data would be fetched from an API
  const sortedFriends = [...mockFriends].sort((a, b) => b.streak - a.streak);

  return (
    <div className="bg-appPalette-dark-card rounded-xl p-6 shadow flex flex-col gap-4 text-appPalette-dark-text">
      <h2 className="text-xl font-semibold mb-2">Friends Leaderboard</h2>
      <div className="space-y-3">
        {sortedFriends.map((friend, index) => (
          <div key={friend.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-appPalette-dark-background hover:bg-appPalette-dark-border transition-colors duration-200 ease-in-out">
            <span className="font-bold text-lg text-appPalette-dark-muted w-6 text-center">{index + 1}.</span>
            <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
            <span className="font-medium text-appPalette-dark-text flex-grow">{friend.name}</span>
            <span className="text-lg font-semibold text-appPalette-pink">{friend.streak} day{friend.streak !== 1 ? 's' : ''} streak</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsLeaderboardWidget; 