export default function Header() {
    return (
        <header className="flex items-center justify-between gap-6 p-4 border border-gray-700 rounded mb-4">
            <h1 className="font-bold">RevoShop</h1>
            <div className="flex flex-row gap-5">
                <a href="home">Home</a>
                <a href="about">About</a>
                <a href="project">Project</a>
            </div>
        </header>
    )
}