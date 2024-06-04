import { useState } from "react";
import BlogList from './BlogList'
import useFetch from "./useFetch";

const Home = () => {

    const { data: blog, isPending, erro } = useFetch('http://localhost:8000/blog')
    // const handleDelete = (id) => {
    //     const newBlog = blog.filter((b) => {
    //         return b.id !== id
    //     })
    //     setBlog(newBlog)
    // }

    const [nome, setNome] = useState('clone')

    const mudarNome = () => {
        setNome('lion')
    }

    return (
        <div className="home">
            <p>{nome}</p>
            <button onClick={mudarNome}>Clique para trocar o nome acima</button>
            {/* condicional em React: apenas se a condição na esquerda for true, a da direita será executada. */}
            {erro && <div>{erro}</div>}
            {isPending && <div>Carregando...</div>}
            {/* enquanto a variavel 'blog' estiver como null, ele não entra no resto das funções.*/}
            {blog && <BlogList blog={blog} title='Blogs cadastrados' ></BlogList>}
            {/* <BlogList blog={blog.filter((b) => b.autor === 'clone')} title='Blogs escrito por clone'></BlogList> */}
        </div>
    );
}

export default Home

