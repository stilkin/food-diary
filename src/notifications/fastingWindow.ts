import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIF_ID = 'fasting-window';
const PERM_KEY = 'notif_permission_requested';

export async function requestPermissionIfNeeded(): Promise<boolean> {
  const asked = await AsyncStorage.getItem(PERM_KEY);
  if (asked) {
    const { status } = await Notifications.getPermissionsAsync();
    return status === 'granted';
  }
  const { status } = await Notifications.requestPermissionsAsync();
  await AsyncStorage.setItem(PERM_KEY, 'true');
  return status === 'granted';
}

export async function scheduleFastingNotification(
  windowEndMs: number,
  leadMinutes: number
): Promise<void> {
  await cancelFastingNotification();
  const triggerMs = windowEndMs - leadMinutes * 60_000;
  if (triggerMs <= Date.now()) return;
  await Notifications.scheduleNotificationAsync({
    identifier: NOTIF_ID,
    content: {
      title: 'Fasting window closing soon',
      body: `Your eating window closes in ${leadMinutes} minutes.`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: new Date(triggerMs),
    },
  });
}

export async function cancelFastingNotification(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(NOTIF_ID);
}
