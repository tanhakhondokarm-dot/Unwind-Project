import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type Task = { id: string; text: string; done: boolean };

export default function Index() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: task, done: false }]);
    setTask('');
  };
  const toggleTask = (id: string) =>
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));
  const remaining = tasks.filter(t => !t.done).length;

  return (
    <View style={s.container}>
      <Text style={s.title}>My Todo List</Text>
      <Text style={s.count}>Remaining tasks: {remaining}</Text>
      <View style={s.row}>
        <TextInput style={s.input} placeholder="Add a task..." value={task} onChangeText={setTask} />
        <TouchableOpacity style={s.addBtn} onPress={addTask}>
          <Text style={s.addText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={s.card}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => toggleTask(item.id)}>
              <Text style={[s.text, item.done && s.done]}>
                {item.done ? '✅ ' : '⬜ '}{item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={s.del}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f8', padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2d3748' },
  count: { fontSize: 16, color: '#718096', marginBottom: 16, marginTop: 4 },
  row: { flexDirection: 'row', marginBottom: 16 },
  input: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 10, marginRight: 8 },
  addBtn: { backgroundColor: '#4f46e5', paddingHorizontal: 20, justifyContent: 'center', borderRadius: 10 },
  addText: { color: '#fff', fontWeight: 'bold' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 10, elevation: 2 },
  text: { fontSize: 16, color: '#2d3748' },
  done: { textDecorationLine: 'line-through', color: '#a0aec0' },
  del: { color: '#e53e3e', fontWeight: 'bold' },
});