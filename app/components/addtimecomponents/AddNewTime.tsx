/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useEffect, useState } from 'react'
import { useThemeContext } from '@/app/assets/contexts'
import { appointment } from '@/app/assets/assets'
import { supabase } from '@/app/assets/supabase_client'
import { useRouter } from 'next/navigation'

export default function AppointmentForm() {
    const router = useRouter()
    const [newAppointment, setNewAppointment] = useState<appointment>({
        owner: "",
        type: "",
        date: "",
        time: "",
        details: "",
        address: "",
        custumed: false,
        customed_Appointment: "",
    })
    const [ownerId , setOwnerId] = useState<string>("")
    const { theme } = useThemeContext()
    const isLight = theme === "light"

    const field = `w-full rounded-2xl border px-4 py-3 text-lg outline-none transition-colors focus:ring-2 ${
    isLight
        ? "bg-[#FFFDF7] text-rose-950 border-amber-600/40 placeholder:text-rose-950/40 focus:border-rose-950"
        : "bg-black/20 text-amber-50 border-amber-400/30 placeholder:text-amber-50/40 focus:border-amber-300"
    }`
    const label = `text-lg font-semibold ${isLight ? "text-rose-950" : "text-amber-200"}`
    const group = "flex flex-col gap-1.5"

        const getOwner = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (!data || error) {
                console.log("error in getting owner", error?.message)
                return
            }
            if (data) {
                setOwnerId( data?.user?.id)
            }
        }

    const handleAddAppointment = async () => {
        const { error } = await supabase.from("appointments").insert([{
            ...newAppointment, 
            abouna_id:ownerId
        }])
        if (error) {
            console.log("error in adding appointment",error.message)
            return
        }
        setNewAppointment({
            owner: "",
            type: "",
            date: "",
            time: "",
            details: "",
            address: "",
            custumed: false,
            customed_Appointment: "",
        })
        router.push(`/abouna_timeline/${ownerId}`)

    }

    useEffect(() => {
        getOwner()
    } , [])

    return (
        <article className={`p-4 md:p-6 ${theme==="light"?"bg-[#FFFDF7] border-amber-200 text-black":"bg-rose-950 border-amber-200 text-white"} w-11/12 md:w-[800px] rounded-3xl border-2 shadow-xl`}>
            <h3 className={` ${theme === "light" ? "text-rose-950" : "text-amber-200"} mb-5 font-bold text-center text-3xl`} >
                اضافه موعد جديد
            </h3>
            <form onSubmit={(e) => e.preventDefault()} className="flex w-full flex-col gap-5">
                
                {/* نوع الموعد */}
                <div className={group}>
                    <label htmlFor="type" className={label}>نوع الموعد</label>
                    
                    {/* الـ Select الأساسي لاختيار النوع */}
                    <select
                        value={newAppointment.custumed ? "other" : newAppointment.type}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            const val = e.target.value;
                            if (val === "other") {
                                setNewAppointment({
                                    ...newAppointment, 
                                    custumed: true, 
                                    type: "other"
                                });
                            } else {
                                setNewAppointment({
                                    ...newAppointment, 
                                    custumed: false, 
                                    type: val,
                                    customed_Appointment: ""
                                });
                            }
                        }}
                        id="type" name="type" required className={field}
                    >
                        <option value="" disabled>اختر نوع الموعد</option>
                        <option value="mass">قداس</option>
                        <option value="visit">افتقاد</option>
                        <option value="meeting">اجتماع</option>
                        <option value="confession">اعتراف</option>
                        <option value="other">موعد آخر</option>
                    </select>

                    {/* حقل إضافي يظهر فقط لو المستخدم اختر "موعد آخر" */}
                    {newAppointment.custumed && (
                        <input
                            value={newAppointment.customed_Appointment}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setNewAppointment({...newAppointment, customed_Appointment: e.target.value})
                            }}
                            type="text"
                            placeholder='اكتب نوع الموعد الجديد' 
                            className={`mt-2 ${field}`}
                            required
                        />
                    )}
                </div>
            
                {/* التاريخ والوقت */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className={group}>
                        <label htmlFor="date" className={label}>التاريخ</label>
                        <input
                            value={newAppointment.date}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setNewAppointment({...newAppointment , date:e.target.value})
                            }}
                            id="date" name="date" type="date" required className={field}
                        />
                    </div>
                    <div className={group}>
                        <label htmlFor="time" className={label}>الساعة</label>
                        <input
                            value={newAppointment.time}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setNewAppointment({...newAppointment , time:e.target.value})
                            }}
                            id="time" name="time" type="time" required className={field}
                        />
                    </div>
                </div>
        
                {/* صاحب الموعد */}
                <div className={group}>
                    <label htmlFor="owner" className={label}>صاحب الموعد</label>
                    <input
                        value={newAppointment.owner}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewAppointment({...newAppointment , owner:e.target.value})
                        }}
                        id="owner" name="owner" type="text" placeholder="الاسم" className={field}
                        required
                    />
                </div>
        
                {/* عنوان الموعد */}
                <div className={group}>
                    <label htmlFor="address" className={label}>عنوان الموعد</label>
                    <input
                        value={newAppointment.address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewAppointment({...newAppointment , address:e.target.value})
                        }}
                        id="address" name="address" type="text" placeholder="المكان" className={field}
                        required
                    />
                </div>
        
                {/* ملاحظات */}
                <div className={group}>
                    <label htmlFor="notes" className={label}>ملاحظات عن الموعد</label>
                    <textarea
                        value={newAppointment.details}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setNewAppointment({...newAppointment , details:e.target.value})
                        }}
                        id="notes" name="notes" rows={4} placeholder="اكتب ملاحظاتك هنا" className={field}
                    />
                </div>
        
                <button
                    onClick={async (e: React.MouseEvent) => {
                        e.preventDefault()
                        await handleAddAppointment()
                    }}
                    type="submit"
                    className={`mt-2 min-h-12 rounded-2xl px-6 py-3 text-xl font-bold transition-colors ${
                    isLight
                        ? "bg-rose-950 text-amber-200 hover:bg-rose-900"
                        : "bg-amber-300 text-rose-950 hover:bg-amber-200"
                    }`}
                >
                    حفظ الموعد
                </button>
            </form>
        </article>    
    )
}