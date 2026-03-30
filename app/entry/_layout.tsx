import { Stack } from 'expo-router';

export default function EntryLayout() {
  return <Stack screenOptions={{ presentation: 'modal', headerShown: false }} />;
}
