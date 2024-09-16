import '../App.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Update isMobile based on screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Call on mount to set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header id="mainHeader">
            <p>DogAPI</p>
            
            {!isMobile && (
                <nav id="mainNav">
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/gallery'>Dog Gallery</Link></li>
                        <li><Link to='/search'>Breed Search</Link></li>
                    </ul>
                </nav>
            )}
            
            {isMobile && (
                <>
                    <button id="menuToggle" className="hamburger" onClick={toggleMenu}>
                        &nbsp;
                    </button>
                    {menuOpen && (
                        <div className="popup-bg" onClick={toggleMenu}>
                            <div className="popup-content" onClick={e => e.stopPropagation()}>
                                <nav id="popupNav">
                                    <ul>
                                        <li><Link to='/' onClick={toggleMenu}>Home</Link></li>
                                        <li><Link to='/gallery' onClick={toggleMenu}>Dog Gallery</Link></li>
                                        <li><Link to='/search' onClick={toggleMenu}>Breed Search</Link></li>
                                    </ul>
                                </nav>
                                <button className="close-popup" onClick={toggleMenu}>
                                    <ion-icon name="close-circle"></ion-icon>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </header>
    );
};

export default Header;