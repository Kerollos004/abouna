/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useMenuContext, useMenuValueContext, useThemeContext } from '@/app/assets/contexts'
import React, {  useEffect, useState } from 'react'
import DayTime from './DayTime'
import Link from 'next/link'
import { Plus } from 'react-bootstrap-icons'
import Apointment from './Apointment'
import { List } from 'react-bootstrap-icons'
import { appointment } from '@/app/assets/assets'

export default function RenderdData({ appointments }: { appointments: appointment[] }) {
    const { value } = useMenuValueContext()
    const { theme } = useThemeContext()
    const { setOpenMenu } = useMenuContext()
    const [appointmentDate , setAppointmentDate] = useState<Date|null>(null)
    const getTheme = () => {
    const currentTheme = localStorage.getItem("theme")
    if (currentTheme === "light") {
        document.body.classList.add("light-mode")
        document.body.classList.remove("dark-mode")
    } else {
        document.body.classList.add("dark-mode")
        document.body.classList.remove("light-mode")
    }
}
useEffect(() => {
    getTheme()
}, [])
    
    const getToday = () => {
        const date = new Date()
        setAppointmentDate(date)
    } 

    useEffect(() => {
        getToday()
    } , [])
    
    const filteredAppointments = appointments.filter((appointment)=> appointment?.type === value)
    const filteredAppointmentsMap = filteredAppointments.map(appointment => {
        return (
            <Apointment key={appointment?.id} appointment={appointment} />
        )
    })

const todayStr = new Date().toISOString().split('T')[0];

const todayAppointments = appointments.filter((appointment) => {
    if (!appointment?.date) return false;
    // التأكد من تطابق التاريخ بصيغة النص
    return appointment.date === todayStr;
});

const todayAppointmentsMap = todayAppointments.map(appointment => {
    return (
        <Apointment key={appointment?.id} appointment={appointment} />
    )
})
    
    const customedAppointments = appointments.filter((appointment) => {
    return appointment.custumed
});

const customedAppointmentsMap = customedAppointments.map(appointment => {
    return (
        <Apointment key={appointment?.id} appointment={appointment} />
    )
})

    const allAppointmentsMap = appointments.map(appointment => {
        return (
            <Apointment key={appointment?.id} appointment={appointment} />
        )
    })

    const handleDisplayAppointment = () => {
        if (value === "today") {
            return todayAppointmentsMap
        }
        if (value === "all_data") {
            return allAppointmentsMap
        }
        if (value === "other") {
            return customedAppointmentsMap
        }
        else {
            return filteredAppointmentsMap
        }
    }
return (
    <main className={`  ${theme === "light" ? "text-black border-rose-950  " : "text-white border-amber-200  "} rounded-2xl min-h-screen w-full md:w-[70%] relative right-0  border-2 px-2.5 md:px-6 py-6 pb-20  md:right-[30%]`}  >
            <div className="  md:hidden rounded-xl p-1   text-3xl">
                <List onClick={()=>{setOpenMenu(true)}}  />
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center ">
            <div>
                <h3 className={` text-2xl font-bold mb-2  `} >   اهلا بك يا ابونا </h3>
                <DayTime/>
            </div>
            <Link 
                className='flex px-5 py-2.5 text-2xl text-amber-200 bg-rose-900 border rounded-2xl hover:bg-amber-200 hover:text-rose-950  justify-center items-center gap-1  ' 
                href={"/add_appointment"}
            >
                <span> موعد جديد </span>
                <Plus  />
            </Link>
        </div>
        {
            appointments?.length > 0 ? handleDisplayAppointment() : <h3 className='text-center mt-5 text-3xl font-bold'> لا يوجد مواعيد مسجله </h3>
        }
    </main>
)
}
