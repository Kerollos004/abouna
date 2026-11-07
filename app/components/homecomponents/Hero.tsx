import React from 'react'
import Image from "next/image";

export default function Hero() {
    return (
        <section id='home' className='w-full h-screen relative flex justify-center pt-20 pb-5  px-2.5 md:px-10 items-center overflow-hidden' >
            <div className='relative z-30 text-center text-white'>
                <h3 className="text-4xl  font-bold ">أهلاً بكم في منصة</h3>
                <span className='text-8xl  text-yellow-500 font-extrabold'> ⲟⲩⲏⲃ </span>
                <h3 className="text-3xl mt-3 font-semibold">المخصصة لمساعدة الآباء الكهنة</h3>
            </div>
            
            <Image 
                src="/images/Coptic Priest Amidst Incense and Icons.png" 
                alt='Coptic Priest Background' 
                fill 
                priority
                className='absolute top-0 left-0 object-cover z-10' 
            />
            
            {/* طبقة التدرج اللوني للخلفية */}
            <span className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-r from-black/85 via-black/55 to-black/20 z-20"></span>
        </section>
    )
}