export function HeaderNav({ title }) {
    return(
        <section className='flex flex-row justify-between pl-2 sm:px-5 pt-5 pb-2 border-b-2 border-[var(--secondary-black)]'>
            <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <h3 className='text-lg sm:text-xl font-semibold text-[var(--secondary-black)]'>Grados de Informática y Ciencias</h3>
            </div>
        </section>
    )
}