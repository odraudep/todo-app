"use strict";

import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3000;

const filePath = path.join(__dirname, "data.json");

http.createServer((req, res) => {
	res.writeHead(200, {
		"Access-Control-Allow-Origin": "*"
	});

	if (req.url === "/favicon.ico") {
		res.writeHead(200, {
			"Content-Type": "image/x-icon"
		});
		return res.end();
	}

	const route = new URL(`http://localhost:${PORT}${req.url}`);

	const id = route.searchParams.get("id");
	const title = route.searchParams.get("title");
	const del = route.searchParams.has("del");
	const checkAll = route.searchParams.has("checkall");
	const uncheckAll = route.searchParams.has("uncheckall");
	const removeAll = route.searchParams.has("removeall");

	let important;
	let checked;

	try {
		important = JSON.parse(route.searchParams.get("important"));
		checked = JSON.parse(route.searchParams.get("checked"));
	} catch {
		important = null;
		checked = null;
	}

	fs.readFile(filePath, (err, content) => {
		const data = JSON.parse(content);

		if (err) throw err;

		// DELETE
		if (id && del) {
			data.tasks = data.tasks.filter(task => task.id != id);

			return fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
				if (err) throw err;

				res.end("Deleted");
			});
		}

		if (removeAll) {
			data.tasks = data.tasks.filter(task => !task.checked);

			return fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
				if (err) throw err;

				res.end("Removed All");
			});
		}

		// PUT
		if (checkAll) {
			data.tasks = data.tasks.map(
				task => task.checked
					? task
					: { ...task, checked: true }
			);

			return fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
				if (err) throw err;

				res.end("Checked All");
			});
		}

		if (uncheckAll) {
			data.tasks = data.tasks.map(
				task => task.checked
					? { ...task, checked: false }
					: task
			);

			return fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
				if (err) throw err;

				res.end("Unchecked All");
			});
		}

		// POST & PUT
		if (id && title && important != null && checked != null) {
			const index = data.tasks.findIndex(task => task.id == id);

			if (index < 0) {
				data.tasks = [...data.tasks, { id, title, important, checked }];
			} else {
				data.tasks[index] = { id, title, important, checked };
			}

			return fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
				if (err) throw err;

				res.end("Added");
			});
		}

		res.end(JSON.stringify(data));
	});
}).listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
