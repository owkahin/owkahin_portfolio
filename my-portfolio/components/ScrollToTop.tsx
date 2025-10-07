import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ArrowUp } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface ScrollToTopProps {
  onPress: () => void;
  scrollY: number;
}

export default function ScrollToTop({ onPress, scrollY }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (scrollY > 300) {
      setVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [scrollY]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <ArrowUp size={24} color={Colors.dark.text} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
