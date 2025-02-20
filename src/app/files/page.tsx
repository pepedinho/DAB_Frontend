"use client";

export const dynamic = "force-dynamic";

import CubeLoader from "@/components/CubeLoader";
import FileCard from "@/components/FileCard";
import UploadCard from "@/components/UploadCard";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export interface FileInfos {
  channel: string;
  file_name: string;
  size: string;
  mb_size: string;
  date: string;
  extension: string;
  id: string;
}

// 🔹 Déplacer la logique dans un composant séparé
function HomeContent() {
  const searchParams = useSearchParams();
  const guild = searchParams.get("guild");

  const [files, setFiles] = useState<FileInfos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchFile = async () => {
    console.log("📌 Tentative de requête vers le backend...");
    setIsLoading(true);

    try {
      console.log("API URL => ", process.env.NEXT_PUBLIC_API_URL)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/list/${guild}`, {
        method: "GET",
        credentials: "include",
      });
      console.log("📌 Réponse reçue :", response);
      if (!response.ok) {
        throw new Error("Impossible de récupérer la liste des fichiers");
      }

      const data = await response.json();
      if (data.files && Array.isArray(data.files)) {
        console.log("📌 Enregistrement de la data : ", data.files);
        setFiles(data.files);
        console.log("📌 Après enregistrement de la data : ", files);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFile();
  }, []);

  return isLoading ? (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-inherit font-sans">
      <CubeLoader />
      <h2>Loading ...</h2>
    </div>
  ) : (
    <div className="flex items-center justify-center flex-col bg-inherit h-full w-full font-sans">
      <p className="text-lg font-bold">Liste des fichiers:</p>
      <UploadCard guild={guild} />
      {files.length > 0 ? (
        <div className="flex m-20 flex-wrap gap-4">
          {files.map((file) => (
            <FileCard key={file.id} file={file} guild={guild} refresh={fetchFile} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">Aucun fichier disponible : {files.length}</p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <HomeContent />
    </Suspense>
  );
}
