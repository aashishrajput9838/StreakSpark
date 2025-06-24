import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Users, UserPlus, X, Check, Clock } from 'lucide-react';

export default function FriendsLeaderboardWidget() {
  const [addFriendId, setAddFriendId] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Add Friend Section */}
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-3">
          <UserPlus className="w-5 h-5 text-pink-400" />
          <h4 className="font-medium text-slate-100">Add Friend</h4>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Enter friend ID (e.g., abhi123)"
              value={addFriendId}
              onChange={(e) => setAddFriendId(e.target.value)}
              className="flex-1 bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
            />
            <Button 
              className="bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white"
            >
              Add
            </Button>
          </div>
          <div className="text-sm text-slate-300 bg-slate-700/50 p-2 rounded-md">
            <strong>Your ID:</strong> demo123
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-pink-400" />
          <h4 className="font-medium text-slate-100">Friends Leaderboard</h4>
        </div>
        <div className="text-center py-8">
          <Users className="w-12 h-12 mx-auto mb-4 text-slate-500" />
          <p className="text-slate-400">No friends yet. Add some friends to see the leaderboard!</p>
        </div>
      </div>
    </motion.div>
  );
} 