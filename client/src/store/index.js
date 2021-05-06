import { createStore } from "vuex";

const state = {
	tasks: [
		{
			title: "Wash your hands",
			important: false,
			checked: false
		}
	],
	loading: false
};

const actions = {
	addTask({ state, commit }, task) {
		return new Promise(resolve => {
			state.loading = true;

			setTimeout(() => {
				commit("addTask", task);
				state.loading = false;
				resolve();
			}, 500);
		});
	}
};

const mutations = {
	addTask(state, task) {
		state.tasks = [...state.tasks, task];
	}
};

export default createStore({ state, actions, mutations });

