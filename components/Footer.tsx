import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4><i className="fas fa-dragon"></i> RO Latam Guide</h4>
                        <p>Tu fuente completa de información para Ragnarok Online Latam.</p>
                    </div>

                    <div className="footer-section">
                        <h4>Guías</h4>
                        <ul className="footer-links">
                            <li><Link href="/leveling">Guías de Leveo</Link></li>
                            <li><Link href="/classes">Clases & Builds</Link></li>
                            <li><Link href="/quests">Misiones</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Recursos</h4>
                        <ul className="footer-links">
                            <li><Link href="/mobs">Base de Mobs</Link></li>
                            <li><Link href="/events">Eventos</Link></li>
                            <li><Link href="/news">Noticias</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Comunidad</h4>
                        <ul className="footer-links">
                            <li><a href="https://ro.gnjoylatam.com" target="_blank" rel="noopener noreferrer">Sitio Oficial</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 RO Latam Guide. Ragnarok Online © Gravity Co., Ltd.</p>
                </div>
            </div>
        </footer>
    );
}
