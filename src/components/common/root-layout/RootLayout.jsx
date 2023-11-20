import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import './RootLayout.css'

export default function RootLayout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}