export function SubjectCheckbox({ subject, subjectKey, isSelected, onToggle, disabled = false }) {
    return (
      <label
        className={`flex items-center gap-3 px-3 py-2 border rounded-md shadow-sm transition-all ${
          isSelected
            ? 'bg-blue-50 border-[var(--main-blue)] text-[var(--main-blue)]'
            : 'bg-white hover:bg-gray-50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          disabled={disabled}
          className="w-4 h-4 text-[var(--main-blue)] bg-gray-100 border-gray-300 rounded focus:ring-blue-500 transition-all disabled:cursor-not-allowed"
        />
        <span className="text-sm text-gray-800">{subject}</span>
      </label>
    );
  }