import { posix } from 'node:path';
import type { CollectionEntry } from 'astro:content';

export function entryPath(entry: CollectionEntry<'content'>, url?: string) {
    if (!url || /^([a-z][a-z0-9+.-]*:|\/)/i.test(url)) return url;
    return posix.join('/', posix.dirname(posix.relative('content', entry.filePath!)), url);
}
