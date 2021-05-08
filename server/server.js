"use strict";

import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3333;

const filePath = path.join(__dirname, "data.json");

http.createServer((req, res) => {
	res.writeHead(200, {
		"Access-Control-Allow-Origin": "*"
	});

	if (path.extname(req.url) == ".ico") return;

	const route = new URL(`http://localhost:${PORT}${req.url}`);

	const id = route.searchParams.get("id");
	const title = route.searchParams.get("title");
	const important = JSON.parse(route.searchParams.get("important"));
	const checked = JSON.parse(route.searchParams.get("checked"));

	fs.readFile(filePath, (err, content) => {
		const data = JSON.parse(content);

		if (err) throw err;

		if (id && title && important != null && checked != null) {
			data.tasks = [...data.tasks, { id, title, important, checked }];

			fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
				if (err) throw err;
			});
		}

		res.end(JSON.stringify(data));
	});
}).listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
