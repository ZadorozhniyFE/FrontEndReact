import { forwardRef } from 'react';

interface TodoFormProps {
  text: string;
  setText: (text: string) => void;
  onSubmit: () => void;
}

const TodoForm = forwardRef<HTMLInputElement, TodoFormProps>(
  ({ text, setText, onSubmit }, ref) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(); 
    };

    return (
      <form onSubmit={handleSubmit} className="search-wrapper">
        <input
          ref={ref}
          className="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search note..."
        />
        <span className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
      </form>
    );
  }
);

export default TodoForm;