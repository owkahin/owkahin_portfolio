import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, Eye } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { portfolioData } from '@/constants/data';

const { height } = Dimensions.get('window');

interface HeroProps {
  onScrollToSection: (section: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.background, Colors.dark.surface, Colors.dark.background]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <Animated.View style={[styles.glowCircle, { opacity: glowOpacity }]} />
      <Animated.View style={[styles.glowCircle2, { opacity: glowOpacity }]} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [{ scale: imageScale }],
            },
          ]}
        >
          <View style={styles.imageGlow} />
          <Image
            source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/iaogylbdna3yvlatynl1l' }}
            style={styles.profileImage}
          />
        </Animated.View>
        <Text style={styles.greeting}>Hi, I am</Text>
        <Text style={styles.name}>{portfolioData.name}</Text>
        <Text style={styles.title}>{portfolioData.title}</Text>
        <Text style={styles.tagline}>{portfolioData.tagline}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => onScrollToSection('contact')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.dark.primary, Colors.dark.secondary]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.primaryButtonText}>Hire Me</Text>
              <ArrowRight size={20} color={Colors.dark.text} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => onScrollToSection('projects')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>View Projects</Text>
            <Eye size={20} color={Colors.dark.primary} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: height * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  glowCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: Colors.dark.primary,
    top: -100,
    right: -100,
    opacity: 0.2,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 100,
  },
  glowCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.dark.secondary,
    bottom: -50,
    left: -50,
    opacity: 0.2,
    shadowColor: Colors.dark.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 80,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  imageGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.dark.primary,
    opacity: 0.3,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    top: 0,
    left: 0,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: Colors.dark.primary,
  },
  greeting: {
    fontSize: 20,
    color: Colors.dark.textSecondary,
    marginBottom: 8,
    fontWeight: '400' as const,
  },
  name: {
    fontSize: 56,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: Colors.dark.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: Colors.dark.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
    maxWidth: 500,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 8,
  },
  primaryButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.dark.primary,
    gap: 8,
  },
  secondaryButtonText: {
    color: Colors.dark.primary,
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
