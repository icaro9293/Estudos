"use client"
import UploadImage from '@/components/UploadImage'
import { api } from '@/utils/api'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


export default function Page() {
    const [category, setCategory] = useState({
        name: "",
        image: ""
    })
    console.log(category)
    const handleGetUrl = (url) => {
        console.log(url)
        setCategory((prev) => ({
            ...prev,
            image: url
        }))
    }
    const handleCreateCategory = async () => {
        try {
            const response = await api.post('/api/categories', category) //recebe a rota da api e o body.
            console.log('resposta: ', response.data)
            toast.success('categoria criada com sucesso.')
        } catch (error) {
            console.log('error', error)
            toast.error('erro ao criar categoria.')
        }
    }

    return (
        <main>
            <div className="p-6 rounded shadow-md" >
                <h2 className='text-lg font-semibold mb-4'>Adicionar Categoria</h2>
                <UploadImage handleGetUrl={handleGetUrl}></UploadImage>
                <input type="text" placeholder='Nome da Categoria' className='p-2 mb-4 rounded border border-gray-300 w-full' onChange={(evt) => {
                    setCategory((prev) => ({
                        ...prev,
                        name: evt.target.value
                    }))
                }} />
                <button className='py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600' onClick={() => {
                    handleCreateCategory()
                }}>Adicionar</button>
            </div>
        </main>
    )
}
