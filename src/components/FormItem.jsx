export function FormItem({ label, placeholder, value, onChange }) {
    return (
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          className="input-field"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  