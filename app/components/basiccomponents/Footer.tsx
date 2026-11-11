/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/app/assets/assets';
import { supabase } from '@/app/assets/supabase_client';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';


export default function Footer() {
    const [message, setMessage] = useState('');
    const [accountOwner , setAccountOwner]  = useState<User | null>(null)


    const getOwner = async () => {
        const { data: authUser, error: authError } = await supabase.auth.getUser()
        if (!authUser || authError) {
            console.log("error in getting user" , authError?.message)
        }
        if (authUser) {
            const { data: owner, error: ownerError } = await supabase.from("users").select("*").eq("id", authUser?.user?.id).maybeSingle()
            if (!owner || ownerError) {
                console.log("error in getting owner" , ownerError?.message)
            }
            if (owner) {
                setAccountOwner(owner)
            }
        }
    }

    useEffect(() => {
        getOwner()
    }, [])
    

const form = useRef<HTMLFormElement>(null);

const sendEmail = (e:React.FormEvent) => {
    e.preventDefault();
    if (form.current) {
    emailjs
        .sendForm('service_9wh4z79', 'template_ged5qu8', form?.current, {
        publicKey: 'FNOKCmc_vD4QP74to',
    })
    .then(
        () => {
            console.log('SUCCESS!');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error:any) => {
            console.log('FAILED...', error.text);
        },
    );
    setMessage("")
    }
};

    return (
        <footer className="bg-rose-950  pt-12 pb-6 px-4 md:px-10" dir="rtl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-rose-900/60">
                
                {/* 1. تعريف سريع بالمنصة */}
                <div className="md:col-span-4 space-y-3">
                    <h4 className="text-2xl font-bold text-amber-200"> ⲟⲩⲏⲃ</h4>
                    <p className="text-xl   leading-relaxed max-w-sm">
                        مساحتكم الرقمية المنظمة لتيسير الخدمات الكنسية، القداسات، وجلسات الاعتراف، وتوفير الوقت للرسالة الروحية.
                    </p>
                </div>

                {/* 2. روابط سريعة */}
                <div className="md:col-span-3 space-y-3">
                    <h5 className=" text-2xl font-semibold text-amber-200">روابط سريعة</h5>
                    <ul className=" text-xl ">
                        <li><Link href="/#home" className="hover:text-amber-200 ">الرئيسية</Link></li>
                        <li><Link href="/#about" className="hover:text-amber-200 ">عن المنصة</Link></li>
                        <li><Link href="/#services" className="hover:text-amber-200 ">الخدمات</Link></li>
                    </ul>
                </div>

                {/* 3. صندوق الدعم والاقتراحات (Support Input) */}
                <div className="md:col-span-5 space-y-3">
                    <h5 className="text-2xl font-semibold text-amber-200">الدعم والمساعدة</h5>
                    <p className="text-xl ">
                        هل لديك استفسار أو اقتراح لتطوير الخدمة؟ أرسل لنا وسنتواصل معك.
                    </p>
                    <form 
                        ref={form}
                        onSubmit={sendEmail} className="flex items-center gap-2 pt-1">
                        <input type="text" value={accountOwner?.name || ""} name="name" readOnly className='hidden' />
                        <input type="text" value={accountOwner?.email || ""} name="email" readOnly className='hidden' />
                        <input 
                            type="text" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="اكتب ملاحظتك أو استفسارك..." 
                            className="w-full px-4 py-2.5 rounded-xl bg-rose-900/40 border border-rose-800 text-amber-50 placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                            required
                            name='message'
                        />
                        <button 
                            type="submit" 
                            className="px-5 py-2.5 bg-amber-200 hover:bg-amber-300 text-rose-950 font-bold text-sm rounded-xl transition-all duration-200 shrink-0 shadow-sm"
                        >
                            إرسال
                        </button>
                    </form>
                </div>

            </div>

            {/* حقوق النشر والختام */}
            <div className=" text-center pt-6 ">
                <p className='text-md text-white'> developed by : <a href="" className='hover:text-amber-300 underline  '> kerollos melad </a> </p>
            </div>
        </footer>
    );
}