/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { appointment } from '@/app/assets/assets'
import {  useThemeContext } from '@/app/assets/contexts'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/app/assets/supabase_client'
import AppointmentDates from './AppointmentDates'

export default function Apointment({ appointment }: { appointment: appointment }) {
    const { theme } = useThemeContext()
    const [loading, setLoading] = useState(false)
    const [selectedType , setSelectedType] = useState<string>("")
    const [isFinished, setIsFinished] = useState(false)


    const handleTypes = () => {
        if (appointment.type === "mass") {
            setSelectedType("قداس")
        }
        if (appointment.type === "visit") {
            setSelectedType("افتقاد")
        }
        if (appointment.type === "confession") {
            setSelectedType("اعتراف")
        }
        if (appointment.type === "meeting") {
            setSelectedType("اجتماع")
        }
        if (appointment.type === "other") {
            setSelectedType(appointment?.customed_Appointment)
        }
    }

    useEffect(() => {
        handleTypes()
    } , [])

    const handleFinishAppointment = async () => {
        if (!appointment?.id) return;
        
        setLoading(true)
        
        const { error } = await supabase
            .from("appointments")
            .delete()
            .eq("id", appointment.id) 

        if (error) {
            console.log("error in deleting appointment:", error.message)
            setLoading(false)
        } else {
            console.log("Appointment finished successfully")
            setIsFinished(true) 
        }
    }

    if (isFinished) return null;

    return (
        <article className={`mb-3 mt-5 rounded-2xl border-2 ${theme === "light" ? "border-amber-200 bg-[#FFFDF7] text-black" : "border-amber-200 bg-white/10 text-white"} grid grid-cols-1 md:grid-cols-[auto_1fr]`}>

            <AppointmentDates appointment={appointment} />

            <div className="flex flex-col md:flex-row gap-4 p-4 justify-between items-start md:items-center">
                <div>
                    <span className='py-1 px-4 mb-2 inline-block rounded-3xl text-lg font-semibold bg-amber-200/20 text-amber-500 border border-amber-200/30'>
                        {selectedType} 
                    </span>
                    <h3 className='text-2xl font-bold mb-1'>{appointment?.owner}</h3>
                    <h3 className='text-lg mb-2'>{appointment?.address}</h3>
                    <p className='text-lg'>{appointment?.details}</p>
                </div>

                <button 
                    onClick={handleFinishAppointment}
                    disabled={loading}
                    className='w-full md:w-auto flex justify-center px-6 py-2.5 text-xl text-rose-950 bg-amber-200 border border-amber-300 rounded-2xl hover:bg-rose-950 hover:text-amber-200 hover:border-rose-900 items-center gap-1 font-semibold shadow-md disabled:opacity-50 transition-all'
                >
                    {loading ? "جاري الإنهاء..." : "انهاء الموعد"}
                </button>
            </div>
        </article>
    )
}