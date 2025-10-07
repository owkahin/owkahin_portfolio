import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { portfolioData } from '@/constants/data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleSocialPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Get In Touch</Text>
      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor={Colors.dark.textMuted}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor={Colors.dark.textMuted}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Message"
            placeholderTextColor={Colors.dark.textMuted}
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Send Message</Text>
            <Send size={20} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <Text style={styles.socialTitle}>Connect With Me</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialPress(portfolioData.social.github)}
              activeOpacity={0.7}
            >
              <Github size={24} color={Colors.dark.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialPress(portfolioData.social.linkedin)}
              activeOpacity={0.7}
            >
              <Linkedin size={24} color={Colors.dark.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialPress(portfolioData.social.twitter)}
              activeOpacity={0.7}
            >
              <Twitter size={24} color={Colors.dark.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialPress(`mailto:${portfolioData.social.email}`)}
              activeOpacity={0.7}
            >
              <Mail size={24} color={Colors.dark.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: Colors.dark.background,
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
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  formContainer: {
    marginBottom: 40,
  },
  input: {
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  submitButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 24,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
