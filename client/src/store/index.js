import { createStore } from "vuex";
import { nanoid } from "nanoid";

const api = "http://localhost:3000";

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

		if (!res || !res.tasks) return;

		const tasks = res.tasks;

		commit("updTasks", tasks);
	},
	async addTask({ state, commit }, task) {
		task.id = nanoid(6);

		if (!task.title || task.title.trim() == "") return;

		const { id, title, important, checked } = task;

		commit("changeLoading", true);

		await fetch(
			`${api}/?id=${id}&title=${title}&important=${important}&checked=${checked}`
		);

		const newTasks = [...state.tasks, task];

		commit("updTasks", newTasks);
		commit("changeLoading", false);
	},
	async toggleTask({ state, commit }, task) {
		const { id, title, important, checked } = task;

		await fetch(
			`${api}/?id=${id}&title=${title}&important=${important}&checked=${!checked}`
		);

		const newTasks = state.tasks.map(
			todo => todo.id == id
				? { ...todo, checked: !todo.checked }
				: todo
		);
		commit("updTasks", newTasks);
	},
	async toggleFav({ state, commit }, task) {
		const { id, title, important, checked } = task;

		await fetch(
			`${api}/?id=${id}&title=${title}&important=${!important}&checked=${checked}`
		);

		const newTasks = state.tasks.map(
			todo => todo.id == id
				?	{ ...todo, important: !todo.important }
				: todo
		);

		commit("updTasks", newTasks);
	},
	async removeTask({ state, commit }, task) {
		const { id } = task;

		await fetch(
			`${api}/?id=${id}&del`
		);

		const newTasks = state.tasks.filter(
			todo => todo.id != id
		);
		commit("updTasks", newTasks);
	},
	async checkAllTasks({ state, getters, commit }) {
		await fetch(
			`${api}/?checkall`
		);

		const uncheckedTasks = getters.uncheckedTasks;

		let newTasks = state.tasks;

		uncheckedTasks.forEach(task => {
			newTasks = newTasks.map(todo => todo.id == task.id
				? { ...todo, checked: !todo.checked}
				: todo
			);
		});

		commit("updTasks", newTasks);
	},
	async uncheckAllTasks({ state, getters, commit }) {
		await fetch(
			`${api}/?uncheckall`
		);

		const checkedTasks = getters.checkedTasks;

		let newTasks = state.tasks;

		checkedTasks.forEach(task => {
			newTasks = newTasks.map(todo => todo.id == task.id
				? { ...todo, checked: !todo.checked}
				: todo
			);
		});

		commit("updTasks", newTasks);
	},
	async removeAllTasks({ state, getters, commit }) {
		await fetch(
			`${api}/?removeall`
		);

		const tasks = getters.checkedTasks;

		let newTasks = state.tasks;

		tasks.forEach(task => {
			newTasks = newTasks.filter(todo => todo.id != task.id);
		});

		commit("updTasks", newTasks);
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

