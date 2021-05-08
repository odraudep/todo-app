import { createStore } from "vuex";
import { nanoid } from "nanoid";

const api = "http://localhost:3333";

const state = {
	tasks: [],
	loading: false
};

const getters = {
	favTasks(state) {
		return state.tasks.filter(todo => todo.important);
	},
	uncheckedTasks(state) {
		return state.tasks.filter(todo => !todo.checked);
	},
	checkedTasks(state) {
		return state.tasks.filter(todo => todo.checked);
	}
};

const actions = {
	async loadData({ commit }) {
		const res = await fetch(api)
			.then(data => data.text())
			.then(data => {
				try {
					JSON.parse(data);
				} catch {
					return;
				}

				return JSON.parse(data);
			});

		if (!res) return;

		const tasks = res.tasks;

		commit("updTasks", tasks);
	},
	async addTask({ state, commit }, task) {
		task.id = nanoid(6);

		if (!task.title || task.title.trim() == "") return;

		const { id, title, important, checked } = task;

		commit("changeLoading", true);

		await fetch(
			`${api}/?id=${id}&title=${title}&important=${important}&checked=${checked}`,
			{	method: "POST" }
		);

		const newTasks = [...state.tasks, task];

		commit("updTasks", newTasks);
		commit("changeLoading", false);
	},
	toggleTask({ state, commit }, task) {
		const newTasks = state.tasks.map(
			todo => todo.id == task.id
				? { ...todo, checked: !todo.checked }
				: todo
		);

		return new Promise(resolve => {
			setTimeout(() => {
				commit("updTasks", newTasks);
				resolve();
			}, 50);
		});
	},
	toggleFav({ state, commit }, task) {
		const newTasks = state.tasks.map(
			todo => todo.id == task.id
				?	{ ...todo, important: !todo.important }
				: todo
		);

		return new Promise(resolve => {
			setTimeout(() => {
				commit("updTasks", newTasks);
				resolve();
			}, 500);
		});
	},
	removeTask({ state, commit }, task) {
		const newTasks = state.tasks.filter(
			todo => todo.id != task.id
		);
		return new Promise(resolve => {
			setTimeout(() => {
				commit("updTasks", newTasks);
				resolve();
			}, 500);
		});
	},
	checkAllTasks({ state, getters, commit }) {
		const uncheckedTasks = getters.uncheckedTasks;

		let newTasks = state.tasks;

		uncheckedTasks.forEach(task => {
			newTasks = newTasks.map(todo => todo.id == task.id
				? { ...todo, checked: !todo.checked}
				: todo
			);
		});

		return new Promise(resolve => {
			setTimeout(() => {
				commit("updTasks", newTasks);
				resolve();
			}, 500);
		});
	},
	uncheckAllTasks({ state, getters, commit }) {
		const checkedTasks = getters.checkedTasks;

		let newTasks = state.tasks;

		checkedTasks.forEach(task => {
			newTasks = newTasks.map(todo => todo.id == task.id
				? { ...todo, checked: !todo.checked}
				: todo
			);
		});

		return new Promise(resolve => {
			setTimeout(() => {
				commit("updTasks", newTasks);
				resolve();
			}, 500);
		});
	},
	removeAllTasks({ state, getters, commit }) {
		const tasks = getters.checkedTasks;

		let newTasks = state.tasks;

		tasks.forEach(task => {
			newTasks = newTasks.filter(todo => todo.id != task.id);
		});

		return new Promise(resolve => {
			setTimeout(() => {
				commit("updTasks", newTasks);
				resolve();
			}, 500);
		});
	}
};

const mutations = {
	updTasks(state, tasks) {
		state.tasks = tasks;
	},
	changeLoading(state, bool) {
		state.loading = bool;
	}
};

export default createStore({ state, actions, mutations, getters });

