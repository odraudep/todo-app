import { createStore } from "vuex";

const state = {
	tasks: [
		{
			id: 123,
			title: "Wash your hands",
			important: false,
			checked: false
		}
	],
	loading: false
};

const actions = {
	addTask({ state, commit }, task) {
		task.id = Date.now();
		task.checked = false;
		task.important = false;

		if (!task.title || task.title.trim() == "") return;

		const newTasks = [...state.tasks, task];

		return new Promise(resolve => {
			state.loading = true;

			setTimeout(() => {
				commit("updTasks", newTasks);
				state.loading = false;
				resolve();
			}, 500);
		});
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
			}, 500);
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
	}
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

export default createStore({ state, actions, mutations, getters });

