"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DsUser } from '@/app/dashboard/page';
// import Logo from '../../public/DAB-transparent.png'

interface NavBarProps {
    user: DsUser | null;
}

const NavBar: React.FC<NavBarProps> = (user) => {

    const [dsUserImg, setDsUserImg] = useState<string | null>(null);
    
    const buildImg = () => {
        if (user) {
            setDsUserImg(`https://cdn.discordapp.com/avatars/${user.user?.id}/${user.user?.avatar}`);
        }
    }

    useEffect(() => {
        buildImg();
    },[]);
    
    const router = useRouter();

    return (
        <div className="bg-[#5865F2] flex h-[100px] items-center justify-between">
            <div className='relative flex items-center group cursor-pointer'>
                <Image 
                        src="/squid_final.png" 
                        className='cursor-pointer' 
                        alt='DAB' 
                        width={100} 
                        height={100} 
                        onClick={() => {router.push("/")}}
                />
                <Image src="/DAB-text.png" alt='dab text' width={100} height={50} className="absolute left-[58%] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-2"/>
                {/* <h2 className="absolute left-[110%] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-2">
                    OUI JE TEST
                </h2> */}
            </div>
            {dsUserImg && (
                <div className='flex h-[100%] flex-col items-center'>
                    <img src={dsUserImg} className='rounded-full h-[70%] mr-6 shadow-black shadow-sm' alt='DAB' onClick={() => {router.push("/")}}/>
                    <h2 className='text-lg font-semibold self-end mb-3'>{user.user?.global_name}</h2>
                </div>
            )}
        </div>
    );
}

export default NavBar;
