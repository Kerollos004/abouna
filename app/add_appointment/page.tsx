import React from 'react'
import AddNewTime from '../components/addtimecomponents/AddNewTime'
import Header from '../components/basiccomponents/Header'
import Footer from '../components/basiccomponents/Footer'

import { Metadata } from "next";

export const metadata:Metadata = {
title: 'منصة/ اضافه موعد ⲟⲩⲏⲃ',
description: 'إدارة وعرض مواعيد الآباء الكهنة',
manifest: '/manifest.json',
icons: {
    icon: '/images/kahen-logo-removebg-preview.png',
    apple: '/images/kahen-logo-removebg-preview.png', 
},
};

export default function AddTime() {
    return (
        <>
            <Header/>
            <main className='w-full flex items-center justify-center min-h-screen md:pt-25  py-5 px-2.5 md:px-10'>
                <AddNewTime/>
            </main>
            <Footer/>
        </>
    )
}
