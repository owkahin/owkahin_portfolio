import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Download } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { portfolioData } from '@/constants/data';

export default function About() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const allSkills = [
    ...portfolioData.skills.frontend,
    ...portfolioData.skills.backend,
    ...portfolioData.skills.tools,
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.sectionTitle}>About Me</Text>
      <View style={styles.divider} />

      <View style={styles.content}>
        <Text style={styles.bio}>{portfolioData.bio}</Text>

        <View style={styles.skillsContainer}>
          <Text style={styles.skillsTitle}>Skills & Technologies</Text>
          <View style={styles.skillTags}>
            {allSkills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
          <Download size={20} color={Colors.dark.text} />
          <Text style={styles.downloadButtonText}>Download CV</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: Colors.dark.surface,
  },
  sectionTitle: {
    fontSize: 42,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: Colors.dark.primary,
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 2,
  },
  content: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  bio: {
    fontSize: 18,
    lineHeight: 28,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  skillsContainer: {
    marginBottom: 40,
  },
  skillsTitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  skillTag: {
    backgroundColor: Colors.dark.surfaceLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  skillText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '500' as const,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    alignSelf: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  downloadButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
