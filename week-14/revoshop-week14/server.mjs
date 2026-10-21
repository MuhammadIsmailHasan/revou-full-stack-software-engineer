import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const ROOT = join(import.meta.dirname, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };
const ROUTES = {
	"/": "index.html",
	"/products": "products.html",
	"/login": "login.html",
	"/register": "register.html",
	"/categories": "categories.html",
	"/dashboard": "dashboard.html",
};

createServer(async (req, res) => {
	const path = new URL(req.url, "http://x").pathname;
	const file = ROUTES[path] ?? path.slice(1);
	try {
		const body = await readFile(join(ROOT, file));
		res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "text/plain" });
		res.end(body);
	} catch {
		res.writeHead(404, { "content-type": "text/html" });
		res.end("<h1>404 Not Found</h1>");
	}
}).listen(3000, () => console.log("Playground running at http://localhost:3000"));
