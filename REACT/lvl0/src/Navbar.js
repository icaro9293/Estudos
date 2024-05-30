//snippet usado 'sfc' - stateless funcional component
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>teste blog com REACT</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">Criar novo blog</Link>
            </div>
        </nav>
    );
}

export default Navbar;