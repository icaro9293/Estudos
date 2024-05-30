import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, erro, isPending } = useFetch(`http://localhost:8000/blog/${id}`)
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

                </article>
            )}
        </div>
    );
}

export default BlogDetails;