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
      <Card className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <UserPlus className="w-5 h-5" />
            Add Friend
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Enter friend ID (e.g., abhi123)"
              value={addFriendId}
              onChange={(e) => setAddFriendId(e.target.value)}
              className="flex-1"
            />
            <Button 
              className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
            >
              Add
            </Button>
          </div>
          <div className="text-sm text-purple-600 bg-purple-100 p-2 rounded-md">
            <strong>Your ID:</strong> demo123
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="bg-gradient-to-br from-purple-50 via-fuchsia-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Users className="w-5 h-5" />
            Friends Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No friends yet. Add some friends to see the leaderboard!</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 