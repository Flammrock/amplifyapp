import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/react';

import { API } from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../graphql/mutations';

const initialFormState: any = { name: '', description: '' };

const Todo: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {

  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [todos, setTodos] = useState<any>([]);
  const [formData, setFormData] = useState<any>(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const apiData: any = await API.graphql({ query: listTodos });
    setTodos(apiData.data.listTodos.items);
  };

  async function createTodo() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createTodoMutation, variables: { input: formData } });
    setTodos([...todos, formData]);
    setFormData(initialFormState);
  };

  async function deleteTodo(data: any) {
    const newTodosArray = todos.filter((todo: any) => todo.id !== data.id);
    setTodos(newTodosArray);
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id: data.id } } });
  };

  const setNameC = (name: string) => {
    setName(name);
    setFormData({ ...formData, 'name': name });
  };
  const setDescriptionC = (description: string) => {
    setDescription(description);
    setFormData({ ...formData, 'description': description });
  };

  return (
    <div>
      {isAdmin ? (
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Be clear and precise</IonCardSubtitle>
            <IonCardTitle>Create a TODO</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput value={name} placeholder="Todo name" onIonChange={e => setNameC(e.detail.value!)}></IonInput>
            <IonInput value={description} placeholder="Todo description" onIonChange={e => setDescriptionC(e.detail.value!)}></IonInput>
            <IonButton onClick={createTodo} color="light">Create</IonButton>
          </IonCardContent>
        </IonCard>
      ) : <></>}



      <div style={{ marginBottom: 30 }}>
        {
          todos.map((todo: any) => (
            <div key={todo.id || todo.name}>
              <h2>{todo.name}</h2>
              <p>{todo.description}</p>
              {isAdmin?<IonButton onClick={() => deleteTodo(todo)} color="danger">Delete todo</IonButton>:<></>}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Todo;



