"use client"

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import CubeLoader from '@/components/CubeLoader';

interface Guild {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
}

export default function Dashboard() {
    const searchParams = useSearchParams();
    let token = searchParams.get('token'); 
    const [guildList, setGuildList] = useState<Guild[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    if (!token)
        token = sessionStorage.getItem("Token") || '';

    useEffect(() => {
        const fetchGuilds = async () => {
            
            if (token) {
                sessionStorage.setItem("Token", token);
                try {
                    const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch guilds');
                    }
                    const guilds: Guild[] = await response.json();
                    const ownerGuilds = guilds.filter(guild => guild.owner);
                    setGuildList(ownerGuilds);
                } catch (error) {
                    console.error('Erreur lors de la récupération des guildes :', error);
                    setError('Erreur lors de la récupération des guildes.');
                } finally {
                    setLoading(false); // Fin du chargement
                }
            }
        };

        fetchGuilds(); // Appeler la fonction pour récupérer les guildes
    }, [token]);
    const router = useRouter();


    const handleClick = (guild: Guild) => {
        router.push(`/files?guild=${guild.id}`);
    }

    return (
        <>
            {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-inherit font-sans">
                    <CubeLoader/>
                    <h2>Loading ...</h2>
                    </div>
                ) : (
                    <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Dashboard des Guildes</h1>
                    {guildList.length > 0 ? (
                        <ul>
                            {guildList.map((guild) => (
                                <li key={guild.id} className="border p-4 mb-2 rounded-lg shadow">
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
            )}
        </>
    );
}