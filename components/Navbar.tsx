'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AuthButton from './AuthButton';

export default function Navbar() {
    const [theme, setTheme] = useState('light');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Get theme from localStorage or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link href="/" className="navbar-logo">
                    <i className="fas fa-dragon"></i> RO Latam Guide
                </Link>

                <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`} id="navbarMenu">
                    <li><Link href="/" className="navbar-link">Inicio</Link></li>
                    <li><Link href="/leveling" className="navbar-link">Guías de Leveo</Link></li>
                    <li><Link href="/classes" className="navbar-link">Clases & Builds</Link></li>
                    <li><Link href="/mobs" className="navbar-link">Base de Mobs</Link></li>
                    <li><Link href="/quests" className="navbar-link">Misiones</Link></li>
                    <li><Link href="/events" className="navbar-link">Eventos</Link></li>
                    <li><Link href="/news" className="navbar-link">Noticias</Link></li>
                    <li>
                        <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
                            <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
                        </button>
                    </li>
                    <li>
                        <AuthButton />
                    </li>
                </ul>

                <div
                    className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
}
