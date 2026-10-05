import { MenuId, menus } from "../data/menus";

interface HeaderProps {
    activeMenu?: MenuId;
    onMenuChange?: (menuId: MenuId) => void;
}

export default function Header({activeMenu, onMenuChange}: HeaderProps) {
    return (
        <header className="flex items-center justify-between gap-6 p-4 border-b-2 mb-4">
            <h1 className="font-bold"><a href="">Learning React JS</a></h1>
            <div className="flex flex-row gap-5">
                {
                    menus.map((menu) => (
                        <button key={menu.id} 
                            onClick={() => onMenuChange?.(menu.id)} 
                            className={`border rounded-lg py-1 px-4 cursor-pointer ${
                                menu.id === activeMenu ? "bg-blue-600 text-white" : "hover:bg-gray-300"
                            }`}>
                                { menu.label}
                        </button>
                    ))
                }

                {/* <a className="border rounded-lg py-1 px-2 hover:bg-gray-400" href="components">Components</a>
                <a className="border rounded-lg py-1 px-2 hover:bg-gray-400" href="props">Props</a>
                <a className="border rounded-lg py-1 px-2 hover:bg-gray-400"  href="state">State Management</a>
                <a className="border rounded-lg py-1 px-2 hover:bg-gray-400"  href="rendering">Conditional Rendering</a>
                <a className="border rounded-lg py-1 px-2 hover:bg-gray-400"  href="controlled">Controlled Input</a> */}
            </div>
        </header>
    )
}