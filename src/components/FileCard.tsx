"use client"
import type { FileInfos } from "./FileSpace"
import type React from "react"

import DownloadButton from "./DownloadButton"
import { TrashIcon, DocumentIcon } from "@heroicons/react/24/outline"

interface FileCardProps {
  file: FileInfos
  guild: string | null
  refresh: () => void
}

const FileCard: React.FC<FileCardProps> = ({ file, guild, refresh }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown date"

    const year = dateString.substring(0, 4)
    const month = dateString.substring(4, 6)
    const day = dateString.substring(6, 8)
    const hour = dateString.substring(9, 11)
    const minute = dateString.substring(11, 13)

    return `${day}/${month}/${year} ${hour}:${minute}`
  }

  const deleteFile = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${file.id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (!response.ok) {
      console.log("Failed to delete file")
    }

    refresh()
  }

  return (
    <div className="max-w-sm p-6 bg-[#252529] rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-4">
        <DocumentIcon className="w-8 h-8 text-blue-500 mr-3" />
        <div>
          <h5 className="text-xl font-bold text-gray-900 dark:text-white">{file.file_name + "." + file.extension}</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(file.date)}</p>
        </div>
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-300">File size: {file.mb_size} MB</p>
      <div className="flex items-center justify-between">
        <DownloadButton file={file} guild={guild} />
        <button
          onClick={deleteFile}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
          title="Delete file"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default FileCard

