"use client"

import FileCard from "@/components/FileCard";
import UploadCard from "@/components/UploadCard";
import { useEffect, useState } from "react";

export interface FileInfos {
  channel: string;
  file_name: string;
  id: string;
}

export default function Home() {
  const [files, setFiles] = useState<FileInfos[]>([]);

  const fetchFile = async () => {
    console.log("📌 Tentative de requête vers le backend...");
    try {
      const response = await fetch("https://dab-pjtw.onrender.com/list", {
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
    }
  }

  useEffect(() => {
    fetchFile();
  }, [])

  return (
    <div className="flex items-center justify-center flex-col bg-inherit h-full w-full font-sans">
      <p className="text-lg font-bold">Liste des fichiers:</p>

      {files.length > 0 ? (
        <>
          <UploadCard/>
          <div className="flex flex-auto gap-4 m-4">
            {files.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-2">Aucun fichier disponible : {files.length}</p>
      )}
    </div>
  );
}
