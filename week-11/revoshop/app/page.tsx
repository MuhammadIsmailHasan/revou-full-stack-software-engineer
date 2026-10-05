"use client"
import { useState } from "react";
import { Footer } from "./components/Footer";
import Header from "./components/Header"
import Sidebar from "./components/Sidebar";
import { Content } from "./components/Content";
import { ContentId } from "./data/contents";
import { MenuId, menus } from "./data/menus";
import { sidebars } from "./data/sidebars";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState<MenuId>(menus[0]['id']);
  const [activeSideBar, setActiveSideBar] = useState<ContentId>(sidebars[activeMenu][0]['id']);

  function handleMenuChange(menuId: MenuId) {
    setActiveMenu(menuId);
    setActiveSideBar(sidebars[menuId][0].id);
  }

  return (
    <div>
      <Header activeMenu={activeMenu} onMenuChange={handleMenuChange}></Header>
      <div className="mx-5 my-10 p-8 grid grid-cols-4 border gap-5 shadow shadow-grey-900 rounded-2xl">
          <Sidebar activeMenu={activeMenu} activeSideBar={activeSideBar} setActiveSideBar={setActiveSideBar}></Sidebar>
          <Content activeSideBar={activeSideBar} ></Content>
      </div>
      <Footer></Footer>
    </div>
  );
}
