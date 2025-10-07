import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/colors';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import ScrollToTop from '@/components/ScrollToTop';

export default function Portfolio() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollY, setScrollY] = useState(0);
  const sectionRefs = useRef<{ [key: string]: number }>({});

  const handleScrollToSection = (section: string) => {
    const yOffset = sectionRefs.current[section];
    if (yOffset !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
    }
  };

  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleScroll = (event: any) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <Navigation onScrollToSection={handleScrollToSection} />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View
          onLayout={(event) => {
            sectionRefs.current.hero = event.nativeEvent.layout.y;
          }}
        >
          <Hero onScrollToSection={handleScrollToSection} />
        </View>

        <View
          onLayout={(event) => {
            sectionRefs.current.about = event.nativeEvent.layout.y;
          }}
        >
          <About />
        </View>

        <View
          onLayout={(event) => {
            sectionRefs.current.projects = event.nativeEvent.layout.y;
          }}
        >
          <Projects onScrollToSection={handleScrollToSection} />
        </View>

        <View
          onLayout={(event) => {
            sectionRefs.current.skills = event.nativeEvent.layout.y;
          }}
        >
          <Skills />
        </View>

        <View
          onLayout={(event) => {
            sectionRefs.current.contact = event.nativeEvent.layout.y;
          }}
        >
          <Contact />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerText}>
              <View style={styles.footerDot} />
              <View style={styles.footerTextContent}>
                <Text style={styles.footerName}>Alex Morgan</Text>
                <Text style={styles.footerCopyright}>© 2025 All rights reserved</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <ScrollToTop onPress={handleScrollToTop} scrollY={scrollY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  footerContent: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  footerText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  footerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.primary,
  },
  footerTextContent: {
    gap: 4,
  },
  footerName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.dark.text,
  },
  footerCopyright: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
});
