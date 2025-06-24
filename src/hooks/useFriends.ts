import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/contexts/AuthContext';
import { addDocument, updateDocument, deleteDocument } from '@/lib/firebase-utils';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  publicId: string; // Unique shareable ID like "abhi123"
  totalStreak: number;
  totalHabits: number;
  createdAt: Date;
  photoURL?: string;
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUserProfile: UserProfile;
  toUserProfile: UserProfile;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Friendship {
  id: string;
  user1Id: string;
  user2Id: string;
  user1Profile: UserProfile;
  user2Profile: UserProfile;
  createdAt: Date;
}

export function useFriends() {
  const [friends, setFriends] = useState<Friendship[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  // Generate a unique public ID
  const generatePublicId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Create or update user profile
  const createUserProfile = async (displayName: string, email: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      const publicId = generatePublicId();
      const userProfile: UserProfile = {
        uid: user.uid,
        displayName,
        email,
        publicId,
        totalStreak: 0,
        totalHabits: 0,
        createdAt: new Date(),
        photoURL: user.photoURL || undefined,
      };

      await setDoc(doc(db, 'userProfiles', user.uid), userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Failed to create user profile');
    }
  };

  // Get user profile by public ID
  const getUserProfileByPublicId = async (publicId: string): Promise<UserProfile | null> => {
    try {
      const q = query(collection(db, 'userProfiles'), where('publicId', '==', publicId));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { ...doc.data(), createdAt: doc.data().createdAt?.toDate() } as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  };

  // Send friend request
  const sendFriendRequest = async (toPublicId: string) => {
    if (!user || !userProfile) throw new Error('User must be logged in');

    try {
      const toUserProfile = await getUserProfileByPublicId(toPublicId);
      if (!toUserProfile) throw new Error('User not found');
      if (toUserProfile.uid === user.uid) throw new Error('Cannot send friend request to yourself');

      const friendRequest: Omit<FriendRequest, 'id'> = {
        fromUserId: user.uid,
        toUserId: toUserProfile.uid,
        fromUserProfile: userProfile,
        toUserProfile,
        status: 'pending',
        createdAt: new Date(),
      };

      await addDocument('friendRequests', friendRequest);
    } catch (error) {
      console.error('Error sending friend request:', error);
      throw error;
    }
  };

  // Accept friend request
  const acceptFriendRequest = async (requestId: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      const request = friendRequests.find(r => r.id === requestId);
      if (!request) throw new Error('Friend request not found');

      // Update request status
      await updateDocument('friendRequests', requestId, { status: 'accepted' });

      // Create friendship
      const friendship: Omit<Friendship, 'id'> = {
        user1Id: request.fromUserId,
        user2Id: request.toUserId,
        user1Profile: request.fromUserProfile,
        user2Profile: request.toUserProfile,
        createdAt: new Date(),
      };

      await addDocument('friendships', friendship);
    } catch (error) {
      console.error('Error accepting friend request:', error);
      throw new Error('Failed to accept friend request');
    }
  };

  // Reject friend request
  const rejectFriendRequest = async (requestId: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      await updateDocument('friendRequests', requestId, { status: 'rejected' });
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      throw new Error('Failed to reject friend request');
    }
  };

  // Remove friend
  const removeFriend = async (friendshipId: string) => {
    if (!user) throw new Error('User must be logged in');

    try {
      await deleteDocument('friendships', friendshipId);
    } catch (error) {
      console.error('Error removing friend:', error);
      throw new Error('Failed to remove friend');
    }
  };

  // Update user stats
  const updateUserStats = async (totalStreak: number, totalHabits: number) => {
    if (!user) throw new Error('User must be logged in');

    try {
      await updateDocument('userProfiles', user.uid, {
        totalStreak,
        totalHabits,
      });
    } catch (error) {
      console.error('Error updating user stats:', error);
      throw new Error('Failed to update user stats');
    }
  };

  useEffect(() => {
    if (!user) {
      setFriends([]);
      setFriendRequests([]);
      setUserProfile(null);
      setLoading(false);
      return;
    }

    // Listen to user profile
    const userProfileUnsubscribe = onSnapshot(
      doc(db, 'userProfiles', user.uid),
      (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data() as UserProfile);
        } else {
          // Create profile if it doesn't exist
          createUserProfile(user.displayName || 'Anonymous', user.email || '');
        }
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile');
      }
    );

    // Listen to friend requests
    const friendRequestsQuery = query(
      collection(db, 'friendRequests'),
      where('toUserId', '==', user.uid),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );

    const friendRequestsUnsubscribe = onSnapshot(
      friendRequestsQuery,
      (snapshot) => {
        const requests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as FriendRequest[];
        setFriendRequests(requests);
      },
      (error) => {
        console.error('Error fetching friend requests:', error);
      }
    );

    // Listen to friendships (both as user1 and user2)
    const friendshipsQuery1 = query(
      collection(db, 'friendships'),
      where('user1Id', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const friendshipsQuery2 = query(
      collection(db, 'friendships'),
      where('user2Id', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    let friendships1: Friendship[] = [];
    let friendships2: Friendship[] = [];

    const friendshipsUnsubscribe1 = onSnapshot(
      friendshipsQuery1,
      (snapshot) => {
        friendships1 = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as Friendship[];
        
        setFriends([...friendships1, ...friendships2]);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching friendships 1:', error);
        setLoading(false);
      }
    );

    const friendshipsUnsubscribe2 = onSnapshot(
      friendshipsQuery2,
      (snapshot2) => {
        friendships2 = snapshot2.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as Friendship[];
        
        setFriends([...friendships1, ...friendships2]);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching friendships 2:', error);
        setLoading(false);
      }
    );

    return () => {
      userProfileUnsubscribe();
      friendRequestsUnsubscribe();
      friendshipsUnsubscribe1();
      friendshipsUnsubscribe2();
    };
  }, [user]);

  return {
    friends,
    friendRequests,
    userProfile,
    loading,
    error,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    updateUserStats,
    getUserProfileByPublicId,
  };
} 