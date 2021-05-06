import { createStore } from "vuex";

const state = {
	tasks: [
		{
			title: "Wash your hands",
			important: false,
			checked: false
		}
	]
};

export default createStore({ state });

