import { useState } from "react";

const Home = () => {
    const [blog, setBlog] = useState([
        { title: 'novo blog 1', body: 'lorem ipsum...', autor: 'clone', id: 1 },
        { title: 'novo blog 2', body: 'lorem ipsum...', autor: 'lion', id: 2 },
        { title: 'novo blog 3', body: 'lorem ipsum...', autor: 'nininha', id: 3 }
    ])

    const [nome, setNome] = useState('clone')



    const mudarNome = () => {
        setNome('lion')
    }

    return (
        <div className="home">
            <h1>teste REACT lvl0 </h1>
            <p>{nome}</p>
            <button onClick={mudarNome}>Clique</button>
            {blog.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.autor}</p>
                </div>
            ))}

        </div>
    );
}

export default Home

