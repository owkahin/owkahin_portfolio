import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, X } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface NavigationProps {
  onScrollToSection: (section: string) => void;
}

export default function Navigation({ onScrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', section: 'hero' },
    { label: 'About', section: 'about' },
    { label: 'Projects', section: 'projects' },
    { label: 'Skills', section: 'skills' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.logo}>AM</Text>

        <View style={styles.desktopMenu}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.section}
              onPress={() => onScrollToSection(item.section)}
              activeOpacity={0.7}
            >
              <Text style={styles.navItem}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
          activeOpacity={0.7}
        >
          {isMenuOpen ? (
            <X size={24} color={Colors.dark.text} />
          ) : (
            <Menu size={24} color={Colors.dark.text} />
          )}
        </TouchableOpacity>
      </View>

      {isMenuOpen && (
        <View style={styles.mobileMenu}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.section}
              style={styles.mobileMenuItem}
              onPress={() => {
                onScrollToSection(item.section);
                setIsMenuOpen(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.mobileMenuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: Colors.dark.background + 'E6',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.dark.primary,
  },
  desktopMenu: {
    flexDirection: 'row',
    gap: 32,
    display: 'none',
  },
  navItem: {
    fontSize: 16,
    color: Colors.dark.text,
    fontWeight: '500' as const,
  },
  menuButton: {
    padding: 8,
  },
  mobileMenu: {
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  mobileMenuItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  mobileMenuText: {
    fontSize: 18,
    color: Colors.dark.text,
    fontWeight: '500' as const,
  },
});
