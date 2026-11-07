import React from 'react'
import AddNewTime from '../components/addtimecomponents/AddNewTime'
import Header from '../components/basiccomponents/Header'
import Footer from '../components/basiccomponents/Footer'
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
