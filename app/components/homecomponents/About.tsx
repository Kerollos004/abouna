"use client"
import React from 'react';
import Image from "next/image";
import aboutImg from "../../../public/images/Candlelit Confession in a Coptic Church.png"; 
import { useThemeContext } from '@/app/assets/contexts';

export default function About() {
    const {theme} = useThemeContext()
    return (
        <section id='about' className='px-4 md:px-10 py-12   '>
            <h3 className={`text-3xl md:text-5xl font-bold  ${theme==="light"?"text-rose-950":"text-amber-200"} mb-6 `}>
                نبذة عن المنصة
            </h3>
            
            <article className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                <div className="">
                    <p className='text-[23px]  '>
                        منصة متكاملة وصُممت خصيصًا لتكون السند الرقمي الموثوق للآباء الكهنة في إدارة وتنظيم مجريات خدمتهم اليومية والرعوية بكل سهولة وفاعلية. يهدف هذا النظام إلى توفير مساحة واحدة تجمع كافة المهام والالتزامات، بدءًا من التنسيق الدقيق لمواعيد القداسات والصلوات، وصولاً إلى ترتيب جلسات الاعتراف والمفتشية واجتماعات القطاعات الخدمية المختلفة. بفضل الواجهة المبتكرة والجداول الزمانية المُنسقة، يسهل متابعة التزامات الشعب ورعايتهم دون تشتت، مع الاعتماد على نظام تذكيرات ذكي يضمن عدم تفويت أي موعد أو افتقاد مهم. صُممت هذه الأدوات لتخفيف الأعباء الإدارية والعملية عن كاهل الأب الكاهن، وتوفير الوقت والجهد، مما يتيح له المساحة الكاملة للتفرغ التام لرسالته الروحية السامية وإعادة التركيز على الرعاية المباشرة لأبنائه ورعيتهم بحب واهتمام.
                    </p>
                </div>

                {/* قسم الصورة */}
                <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-md">
                    <Image
                        src={aboutImg}
                        alt="صورة توضيحية لخدمة الآباء الكهنة"
                        loading='lazy'
                        className='object-cover w-full h-full'
                    />
                </div>
            </article>
        </section>
    );
}
