import React, { useState, useEffect } from 'react';
import './App.css';

import { API } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { listTodos } from './graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' };


function App() {

  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos });
    setTodos(apiData.data.listTodos.items);
  }

  async function createTodo() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createTodoMutation, variables: { input: formData } });
    setTodos([...todos, formData]);
    setFormData(initialFormState);
  }

  async function deleteTodo({ id }) {
    const newTodosArray = todos.filter(todo => todo.id !== id);
    setTodos(newTodosArray);
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
  }



  return (
    <Authenticator>
      {({ signOut, user }) => {
        return <div className="App">
          <p>
            Hey {user.attributes.name}, welcome to my channel, with auth!
          </p>
          <button onClick={signOut}>Sign out</button>
          <hr />
          <input
            onChange={e => setFormData({ ...formData, 'name': e.target.value })}
            placeholder="Todo name"
            value={formData.name}
          />
          <input
            onChange={e => setFormData({ ...formData, 'description': e.target.value })}
            placeholder="Todo description"
            value={formData.description}
          />
          <button onClick={createTodo}>Create Todo</button>
          <div style={{ marginBottom: 30 }}>
            {
              todos.map(todo => (
                <div key={todo.id || todo.name}>
                  <h2>{todo.name}</h2>
                  <p>{todo.description}</p>
                  <button onClick={() => deleteTodo(todo)}>Delete todo</button>
                </div>
              ))
            }
          </div>
        </div>
      }}
    </Authenticator>
  );
}

export default App;
