"use client"

import type React from "react"

export const dynamic = "force-dynamic"

import CubeLoader from "@/components/CubeLoader"
import FileCard from "@/components/FileCard"
import UploadCard from "@/components/UploadCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState, useCallback } from "react"
import { Guild } from "@/app/dashboard/page"
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import SearchBar from "./SearchBar"

export interface FileInfos {
  channel: string
  file_name: string
  size: string
  mb_size: string
  date: string
  extension: string
  id: string
}

interface FileSpaceProps {
  guild: Guild
}

const FileSpace: React.FC<FileSpaceProps> = ({ guild }) => {
  const [files, setFiles] = useState<FileInfos[]>([]);
  const [filtredFiles, setFiltredFiles] = useState<FileInfos[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  const searchFile = (s: string) => {
    if (!s.trim) {
      setFiltredFiles(files);
      return;
    }

    const filtered = files.filter(file => 
      file.file_name.toLowerCase().includes(s.toLowerCase())
    );

    console.log("[filter] => ", filtered);
    setFiltredFiles(filtered);
  }

  const fetchFile = useCallback(async () => {
    console.log("📌 Attempting to fetch from backend...")
    setIsLoading(true)

    try {
      console.log("API URL => ", process.env.NEXT_PUBLIC_API_URL)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/list/${guild.id}`, {
        method: "GET",
        credentials: "include",
      })
      console.log("📌 Response received:", response)
      if (!response.ok) {
        const url = "https://discord.com/oauth2/authorize?client_id=1340725673056010291";
        window.open(url, "popupWindow", "width=600,height=800,scrollbars=yes,resizable=yes");
        throw new Error("Unable to fetch file list")
      }

      const data = await response.json()
      if (data.files && Array.isArray(data.files)) {
        console.log("📌 Saving data: ", data.files)
        setFiles(data.files)
        console.log("📌 After saving data: ", files)
      }
    } catch (err) {
      console.error("Error fetching data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [guild, files])
  
  useEffect(() => {
    fetchFile();
  }, [])
  
  useEffect(() => {
    console.log("[files] => ", files.length);
    setFiltredFiles(files);
  }, [isLoading]);

  return (
        <div className="container mx-2 px-4 py-8 items-start">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 ">{guild.name}</h1>
            <div 
              className="flex w-10 h-10 bg-[#252529] justify-center items-center rounded-xl cursor-pointer hover:scale-75 transition-all"
              onClick={fetchFile}
            >
              <FontAwesomeIcon icon={faArrowRotateRight}/>
            </div>
          </div>
          <div className="flex flex-col">
            <UploadCard guild={guild.id} refresh={fetchFile} />
            <SearchBar onChange={searchFile}/>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center w-full h-[92vh]">
              <CubeLoader />
              <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Loading ...</h2>
            </div>
          ) : (
            <>
              {filtredFiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtredFiles.map((file) => (
                    <FileCard key={file.id} file={file} guild={guild.id} refresh={fetchFile} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center text-lg">No files available</p>
              )}
            </>
          )}
        </div>
  )
}

export default FileSpace

