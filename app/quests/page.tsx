export default function QuestsPage() {
    return (
        <>
            <section className="section" style={{ background: 'var(--gradient-hero)', color: 'var(--text-inverse)', padding: 'var(--spacing-2xl) 0' }}>
                <div className="container">
                    <h1 style={{ color: 'var(--text-inverse)', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        <i className="fas fa-scroll"></i> Misiones
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'rgba(255,255,255,0.9)' }}>
                        Guías completas de misiones y quests
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="card">
                        <h2>Guías de Misiones Próximamente</h2>
                        <p>Esta sección estará disponible pronto con guías de todas las misiones.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
