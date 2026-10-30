import { useState, useEffect, useRef } from 'react';
import TodoForm from './components/ToDoForm';
import TodoItem from './components/ToDoItem';
import Filters from './components/Filter';
import { ThemeToggle } from './components/ThemeToggle';
import type { Todo, Filter } from './types/types';
import './index.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<Filter>('all');
  
 
  const [inputText, setInputText] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

 
  const handleAdd = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    
    const newTodo: Todo = { id: crypto.randomUUID(), text: trimmed, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
    
    setInputText(''); 
    inputRef.current?.focus(); 
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  
  const editTodo = (id: string, newText: string) => {
  setTodos((prev) =>
    prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
  );
}

  const visibleTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  
  const handleFabClick = () => {
    if (inputText.trim()) {
      handleAdd(); 
    } else {
      inputRef.current?.focus(); 
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">TODO LIST</h1>

      <div className="top-controls">
        <TodoForm 
          ref={inputRef} 
          text={inputText} 
          setText={setInputText} 
          onSubmit={handleAdd} 
        />
        <Filters current={filter} onChange={setFilter} />
        <ThemeToggle />
      </div>

      {visibleTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Список пуст</p>
      ) : (
        <ul className="todo-list">
          {visibleTodos.map((todo) => (
           <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
/>
          ))}
        </ul>
      )}

      
      <button 
        className="fab-btn" 
        onClick={handleFabClick}
        title="Добавить задачу"
      >
        +
      </button>
    </div>
  );
}

export default App;