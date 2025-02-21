"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CubeLoader from "@/components/CubeLoader";
import NavBar from "@/components/NavBar";
import FileSpace from "@/components/FileSpace";
import Image from "next/image";

export interface Guild {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
}

export interface DsUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: string;
    banner_color: string;
    clan: string;
    primary_guild: string;
    mfa_enabled: boolean;
    locale: string;
    premium_type: number;
}


function DashboardContent() {
    const searchParams = useSearchParams();
    
    const token = searchParams.get("token") || sessionStorage.getItem("Token") || "";
    
    const [guildList, setGuildList] = useState<Guild[]>([]);
    const [dsUser, setDsUser] = useState<DsUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null);

    useEffect(() => {
        const fetchGuilds = async () => {
            if (token) {
                sessionStorage.setItem("Token", token);
                try {
                    const responseA = await fetch("https://discord.com/api/v10/users/@me/guilds", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (responseA.ok) {
                        const guilds: Guild[] = await responseA.json();
                        const ownerGuilds = guilds.filter((guild) => guild.owner);
                        setGuildList(ownerGuilds);
                    }

                    const responseB = await fetch("https://discord.com/api/v10/users/@me", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (!responseB.ok || !responseB.ok) 
                        throw new Error("Failed to fetch user infos");
                    const user = await responseB.json();
                    setDsUser(user)
                } catch (error) {
                    console.error("Erreur lors de la récupération des guildes :", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchGuilds();
    }, [token]);

    const handleClick = (guild: Guild) => {
        
        setSelectedGuild(null);
        setTimeout(() => setSelectedGuild(guild), 0);
    };

    return loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-inherit font-sans">
            <CubeLoader />
            <h2>Loading ...</h2>
        </div>
    ) : (
        <>
            <NavBar user={dsUser}/>
            <div className="flex">
                <div className="flex flex-col items-start justify-start">
                    <div className=" w-[73px] h-screen bg-[#252529]">
                        {/* <h1 className="text-2xl font-bold mb-4">Dashboard des Guildes</h1> */}
                        {guildList.length > 0 ? (
                            <ul className="flex flex-col items-start gap-4 mt-4">
                                {guildList.map((guild) => (
                                    <li key={guild.id} className="flex items-center group">
                                            <div className="w-1 h-1 mr-[4px] bg-white opacity-0 scale-y-0 transition-all rounded-tl-[0px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[0px] duration-300 group-hover:opacity-100 group-hover:scale-y-[500%]">
                                            </div>
                                            {guild.icon ? (
                                                <img
                                                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                                    alt={guild.name}
                                                    className="h-14 w-14 rounded-full hover:rounded-2xl transition-[border-radius] cursor-pointer active:rounded-2xl"
                                                    onClick={() => handleClick(guild)}
                                                />
                                                ) : (
                                                    <Image 
                                                        src="/point-intero.jpg"
                                                        alt={guild.name}
                                                        width={100}
                                                        height={100}
                                                        className="h-14 w-14 rounded-full hover:rounded-2xl transition-[border-radius] cursor-pointer active:rounded-2xl"
                                                        onClick={() => handleClick(guild)}
                                                    />
                                                )}
                                            {/* <span className="text-lg font-semibold">{guild.name}</span> */}
                                            <span className="absolute left-20 px-3 py-1 bg-[#252529] text-white  text-sm rounded-lg opacity-0 invisible scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:visible">
                                                {guild.name}
                                            </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Aucune guilde disponible.</p>
                        )}
                    </div>
                </div>
                <div className="flex w-full h-[92vh] justify-center overflow-y-auto overflow-x-hidden">
                    {selectedGuild ? (
                        <>
                            <FileSpace guild={selectedGuild} />
                        </>
                    ) : (
                        <p className="text-gray-400 justify-self-center mt-[46vh]">Sélectionnez une guilde pour voir les fichiers.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={<p>Chargement...</p>}>
            <DashboardContent /> 
        </Suspense>
    );
}
