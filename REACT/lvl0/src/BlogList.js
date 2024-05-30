import { Link } from "react-router-dom";

const BlogList = ({ blog, title }) => {
    // const blog = props.blog
    // const title = props.title
    return (
        <div className="blog-list">
            <h1>{title}</h1>
            {blog.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blog/${blog.id}`}>
                        <h2>{blog.title}</h2>
                        <p>{blog.autor}</p>
                    </Link>
                    {/* <button onClick={() => handleDelete(blog.id)}>Deletar</button> */}
                </div>
            ))}
        </div>
    );
}

export default BlogList;