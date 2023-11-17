import "./Header.css"

export default function Header() {
    return (
        <header>
            <nav  className="header_nav">
                <ul>
                    <li className="nav_list_item">
                        <a href="/login" className="nav_link">Login</a>
                    </li>
                    <li className="nav_list_item">
                        <a href="/register" className="nav_link">Register</a>
                    </li>
                    <li className="nav_list_item">
                        <a href="/" className="nav_link">Home</a>
                    </li>
                    <li className="nav_list_item">
                        <a href="/newtrip" className="nav_link">New Trip</a>
                    </li>
                    <li className="nav_list_item">
                        <a href="/admin" className="nav_link">Admin</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
