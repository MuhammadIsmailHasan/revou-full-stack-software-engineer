import { ContentId } from "../data/contents";
import { MenuId } from "../data/menus";
import { sidebars } from "../data/sidebars";

interface SidebarProps {
    activeMenu: MenuId;
    activeSideBar: ContentId;
    setActiveSideBar: (id: ContentId) => void;
}

export default function Sidebar({activeMenu, activeSideBar, setActiveSideBar}: SidebarProps) {
    const sidebar = sidebars[activeMenu];

    return (
        <aside className="col-span-1 border border-gray-500 p-5 rounded-lg flex gap-3 flex-col">
            {
                sidebar.map((sidebar) => (
                    <button 
                        className={`border p-4 rounded-2xl cursor-pointer ${
                            sidebar.id === activeSideBar ? "bg-blue-600 text-white" : "hover:bg-mauve-200"
                        }`}
                        key={sidebar.id}
                        onClick={() => setActiveSideBar(sidebar.id)}>
                        {sidebar.label}
                    </button>
                ))
            }
        </aside>
    )
}