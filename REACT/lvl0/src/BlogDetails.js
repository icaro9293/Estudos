import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, erro, isPending } = useFetch(`http://localhost:8000/blog/${id}`)
    const navigate = useNavigate()

    const handleClick = () => {
        const endpoint = `http://localhost:8000/blog/${blog.id}`
        fetch(endpoint, {
            method: 'DELETE'
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate('/')
                } else {
                    console.log('erro ao deletar blog.')
                }
            })
    }
    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {erro && <div>{erro}</div>}
            {blog && (
                <article>
                    <h1>{blog.title}</h1>
                    <p>{blog.autor}</p>
                    <div>
                        {blog.body}
                    </div>
                    <button onClick={handleClick}>Deletar</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;