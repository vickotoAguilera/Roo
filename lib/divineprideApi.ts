// lib/divineprideApi.ts
// Divine Pride API Integration

const API_KEY = process.env.NEXT_PUBLIC_DIVINE_PRIDE_API_KEY;
const BASE_URL = 'https://www.divine-pride.net/api/database';

export interface DPItem {
  id: number;
  name: string;
  description: string;
  type: string;
  subType: string;
  weight: number;
  attack: number;
  defense: number;
  slots: number;
  requiredLevel: number;
  price: number;
}

export interface DPMonster {
  id: number;
  name: string;
  level: number;
  hp: number;
  attack: number;
  defense: number;
  magicDefense: number;
  element: string;
  race: string;
  size: string;
  baseExp: number;
  jobExp: number;
  drops: Array<{
    itemId: number;
    chance: number;
  }>;
}

export interface DPSkill {
  id: number;
  name: string;
  description: string;
  maxLevel: number;
  type: string;
}

/**
 * Obtener información de un item por ID
 */
export async function getItem(itemId: number): Promise<DPItem | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/Item/${itemId}?apiKey=${API_KEY}`,
      {
        next: { revalidate: 86400 } // Cache por 24 horas
      }
    );

    if (!response.ok) {
      console.error(`Error fetching item ${itemId}:`, response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching item ${itemId}:`, error);
    return null;
  }
}

/**
 * Obtener información de un monstruo por ID
 */
export async function getMonster(monsterId: number): Promise<DPMonster | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/Monster/${monsterId}?apiKey=${API_KEY}`,
      {
        next: { revalidate: 86400 } // Cache por 24 horas
      }
    );

    if (!response.ok) {
      console.error(`Error fetching monster ${monsterId}:`, response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching monster ${monsterId}:`, error);
    return null;
  }
}

/**
 * Obtener información de un skill por ID
 */
export async function getSkill(skillId: number): Promise<DPSkill | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/Skill/${skillId}?apiKey=${API_KEY}`,
      {
        next: { revalidate: 86400 } // Cache por 24 horas
      }
    );

    if (!response.ok) {
      console.error(`Error fetching skill ${skillId}:`, response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching skill ${skillId}:`, error);
    return null;
  }
}

/**
 * Buscar items por nombre
 */
export async function searchItems(query: string): Promise<DPItem[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/Item/search?name=${encodeURIComponent(query)}&apiKey=${API_KEY}`,
      {
        next: { revalidate: 3600 } // Cache por 1 hora
      }
    );

    if (!response.ok) {
      console.error('Error searching items:', response.statusText);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching items:', error);
    return [];
  }
}

/**
 * Buscar monstruos por nombre
 */
export async function searchMonsters(query: string): Promise<DPMonster[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/Monster/search?name=${encodeURIComponent(query)}&apiKey=${API_KEY}`,
      {
        next: { revalidate: 3600 } // Cache por 1 hora
      }
    );

    if (!response.ok) {
      console.error('Error searching monsters:', response.statusText);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching monsters:', error);
    return [];
  }
}

/**
 * Obtener items populares/destacados
 */
export async function getFeaturedItems(limit: number = 10): Promise<DPItem[]> {
  // IDs de items populares en RO
  const featuredIds = [
    501,   // Red Potion
    502,   // Orange Potion
    503,   // Yellow Potion
    504,   // White Potion
    505,   // Blue Potion
    1201,  // Knife
    2301,  // Cotton Shirt
    2401,  // Sandals
    5001,  // Headgear
    2601   // Ring
  ];

  const items = await Promise.all(
    featuredIds.slice(0, limit).map(id => getItem(id))
  );

  return items.filter((item): item is DPItem => item !== null);
}

/**
 * Obtener monstruos populares/destacados
 */
export async function getFeaturedMonsters(limit: number = 10): Promise<DPMonster[]> {
  // IDs de monstruos populares en RO
  const featuredIds = [
    1002,  // Poring
    1113,  // Drops
    1031,  // Poporing
    1242,  // Orc Warrior
    1062,  // Santa Poring
    1096,  // Angeling
    1388,  // Ghostring
    1582,  // Deviling
    1785,  // Baphomet
    1511   // Amon Ra
  ];

  const monsters = await Promise.all(
    featuredIds.slice(0, limit).map(id => getMonster(id))
  );

  return monsters.filter((monster): monster is DPMonster => monster !== null);
}
