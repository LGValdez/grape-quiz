import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { NavButton } from '../Buttons/StyledButtons'
import Image from 'next/image'
import { AuthService } from '@/nextUtils/authentication'

type TypeMobileNavProps = {
    open: boolean;
    authenticated: boolean;
    setAuthenticated: (authenticated: boolean) => void;
    setOpen: (open: boolean) => void;
}

function MobileNav(props: TypeMobileNavProps) {
    const router = useRouter()
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${props.open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
                <a className="text-2xl font-semibold" href="/">
                    <Image className="w-12 h-12"  src="/grapes.svg" alt="Logo" width={32} height={32}/>
                </a>
            </div>
            <div className="flex flex-col ml-4">
                <NavButton insideText={`Available Quizzes`} onClick={() => setTimeout(() => {
                    props.setOpen(!props.open)
                    router.push('/QuizList')
                }, 100)} />
                <NavButton insideText={`My Results`} onClick={() => setTimeout(() => {
                    props.setOpen(!props.open)
                    router.push('/QuizResult')
                }, 100)} />
                <NavButton insideText={`Log ${(props.authenticated) ? 'Out' : 'In'}`} onClick={() => setTimeout(() => {
                    if (props.authenticated) {
                        props.setOpen(!props.open)
                        AuthService.cleanAuthToken()
                        router.push('/')
                        props.setAuthenticated(false)
                    } else {
                        props.setOpen(!props.open)
                        router.push('/Login')
                    }
                }, 100)} />
            </div>
        </div>
    )
}

export default function Navbar() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        setAuthenticated(AuthService.isAuthenticated())
    })

    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen} authenticated={authenticated} setAuthenticated={setAuthenticated}/>
            <div className="w-3/12 flex items-center">
                <a className="text-2xl font-semibold" href="/">
                    <Image className="w-12 h-12" src="/grapes.svg" alt="Logo" width={32} height={32} priority={true}/>
                </a>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">
                    <NavButton insideText={`Available Quizzes`} onClick={() => router.push('/QuizList')} />
                    <NavButton insideText={`My Results`} onClick={() => router.push('/QuizResult')} />
                    <NavButton insideText={`Log ${(authenticated) ? 'Out' : 'In'}`} onClick={() => {
                        if (authenticated) {
                            AuthService.cleanAuthToken()
                            router.push('/')
                            setAuthenticated(false)
                        } else {
                            router.push('/Login')
                        }
                    }} />
                </div>
            </div>
        </nav>
    )
}
