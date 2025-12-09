import { ClassData, LevelingGuide, Mob, Quest, Event, NewsItem } from './types';

export async function getClasses(): Promise<ClassData[]> {
    const res = await fetch('/data/classes.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('Failed to fetch classes');
    return res.json();
}

export async function getLevelingGuides(): Promise<LevelingGuide[]> {
    const res = await fetch('/data/leveling.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('Failed to fetch leveling guides');
    return res.json();
}

export async function getMobs(): Promise<Mob[]> {
    const res = await fetch('/data/mobs.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('Failed to fetch mobs');
    return res.json();
}

export async function getQuests(): Promise<Quest[]> {
    const res = await fetch('/data/quests.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('Failed to fetch quests');
    return res.json();
}

export async function getEvents(): Promise<Event[]> {
    const res = await fetch('/data/events.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
}

export async function getNews(): Promise<NewsItem[]> {
    const res = await fetch('/data/news.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('Failed to fetch news');
    return res.json();
}
