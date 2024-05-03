import { getAll, addUser } from './utils';
import { useEffect, useState } from 'react';
import './index.css';

export default function UserTodoComp({ ID, setIsRed, setUserData }) {
  const [todos, setTodos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [Title, setTitle] = useState('');
  const [newTodo, setNewTodo] = useState({ userId: ID, id: '', title: '', completed: false });

  const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

  const updateTodo = async (todo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, completed: true };
      }
      return t;
    });
    const isAllCompleted = updatedTodos.every((todo) => todo.completed);
    if (isAllCompleted) {
      setIsRed(true);
    } else {
      setIsRed(false);
    }
    setTodos(updatedTodos);
  };

  const addTodo = async () => {
    const { data } = await addUser(TODOS_URL, newTodo);
    setTodos([...todos, data]);
    setShowAddForm(false);
    setTitle('');
    setUserData([...todos, newTodo]);
  };

  const newTask = (e) => {
    setTitle(e.target.value);
    setNewTodo({ ...newTodo, title: e.target.value, id: 1 + todos.length });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await getAll(TODOS_URL);
      const filteredTodos = data.filter((todo) => todo.userId === ID);
      setTodos(filteredTodos);
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>User Todos</h2>
      {!showAddForm && (
        <button style={{ marginLeft: '16rem', padding: '0.1em 0.5em' }} onClick={() => setShowAddForm(true)}>Add</button>
      )}

      {showAddForm ? (
        <div>
          <h3>New Todo - User {ID}</h3>
          <div style={{ border: '1px solid black', alignItems: 'center' }}>
            <br />
            Title: <input type="text" value={Title} onChange={newTask} /> <br /> <br />
            <button onClick={addTodo}>Add</button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={{ border: '2px solid black', alignItems: 'center' }}>
          {todos.map((todo) => (
            <div key={todo.id} style={{ border: '1px solid purple', padding: '10px', margin: '10px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label>
                  Title: <strong>{todo.title}</strong>
                </label>{' '}
                <br />
                <label>Completed: {todo.completed.toString()}</label>
              </div>
              {!todo.completed && (
                <button
                  style={{ display: 'inline-flex', padding: '0.1em 0.5em', fontSize: '0.8em', width: 'fit-content', height: 'fit-content' }}
                  onClick={() => updateTodo(todo)}>Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
