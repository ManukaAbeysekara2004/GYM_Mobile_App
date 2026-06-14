import { Platform } from 'react-native';

let currentUserId: string | null = null;
let currentUserEmail: string | null = null;

export const Session = {
  setUserId: (id: string | null) => {
    currentUserId = id;
    if (Platform.OS === 'web') {
      if (id) {
        localStorage.setItem('gym_app_user_id', id);
      } else {
        localStorage.removeItem('gym_app_user_id');
      }
    }
  },
  getUserId: (): string | null => {
    if (Platform.OS === 'web') {
      return currentUserId || localStorage.getItem('gym_app_user_id');
    }
    return currentUserId;
  },
  setUserEmail: (email: string | null) => {
    currentUserEmail = email;
    if (Platform.OS === 'web') {
      if (email) {
        localStorage.setItem('gym_app_user_email', email);
      } else {
        localStorage.removeItem('gym_app_user_email');
      }
    }
  },
  getUserEmail: (): string | null => {
    if (Platform.OS === 'web') {
      return currentUserEmail || localStorage.getItem('gym_app_user_email');
    }
    return currentUserEmail;
  },
  clear: () => {
    currentUserId = null;
    currentUserEmail = null;
    if (Platform.OS === 'web') {
      localStorage.removeItem('gym_app_user_id');
      localStorage.removeItem('gym_app_user_email');
    }
  }
};
