import "./Header.css"

export default function Header() {
    return (
        <header>
            <nav  className="header_nav">
                <ul>
                    <li>
                        <a href="/login" className="nav_link">Login</a>
                    </li>
                    <li>
                        <a href="/register" className="nav_link">Register</a>
                    </li>
                    <li>
                        <a href="/home" className="nav_link">Home</a>
                    </li>
                    <li>
                        <a href="/newtrip" className="nav_link">New Trip</a>
                    </li>
                    <li>
                        <a href="/admin" className="nav_link">Admin</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
