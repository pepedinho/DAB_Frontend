"use client"

import { useState } from "react";
import UploadForm from "./UploadForm";

interface UploadCardProps {
    guild: string | null;
}

const UploadCard: React.FC<UploadCardProps> = ({guild}) => {
    const [file, setFile] = useState<File | null>(null); // État pour stocker le fichier sélectionné
    const [isLoading, setIsLoading] = useState<boolean>(false); // État de chargement
    const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs

    // Fonction pour gérer le changement de fichier
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]; // Récupérer le premier fichier sélectionné
        if (selectedFile) {
            setFile(selectedFile); // Mettre à jour l'état avec le fichier sélectionné
        }
    };

    // Fonction pour gérer l'envoi du fichier
    const handleUpload = async () => {
        if (!file) {
            setError("Veuillez sélectionner un fichier à télécharger.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`https://dab-production.up.railway.app/upload/${guild}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Échec de l'envoi du fichier");
            }

            console.log("Fichier téléchargé avec succès");
        } catch (err) {
            console.error("Erreur lors de l'envoi du fichier :", err);
            setError("Erreur lors de l'envoi du fichier.");
        } finally {
            setIsLoading(false);
            window.location.reload()
        }
    };

    return (
        <div className="flex flex-col border-white rounded-lg border-2 p-4">
            {/* <input
                type="file"
                onChange={handleFileChange}
                className="mb-2"
            /> */}
            <UploadForm onFileChange={handleFileChange} file={file}/>
            <button
                type="button"
                onClick={handleUpload}
                disabled={isLoading}
                className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none ${isLoading ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'} `}
            >
                {isLoading ? "Téléchargement..." : "Télécharger"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Afficher les erreurs */}
        </div>
    );
}

export default UploadCard;
