interface MenuProps {
	id: MenuId;
	label: string;
}

export const menus: MenuProps[] = [
	// {
	// 	id: "components",
	// 	label: "Components",
	// },
	// {
	// 	id: "props",
	// 	label: "Props",
	// },
	{
		id: "controlledinput",
		label: "Controlled Input",
	},
];

export type MenuId = "controlledinput";
