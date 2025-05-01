import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <h1 className="logo">InspireNet</h1>
      <nav className="nav">
        <a className="nav-link">Home</a>
        <a className="nav-link">Profile</a>
      </nav>
    </header>
  );
}

export default Header;
