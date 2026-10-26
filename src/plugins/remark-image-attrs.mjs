import { visit } from 'unist-util-visit';

export default function remarkImageAttrs() {
    return (tree) => {
        visit(tree, 'image', (node, index, parent) => {
            const next = parent?.children[index + 1];
            const match = next?.type === 'text' && next.value.match(/^\{([^}]*)\}/);
            if (!match) return;
            const classes = match[1].split(/\s+/).filter((t) => t.startsWith('.')).map((t) => t.slice(1));
            node.data = { ...node.data, hProperties: { ...node.data?.hProperties, className: classes } };
            next.value = next.value.slice(match[0].length);
        });
    };
}
