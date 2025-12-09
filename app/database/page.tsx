'use client';

import { useState, useEffect } from 'react';
import { searchItems, searchMonsters } from '@/lib/divineprideApi';

interface SearchResult {
  id: number;
  name: string;
  type: 'item' | 'monster';
  [key: string]: any;
}

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'items' | 'monsters'>('items');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      if (searchType === 'items') {
        const items = await searchItems(searchQuery);
        setResults(items.map(item => ({ ...item, type: 'item' as const })));
      } else {
        const monsters = await searchMonsters(searchQuery);
        setResults(monsters.map(monster => ({ ...monster, type: 'monster' as const })));
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="section" style={{ background: 'var(--gradient-hero)', color: 'var(--text-inverse)', padding: 'var(--spacing-2xl) 0' }}>
        <div className="container">
          <h1 style={{ color: 'var(--text-inverse)', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            <i className="fas fa-database"></i> Base de Datos RO
          </h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'rgba(255,255,255,0.9)' }}>
            Busca items, monstruos y más información de Ragnarok Online
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="section-sm">
        <div className="container">
          <div className="card">
            <h3><i className="fas fa-search"></i> Buscar en la Base de Datos</h3>
            
            {/* Search Type Selector */}
            <div className="grid grid-2" style={{ marginBottom: 'var(--spacing-md)' }}>
              <button
                className={`btn ${searchType === 'items' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSearchType('items')}
              >
                <i className="fas fa-box"></i> Items
              </button>
              <button
                className={`btn ${searchType === 'monsters' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSearchType('monsters')}
              >
                <i className="fas fa-dragon"></i> Monstruos
              </button>
            </div>

            {/* Search Input */}
            <div className="flex gap-sm">
              <input
                type="text"
                placeholder={`Buscar ${searchType === 'items' ? 'items' : 'monstruos'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Buscando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search"></i> Buscar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {results.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="card">
              <h3>
                <i className="fas fa-list"></i> Resultados ({results.length})
              </h3>
              <div className="grid grid-3">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="card hover-lift"
                    onClick={() => setSelectedItem(result)}
                    style={{ cursor: 'pointer', background: 'var(--bg-tertiary)' }}
                  >
                    <div className="card-header">
                      <h4>{result.name}</h4>
                      <span className="badge badge-primary">
                        ID: {result.id}
                      </span>
                    </div>
                    <div className="card-body">
                      {result.type === 'item' && (
                        <>
                          <p><strong>Tipo:</strong> {result.type || 'N/A'}</p>
                          <p><strong>Peso:</strong> {result.weight || 0}</p>
                        </>
                      )}
                      {result.type === 'monster' && (
                        <>
                          <p><strong>Nivel:</strong> {result.level || 'N/A'}</p>
                          <p><strong>HP:</strong> {result.hp?.toLocaleString() || 'N/A'}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Selected Item Detail Modal */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--spacing-lg)'
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="card"
            style={{
              maxWidth: '800px',
              maxHeight: '80vh',
              overflow: 'auto',
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-header">
              <div className="flex-between">
                <h2>{selectedItem.name}</h2>
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedItem(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <pre style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'auto'
              }}>
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="card">
            <h3><i className="fas fa-info-circle"></i> Acerca de la Base de Datos</h3>
            <p>
              Esta base de datos utiliza Divine Pride API para proporcionar información actualizada
              sobre items, monstruos, skills y más contenido de Ragnarok Online.
            </p>
            <div className="grid grid-3" style={{ marginTop: 'var(--spacing-md)' }}>
              <div className="card" style={{ background: 'var(--bg-tertiary)' }}>
                <h4><i className="fas fa-box"></i> Items</h4>
                <p>Equipamiento, consumibles, materiales y más</p>
              </div>
              <div className="card" style={{ background: 'var(--bg-tertiary)' }}>
                <h4><i className="fas fa-dragon"></i> Monstruos</h4>
                <p>Stats, drops, ubicaciones y elementos</p>
              </div>
              <div className="card" style={{ background: 'var(--bg-tertiary)' }}>
                <h4><i className="fas fa-magic"></i> Skills</h4>
                <p>Habilidades de todas las clases</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
