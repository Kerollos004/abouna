"use client"
import { User } from '@/app/assets/assets'
import { useThemeContext } from '@/app/assets/contexts'
import { supabase } from '@/app/assets/supabase_client'
import React, { useState } from 'react'
import { EyeFill, EyeSlashFill, Icon } from 'react-bootstrap-icons'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
    const { theme } = useThemeContext()
    const [formType, setFormType] = useState<string>("login")
    const [passwordType, setPasswordType] = useState<string>("password")
    const [PasswordIcon, setPasswordIcon] = useState<Icon>(EyeFill)
    const router = useRouter()
    const [newUser, setNewUser] = useState<User>({
        name: "",
        email: "",
        phone: "",
        password: "",
        image:""
    })
    const handleChangeFormType = () => {
        if (formType === "login") {
            setFormType("create account")
        } else {
            setFormType("login")
        }
    }
    const handleChangeType = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            setPasswordIcon(EyeSlashFill)
        } else {
            setPasswordType("password")
            setPasswordIcon(EyeFill)
        }
    }

const handleSignUp = async () => {
        const { error: authError, data: authData } = await supabase.auth.signUp({
            email: newUser.email,
            password: newUser.password
        });

        if (authError || !authData.user) {
            console.log("error in signup:", authError?.message);
            return; 
        }

    const { error: userError } = await supabase.from("users").insert([{
        id: authData?.user?.id,
        name: newUser?.name,
        email: newUser?.email,
        phone: newUser?.phone,
        password: newUser?.password,
        image:newUser?.image
        }]);

        if (userError) {
            console.log("error in adding user data:", userError.message);
        } else {
            console.log("User registered and added to users table successfully!");
        }

        setNewUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        image:""
        })
        router.push("/")
}

    
    const handleLogin = async () => {
        const { error:authError, data:authData } = await supabase.auth.signInWithPassword({
            email: newUser.email,
            password:newUser.password
        })
        if (authError || !authData) {
            console.log("error in signup" , authError?.message )
        }
        router.push("/")
    }

    const handleRegister = async () => {
        if (formType === "login") {
            await handleLogin()
        } else {
            await handleSignUp()
        }
    }
    return (
        <article  className={`p-3 ${theme==="light"?"bg-[#FFFDF7] border-amber-200 text-black":"bg-rose-950 border-amber-200 text-white"} w-11/12 md:w-[800px] rounded-3xl `}>
            <h3 className={` ${theme === "light" ? "text-rose-950" : "text-amber-200"} mb-3 font-bold text-center text-3xl`} >
                { formType ==="login" ? "تسجيل دخول"  : "انشاء حساب "}
            </h3>
            <form action="" className={` grid  grid-cols-1 ${formType==="login"?"md:grid-cols-1":"md:grid-cols-2"} gap-3.5 `}>
                <div className={` ${formType==="login"?"hidden":"flex"} flex-col gap-2`}> 
                <label htmlFor="name">الاسم</label>
                    <input
                    className='p-3 rounded-3xl border border-amber-200 focus:bg-rose-950/20'
                    value={newUser.name}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setNewUser({...newUser , name:e.target.value})}}
                    type="text"
                    placeholder='الاب ...'
                />
            </div>

            <div className={` ${formType==="login"?"hidden":"flex"} flex-col gap-2`}> 
                <label htmlFor="name">رقم التليفون</label>
                    <input
                        className='p-3 rounded-3xl border border-amber-200 focus:bg-rose-950/20'
                    value={newUser.phone}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setNewUser({...newUser , phone:e.target.value})}}
                    type="text"
                    placeholder=' 01011...'
                />
            </div>

            <div className="flex flex-col gap-2"> 
                <label htmlFor="name"> البريد الالكتروني </label>
                    <input
                        className='p-3 rounded-3xl border border-amber-200 focus:bg-rose-950/20'
                    value={newUser.email}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setNewUser({...newUser , email:e.target.value})}}
                    type="email"
                    placeholder='father@mail.com'
                />
            </div>

            <div className="flex flex-col gap-2 relative"> 
                <label htmlFor="password"> الباسوورد </label>
                    <input
                        className='p-3 rounded-3xl border border-amber-200 focus:bg-rose-950/20'
                    value={newUser.password}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setNewUser({...newUser , password:e.target.value})}}
                    type={passwordType}
                    placeholder='••••••••'
                    />
                    <PasswordIcon onClick={() => {
                        handleChangeType()
                    }} className=' absolute  left-5 top-1/2 mt-1.5' />
            </div>

            <div className={`${formType==="login"?"hidden":"flex"} flex-col gap-2 col-span-1 md:col-span-2`}> 
                            <label htmlFor="image" > 
                                الصورة الشخصية 
                            </label>
                                <input 
                                    id="image"
                                    type="file" 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                const base64String = reader.result as string;
                                                setNewUser({ ...newUser, image: base64String });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="w-full p-3 text-sm rounded-3xl border border-amber-200
                                    file:ml-4 file:py-2 file:px-4 file:rounded-3xl file:border-0 file:text-sm file:font-semibold
                                    file:bg-amber-200 file:text-rose-950 hover:file:bg-amber-300
                                    dark:file:bg-rose-900 dark:file:text-amber-200 dark:hover:file:bg-rose-800
                                "
                                />
            </div>

                <button onClick={async (e: React.MouseEvent) => {
                    e.preventDefault()
                    await handleRegister()
                }} className={` ${formType === "login" ? "md:col-span-1" : "md:col-span-2"} col-span-1  p-3 text-center text-2xl text-amber-200 bg-rose-950 border rounded-full hover:bg-amber-200 hover:text-rose-950 `}> 
                    { formType ==="login" ? "تسجيل دخول"  : "انشاء حساب "}
                </button>
                <div className={`${formType === "login" ? "md:col-span-1" : "md:col-span-2"} col-span-1 flex flex-col md:flex-row justify-between items-center`}>
                    <h3>
                        { 
                            formType === "login" ? "ليس لديك حساب ؟" : "لديك حساب بالفعل؟"
                        }
                    </h3>
                    <span
                        onClick={handleChangeFormType}
                        className='hover:underline cursor-pointer '
                    >
                        { 
                            formType === "login" ? " انشئ حساب  " : "سجل دخولك"
                        }
                    </span>
                    
                </div>
        </form>
        </article>
    )
}
