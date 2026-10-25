import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const root = 'content';
const visible = (name: string) => !name.startsWith('_') && !name.startsWith('.');

export const isDir = (rel: string) => statSync(join(root, rel)).isDirectory();
export const ls = (rel: string) => readdirSync(join(root, rel)).filter(visible).sort();

export function isLeaf(rel: string) {
    if (!existsSync(join(root, rel, 'index.md'))) return false;
    return !readdirSync(join(root, rel), { recursive: true, encoding: 'utf8' })
        .some((f) => f.endsWith('.md') && f !== 'index.md' && f.split('/').every(visible));
}

export function browsableDirs(rel = ''): string[] {
    return ls(rel)
        .map((name) => (rel ? `${rel}/${name}` : name))
        .filter(isDir)
        .flatMap((d) => (isLeaf(d) ? [] : [d, ...browsableDirs(d)]));
}
