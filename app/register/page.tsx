import React from 'react'
import Header from '../components/basiccomponents/Header'
import Footer from '../components/basiccomponents/Footer'
import RegisterForm from '../components/registercomponents/RegisterForm'
import { Metadata } from "next";

export const metadata:Metadata = {
title: 'منصة/تسجيل الدخول ⲟⲩⲏⲃ',
description: 'إدارة وعرض مواعيد الآباء الكهنة',
manifest: '/manifest.json',
icons: {
    icon: '/images/kahen-logo-removebg-preview.png',
    apple: '/images/kahen-logo-removebg-preview.png', 
},
};
export default function Register() {
    return (
        <>
            <Header />
            <main className='w-full flex items-center justify-center min-h-screen md:pt-25  py-5 px-2.5 md:px-10'>
                <RegisterForm/>
            </main>
            <Footer/>
        </>
    )
}
