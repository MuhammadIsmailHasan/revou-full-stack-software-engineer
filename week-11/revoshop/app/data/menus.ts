interface MenuProps {
	id: MenuId;
	label: string;
}

export const menus: MenuProps[] = [
	{
		id: "components",
		label: "Components",
	},
	{
		id: "props",
		label: "Props",
	},
];

export type MenuId = "components" | "props";
