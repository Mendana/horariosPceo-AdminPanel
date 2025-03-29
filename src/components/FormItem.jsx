

export function FormItem ({ label, placeholder }) {
    return (
        <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">{label}</label>
            <input 
                type="text" 
                placeholder={placeholder} 
                className="input-field"
            />
        </div>
    )
}