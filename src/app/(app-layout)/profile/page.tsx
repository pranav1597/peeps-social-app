"use client"

import ProfileFeed from '@/app/components/profileFeed/page'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function ProfilePage() {
    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            console.log("Logout success")
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
        }
    }
    return (
        <div className="text-center h-screen">
            
            <ProfileFeed />
            <button 
            onClick={logout}
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
    )
}