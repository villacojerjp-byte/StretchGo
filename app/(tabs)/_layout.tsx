import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BIcon, { BiName } from '../../src/components/Icon';
import { colors, fonts } from '../../src/theme';

type TabIcon = { focused: boolean; name: BiName };

function Icon({ focused, name }: TabIcon) {
  return (
    <View style={styles.iconWrap}>
      <BIcon name={name} size={22} color={focused ? colors.ink : colors.inkFaint} />
      {focused ? <View style={styles.dot} /> : <View style={styles.dotPlaceholder} />}
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.inkFaint,
        tabBarStyle: [
          styles.bar,
          { height: 58 + insets.bottom, paddingBottom: insets.bottom },
        ],
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: { paddingTop: 8 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ focused }) => <Icon focused={focused} name={focused ? 'calendar-check-fill' : 'calendar-check'} />,
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: 'Routines',
          tabBarIcon: ({ focused }) => <Icon focused={focused} name={focused ? 'grid-fill' : 'grid'} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ focused }) => <Icon focused={focused} name={focused ? 'bar-chart-line-fill' : 'bar-chart-line'} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <Icon focused={focused} name={focused ? 'person-fill' : 'person'} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    elevation: 0,
    ...Platform.select({ ios: { shadowOpacity: 0 } }),
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 11,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  iconWrap: { alignItems: 'center', justifyContent: 'center' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.ink, marginTop: 4 },
  dotPlaceholder: { width: 4, height: 4, marginTop: 4 },
});
