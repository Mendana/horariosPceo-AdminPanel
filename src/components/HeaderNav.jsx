import { toast } from 'react-hot-toast';

export function HeaderNav({ title }) {

    // For doing a toast, do not think this is useful at all
    const hacerTostada = () => {
        const promesa = new Promise((resolve, reject) => {
          setTimeout(() => {
            const suerte = Math.random(); // número entre 0 y 1
            if (suerte < 0.7) {
              resolve(); // 70% de éxito
            } else {
              reject(new Error('🔥 Se quemó...'));
            }
          }, 2000);
        });
      
        toast.promise(promesa, {
          loading: 'Haciendo la tostada...',
          success: '¡Tostada lista! 🥳',
          error: 'Se quemó la tostada 😵‍💫',
        });
      };
      

    return(
        <section className='flex flex-row justify-between px-5 pt-5 pb-2 border-b-2 border-[var(--secondary-black)]'>
            <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <h3 className='text-xl font-semibold text-[var(--secondary-black)]'>Grados de Informática y Ciencias</h3>
            </div>
            <div>
                <button className='submit-button' onClick={hacerTostada}>
                    Hacer una tostada
                </button>
            </div>
        </section>
    )
}