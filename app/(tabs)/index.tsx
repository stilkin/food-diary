import { View, Text, StyleSheet } from 'react-native';
import { FAB } from '@/components/FAB';
import { ActionSheet } from '@/components/ActionSheet';
import { useAppStore } from '@/store';

export default function TimelineScreen() {
  const { isActionSheetOpen, openActionSheet, closeActionSheet } = useAppStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timeline</Text>
      <FAB onPress={openActionSheet} />
      <ActionSheet visible={isActionSheetOpen} onClose={closeActionSheet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
});
