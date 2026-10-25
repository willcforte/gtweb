import { existsSync } from 'node:fs';
import { dirname, join, posix, relative } from 'node:path';
import { visit } from 'unist-util-visit';

const contentDir = join(process.cwd(), 'content');

export default function rehypeColocate() {
    return (tree, file) => {
        const dir = dirname(file.path);
        const route = relative(contentDir, dir).split('\\').join('/');
        const astroImages = file.data.astro?.localImagePaths ?? [];
        const rewrite = (url) => {
            if (/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(url)) return url;
            const path = decodeURI(url.split(/[?#]/)[0]);
            if (path.endsWith('.md') || !existsSync(join(dir, path))) return url;
            return posix.join('/', route, url);
        };
        visit(tree, (node) => {
            if (node.type === 'raw') {
                node.value = node.value.replace(/(\s(?:src|href)=["'])([^"']+)/g, (_, attr, url) => attr + rewrite(url));
            } else if (node.type === 'element') {
                for (const prop of ['href', 'src']) {
                    const url = node.properties?.[prop];
                    if (typeof url !== 'string') continue;
                    if (node.tagName === 'img' && astroImages.includes(decodeURI(url))) continue;
                    node.properties[prop] = rewrite(url);
                }
            }
        });
    };
}
