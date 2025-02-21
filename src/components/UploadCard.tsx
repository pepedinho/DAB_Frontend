"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"

interface UploadCardProps {
  guild: string | null;
  refresh: () => void;
}

const UploadCard: React.FC<UploadCardProps> = ({ guild, refresh }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      setError("Please select a file to upload.")
      return
    }

    await uploadFile(selectedFile)
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)

    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      await uploadFile(droppedFile)
    }
  }

  const uploadFile = async (file: File) => {
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/${guild}`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload file")
      }

      console.log("✅ File uploaded successfully!")
      refresh();
    } catch (err) {
      console.error("❌ Error during upload:", err)
      setError("Error uploading file.")
    } finally {
      setIsLoading(false);
    //   window.location.reload();
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-all duration-300 ease-in-out
                ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-600 bg-[#252529]"
                }`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <ArrowUpTrayIcon className="w-12 h-12 text-blue-500 mb-4" />
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Upload a file</h3>
      <input
        type="file"
        onChange={handleFileChange}
        className="bg-transparent cursor-pointer mb-4 text-sm text-gray-500 dark:text-gray-400" 
        placeholder="Drag and drop or click to select a file"
        accept="*/*"
       />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isLoading && (
        <div className="mt-4 flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
          <p className="text-blue-500">Uploading...</p>
        </div>
      )}
    </div>
  )
}

export default UploadCard

