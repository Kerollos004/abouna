/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useThemeContext } from '@/app/assets/contexts'
import React from 'react'
import Link from 'next/link'
import { User } from '@/app/assets/assets'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import subImg from "../../../public/images/images-removebg-preview.png"
import { supabase } from '@/app/assets/supabase_client'
import { PersonFill , MoonFill , BrightnessHighFill , Plus ,  HouseFill  } from 'react-bootstrap-icons'
export default function MobMenu() {
    const [owner, setOwner] = useState<User | null>(null)
    const { theme, setTheme } = useThemeContext()
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
        } , [setTheme])

    const iconBtn = `flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-colors ${
        theme==="light"
        ? "text-rose-950 hover:bg-rose-950/10"
        : "text-amber-100 hover:bg-amber-400/10"
        }`
    
    const addBtn = `flex h-14 w-14  items-center justify-center rounded-full text-3xl shadow-lg border-4 transition-colors ${
        theme==="light"
        ? "bg-rose-950 text-amber-200 border-[#FBF6EA]"
        : "bg-amber-300 text-rose-950 border-rose-950"
    }`
    

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
    <header
        className={`fixed bottom-0 left-0 z-30 flex h-18 w-full items-center justify-around rounded-t-2xl border-t-2 px-2.5 md:hidden ${
        theme==="light"
            ? "bg-[#FBF6EA] border-amber-600/40"
            : "bg-rose-950 border-amber-300/40"
        }`}
    >            <Link  className={iconBtn}  href={"/"}>
                <HouseFill/>
            </Link>

                {
                    owner ?
                    <Link 
                        className={iconBtn}
                        href={`/abouna_timeline/${owner?.id}`}
                    >
                        <Image src={owner?.image ? owner?.image : subImg } alt='img' width={200} height={200} className='w-12 h-12 object-cover rounded-full' />
                    </Link>
                    :
                    <Link 
                        className='flex w-12 h-12   justify-center text-amber-200 bg-rose-900 border rounded-full hover:bg-amber-200 hover:text-rose-950  items-center gap-2  ' 
                        href={"/register"}
                    >
                            <PersonFill  />
                    </Link>
                }

            <Link className={addBtn}  href={"/add_appointment"}>
                <Plus/>
            </Link>

            <button  className={iconBtn} onClick={handleTheme}>
                <RenderedTheme/>
            </button>
        </header>
    )
}
