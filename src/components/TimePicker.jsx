import React, { useRef, useEffect, useState } from 'react';
import '../styles/timePicker.css';

export const TimePicker = ({ value, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef();

  const formatTime = ({ hour, minute }) => {
    const h = hour.toString().padStart(2, '0');
    const m = minute.toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const parseValue = (value) => {
    const [hour, minute] = value.split(':').map(Number);
    return { hour, minute };
  };

  const selectedTime = parseValue(value);

  const handleSelect = (hour, minute) => {
    const formatted = formatTime({ hour, minute });
    onChange(formatted); // ← actualiza el estado del padre
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

  const hours = Array.from({ length: 14 }, (_, i) => i + 8);
  const minutes = [0, 30];

  return (
    <div className="timepicker-container" ref={ref}>
      <button
        type="button"
        className="time-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {formatTime(selectedTime)}
      </button>

      {showDropdown && (
        <div className="time-dropdown">
          {hours.map((hour) => (
            <div key={hour} className="time-hour">
              {minutes.map((minute) => (
                <div
                  key={`${hour}-${minute}`}
                  className="time-option"
                  onClick={() => handleSelect(hour, minute)}
                >
                  {formatTime({ hour, minute })}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
