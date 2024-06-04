import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Erro</h2>
            <p>Página não encontrada.</p>
            <Link to={'/'}>Voltar para Homepage</Link>
        </div>
    );
}

export default NotFound;