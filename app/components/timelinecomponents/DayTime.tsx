/* eslint-disable react-hooks/set-state-in-effect */


"use client"
import React, { useEffect, useState } from 'react'

export default function DayTime() {
    const [day, setDay] = useState<number>(0)
    const [monthName, setMonthName] = useState<string>("")
    const [year, setYear] = useState<number>(0)
    
    const getTimeDetails = () => {
        const now = new Date()
        
        const monthsInArabic = [
            "يناير", "فبراير", "مارس", "أبريل", 
            "مايو", "يونيو", "يوليو", "أغسطس", 
            "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];

        setDay(now.getDate())
        setMonthName(monthsInArabic[now.getMonth()]) 
        setYear(now.getFullYear())
    }

    useEffect(() => {
        getTimeDetails()
    }, [])

    return (
        <div className='flex items-center gap-2 text-2xl font-bold' dir="rtl">
            <span>{day}</span>
            <span>/</span>
            <span className="">{monthName}</span>
            <span>/</span>
            <span>{year}</span>
        </div>
    )
}