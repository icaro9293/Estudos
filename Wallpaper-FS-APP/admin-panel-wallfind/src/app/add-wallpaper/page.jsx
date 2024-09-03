"use client"
import UploadImage from '@/components/UploadImage'
import { api } from '@/utils/api'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function page() {
    const [categories, setCategories] = useState([])
    const [wallpaper, setWallpaper] = useState({
        name: "",
        image: "",
        category: ""
    })
    console.log('dados wallpaper: ', wallpaper)
    useEffect(() => {
        getAllCategories()
    }, [])
    const getAllCategories = async () => {
        try {
            const response = await api.get('/api/categories')
            setCategories(response?.data?.category)
            console.log('categorias: ', response?.data?.category)

        } catch (error) {
            console.log('erro: ', error)
        }
    }
    const handleGetUrl = (url) => {
        setWallpaper((prev) => ({
            ...prev,
            image: url
        }))
    }
    const handleCreateWallpaper = async () => {
        try {
            const response = await api.post('/api/wallpapers', wallpaper)
            console.log('resposta: ', response)
            toast.success('wallpaper adicionado com sucesso')
        } catch (error) {
            toast.error('erro ao adicionar o wallpaper')

        }
    }
    return (
        <main className='p-6'>
            <Link href={'/add-category'} className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600'>Adicionar Categoria</Link>
            <div className='mt-10 p-3 rounded-lg shadow-md'>
                <h2 className='text-lg font-semibold mb-2'>Adicionar Wallpaper</h2>
                <UploadImage handleGetUrl={handleGetUrl}></UploadImage>
                <input type="text" placeholder='Nome do Wallpaper' className='mb-2 p-2 w-full border border-gray-300 rounded ' onChange={(evt) => {
                    setWallpaper((prev) => ({
                        ...prev,
                        name: evt.target.value
                    }))
                }} />
                <select className='mb-4 p-2 rounded border border-gray-300 w-full'
                    value={wallpaper.category}
                    onChange={(evt) => {
                        setWallpaper((prev) => ({
                            ...prev,
                            category: evt.target.value
                        }))
                    }}
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => {
                        return (
                            <option value={category._id} key={category._id}>{category.name}</option>
                        )
                    })
                    }
                </select>

                <button className='py-2 px-4 bg-blue-500 rounded text-white hover:bg-blue-600' onClick={() => {
                    handleCreateWallpaper()
                }}>Adicionar Wallpaper</button>
            </div>
        </main>
    )
}
