import '../styles/CreateSubject.css'
import { FormItem } from './FormItem.jsx'
import { CustomDatePicker } from './CustomDatePicker.jsx'
import { TimePicker } from './TimePicker.jsx'
import { DurationPicker } from './DurationPicker.jsx'
import { CoursePicker } from './CoursePicker.jsx'

export function CreateSubject () {
    return (
        <section className="main-create-subject w-[90%] flex flex-col gap-4 px-8 py-5">
            <h1 className='text-2xl font-semibold'>Añadir clases</h1>
            <form className='flex flex-col gap-2 w-full'>
                <FormItem
                    label='Nombre/código de la asignatura/examen:'
                    placeholder='PyE-CE1 / BD.T.1 / Examen teórico BD'
                />
                <FormItem
                    label='Clase/Aula:'
                    placeholder='S01 / A-2-01 / Aula B'
                />
                <section className='flex flex-row gap-10 items-center'>
                    <div className='flex flex-row gap-3 items-center pt-2'>
                        <label className="text-sm font-medium">Curso: </label>
                        <CoursePicker/>
                    </div>
                    <div className='flex flex-row gap-3 items-center pt-2'>
                        <label className="text-sm font-medium">Fecha: </label>
                        <CustomDatePicker/>
                    </div>
                    <div className='flex flex-row gap-3 items-center pt-2'>
                        <label className="text-sm font-medium">Hora Inicio: </label>
                        <TimePicker/>
                    </div>
                    <div className='flex flex-row gap-3 items-center pt-2'>
                        <label className="text-sm font-medium">Duración: </label>
                        <DurationPicker/>
                    </div>
                </section>
                
            </form>
        </section>
    )
}