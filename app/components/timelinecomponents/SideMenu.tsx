"use client"
import { useThemeContext , useMenuContext, useMenuValueContext } from '@/app/assets/contexts'
import React, { useState } from 'react'
import { buttons } from '@/app/assets/assets'
import { useEffect } from 'react'
import { supabase } from '@/app/assets/supabase_client'
import { useRouter } from 'next/navigation'
import { XCircleFill ,MoonFill , BrightnessHighFill, Icon   , BoxArrowLeft} from 'react-bootstrap-icons'
export default function SideMenu() {
    const {setValue} = useMenuValueContext()
    const { setTheme, theme } = useThemeContext()
    const [activeBtnId , setActiveBtnId] = useState<string>("today")
    const {setOpenMenu , openMenu} = useMenuContext()
        const getTheme = () => {
            const currentTheme = localStorage.getItem("theme")
            if (currentTheme === "light") {
            setTheme("light")
            } else {
                setTheme("dark")
        }
    }


    const handleChangeTheme = () => {
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

    const RenderThemeIcon:Icon = theme === "dark" ? BrightnessHighFill:MoonFill
    useEffect(() => {
        getTheme()
    }, [])
    

// 1. تحديد التصميم النشط (Active) بشكل مميز وواضح
    const activeClass = theme === "light" 
        ? "bg-rose-950 text-amber-100 font-bold border-amber-600 shadow-md" 
        : "bg-amber-400 text-rose-950 font-bold border-amber-300 shadow-md";

    // 2. التصميم العادي (Inactive)
    const inactiveClass = theme === "light"
        ? "bg-rose-950/5 text-rose-950 hover:bg-rose-950/10 border-transparent"
        : "bg-black/20 text-amber-50 hover:bg-amber-400/10 border-transparent";

    const btnsMap = buttons.map((btn) => {
        const isActive = activeBtnId === btn.id;

        return (
            <button
                key={btn.id}
                className={`w-full my-1 text-right p-3 text-xl pr-5.5 rounded-3xl border transition-all duration-200 ${
                    isActive ? activeClass : inactiveClass
                }`}
                onClick={() => {
                    setOpenMenu(false);
                    setValue(btn.id);
                    setActiveBtnId(btn.id);
                }}
            >
                {btn.text}
            </button>
        );
    });

    const router = useRouter()
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        router.push("/")

    }
return (
    <aside
        className={`fixed  ${openMenu?"right-0":"-right-full"} top-0 z-50 h-screen w-full  -right-full md:right-0 md:w-[30%] rounded-2xl p-2.5 md:p-6 border-e ${
            theme === "light"
                ? "bg-[#EFE4CC] text-rose-950 "
                : "bg-rose-950 text-amber-50 "
        }`}
        >
        <h3 className={`text-4xl font-bold mb-4 ${theme === "light" ? "text-rose-950" : "text-amber-200"}`}>
            المواعيد
        </h3>
        {btnsMap}
        <button
            onClick={handleChangeTheme}
            className={`w-full my-1 text-right flex items-center gap-1 p-3 text-xl pr-5.5 rounded-3xl border border-transparent transition-colors ${
            theme === "light"
                ? "bg-rose-950/5 text-rose-950 hover:bg-rose-950/10 hover:border-amber-600/40"
                : "bg-black/20 text-amber-50 hover:bg-amber-400/10 hover:border-amber-400/30"
        }`}>
            {
                theme === "light" ? "وضع الليل" : "وضع النهار"
            }  
            <RenderThemeIcon/>

        </button>

        <button
            onClick={async(e: React.MouseEvent) => {
                await handleLogout()
            }}
            className={`w-full my-1 text-right flex items-center gap-1 p-3 text-xl pr-5.5 rounded-3xl border border-transparent transition-colors ${
            theme === "light"
                ? "bg-rose-950/5 text-rose-950 hover:bg-rose-950/10 hover:border-amber-600/40"
                : "bg-black/20 text-amber-50 hover:bg-amber-400/10 hover:border-amber-400/30"
                }`}>
            تسجيل خروج
            <BoxArrowLeft/>

        </button>

        <XCircleFill onClick={()=>{setOpenMenu(false)}} className=' absolute top-2.5 text-2xl md:hidden left-2.5 ' />
    </aside>
)
}
