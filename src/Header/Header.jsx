import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <h1 className="logo">Course Control</h1>
      <nav className="nav">
        <a className="nav-link">Home</a>
        <a className="nav-link" href='/Profile.html'>Profile</a>
      </nav>
    </header>
  );
}

export default Header;
