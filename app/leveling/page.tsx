'use client';

import { useEffect, useState } from 'react';

interface LevelingZone {
    name: string;
    mapId: string;
    recommendedLevel: string;
    mobs: string[];
    tips: string;
}

interface LevelingGuide {
    id: string;
    levelRange: {
        min: number;
        max: number;
    };
    title: string;
    description: string;
    zones: LevelingZone[];
    quests: string[];
    videos?: Array<{
        title: string;
        url: string;
        channel: string;
    }>;
    tips: string[];
}

export default function LevelingPage() {
    const [guides, setGuides] = useState<LevelingGuide[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

    useEffect(() => {
        fetch('/data/leveling.json')
            .then(res => res.json())
            .then(data => {
                setGuides(data);
                setLoading(false);
                if (data.length > 0) {
                    setSelectedGuide(data[0].id);
                }
            })
            .catch(err => {
                console.error('Error loading leveling guides:', err);
                setLoading(false);
            });
    }, []);

    const selectedGuideData = guides.find(g => g.id === selectedGuide);

    return (
        <>
            {/* Page Header */}
            <section className="section" style={{ background: 'var(--gradient-hero)', color: 'var(--text-inverse)', padding: 'var(--spacing-2xl) 0' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--text-inverse)', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        <i className="fas fa-chart-line"></i> Guías de Leveling
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'rgba(255,255,255,0.9)' }}>
                        Rutas optimizadas para subir de nivel rápidamente en RO Latam 2025
                    </p>
                </div>
            </section>

            {/* Level Range Selector */}
            <section className="section-sm">
                <div className="container">
                    <div className="card">
                        <h3><i className="fas fa-filter"></i> Selecciona tu Rango de Nivel</h3>
                        <div className="grid grid-3">
                            {guides.map(guide => (
                                <button
                                    key={guide.id}
                                    className={`btn ${selectedGuide === guide.id ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setSelectedGuide(guide.id)}
                                >
                                    Nivel {guide.levelRange.min}-{guide.levelRange.max}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Guide Content */}
            {loading ? (
                <section className="section">
                    <div className="container">
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                        </div>
                    </div>
                </section>
            ) : selectedGuideData ? (
                <section className="section">
                    <div className="container">
                        {/* Guide Header */}
                        <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h2>{selectedGuideData.title}</h2>
                            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
                                {selectedGuideData.description}
                            </p>
                        </div>

                        {/* Leveling Zones */}
                        <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h3><i className="fas fa-map-marked-alt"></i> Zonas de Leveling</h3>
                            <div className="grid grid-2">
                                {selectedGuideData.zones.map((zone, idx) => (
                                    <div key={idx} className="card" style={{ background: 'var(--bg-tertiary)' }}>
                                        <div className="card-header">
                                            <h4>{zone.name}</h4>
                                            <span className="badge badge-primary">{zone.recommendedLevel}</span>
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Mapa:</strong> <code>{zone.mapId}</code></p>
                                            <div style={{ marginTop: 'var(--spacing-sm)' }}>
                                                <strong>Monstruos:</strong>
                                                <div className="flex gap-sm" style={{ flexWrap: 'wrap', marginTop: 'var(--spacing-xs)' }}>
                                                    {zone.mobs.map((mob, midx) => (
                                                        <span key={midx} className="badge badge-secondary">{mob}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div style={{ marginTop: 'var(--spacing-md)', padding: 'var(--spacing-sm)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                                <i className="fas fa-lightbulb" style={{ color: 'var(--color-warning)' }}></i> <strong>Tip:</strong> {zone.tips}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quests */}
                        {selectedGuideData.quests.length > 0 && (
                            <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h3><i className="fas fa-scroll"></i> Quests Recomendadas</h3>
                                <div className="grid grid-2">
                                    {selectedGuideData.quests.map((quest, idx) => (
                                        <div key={idx} className="flex gap-sm" style={{ alignItems: 'center', padding: 'var(--spacing-sm)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                                            <i className="fas fa-check-circle" style={{ color: 'var(--color-success)' }}></i>
                                            <span>{quest}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tips */}
                        <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h3><i className="fas fa-star"></i> Consejos Importantes</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {selectedGuideData.tips.map((tip, idx) => (
                                    <li key={idx} style={{ padding: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-primary)' }}>
                                        <i className="fas fa-arrow-right" style={{ marginRight: 'var(--spacing-sm)', color: 'var(--color-primary)' }}></i>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Videos */}
                        {selectedGuideData.videos && selectedGuideData.videos.length > 0 && (
                            <div className="card">
                                <h3><i className="fab fa-youtube"></i> Videos Guía</h3>
                                <div className="grid grid-1">
                                    {selectedGuideData.videos.map((video, idx) => (
                                        <div key={idx} className="card" style={{ background: 'var(--bg-tertiary)' }}>
                                            <h4>{video.title}</h4>
                                            <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
                                                <i className="fas fa-user"></i> {video.channel}
                                            </p>
                                            <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 'var(--spacing-sm)' }}>
                                                <i className="fab fa-youtube"></i> Ver en YouTube
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            ) : null}

            {/* Additional Resources */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="card">
                        <h3><i className="fas fa-info-circle"></i> Recursos Adicionales</h3>
                        <div className="grid grid-3">
                            <div className="card" style={{ background: 'var(--bg-tertiary)' }}>
                                <h4><i className="fas fa-users"></i> Eden Group</h4>
                                <p>Obtén equipamiento gratuito y quests de experiencia desde nivel 12.</p>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>
                                    Ubicación: Habla con Eden Teleport Officers en ciudades principales
                                </p>
                            </div>
                            <div className="card" style={{ background: 'var(--bg-tertiary)' }}>
                                <h4><i className="fas fa-clipboard-list"></i> Bounty Board</h4>
                                <p>Completa quests diarias para experiencia extra en Prontera, Geffen y Payon.</p>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>
                                    Tip: Stackea quests del mismo mob para máxima eficiencia
                                </p>
                            </div>
                            <div className="card" style={{ background: 'var(--bg-tertiary)' }}>
                                <h4><i className="fas fa-ship"></i> Sunken Ship</h4>
                                <p>Método rápido de leveling 3-56 con Catherina Von Blood [1] headgear.</p>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>
                                    Ubicación: Habla con Fisk en Alberta (189/151), costo 250z
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
