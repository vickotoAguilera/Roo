'use client';

import { useEffect, useState } from 'react';
import { ClassData } from '@/lib/types';

export default function ClassesPage() {
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/classes.json')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading classes:', err);
                setLoading(false);
            });
    }, []);

    const organizeClassesByBase = (classes: ClassData[]) => {
        const baseClasses: Record<string, { name: string; icon: string; classes: ClassData[] }> = {
            novice: { name: 'Novato', icon: 'user', classes: [] },
            swordsman: { name: 'Espadachín', icon: 'sword', classes: [] },
            mage: { name: 'Mago', icon: 'wand-magic-sparkles', classes: [] },
            archer: { name: 'Arquero', icon: 'bow-arrow', classes: [] },
            acolyte: { name: 'Acólito', icon: 'cross', classes: [] },
            merchant: { name: 'Mercader', icon: 'coins', classes: [] },
            thief: { name: 'Ladrón', icon: 'mask', classes: [] },
            expanded: { name: 'Clases Expandidas', icon: 'star', classes: [] },
            doram: { name: 'Doram', icon: 'cat', classes: [] }
        };

        classes.forEach(cls => {
            if (baseClasses[cls.baseClass]) {
                baseClasses[cls.baseClass].classes.push(cls);
            }
        });

        return baseClasses;
    };

    const toggleAccordion = (baseKey: string) => {
        const item = document.querySelector(`[data-base="${baseKey}"]`);
        if (!item) return;

        const allItems = document.querySelectorAll('.accordion-item');
        allItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    };

    const renderClassCard = (cls: ClassData) => {
        const shouldShow = currentFilter === 'all' || currentFilter === cls.type;
        if (!shouldShow) return null;

        return (
            <div key={cls.id} className="card hover-lift animate-fade-in-up" data-type={cls.type}>
                <div className="card-header">
                    <div className="class-header-with-sprite">
                        {cls.sprite && (
                            <img
                                src={cls.sprite}
                                alt={cls.nameEs}
                                className="class-sprite"
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                        )}
                        <div style={{ flex: 1 }}>
                            <div className="flex-between">
                                <h2 className="card-title">
                                    <i className={`fas fa-${cls.icon}`}></i> {cls.nameEs || cls.name}
                                </h2>
                                <span className="badge badge-primary">{cls.type}</span>
                            </div>
                            <p className="card-subtitle">{cls.description}</p>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    {Object.keys(cls.recommendedStats).length > 0 && (
                        <>
                            <h4><i className="fas fa-chart-bar"></i> Stats Recomendados</h4>
                            <div className="grid grid-3" style={{ marginBottom: 'var(--spacing-lg)' }}>
                                {Object.entries(cls.recommendedStats).map(([stat, value]) => (
                                    <div key={stat} className="stat-box">
                                        <div className="stat-content">
                                            <div className="stat-label">{stat.toUpperCase()}</div>
                                            <div className="stat-value" style={{ fontSize: 'var(--font-size-base)' }}>{value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {cls.builds && cls.builds.length > 0 ? (
                        <>
                            <h4><i className="fas fa-fire"></i> Builds Disponibles</h4>
                            {cls.builds.map((build, bidx) => (
                                <div key={bidx} className="card" style={{ background: 'var(--bg-tertiary)', marginBottom: 'var(--spacing-md)' }}>
                                    <div className="card-header">
                                        <div className="flex-between">
                                            <h5>{build.name}</h5>
                                            <span className="badge badge-secondary">{build.type}</span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p>{build.description}</p>

                                        {build.stats && (
                                            <>
                                                <h6 style={{ marginTop: 'var(--spacing-md)' }}><i className="fas fa-chart-line"></i> Distribución de Stats</h6>
                                                <div className="grid grid-3">
                                                    {Object.entries(build.stats).map(([stat, value]) => (
                                                        <div key={stat} style={{ padding: 'var(--spacing-xs)' }}>
                                                            <strong>{stat.toUpperCase()}:</strong> {value}
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}

                                        {build.skills && (
                                            <>
                                                <h6 style={{ marginTop: 'var(--spacing-md)' }}><i className="fas fa-magic"></i> Skills Principales</h6>
                                                <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                                                    {build.skills.map((skill, idx) => (
                                                        <span key={idx} className="badge badge-info">{skill}</span>
                                                    ))}
                                                </div>
                                            </>
                                        )}

                                        {build.videos && build.videos.length > 0 && (
                                            <>
                                                <h6 style={{ marginTop: 'var(--spacing-md)' }}><i className="fab fa-youtube"></i> Videos Guía</h6>
                                                <div className="video-list">
                                                    {build.videos.map((video, vidx) => (
                                                        <div key={vidx} className="video-item">
                                                            <div className="video-title">
                                                                <i className="fab fa-youtube"></i> {video.title}
                                                            </div>
                                                            <div className="video-embed-container">
                                                                <iframe
                                                                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                                                    title={video.title}
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>No hay builds disponibles para esta clase aún.</p>
                    )}
                </div>
            </div>
        );
    };

    const organizedClasses = organizeClassesByBase(classes);

    return (
        <>
            {/* Page Header */}
            <section className="section" style={{ background: 'var(--gradient-hero)', color: 'var(--text-inverse)', padding: 'var(--spacing-2xl) 0' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--text-inverse)', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        <i className="fas fa-users"></i> Clases & Builds
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'rgba(255,255,255,0.9)' }}>
                        Guías completas de todas las clases con builds optimizados para RO Latam 2025
                    </p>
                </div>
            </section>

            {/* Class Type Filter */}
            <section className="section-sm">
                <div className="container">
                    <div className="card">
                        <h3><i className="fas fa-filter"></i> Filtrar por Tipo de Clase</h3>
                        <div className="grid grid-4">
                            {['all', '1st', '2nd', '3rd', 'Expanded', 'Doram'].map(type => (
                                <button
                                    key={type}
                                    className={`btn btn-outline class-filter ${currentFilter === type ? 'active' : ''}`}
                                    onClick={() => setCurrentFilter(type)}
                                >
                                    {type === 'all' ? 'Todas las Clases' : type === '1st' ? '1st Jobs' : type === '2nd' ? '2nd Jobs' : type === '3rd' ? '3rd Jobs' : type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Classes Container */}
            <section className="section">
                <div className="container">
                    {loading ? (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="accordion">
                            {Object.entries(organizedClasses).map(([baseKey, baseData]) => {
                                if (baseData.classes.length === 0) return null;

                                const shouldShow = currentFilter === 'all' ||
                                    baseData.classes.some(cls => currentFilter === cls.type);

                                if (!shouldShow) return null;

                                return (
                                    <div key={baseKey} className="accordion-item" data-base={baseKey}>
                                        <div className="accordion-header" onClick={() => toggleAccordion(baseKey)}>
                                            <div className="accordion-title">
                                                <i className={`fas fa-${baseData.icon}`}></i>
                                                <span>{baseData.name}</span>
                                                <span className="badge badge-secondary">
                                                    {baseData.classes.length} {baseData.classes.length === 1 ? 'clase' : 'clases'}
                                                </span>
                                            </div>
                                            <i className="fas fa-chevron-down accordion-icon"></i>
                                        </div>
                                        <div className="accordion-content">
                                            <div className="accordion-body">
                                                <div className="grid grid-2">
                                                    {baseData.classes.map(cls => renderClassCard(cls))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
