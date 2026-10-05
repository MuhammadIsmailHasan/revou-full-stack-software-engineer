import { ContentId } from "./contents";
import { MenuId } from "./menus";

export const sidebars: Record<MenuId, { id: ContentId; label: string }[]> = {
	// components: [
	// 	{
	// 		id: "comp-1",
	// 		label: "Hands On 1",
	// 	},
	// 	{
	// 		id: "comp-2",
	// 		label: "Hands On 2",
	// 	},
	// 	{
	// 		id: "comp-3",
	// 		label: "Hands On 3",
	// 	},
	// ],

	// props: [
	// 	{
	// 		id: "prop-1",
	// 		label: "Hands On 1",
	// 	},
	// 	{
	// 		id: "prop-2",
	// 		label: "Hands On 2",
	// 	},
	// 	{
	// 		id: "prop-3",
	// 		label: "Hands On 3",
	// 	},
	// 	{
	// 		id: "prop-4",
	// 		label: "Hands On 4",
	// 	},
	// ],
	controlledinput: [
		{
			id: "control-1",
			label: "Hands On 1",
		},
		{
			id: "control-2",
			label: "Hands On 2",
		},
		{
			id: "control-3",
			label: "Exercise",
		},
	],
};
