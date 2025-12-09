# INSTRUCCIONES: Configurar API Key de Divine Pride

## Paso 1: Crear archivo .env.local

**IMPORTANTE:** Debes crear este archivo MANUALMENTE porque está protegido por .gitignore (por seguridad).

1. Abre tu editor de código
2. En la **raíz del proyecto** `ro-latam-nextjs/`, crea un nuevo archivo llamado `.env.local`
3. Copia y pega exactamente esto:

```
NEXT_PUBLIC_DIVINE_PRIDE_API_KEY=6ac140fdf684fc70b35902eeec703e19
```

4. Guarda el archivo

## Paso 2: Reiniciar el servidor

Después de crear el archivo .env.local, **DEBES REINICIAR** el servidor de desarrollo:

1. En la terminal donde está corriendo `npm run dev`, presiona `Ctrl+C` para detenerlo
2. Ejecuta nuevamente: `npm run dev`
3. Espera a que compile

## Paso 3: Verificar que funciona

1. Abre tu navegador en: http://localhost:3000/database
2. Intenta buscar un item (por ejemplo: "potion")
3. Intenta buscar un monstruo (por ejemplo: "poring")

## ¿Qué se creó?

### 1. `lib/divineprideApi.ts`
Módulo con funciones para:
- `getItem(id)` - Obtener item por ID
- `getMonster(id)` - Obtener monstruo por ID
- `getSkill(id)` - Obtener skill por ID
- `searchItems(query)` - Buscar items por nombre
- `searchMonsters(query)` - Buscar monstruos por nombre
- `getFeaturedItems()` - Items destacados
- `getFeaturedMonsters()` - Monstruos destacados

### 2. `app/database/page.tsx`
Página de base de datos con:
- Búsqueda de items y monstruos
- Selector de tipo (Items/Monstruos)
- Resultados en grid
- Modal de detalles
- Diseño responsive

## Ejemplos de Uso

### En cualquier componente:

```typescript
import { getItem, getMonster, searchItems } from '@/lib/divineprideApi';

// Obtener un item específico
const redPotion = await getItem(501);

// Obtener un monstruo específico
const poring = await getMonster(1002);

// Buscar items
const potions = await searchItems('potion');

// Buscar monstruos
const orcs = await searchMonsters('orc');
```

## Notas Importantes

- ✅ La API key está configurada con `NEXT_PUBLIC_` para usarla en cliente y servidor
- ✅ Todas las requests tienen cache automático (24h para items/mobs, 1h para búsquedas)
- ✅ El archivo .env.local NO se subirá a Git (está en .gitignore)
- ⚠️ Divine Pride tiene límite de ~100 requests/hora en free tier
- ⚠️ Usa el sistema de cache para minimizar requests

## Próximos Pasos

Puedes expandir la integración:
1. Crear página dedicada para items (`/items/[id]`)
2. Crear página dedicada para monstruos (`/mobs/[id]`)
3. Agregar filtros avanzados
4. Implementar favoritos
5. Agregar comparador de items

## Troubleshooting

**Si no funciona la búsqueda:**
1. Verifica que creaste `.env.local` en la raíz del proyecto
2. Verifica que la API key esté correcta
3. Reinicia el servidor (`Ctrl+C` y `npm run dev`)
4. Revisa la consola del navegador para errores

**Si ves "API key undefined":**
- No creaste el archivo .env.local
- No reiniciaste el servidor después de crearlo
- El archivo está en la ubicación incorrecta (debe estar en la raíz)
