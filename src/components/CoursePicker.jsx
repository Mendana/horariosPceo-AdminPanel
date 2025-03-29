import React, { useState, useRef, useEffect } from 'react';
import '../styles/coursePicker.css';

export const CoursePicker = () => {
  const courses = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'];
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
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

  const handleSelect = (course) => {
    setSelectedCourse(course);
    setShowDropdown(false);
  };

  return (
    <div className="coursepicker-container" ref={ref}>
      <button
        type="button"
        className="course-button"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {selectedCourse}
      </button>

      {showDropdown && (
        <div className="course-dropdown">
          {courses.map((course) => (
            <div
              key={course}
              className="course-option"
              onClick={() => handleSelect(course)}
            >
              {course}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
