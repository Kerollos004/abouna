"use client"
import React from 'react'
import Link from 'next/link';
import { useThemeContext } from '@/app/assets/contexts';

export default function Services() {
    const {theme} = useThemeContext()
    const servicesList = [
        {
            id: 1,
            title: "تنظيم مواعيد القداسات",
            description: "تنسيق جداول القداسات والخدمات الكنسية بدقة، مع إمكانية متابعة الحجوزات والمواعيد بمرونة تامة.",
            icon: "⛪"
        },
        {
            id: 2,
            title: "جلسات الاعتراف والمشورة",
            description: "إدارة مواعيد جلسات الاعتراف الشخصية بسرية تامة وتسهيل عملية حجز الأوقات المتاحة للمتسرّبين.",
            icon: "📖"
        },
        {
            id: 3,
            title: "إدارة الاجتماعات والخدمات",
            description: "جدولة اجتماعات أسرة الكنيسة وخدمات الخدام والأسرة، مع نظام تذكيرات ذكي لضمان عدم تفويت أي التزام.",
            icon: "👥"
        }
    ];

    return (
        <section id='services' className='py-12 px-4 md:px-10' dir="rtl">
            <div className="mb-10">
                <h3 className={`text-3xl md:text-5xl font-bold  ${theme==="light"?"text-rose-950":"text-amber-200"} mb-6 `}>
                    ماذا نقدم
                </h3>
                <p className='text-black dark:text-amber-100/80 text-xl'>
                    خدمات رقمية متكاملة صُممت خصيصاً لتيسير الإدارة الكنسية وتوفير وقت الآباء الكهنة.
                </p>
            </div>

            <article className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicesList.map((service) => (
                    <article
                        key={service.id}
                        className={`p-4 rounded-4xl border-2 ${theme==="light"?"bg-[#FFFDF7] border-amber-200 ":"bg-rose-950 border-amber-200 "} flex flex-col justify-between group backdrop-blur-sm"`}
                    >
                        <div>
                            {/* أيقونة الخدمة */}
                            <div className="w-14 h-14 bg-amber-100/80 dark:bg-rose-900/50 dark:border dark:border-rose-800 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-rose-950 group-hover:text-white dark:group-hover:bg-amber-200 dark:group-hover:text-rose-950 transition-colors duration-300">
                                {service.icon}
                            </div>
                            
                            {/* عنوان الخدمة */}
                            <h4 className={`text-2xl font-bold ${theme==="light"?"text-rose-950":"text-amber-200"} mb-3`}>
                                {service.title}
                            </h4>
                            
                            {/* وصف الخدمة */}
                            <p className="text-black dark:text-amber-100/80 text-xl">
                                {service.description}
                            </p>
                        </div>

                        {/* الرابط التفاعلي أسفل الكارد */}
                        <div className={`${theme==="light"?"text-rose-950":"text-amber-200"}  mt-6 border-t border-t-gray-100 pt-3`}>
                            <Link href={"/register"}>استكشف الخدمة</Link>
                            <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">←</span>
                        </div>
                    </article>
                ))}
            </article>
        </section>
    );
}
