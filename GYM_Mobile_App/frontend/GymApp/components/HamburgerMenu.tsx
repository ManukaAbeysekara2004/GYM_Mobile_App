import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Session } from '../constants/Session';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BACKEND_URL = 'http://192.168.1.5:5000';

interface HamburgerMenuProps {
  currentRole: 'User' | 'Gym' | 'Coach' | 'Admin';
}

export default function HamburgerMenu({ currentRole }: HamburgerMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<boolean | null>(null);

  const fetchApprovalStatus = async () => {
    const userId = Session.getUserId();
    if (!userId) return;

    let endpoint = '';
    if (currentRole === 'User') {
      endpoint = `${BACKEND_URL}/api/user/user-get-approval-status/${userId}`;
    } else if (currentRole === 'Gym') {
      endpoint = `${BACKEND_URL}/api/gym/gym-get-approval-status/${userId}`;
    } else if (currentRole === 'Coach') {
      endpoint = `${BACKEND_URL}/api/coach/coach-get-approval-status/${userId}`;
    } else if (currentRole === 'Admin') {
      endpoint = `${BACKEND_URL}/api/admin/admin-get-approval-status/${userId}`;
    }

    if (!endpoint) return;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (res.status === 200 && data.approvalStatus !== undefined) {
        setApprovalStatus(data.approvalStatus);
      }
    } catch (err) {
      console.error('Failed to fetch approval status:', err);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      fetchApprovalStatus();
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigate = (route: string) => {
    setMenuOpen(false);

    // Prevent navigation blinking if we are already on that page
    if (pathname === route ||
      (route === '/userpage' && pathname === '/userpage') ||
      (route === '/gympage' && pathname === '/gympage') ||
      (route === '/coachpage' && pathname === '/coachpage') ||
      (route === '/adminpage' && pathname === '/adminpage')) {
      return;
    }

    // Use setTimeout to ensure the modal closes before navigation starts, for smooth UX
    setTimeout(() => {
      if (route === '/userpage') {
        router.push({ pathname: '/userpage', params: { userId: Session.getUserId() || '' } } as any);
      } else if (route === '/gympage') {
        router.push({ pathname: '/gympage', params: { userId: Session.getUserId() || '' } } as any);
      } else if (route === '/coachpage') {
        router.push({ pathname: '/coachpage', params: { userId: Session.getUserId() || '' } } as any);
      } else if (route === '/adminpage') {
        router.push({ pathname: '/adminpage', params: { userId: Session.getUserId() || '' } } as any);
      } else if (route === '/login') {
        router.push(route as any);
      } else {
        router.push({ pathname: route, params: { role: currentRole } } as any);
      }
    }, 100);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    setTimeout(() => {
      router.replace('/login');
    }, 100);
  };

  const getProfileRoute = () => {
    switch (currentRole) {
      case 'User':
        return '/userpage';
      case 'Gym':
        return '/gympage';
      case 'Coach':
        return '/coachpage';
      case 'Admin':
        return '/adminpage';
      default:
        return '/login';
    }
  };

  return (
    <>
      {/* ── Hamburger Icon Button (styled like the back button) ── */}
      <TouchableOpacity
        style={styles.hamburgerButton}
        onPress={toggleMenu}
        activeOpacity={0.7}
      >
        <Ionicons name="menu" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* ── Menu Drawer Modal ── */}
      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        {/* Fullscreen Backdrop overlay */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          {/* Menu Card Sidebar */}
          <TouchableOpacity
            style={styles.sidebar}
            activeOpacity={1}
            onPress={() => { }}
          >
            {/* Sidebar Header */}
            <View style={styles.header}>
              <View style={styles.roleTag}>
                <Ionicons name="shield-checkmark" size={16} color="#3B82F6" />
                <Text style={styles.roleTagText}>{currentRole}</Text>
              </View>

              <View style={styles.headerRight}>
                {approvalStatus !== null && (
                  <View style={[styles.statusBadge, approvalStatus ? styles.approvedBadge : styles.pendingBadge]}>
                    <Text style={[styles.statusBadgeText, approvalStatus ? styles.approvedBadgeText : styles.pendingBadgeText]}>
                      {approvalStatus ? 'Approved' : 'Pending'}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={toggleMenu}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sidebar Scroll Items */}
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Menu Section Label */}
              <Text style={styles.sectionLabel}>Navigation</Text>

              {/* 1. Profile */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate(getProfileRoute())}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="person-outline" size={22} color="#AAAAAA" />
                  <Text style={styles.menuItemText}>Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#555555" />
              </TouchableOpacity>

              {/* 2. Gym Zone */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('/gymzone')}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="barbell-outline" size={22} color="#AAAAAA" />
                  <Text style={styles.menuItemText}>Gym Zone</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#555555" />
              </TouchableOpacity>

              {/* 3. Coaches */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('/coaches')}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="people-outline" size={22} color="#AAAAAA" />
                  <Text style={styles.menuItemText}>Coaches</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#555555" />
              </TouchableOpacity>

              {/* 4. Supplements */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('/supplements')}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="leaf-outline" size={22} color="#AAAAAA" />
                  <Text style={styles.menuItemText}>Supplements</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#555555" />
              </TouchableOpacity>

              {/* 5. Workouts (USER ONLY) */}
              {currentRole === 'User' && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleNavigate('/workouts')}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons name="fitness-outline" size={22} color="#AAAAAA" />
                    <Text style={styles.menuItemText}>Workouts</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#555555" />
                </TouchableOpacity>
              )}

              {/* 6. Calorie Tracker */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('/calorietracker')}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="calculator-outline" size={22} color="#AAAAAA" />
                  <Text style={styles.menuItemText}>Calorie Tracker</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#555555" />
              </TouchableOpacity>

              {/* 7. Water Tracker */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('/watertracker')}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="water-outline" size={22} color="#AAAAAA" />
                  <Text style={styles.menuItemText}>Water Tracker</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#555555" />
              </TouchableOpacity>

              {/* 8. Reviews */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate('/reviews')}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="star-outline" size={22} color="#AAAAAA" />
                  <Text style={styles.menuItemText}>Reviews</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#555555" />
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* 9. Logout */}
              <TouchableOpacity
                style={[styles.menuItem, styles.logoutItem]}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                  <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#EF4444" opacity={0.5} />
              </TouchableOpacity>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  hamburgerButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 40,
    left: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-start',
  },
  sidebar: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT,
    backgroundColor: '#151515',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderRightWidth: 1,
    borderRightColor: '#2A2A2A',
    paddingTop: Platform.OS === 'ios' ? 60 : 45,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  roleTagText: {
    color: '#3B82F6',
    fontWeight: '700',
    fontSize: 13,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionLabel: {
    color: '#555555',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 15,
    paddingLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#252525',
    marginVertical: 15,
  },
  logoutItem: {
    borderColor: 'rgba(239, 68, 68, 0.2)',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  logoutText: {
    color: '#EF4444',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  approvedBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.35)',
  },
  approvedBadgeText: {
    color: '#22C55E',
  },
  pendingBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.12)',
    borderColor: 'rgba(249, 115, 22, 0.35)',
  },
  pendingBadgeText: {
    color: '#F97316',
  },
});
