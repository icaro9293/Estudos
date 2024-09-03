import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { app } from '@/utils/firebase'



function UploadImage({ handleGetUrl }) {
    const storage = getStorage(app)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [porcentagem, setPorcentagem] = useState(0)
    const handleImageUpload = (evt) => {
        setLoading(true)
        const file = evt.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setSelectedFile(reader.result)
        }
        if (file) {
            reader.readAsDataURL(file)
        }
        const name = new Date().getTime() + file.name
        const storageRef = ref(storage, name)
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPorcentagem(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                setLoading(false)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    handleGetUrl(downloadURL)
                    setLoading(false)
                });
            }
        );
    }
    return (
        <div>
            {
                loading && (
                    <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
                        <div>Fazendo upload do arquivo... {porcentagem} %</div>
                    </div>
                )
            }
            <input type="file" className='p-2 mb-4 rounded border border-gray-300 w-full' accept='image/*'
                onChange={handleImageUpload} />
            {selectedFile && (
                <div>
                    <img src={selectedFile} alt="imagem" className='h-40 w-30 pb-5' />
                </div>
            )}
        </div>

    )
}

export default UploadImage