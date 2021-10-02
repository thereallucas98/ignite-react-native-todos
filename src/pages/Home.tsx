import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const isTitleExists = tasks.find(task => task.title === newTaskTitle);

    if (isTitleExists) {
      Alert.alert(
        `Atenção ⚠!`,
        'Notamos que você já tem adicionado essa tarefa, por favor adicione uma nova'
      );
      return;
    }

    const data = { 
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }

      return { ...item };
    });

    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remoção de Tarefa",
      "Você realmente deseja excluir essa tarefa?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Sim, desejo!",
          onPress: () => {
            setTasks(oldState => oldState.filter(
              task => task.id !== id,
            ));
          },
          style: "default"
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})