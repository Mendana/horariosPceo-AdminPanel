import React, { useState, useEffect, useRef } from 'react';
import '../styles/customDatePicker.css';

export const CustomDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowCalendar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const dayOfWeek = startOfMonth.getDay();
    const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());

    const handleDayClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
        setShowCalendar(false);
    };

    const prevMonth = () => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() - 1);
        setCurrentMonth(newMonth);
    };

    const nextMonth = () => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() + 1);
        setCurrentMonth(newMonth);
    };

    const formatDate = (date) =>
        date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit' });

    return (
        <div className="calendar-container" ref={ref}>
            <button
                type="button"  // 👈 muy importante
                className="date-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCalendar((prev) => !prev);
                }}
            >
                {formatDate(selectedDate)}
            </button>

            {showCalendar && (
                <div
                    className="calendar"
                    onClick={(e) => e.stopPropagation()} // 👈 esto es clave
                >
                    <div className="calendar-header">
                        <button  type="button" onClick={prevMonth}>{'<'}</button>
                        <span>
                            {currentMonth.toLocaleDateString('es-ES', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                        <button  type="button" onClick={nextMonth}>{'>'}</button>
                    </div>

                    <div className="calendar-grid">
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => (
                            <div key={d} className="day-name">{d}</div>
                        ))}

                        {Array.from({ length: dayOfWeek }, (_, i) => (
                            <div key={'empty-' + i} className="empty-day"></div>
                        ))}

                        {Array.from({ length: daysInMonth }, (_, i) => {
                            const day = i + 1;
                            const isSelected =
                                selectedDate.getDate() === day &&
                                selectedDate.getMonth() === currentMonth.getMonth() &&
                                selectedDate.getFullYear() === currentMonth.getFullYear();

                            return (
                                <div
                                    key={day}
                                    className={`day ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleDayClick(day)}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
