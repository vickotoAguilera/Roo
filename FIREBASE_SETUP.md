# Configuración de Firebase

## Variables de Entorno Requeridas

Agrega estas variables a tu archivo `.env.local`:

```env
# Divine Pride API
NEXT_PUBLIC_DIVINE_PRIDE_API_KEY=6ac140fdf684fc70b35902eeec703e19

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDn1cVtZzv_Wdn6bE1zP6nvsWzrFidUuUc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=roolatam-b7cba.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=roolatam-b7cba
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=roolatam-b7cba.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1000754732622
NEXT_PUBLIC_FIREBASE_APP_ID=1:1000754732622:web:dd332887c24a9fd0b52d1f
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-GLLFYXCKB7
```

## Información del Proyecto Firebase

- **Nombre:** Roolatam
- **Project ID:** roolatam-b7cba
- **Número del Proyecto:** 1000754732622
- **App ID:** 1:1000754732622:web:dd332887c24a9fd0b52d1f

## Reglas de Firestore

Las reglas actuales permiten lectura/escritura hasta el 8 de enero de 2026:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 1, 8);
    }
  }
}
```

⚠️ **IMPORTANTE:** Estas reglas son temporales y permiten acceso completo. Deberás configurar reglas de seguridad apropiadas antes de producción.

## Uso de Firestore

### Importar el servicio:

```typescript
import { 
  getDocument, 
  getAllDocuments, 
  addDocument, 
  updateDocument, 
  deleteDocument,
  getDocumentsWithQuery,
  where,
  orderBy,
  limit
} from '@/lib/firestoreService';
```

### Ejemplos de uso:

#### Obtener todos los documentos:
```typescript
const users = await getAllDocuments('users');
```

#### Obtener un documento específico:
```typescript
const user = await getDocument('users', 'userId123');
```

#### Agregar un documento:
```typescript
const newUserId = await addDocument('users', {
  name: 'Juan Pérez',
  email: 'juan@example.com',
  level: 1
});
```

#### Actualizar un documento:
```typescript
await updateDocument('users', 'userId123', {
  level: 50,
  class: 'Swordsman'
});
```

#### Eliminar un documento:
```typescript
await deleteDocument('users', 'userId123');
```

#### Query con filtros:
```typescript
const highLevelUsers = await getDocumentsWithQuery('users', [
  where('level', '>=', 50),
  orderBy('level', 'desc'),
  limit(10)
]);
```

## Colecciones Sugeridas

### `users`
- id (auto)
- name: string
- email: string
- characterName: string
- level: number
- class: string
- server: string
- createdAt: string
- updatedAt: string

### `guides`
- id (auto)
- title: string
- category: string
- content: string
- author: string
- likes: number
- views: number
- createdAt: string
- updatedAt: string

### `builds`
- id (auto)
- className: string
- buildName: string
- stats: object
- skills: array
- equipment: array
- author: string
- rating: number
- createdAt: string
- updatedAt: string

### `events`
- id (auto)
- title: string
- description: string
- startDate: string
- endDate: string
- type: string
- rewards: array
- active: boolean
- createdAt: string
- updatedAt: string

## Configuración en Vercel

Agrega las mismas variables de entorno en Vercel:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega todas las variables `NEXT_PUBLIC_FIREBASE_*`

## Seguridad

⚠️ **Antes de producción:**
1. Actualiza las reglas de Firestore
2. Implementa autenticación de usuarios
3. Restringe acceso a colecciones sensibles
4. Valida datos en el servidor

## Testing

Prueba la conexión creando una página de prueba:

```typescript
'use client';

import { useState } from 'react';
import { addDocument, getAllDocuments } from '@/lib/firestoreService';

export default function FirebaseTest() {
  const [data, setData] = useState([]);
  
  const testAdd = async () => {
    await addDocument('test', { message: 'Hello Firebase!' });
    alert('Documento agregado!');
  };
  
  const testRead = async () => {
    const docs = await getAllDocuments('test');
    setData(docs);
  };
  
  return (
    <div>
      <button onClick={testAdd}>Agregar Documento</button>
      <button onClick={testRead}>Leer Documentos</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```
