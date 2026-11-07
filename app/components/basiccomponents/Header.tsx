/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import React, { useEffect, useState } from 'react'
import logo from "../../../public/images/kahen-logo-removebg-preview.png"
import Image from 'next/image'
import { MoonFill, PersonFill , BrightnessHighFill, Plus } from 'react-bootstrap-icons'
import Link from 'next/link'
import { User } from '@/app/assets/assets'
import { useThemeContext } from '@/app/assets/contexts'
import { supabase } from '@/app/assets/supabase_client'
import subImg from "../../../public/images/images-removebg-preview.png"

export default function Header() {
    const [isActive, setIsActive] = useState<boolean>(false)
    const { theme, setTheme } = useThemeContext()
    const [owner, setOwner] = useState<User | null>(null)

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const RenderedTheme = theme==="light" ? MoonFill : BrightnessHighFill

    const handleTheme = () => {
        if (theme === "light") {
            setTheme("dark")
            localStorage.setItem("theme", "dark")
            document.body.classList.add("dark-mode")
            document.body.classList.remove("light-mode")
        } else {
            setTheme("light")
            localStorage.setItem("theme", "light")
            document.body.classList.remove("dark-mode")
            document.body.classList.add("light-mode")
        }
    }

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme")
        if (currentTheme === "dark") {
            setTheme("dark")
            document.body.classList.add("dark-mode")
            document.body.classList.remove("light-mode")
        } else {
            setTheme("light")
            document.body.classList.remove("dark-mode")
            document.body.classList.add("light-mode")
        }
    }, [setTheme])
    

    //get session and authuser
    const getOwner = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        const { error: authError, data: authUser } = await supabase.auth.getUser()
        if (authError || !session || !authUser) {
            console.log("error in getting auth", authError?.message)
            return
        }
        if (authUser) {
            const userId = authUser?.user?.id
            const { data, error } = await supabase.from("users").select("*").eq("id", userId).maybeSingle()
            if (error  || !data) {
                console.log("error in getting auth", error?.message)
                return
            }
            if (data) {
                setOwner(data)
            }
        }
    }

    useEffect(() => {
        getOwner()
    },[])

    return (
        <header className={`fixed top-0 left-0 z-40 py-4 w-full h-20 px-4 md:px-10 hidden md:flex items-center justify-between  ${isActive ? "bg-rose-950/30 backdrop-blur-md shadow-md" : "bg-transparent"}`} >
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src={logo}
                    alt='شعار المنصة'
                    width={120}
                    height={120}
                    className='w-14 h-14 object-contain'
                />
            </Link>



            <div className="flex items-center gap-4">
                <button 
                    onClick={handleTheme}
                    className='p-2.5 rounded-full text-amber-200 bg-rose-900 border  hover:bg-amber-200 hover:text-rose-950  '
                >
                    <RenderedTheme  className='text-lg' />
                </button>

                {
                    owner ?
                    <Link 
                        className='flex px-5 py-2.5 text-amber-200 bg-rose-900 border rounded-full hover:bg-amber-200 hover:text-rose-950  items-center gap-2  ' 
                        href={`/abouna_timeline/${owner?.id}`}
                    >
                        <Image src={owner?.image ? owner?.image : subImg } alt='img' width={200} height={200} className='w-8 h-8 object-cover rounded-full' />
                        <span> {owner?.name} </span>
                    </Link>
                    :
                    <Link 
                        className='flex px-5 py-2.5 text-amber-200 bg-rose-900 border rounded-full hover:bg-amber-200 hover:text-rose-950  items-center gap-2  ' 
                        href={"/register"}
                    >
                        <span>تسجيل الدخول</span>
                            <PersonFill  />
                    </Link>
                }

                <Link 
                    className='flex px-5 py-2.5 text-amber-200 bg-rose-900 border rounded-full hover:bg-amber-200 hover:text-rose-950  items-center gap-2  ' 
                    href={"/add_appointment"}
                >
                    <span> اضافه موعد</span>
                        <Plus  />
                </Link>
            </div>
        </header>
    )
}
