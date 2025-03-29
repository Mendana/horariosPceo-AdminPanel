
export function HeaderNav({ title }) {
    return(
        <section className='flex flex-row justify-between px-5 pt-5 pb-2 border-b-2 border-[var(--secondary-black)]'>
            <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <h3 className='text-xl font-semibold text-[var(--secondary-black)]'>PCEO Informáticas + Matemáticas</h3>
            </div>
        </section>
    )
}