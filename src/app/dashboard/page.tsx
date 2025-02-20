"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CubeLoader from "@/components/CubeLoader";

interface Guild {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
}


function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const token = searchParams.get("token") || sessionStorage.getItem("Token") || "";
    
    const [guildList, setGuildList] = useState<Guild[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGuilds = async () => {
            if (token) {
                sessionStorage.setItem("Token", token);
                try {
                    const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (!response.ok) throw new Error("Failed to fetch guilds");

                    const guilds: Guild[] = await response.json();
                    const ownerGuilds = guilds.filter((guild) => guild.owner);
                    setGuildList(ownerGuilds);
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
        router.push(`/files?guild=${guild.id}`);
    };

    return loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-inherit font-sans">
            <CubeLoader />
            <h2>Loading ...</h2>
        </div>
    ) : (
        <div className="flex flex-col items-start justify-start">
            <div className="container justify-self-center self-center p-4 ">
                <h1 className="text-2xl font-bold mb-4">Dashboard des Guildes</h1>
                {guildList.length > 0 ? (
                    <ul>
                        {guildList.map((guild) => (
                            <li key={guild.id} className="hover:backdrop-blur-lg hover:bg-[#5865F2]/50 transition-all  hover:border-black hover:text-white border-[1px] border-[#5865F2] p-4 mb-2 rounded-lg shadow-[#5865F2] ">
                                <div className="flex items-center cursor-pointer" onClick={() => handleClick(guild)}>
                                    {guild.icon && (
                                        <img
                                            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                            alt={guild.name}
                                            className="h-10 w-10 rounded-full mr-2"
                                            />
                                        )}
                                    <span className="text-lg font-semibold">{guild.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Aucune guilde disponible.</p>
                )}
            </div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={<p>Chargement...</p>}>
            <DashboardContent /> 
        </Suspense>
    );
}
