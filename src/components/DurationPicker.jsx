import React, { useState, useRef, useEffect } from 'react';
import '../styles/durationPicker.css';

export const DurationPicker = () => {
  const [selectedDuration, setSelectedDuration] = useState({ hours: 1, minutes: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef();

  const formatDuration = ({ hours, minutes }) => {
    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    return `${h}:${m} h`;
  };

  const handleSelect = (hours, minutes) => {
    setSelectedDuration({ hours, minutes });
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Genera duraciones de 0:30 a 8:00 con intervalos de 30 min
  const durations = [];
  for (let h = 0; h <= 8; h++) {
    for (let m of [0, 30]) {
      if (h === 0 && m === 0) continue;
      if (h === 8 && m > 0) continue;
      durations.push({ hours: h, minutes: m });
    }
  }

  return (
    <div className="durationpicker-container" ref={ref}>
      <button
        type="button"
        className="duration-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {formatDuration(selectedDuration)}
      </button>

      {showDropdown && (
        <div className="duration-dropdown">
          {durations.map((d, i) => (
            <div
              key={i}
              className="duration-option"
              onClick={() => handleSelect(d.hours, d.minutes)}
            >
              {formatDuration(d)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};