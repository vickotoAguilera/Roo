// Class types
export interface ClassData {
    id: string;
    name: string;
    nameEs: string;
    type: string;
    baseClass: string;
    tier: string;
    basedOn?: string;
    sprite: string;
    description: string;
    icon: string;
    recommendedStats: {
        str: string;
        agi: string;
        vit: string;
        int: string;
        dex: string;
        luk: string;
    };
    builds: Build[];
}

export interface Build {
    name: string;
    type: string;
    stats?: {
        str: number;
        agi: number;
        vit: number;
        int: number;
        dex: number;
        luk: number;
    };
    description: string;
    skills?: string[];
    equipment?: Record<string, string>;
    videos?: Video[];
}

export interface Video {
    title: string;
    youtubeId: string;
}

// Leveling types
export interface LevelingGuide {
    id: string;
    title: string;
    levelRange: string;
    location: string;
    description: string;
    recommendedLevel: number;
    experience: string;
    difficulty: string;
    tips: string[];
}

// Mob types
export interface Mob {
    id: number;
    name: string;
    nameEs: string;
    level: number;
    hp: number;
    element: string;
    race: string;
    size: string;
    baseExp: number;
    jobExp: number;
    drops: Drop[];
    location: string[];
}

export interface Drop {
    item: string;
    rate: string;
}

// Quest types
export interface Quest {
    id: string;
    title: string;
    titleEs: string;
    levelReq: number;
    type: string;
    rewards: Reward[];
    steps: string[];
    npc: string;
    location: string;
}

export interface Reward {
    type: string;
    amount?: number;
    item?: string;
}

// Event types
export interface Event {
    id: string;
    title: string;
    titleEs: string;
    date: string;
    time: string;
    description: string;
    rewards: string[];
    location: string;
    type: string;
}

// News types
export interface NewsItem {
    id: string;
    title: string;
    date: string;
    category: string;
    summary: string;
    content: string;
    image?: string;
}
