export default function MobsPage() {
    return (
        <>
            <section className="section" style={{ background: 'var(--gradient-hero)', color: 'var(--text-inverse)', padding: 'var(--spacing-2xl) 0' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--text-inverse)', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        <i className="fas fa-dragon"></i> Base de Mobs
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'rgba(255,255,255,0.9)' }}>
                        Base de datos completa de monstruos y drops
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="card">
                        <h2>Base de Mobs Próximamente</h2>
                        <p>Esta sección estará disponible pronto con la base de datos completa de mobs.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
