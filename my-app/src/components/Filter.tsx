import { useState, useRef, useEffect } from 'react';
import type { Filter } from '../types/types';

interface FiltersProps {
  current: Filter;
  onChange: (f: Filter) => void;
}

const options: { value: Filter; label: string }[] = [
  { value: 'all', label: 'ALL' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

function Filters({ current, onChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: Filter) => {
    onChange(value);
    setIsOpen(false);
  };


  const currentLabel = options.find((opt) => opt.value === current)?.label;

  return (
    <div className="custom-select-wrapper" ref={dropdownRef}>
     
      <button 
        type="button" 
        className="filter-select" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLabel}
        <svg 
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>


      {isOpen && (
        <ul className="custom-options">
          {options.map((opt) => (
            <li 
              key={opt.value} 
              className={`custom-option ${opt.value === current ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Filters;