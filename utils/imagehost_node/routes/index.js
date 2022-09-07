// route async globbing

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fileUrl from "file-url";
import { promises } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function* getFiles(dir) {
  const dirents = await promises.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

(async () => {
  for await (const f of getFiles(__dirname)) {
    if (dirname(f) === __dirname) continue;
    import(fileUrl(f));
  }
})();
