
export function HeaderNav({ userName }) {
    return(
        <section className='flex flex-row justify-between p-5 border-b-2 bg-stone-300'>
            <div>
                <h1 className="text-3xl font-bold">Administración de Horarios</h1>
                <h3 className='text-xl font-semibold text-gray-700'>PCEO Informáticas + Matemáticas</h3>
            </div>
            <button>
                <div className="flex flex-row items-center gap-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out">
                    <span className='text-base'>{userName}</span>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" className='w-10 h-10 rounded-full'/>
                </div>
            </button>
        </section>
    )
}