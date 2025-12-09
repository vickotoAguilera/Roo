import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="particles-bg">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title animate-fade-in-up">
              Bienvenido a RO Latam Guide
            </h1>
            <p className="hero-subtitle animate-fade-in-up delay-100">
              Tu guía completa para dominar Ragnarok Online Latam
            </p>
            <p className="hero-description animate-fade-in-up delay-200">
              Encuentra las mejores guías de leveo, builds optimizados para cada clase,
              base de datos completa de monstruos y drops, eventos actualizados y mucho más.
            </p>
            <div className="hero-buttons animate-fade-in-up delay-300">
              <Link href="/leveling" className="btn btn-primary btn-lg">
                <i className="fas fa-chart-line"></i> Comenzar a Levear
              </Link>
              <Link href="/classes" className="btn btn-secondary btn-lg">
                <i className="fas fa-users"></i> Ver Clases
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Acceso Rápido</h2>
          <div className="grid grid-4">
            <Link href="/leveling" className="card card-interactive hover-lift animate-fade-in-up">
              <div className="card-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="card-title">Guías de Leveo</h3>
              <p>Rutas optimizadas por nivel con videos y mapas recomendados</p>
            </Link>

            <Link href="/classes" className="card card-interactive hover-lift animate-fade-in-up delay-100">
              <div className="card-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="card-title">Clases & Builds</h3>
              <p>Builds actualizados para todas las clases, stats y equipamiento</p>
            </Link>

            <Link href="/mobs" className="card card-interactive hover-lift animate-fade-in-up delay-200">
              <div className="card-icon">
                <i className="fas fa-dragon"></i>
              </div>
              <h3 className="card-title">Base de Mobs</h3>
              <p>Busca monstruos, drops, ubicaciones y estadísticas completas</p>
            </Link>

            <Link href="/quests" className="card card-interactive hover-lift animate-fade-in-up delay-300">
              <div className="card-icon">
                <i className="fas fa-scroll"></i>
              </div>
              <h3 className="card-title">Misiones</h3>
              <p>Guías paso a paso de misiones principales y secundarias</p>
            </Link>

            <Link href="/events" className="card card-interactive hover-lift animate-fade-in-up delay-400">
              <div className="card-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3 className="card-title">Eventos</h3>
              <p>Calendario de eventos activos y próximos con guías completas</p>
            </Link>

            <Link href="/news" className="card card-interactive hover-lift animate-fade-in-up delay-500">
              <div className="card-icon">
                <i className="fas fa-newspaper"></i>
              </div>
              <h3 className="card-title">Noticias</h3>
              <p>Últimas actualizaciones, parches y anuncios del servidor</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Guides Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Guías Destacadas</h2>
          <div className="grid grid-3">
            <div className="card hover-lift">
              <div className="card-header">
                <span className="badge badge-primary">Nuevo</span>
                <h3 className="card-title">Leveo Rápido 1-175</h3>
              </div>
              <div className="card-body">
                <p>Guía completa para alcanzar el nivel máximo de la forma más eficiente posible, incluyendo misiones del Eden Group y zonas de farmeo.</p>
              </div>
              <div className="card-footer">
                <Link href="/leveling" className="btn btn-outline btn-sm">
                  Ver Guía <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="card hover-lift">
              <div className="card-header">
                <span className="badge badge-secondary">Popular</span>
                <h3 className="card-title">Builds Meta 2025</h3>
              </div>
              <div className="card-body">
                <p>Las mejores builds para cada clase en el meta actual, optimizadas para PvM, PvP y farming de Zeny.</p>
              </div>
              <div className="card-footer">
                <Link href="/classes" className="btn btn-outline btn-sm">
                  Ver Builds <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="card hover-lift">
              <div className="card-header">
                <span className="badge badge-success">Actualizado</span>
                <h3 className="card-title">Eventos Diciembre</h3>
              </div>
              <div className="card-body">
                <p>Todos los eventos activos este mes, incluyendo Festival de Copos de Nieve y Unión de las Ciudades.</p>
              </div>
              <div className="card-footer">
                <Link href="/events" className="btn btn-outline btn-sm">
                  Ver Eventos <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Server Info Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Información del Servidor</h2>
          <div className="grid grid-2">
            <div className="card">
              <h3 className="card-title">
                <i className="fas fa-server"></i> RO Latam Oficial
              </h3>
              <div className="card-body">
                <div className="stat-box">
                  <div className="stat-icon">
                    <i className="fas fa-level-up-alt"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-label">Nivel Máximo</div>
                    <div className="stat-value">175 / 60</div>
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-label">Clases Disponibles</div>
                    <div className="stat-value">3rd Jobs + Expanded + Doram</div>
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-label">Región</div>
                    <div className="stat-value">Latinoamérica</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">
                <i className="fas fa-link"></i> Enlaces Útiles
              </h3>
              <div className="card-body">
                <ul className="footer-links">
                  <li>
                    <a href="https://ro.gnjoylatam.com/es/main" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i> Sitio Oficial RO Latam
                    </a>
                  </li>
                  <li>
                    <a href="https://ro.gnjoylatam.com/es/news" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-newspaper"></i> Noticias Oficiales
                    </a>
                  </li>
                  <li>
                    <a href="https://member.gnjoylatam.com" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-user"></i> Portal de Miembros
                    </a>
                  </li>
                  <li>
                    <a href="https://member.gnjoylatam.com/support" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-question-circle"></i> Soporte Técnico
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
