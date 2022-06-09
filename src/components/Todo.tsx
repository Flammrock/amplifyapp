import React, { useState, useEffect, useRef } from "react";
import {
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon
} from '@ionic/react';
import { imageOutline } from 'ionicons/icons';

import { API, Storage } from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../graphql/mutations';

const initialFormState: any = { name: '', description: '', image: null };

const Todo: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [todos, setTodos] = useState<any>([]);
  const [formData, setFormData] = useState<any>(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const apiData: any = await API.graphql({ query: listTodos });
    await Promise.all(apiData.data.listTodos.items.map(async (todo:any) => {
      if (todo.image) {
        const image = await Storage.get(todo.image);
        todo.image = image;
      }
      return todo;
    }))
    setTodos(apiData.data.listTodos.items);
  };

  async function createTodo() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createTodoMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
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
    setFormData({ ...formData, name: name });
  };
  const setDescriptionC = (description: string) => {
    setDescription(description);
    setFormData({ ...formData, description: description });
  };

  const onUploadImage = async (files: FileList | null) => {
    if (files==null || !files[0]) return;
    const file = files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchTodos();
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
            <IonButton fill="outline" expand="block" slot="end" style={{ marginTop: '10px', marginBottom: '10px'}} onClick={(e) => {
              if (inputFileRef.current != null) {
                inputFileRef.current.click();
              }
            }}>
              <IonIcon icon={imageOutline} slot="start"></IonIcon>
              <input ref={inputFileRef} id="file" style={{ display: 'none' }} hidden type="file" accept="image/*" onChange={e => onUploadImage(e.target.files)} />
              {formData.image==null||typeof formData.image==='undefined'?'Select an image...':formData.image}
            </IonButton>
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
              {
                todo.image && <img alt="" src={todo.image} style={{width: 400}} />
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Todo;



