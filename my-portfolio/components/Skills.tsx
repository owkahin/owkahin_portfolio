import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Code2, Database, Wrench } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { portfolioData } from '@/constants/data';

export default function Skills() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const categories = [
    {
      title: 'Frontend',
      icon: Code2,
      skills: portfolioData.skills.frontend,
      color: Colors.dark.primary,
    },
    {
      title: 'Backend',
      icon: Database,
      skills: portfolioData.skills.backend,
      color: Colors.dark.secondary,
    },
    {
      title: 'Tools & Others',
      icon: Wrench,
      skills: portfolioData.skills.tools,
      color: Colors.dark.accent,
    },
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.sectionTitle}>Skills & Expertise</Text>
      <View style={styles.divider} />

      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <View key={index} style={styles.categoryCard}>
              <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
                <Icon size={32} color={category.color} />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <View style={styles.skillsList}>
                {category.skills.map((skill, skillIndex) => (
                  <View key={skillIndex} style={styles.skillItem}>
                    <View style={[styles.skillDot, { backgroundColor: category.color }]} />
                    <Text style={styles.skillName}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
    alignSelf: 'center',
  },
  categoryCard: {
    backgroundColor: Colors.dark.surfaceLight,
    borderRadius: 16,
    padding: 24,
    minWidth: 280,
    maxWidth: 350,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 20,
  },
  skillsList: {
    gap: 12,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  skillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  skillName: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    fontWeight: '500' as const,
  },
});
