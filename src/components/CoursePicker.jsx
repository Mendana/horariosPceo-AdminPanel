import React, { useRef, useEffect, useState } from 'react';
import '../styles/coursePicker.css';

const courseMap = {
  '1': 'Primero',
  '2': 'Segundo',
  '3': 'Tercero',
  '4': 'Cuarto',
  '5': 'Quinto'
};

export const CoursePicker = ({ value, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (key) => {
    setShowDropdown(false);     // 👈 cierra primero
    setTimeout(() => onChange(key), 0); // 👈 luego cambia valor (por si hay re-renders)
  };

  return (
    <div className="coursepicker-container" ref={ref}>
      <button
        type="button"
        className="course-button"
        onClick={() => setShowDropdown(prev => !prev)}
      >
        {courseMap[value] || 'Seleccionar curso'}
      </button>

      {showDropdown && (
        <div className="course-dropdown">
          {Object.entries(courseMap).map(([key, label]) => (
            <div
              key={key}
              className="course-option"
              onClick={() => handleSelect(key)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
