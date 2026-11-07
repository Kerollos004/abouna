"use client"
import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        // أضف كود إرسال الرسالة هنا
        console.log("Submitted support message:", message);
        setMessage('');
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
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
                        <input 
                            type="text" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="اكتب ملاحظتك أو استفسارك..." 
                            className="w-full px-4 py-2.5 rounded-xl bg-rose-900/40 border border-rose-800 text-amber-50 placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                            required
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