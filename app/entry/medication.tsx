import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import dayjs from 'dayjs';
import { insertEvent, getMedicationNames } from '@/db/queries';
import { useAppStore } from '@/store';

function titleCase(s: string): string {
  return s.trim().replace(/\b[a-zA-Z]/g, (c) => c.toUpperCase());
}

export default function MedicationEntryScreen() {
  const [timestamp, setTimestamp] = useState(new Date());
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allNames, setAllNames] = useState<string[]>([]);

  const addEvent = useAppStore((s) => s.addEvent);

  useEffect(() => {
    getMedicationNames().then(setAllNames);
  }, []);

  function handleNameChange(text: string) {
    setName(text);
    setNameError(false);
    if (text.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    const lower = text.toLowerCase();
    setSuggestions(allNames.filter((n) => n.toLowerCase().includes(lower)));
  }

  function handleSuggestionPress(suggestion: string) {
    setName(suggestion);
    setSuggestions([]);
    setNameError(false);
  }

  async function handleSave() {
    const normalised = titleCase(name);
    if (!normalised) {
      setNameError(true);
      return;
    }

    const id = await insertEvent({
      type: 'medication',
      timestamp: timestamp.getTime(),
      notes: notes.trim() || null,
      severity: null,
      bristol_type: null,
      name: normalised,
    });

    addEvent({
      id,
      type: 'medication',
      timestamp: timestamp.getTime(),
      notes: notes.trim() || null,
      severity: null,
      bristol_type: null,
      name: normalised,
      created_at: Date.now(),
    });
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Medication</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* ── Time field ── */}
      <View style={styles.field}>
        <Text style={styles.label}>Time</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.timeValue}>{dayjs(timestamp).format('HH:mm')}</Text>
        </TouchableOpacity>
        {(showPicker || Platform.OS === 'ios') && (
          <DateTimePicker
            value={timestamp}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, date) => {
              setShowPicker(false);
              if (date) setTimestamp(date);
            }}
          />
        )}
      </View>

      {/* ── Name field + autocomplete ── */}
      <View style={styles.field}>
        <Text style={[styles.label, nameError && styles.labelError]}>
          Medication name{nameError ? ' — required' : ''}
        </Text>
        <TextInput
          style={[styles.textInput, styles.nameInput, nameError && styles.inputError]}
          placeholder="e.g. Ibuprofen"
          value={name}
          onChangeText={handleNameChange}
          autoCapitalize="none"
          returnKeyType="next"
        />
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item}
            keyboardShouldPersistTaps="handled"
            style={styles.suggestionList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSuggestionPress(item)}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* ── Notes field ── */}
      <View style={styles.field}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.textInput, styles.notesInput]}
          multiline
          placeholder="Optional notes…"
          value={notes}
          onChangeText={setNotes}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  title: { fontSize: 17, fontWeight: '600' },
  cancel: { fontSize: 17, color: '#007AFF' },
  save: { fontSize: 17, color: '#007AFF', fontWeight: '600' },
  field: { paddingHorizontal: 16, paddingVertical: 12 },
  label: { fontSize: 13, color: '#888', marginBottom: 6 },
  labelError: { color: '#ff3b30' },
  timeValue: { fontSize: 17, color: '#007AFF' },
  textInput: {
    fontSize: 17,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
  },
  nameInput: { minHeight: 44 },
  inputError: { borderColor: '#ff3b30' },
  notesInput: { minHeight: 80, textAlignVertical: 'top' },
  suggestionList: {
    marginTop: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    maxHeight: 180,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: { fontSize: 16 },
});
