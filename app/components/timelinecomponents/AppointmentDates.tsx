import { appointment } from '@/app/assets/assets'
import React from 'react'

export default function AppointmentDates({ appointment }: { appointment: appointment }) {

    // 1. تحويل التاريخ (مثال: 2026-06-11) إلى شهر مكتوب بالعربي (يونيو) مع اليوم والسنة لو حابب
    const formatArabicDate = (dateString?: string) => {
        if (!dateString) return "";
        try {
            const dateObj = new Date(dateString);
            // استخراج اسم الشهر بالعربي
            const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long' }).format(dateObj);
            const day = dateObj.getDate();
            const year = dateObj.getFullYear();
            
            return `${day} ${monthName} ${year}`;
        } catch {
            return dateString; // لو حصل أي خطأ يعرض التاريخ القديم زي ما هو
        }
    };

    // 2. تحويل الوقت (مثال: 16:30) إلى نظام 12 ساعة مع "مساءً" أو "صباحاً"
    const formatTime12Hour = (timeString?: string) => {
        if (!timeString) return "";
        try {
            // لو الوقت جاي بصيغة HH:mm
            const [hoursStr, minutesStr] = timeString.split(':');
            let hours = parseInt(hoursStr, 10);
            const minutes = minutesStr || '00';

            if (isNaN(hours)) return timeString;

            const period = hours >= 12 ? 'مساءً' : 'صباحاً';
            
            // تحويل النظام لـ 12 ساعة
            hours = hours % 12;
            hours = hours ? hours : 12; // لو الساعة 0 تبقى 12

            return `${hours}:${minutes} ${period}`;
        } catch {
            return timeString;
        }
    };

    return (
        <div className="p-4 text-xl flex justify-center flex-col border-b-2 md:border-b-0 md:border-l-2 border-amber-200"> 
            <h3 className="font-bold">{formatArabicDate(appointment?.date)}</h3>
            <h3 className="text-base opacity-90 mt-1">{formatTime12Hour(appointment?.time)}</h3>
        </div>
    )
}
