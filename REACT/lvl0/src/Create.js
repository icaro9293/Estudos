import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [autor, setAutor] = useState('clone')
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (evt) => {
        evt.preventDefault()
        setIsPending(true)
        const blog = { title, body, autor }
        setTimeout(() => {
            fetch('http://localhost:8000/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blog)
            })
                .then(() => {
                    console.log('novo blog adicionado')
                    setIsPending(false)
                    navigate('/')
                })
        }, 1000);

    }

    return (
        <div className="create">
            <h2>Criar novo blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titulo do blog: </label>
                    <input type="text" required value={title} onChange={(evt) => setTitle(evt.target.value)} />
                </div>
                <div>
                    <label>conteudo do blog: </label>
                    <textarea required value={body} onChange={(evt) => setBody(evt.target.value)}></textarea>
                </div>
                <div>
                    <label>Autor do blog: </label>
                    <select value={autor} onChange={(evt) => setAutor(evt.target.value)}>
                        <option value="clone">clone</option>
                        <option value="lion">lion</option>
                    </select>
                </div>
                {!isPending && <button>Adicionar blog</button>}
                {isPending && <button disabled>Adicionando blog...</button>}
                <p>{title}</p>
                <p>{body}</p>
                <p>{autor}</p>
            </form>
        </div>
    );
}

export default Create