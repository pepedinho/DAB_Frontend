"use client"

export const dynamic = "force-dynamic";

import CubeLoader from "@/components/CubeLoader";
import FileCard from "@/components/FileCard";
import UploadCard from "@/components/UploadCard";
import { useEffect, useState, Suspense } from "react";

export interface FileInfos {
  channel: string;
  file_name: string;
  size: string;
  mb_size: string;
  date: string;
  extension: string;
  id: string;
}
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [files, setFiles] = useState<FileInfos[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const guild = searchParams.get('guild'); 

  const fetchFile = async () => {
    console.log("📌 Tentative de requête vers le backend...");
    setIsLoading(true);

    try {
      const response = await fetch(`https://dab-pjtw.onrender.com/list/${guild}`, {
        method: "GET",
        credentials: "include",
      });
      console.log("📌 Réponse reçue :", response);
      if (!response.ok) {
        throw new Error("Impossible de recuperer la liste des fichiers")
      }

      const data = await response.json();
      if (data.files && Array.isArray(data.files)) {
        console.log("📌 Enregistrement de la data : " , data.files);
        setFiles(data.files);
        console.log("📌 Apres Enregistrement de la data : " , files);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFile();
  }, [])

  return (
      <Suspense fallback={<p>Chargement...</p>} >    
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-inherit font-sans">
          <CubeLoader/>
          <h2>Loading ...</h2>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col bg-inherit h-full w-full font-sans">
          <p className="text-lg font-bold">Liste des fichiers:</p>
          <UploadCard guild={guild}/>
          {files.length > 0 ? (
            <>
              <div className="flex m-20 flex-wrap gap-4">
                {files.map((file) => (
                  <FileCard key={file.id} file={file} guild={guild} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 mt-2">Aucun fichier disponible : {files.length}</p>
          )}
        </div>
      )}
    </Suspense>
  );
}
