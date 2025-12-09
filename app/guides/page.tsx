'use client';

import { useEffect, useState } from 'react';

interface GuideStep {
    number: number;
    title: string;
    description: string;
    location?: string;
    details: string[];
    tips?: string[];
}

interface Guide {
    id: string;
    title: string;
    category: string;
    icon: string;
    difficulty: string;
    description: string;
    requirements?: string[];
    steps?: GuideStep[];
    benefits?: string[];
    warnings?: string[];
    overview?: string;
    [key: string]: any;
}

export default function GuidesPage() {
    const [guides, setGuides] = useState<Guide[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetch('/data/guides.json')
            .then(res => res.json())
            .then(data => {
                setGuides(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading guides:', err);
                setLoading(false);
            });
    }, []);

    const categories = ['all', 'progression', 'equipment', 'mechanics'];
    const filteredGuides = selectedCategory === 'all' 
        ? guides 
        : guides.filter(g => g.category === selectedCategory);

    const selectedGuideData = guides.find(g => g.id === selectedGuide);

    const renderGuideContent = (guide: Guide) => {
        switch (guide.id) {
            case 'rebirth_guide':
                return renderRebirthGuide(guide);
            case 'eden_equipment_guide':
                return renderEdenGuide(guide);
            case 'stats_guide':
                return renderStatsGuide(guide);
            case 'refinement_guide':
                return renderRefinementGuide(guide);
            default:
                return <p>Contenido no disponible</p>;
        }
    };

    const renderRebirthGuide = (guide: Guide) => (
        <>
            {/* Requirements */}
            {guide.requirements && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3><i className="fas fa-clipboard-check"></i> Requisitos</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {guide.requirements.map((req: string, idx: number) => (
                            <li key={idx} style={{ padding: 'var(--spacing-xs)', marginBottom: 'var(--spacing-xs)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                                <i className="fas fa-check" style={{ color: 'var(--color-success)', marginRight: 'var(--spacing-sm)' }}></i>
                                {req}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Steps */}
            {guide.steps && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3><i className="fas fa-list-ol"></i> Pasos para Renacer</h3>
                    {guide.steps.map((step: GuideStep, idx: number) => (
                        <div key={idx} className="card" style={{ background: 'var(--bg-tertiary)', marginBottom: 'var(--spacing-md)' }}>
                            <div className="card-header">
                                <h4>
                                    <span className="badge badge-primary" style={{ marginRight: 'var(--spacing-sm)' }}>{step.number}</span>
                                    {step.title}
                                </h4>
                            </div>
                            <div className="card-body">
                                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                                    {step.description}
                                </p>
                                {step.location && (
                                    <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                                        <strong><i className="fas fa-map-marker-alt"></i> Ubicación:</strong> <code>{step.location}</code>
                                    </p>
                                )}
                                <ul>
                                    {step.details.map((detail: string, didx: number) => (
                                        <li key={didx}>{detail}</li>
                                    ))}
                                </ul>
                                {step.tips && step.tips.length > 0 && (
                                    <div style={{ marginTop: 'var(--spacing-md)', padding: 'var(--spacing-sm)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-warning)' }}>
                                        <strong><i className="fas fa-lightbulb"></i> Tips:</strong>
                                        <ul style={{ marginTop: 'var(--spacing-xs)', marginBottom: 0 }}>
                                            {step.tips.map((tip: string, tidx: number) => (
                                                <li key={tidx}>{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Benefits */}
            {guide.benefits && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3><i className="fas fa-star"></i> Beneficios del Rebirth</h3>
                    <div className="grid grid-2">
                        {guide.benefits.map((benefit: string, idx: number) => (
                            <div key={idx} style={{ padding: 'var(--spacing-sm)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                                <i className="fas fa-check-circle" style={{ color: 'var(--color-success)', marginRight: 'var(--spacing-sm)' }}></i>
                                {benefit}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Warnings */}
            {guide.warnings && (
                <div className="card" style={{ background: 'rgba(255, 193, 7, 0.1)', borderLeft: '4px solid var(--color-warning)' }}>
                    <h3><i className="fas fa-exclamation-triangle"></i> Advertencias Importantes</h3>
                    <ul>
                        {guide.warnings.map((warning: string, idx: number) => (
                            <li key={idx} style={{ color: 'var(--color-warning)' }}>{warning}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );

    const renderEdenGuide = (guide: Guide) => (
        <>
            {guide.overview && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)', background: 'var(--gradient-hero)', color: 'var(--text-inverse)' }}>
                    <p style={{ fontSize: 'var(--font-size-lg)' }}>{guide.overview}</p>
                </div>
            )}

            {guide.instructors && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3><i className="fas fa-user-tie"></i> Instructores</h3>
                    <div className="grid grid-2">
                        {guide.instructors.map((instructor: any, idx: number) => (
                            <div key={idx} className="card" style={{ background: 'var(--bg-tertiary)' }}>
                                <h4>{instructor.name}</h4>
                                <p><strong>Ubicación:</strong> <code>{instructor.location}</code></p>
                                {instructor.levels && <p><strong>Niveles:</strong> {instructor.levels}</p>}
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{instructor.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {guide.equipmentSets && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3><i className="fas fa-shield-alt"></i> Sets de Equipamiento</h3>
                    {guide.equipmentSets.map((set: any, idx: number) => (
                        <div key={idx} className="card" style={{ background: 'var(--bg-tertiary)', marginBottom: 'var(--spacing-md)' }}>
                            <div className="card-header">
                                <h4>Nivel {set.level}</h4>
                                <span className="badge badge-primary">Instructor {set.instructor}</span>
                            </div>
                            <div className="card-body">
                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <strong>Items:</strong>
                                    <div className="flex gap-sm" style={{ flexWrap: 'wrap', marginTop: 'var(--spacing-xs)' }}>
                                        {set.items.map((item: string, iidx: number) => (
                                            <span key={iidx} className="badge badge-info">{item}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <strong>Quests:</strong>
                                    <ul style={{ marginTop: 'var(--spacing-xs)' }}>
                                        {set.quests.map((quest: string, qidx: number) => (
                                            <li key={qidx}>{quest}</li>
                                        ))}
                                    </ul>
                                </div>
                                {set.note && (
                                    <div style={{ marginTop: 'var(--spacing-sm)', padding: 'var(--spacing-sm)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                        <i className="fas fa-info-circle"></i> <strong>Nota:</strong> {set.note}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {guide.importantNotes && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)', background: 'rgba(255, 193, 7, 0.1)', borderLeft: '4px solid var(--color-warning)' }}>
                    <h3><i className="fas fa-exclamation-triangle"></i> Notas Importantes</h3>
                    <ul>
                        {guide.importantNotes.map((note: string, idx: number) => (
                            <li key={idx}>{note}</li>
                        ))}
                    </ul>
                </div>
            )}

            {guide.tips && (
                <div className="card">
                    <h3><i className="fas fa-lightbulb"></i> Tips</h3>
                    <ul>
                        {guide.tips.map((tip: string, idx: number) => (
                            <li key={idx}>{tip}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );

    const renderStatsGuide = (guide: Guide) => (
        <>
            {guide.stats && (
                <div className="card">
                    <h3><i className="fas fa-chart-bar"></i> Stats Detallados</h3>
                    {guide.stats.map((stat: any, idx: number) => (
                        <div key={idx} className="card" style={{ background: 'var(--bg-tertiary)', marginBottom: 'var(--spacing-lg)' }}>
                            <div className="card-header">
                                <h4>
                                    <i className={`fas ${stat.icon}`} style={{ marginRight: 'var(--spacing-sm)' }}></i>
                                    {stat.name}
                                </h4>
                                <span className="badge badge-secondary">{stat.primaryUse}</span>
                            </div>
                            <div className="card-body">
                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <strong>Efectos por punto:</strong>
                                    <ul>
                                        {stat.effects.perPoint.map((effect: string, eidx: number) => (
                                            <li key={eidx}>{effect}</li>
                                        ))}
                                    </ul>
                                </div>
                                {stat.effects.per5Points && (
                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <strong>Cada 5 puntos:</strong>
                                        <ul>
                                            {stat.effects.per5Points.map((effect: string, eidx: number) => (
                                                <li key={eidx}>{effect}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <strong>Mejor para:</strong>
                                    <div className="flex gap-sm" style={{ flexWrap: 'wrap', marginTop: 'var(--spacing-xs)' }}>
                                        {stat.bestFor.map((cls: string, cidx: number) => (
                                            <span key={cidx} className="badge badge-primary">{cls}</span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ padding: 'var(--spacing-sm)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                    <strong><i className="fas fa-lightbulb"></i> Tips:</strong>
                                    <ul style={{ marginTop: 'var(--spacing-xs)', marginBottom: 0 }}>
                                        {stat.tips.map((tip: string, tidx: number) => (
                                            <li key={tidx}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {guide.generalTips && (
                <div className="card" style={{ background: 'var(--gradient-hero)', color: 'var(--text-inverse)' }}>
                    <h3><i className="fas fa-star"></i> Consejos Generales</h3>
                    <ul>
                        {guide.generalTips.map((tip: string, idx: number) => (
                            <li key={idx}>{tip}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );

    const renderRefinementGuide = (guide: Guide) => (
        <>
            {guide.overview && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <p style={{ fontSize: 'var(--font-size-lg)' }}>{guide.overview}</p>
                </div>
            )}

            <div className="grid grid-2" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div className="card">
                    <h3><i className="fas fa-map-marker-alt"></i> Ubicaciones de NPCs</h3>
                    <ul style={{ fontSize: 'var(--font-size-sm)' }}>
                        {guide.npcLocations.map((loc: string, idx: number) => (
                            <li key={idx}><code>{loc}</code></li>
                        ))}
                    </ul>
                </div>
                <div className="card">
                    <h3><i className="fas fa-clipboard-list"></i> Requisitos</h3>
                    <ul>
                        {guide.requirements.map((req: string, idx: number) => (
                            <li key={idx}>{req}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {guide.ores && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3><i className="fas fa-gem"></i> Ores y Costos</h3>
                    <div className="grid grid-2">
                        {guide.ores.map((ore: any, idx: number) => (
                            <div key={idx} className="card" style={{ background: 'var(--bg-tertiary)' }}>
                                <h4>{ore.name}</h4>
                                <p><strong>Uso:</strong> {ore.use}</p>
                                <p><strong>Costo:</strong> {ore.cost}</p>
                                {ore.note && <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>{ore.note}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {guide.importantNotes && (
                <div className="card" style={{ background: 'rgba(220, 53, 69, 0.1)', borderLeft: '4px solid var(--color-danger)' }}>
                    <h3><i className="fas fa-exclamation-circle"></i> IMPORTANTE - Leer Antes de Refinar</h3>
                    <ul>
                        {guide.importantNotes.map((note: string, idx: number) => (
                            <li key={idx} style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{note}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );

    return (
        <>
            {/* Page Header */}
            <section className="section" style={{ background: 'var(--gradient-hero)', color: 'var(--text-inverse)', padding: 'var(--spacing-2xl) 0' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--text-inverse)', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        <i className="fas fa-book"></i> Guías Completas
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'rgba(255,255,255,0.9)' }}>
                        Guías detalladas para dominar Ragnarok Online LATAM 2025
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="section-sm">
                <div className="container">
                    <div className="card">
                        <h3><i className="fas fa-filter"></i> Filtrar por Categoría</h3>
                        <div className="grid grid-4">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat === 'all' ? 'Todas' : cat === 'progression' ? 'Progresión' : cat === 'equipment' ? 'Equipamiento' : 'Mecánicas'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Guides List or Detail */}
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
                        <button className="btn btn-outline" onClick={() => setSelectedGuide(null)} style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <i className="fas fa-arrow-left"></i> Volver a Guías
                        </button>
                        
                        <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <div className="flex-between">
                                <div>
                                    <h2>
                                        <i className={`fas ${selectedGuideData.icon}`}></i> {selectedGuideData.title}
                                    </h2>
                                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
                                        {selectedGuideData.description}
                                    </p>
                                </div>
                                <span className={`badge ${selectedGuideData.difficulty === 'beginner' ? 'badge-success' : selectedGuideData.difficulty === 'intermediate' ? 'badge-warning' : 'badge-danger'}`}>
                                    {selectedGuideData.difficulty === 'beginner' ? 'Principiante' : selectedGuideData.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                                </span>
                            </div>
                        </div>

                        {renderGuideContent(selectedGuideData)}
                    </div>
                </section>
            ) : (
                <section className="section">
                    <div className="container">
                        <div className="grid grid-2">
                            {filteredGuides.map(guide => (
                                <div key={guide.id} className="card hover-lift" onClick={() => setSelectedGuide(guide.id)} style={{ cursor: 'pointer' }}>
                                    <div className="card-header">
                                        <h3>
                                            <i className={`fas ${guide.icon}`}></i> {guide.title}
                                        </h3>
                                        <span className={`badge ${guide.difficulty === 'beginner' ? 'badge-success' : guide.difficulty === 'intermediate' ? 'badge-warning' : 'badge-danger'}`}>
                                            {guide.difficulty === 'beginner' ? 'Principiante' : guide.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <p>{guide.description}</p>
                                        <button className="btn btn-primary" style={{ marginTop: 'var(--spacing-md)' }}>
                                            Ver Guía <i className="fas fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
