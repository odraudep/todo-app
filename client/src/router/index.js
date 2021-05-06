import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home";
import Favorites from "@/views/Favorites";
import Manage from "@/views/Manage";

const routes = [
	{
		name: "Home",
		path: "/",
		component: Home
	},
	{
		name: "Favorites",
		path: "/favorites",
		component: Favorites
	},
	{
		name: "Manage",
		path: "/manage",
		component: Manage
	}
];

const router = new createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
