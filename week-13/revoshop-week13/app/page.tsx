import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

const APP_DIR = path.join(process.cwd(), "app");

// Folders that are not routes we want to list (private, route groups, dynamic, api)
const isListable = (name: string) => !/^[_(\[@]/.test(name) && name !== "api";

function findPages(dir: string, base = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes: string[] = [];

  if (base && entries.some((e) => e.isFile() && /^page\.(tsx|jsx|ts|js)$/.test(e.name))) {
    routes.push(base);
  }
  for (const e of entries) {
    if (e.isDirectory() && isListable(e.name)) {
      routes.push(...findPages(path.join(dir, e.name), `${base}/${e.name}`));
    }
  }
  return routes.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function getSections() {
  return fs
    .readdirSync(APP_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && isListable(e.name))
    .map((e) => ({ name: e.name, routes: findPages(path.join(APP_DIR, e.name), `/${e.name}`) }))
    .filter((s) => s.routes.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

export default function Home() {
  const sections = getSections();

  return (
    <main className="font-sans p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-1">Week 13 – Index</h1>
        <p className="text-sm text-gray-500 mb-6">
          Daftar halaman otomatis dari folder <code>app/</code>.
        </p>

        <div className="space-y-5">
          {sections.map((section) => (
            <section key={section.name} className="bg-white border rounded-lg p-5 shadow-sm">
              <h2 className="font-semibold mb-3">{section.name}</h2>
              <ul className="space-y-1">
                {section.routes.map((route) => (
                  <li key={route}>
                    <Link href={route} className="text-blue-600 hover:underline">
                      {route}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
