import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3333;

http.createServer((req, res) => {
	fs.readFile(path.join(__dirname, "data.json"), (err, content) => {
		if (err) throw err;

		res.end(content);
	});
}).listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
