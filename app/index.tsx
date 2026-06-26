import React from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { useStore } from '../src/store/store';
import { colors } from '../src/theme';

export default function Index() {
  const { hydrated, state } = useStore();

  // Wait for persisted state to load before deciding where to route.
  if (!hydrated) {
    return <View style={{ flex: 1, backgroundColor: colors.bg }} />;
  }

  return <Redirect href={state.onboarded ? '/(tabs)' : '/onboarding'} />;
}
