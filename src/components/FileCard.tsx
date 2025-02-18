"use client"
import { FileInfos } from "@/app/files/page";
import DownloadButton from "./DownloadButton";

interface FileCardProps {
    file: FileInfos;
    guild: string | null;
}

const FileCard: React.FC<FileCardProps> = ({ file, guild }) => {

    const formatDate = (dateString: string) => {
        if (!dateString) return "Date inconnue";

        // Extraction des parties
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const hour = dateString.substring(9, 11);
        const minute = dateString.substring(11, 13);

        // Format final "X/X/X XX:XX"
        return `${day}/${month}/${year} ${hour}:${minute}`;
    };

    return(
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{file.file_name + "." + file.extension}</h5>
            </a>
            <p className="font-normal text-gray-700 dark:text-gray-400">{formatDate(file.date)}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <div className="flex items-center justify-between">
                <DownloadButton file={file} guild={guild}/>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{file.mb_size + "Mb"}</p>
            </div>
        </div>


        // <div>

        //     <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        //     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{file.file_name + "." + file.extension}</h5>
        //     <p className="font-normal text-gray-700 dark:text-gray-400">{formatDate(file.date)}</p>
        //     <DownloadButton file={file}/>
        //     </a>
        // </div>
        // <div className="flex flex-col border-white rounded-lg border-2">
        //     <p className="text-sm">{file.file_name + file.extension}</p>
        //     <p className="text-sm">{file.size}</p>
        //     <p className="text-sm">{file.date}</p>
        //     <p className="text-sm">{file.channel}</p>
        //     <p className="text-sm">{file.id}</p>
        //     {/* <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
        //     <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        //     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
        //     </svg>
        //     Loading...
        //     </button> */}
        // </div>
    )
}

export default FileCard;