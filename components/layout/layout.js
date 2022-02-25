import NavBar from "./navbar/navbar";

export default function Layout({ children }) {
    return (
        <div className="layout">
            <NavBar />
            <main className="main">
                {children}
            </main>
        </div>
    )
}