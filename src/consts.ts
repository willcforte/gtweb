export const SITE = {
    name: 'GTWeb',
    title: 'Will C. Forte',
    description:
        'Robotics engineering, research notes, and writing by Will C. Forte.',
    url: 'https://willcforte.com',
    author: 'Will C. Forte',
    email: 'will@willcforte.com',
    locale: 'en_US',
} as const

export const NAV = [
    { href: '/', label: 'home' },
    { href: '/writing', label: 'writing' },
    { href: '/projects', label: 'projects' },
    { href: '/notes', label: 'notes' },
    { href: '/gallery', label: 'gallery' },
    { href: '/research', label: 'research' },
    { href: '/about', label: 'about' },
] as const

export const SOCIAL = [
    { href: 'https://github.com/willcforte', label: 'github' },
    { href: 'https://www.linkedin.com/in/willcforte/', label: 'linkedin' },
    { href: 'https://bsky.app/profile/willcforte.com', label: 'bluesky' },
    { href: 'https://www.youtube.com/@willcforte', label: 'youtube' },
    { href: 'https://sigmoid.social/@willcforte', label: 'mastodon', rel: 'me' },
] as const

/* Giscus. Requires Discussions enabled on the repo and the Giscus app installed. */
export const GISCUS = {
    repo: 'willcforte/gtweb',
    repoId: 'R_kgDOJTvp3g',
    category: 'Announcements',
    categoryId: 'DIC_kwDOJTvp3s4DDlVg',
} as const

export const TYPE_LABELS: Record<string, string> = {
    project: 'project',
    essay: 'essay',
    log: 'log',
    note: 'note',
}
