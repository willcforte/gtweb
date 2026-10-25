import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const arg = process.argv[2];
if (!arg) {
    console.error('usage: npm run new -- <path under content/, e.g. articles/foo or articles/foo/>');
    process.exit(1);
}
const dest = join('content', arg.endsWith('/') ? `${arg}index.md` : `${arg.replace(/\.md$/, '')}.md`);
if (existsSync(dest)) {
    console.error(`${dest} already exists`);
    process.exit(1);
}
const now = new Date();
const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const unix = String(Math.floor(now.getTime() / 1000));
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, readFileSync('content/_template.md', 'utf8').replace('{{date}}', date).replace('{{unix}}', unix));
console.log(dest);
