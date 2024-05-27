//snippet usado 'sfc' - stateless funcional component
const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>teste blog com REACT</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/blog">Criar novo blog</a>
            </div>
        </nav>
    );
}

export default Navbar;