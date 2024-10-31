import React from 'react';

const Logo = () => {

    return(

    <svg width="60" height="60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* <!-- Background --> */}
        <rect width="100%" height="100%" fill="#fff" />

        {/* <!-- Medical Cross --> */}
        <rect x="80" y="30" width="40" height="140" fill="#4a5de4" />
        <rect x="30" y="80" width="140" height="40" fill="#4a5de4" />

        {/* <!-- Pills --> */}
        <circle cx="150" cy="50" r="15" fill="#1a2159" />
        <circle cx="50" cy="150" r="15" fill="#1a2159" />
        <rect x="140" y="40" width="20" height="20" fill="#4a5de4" transform="rotate(45 150 50)" />
        <rect x="40" y="140" width="20" height="20" fill="#4a5de4" transform="rotate(45 50 150)" />

        {/* <!-- Symmetrical Automation Lines -->
        <!-- Top Left --> */}
        <line x1="50" y1="50" x2="80" y2="80" stroke="#1a2159" stroke-width="4" />
        <polygon points="70,70 80,80 70,90" fill="#1a2159" />
        
        {/* <!-- Top Right --> */}
        <line x1="150" y1="50" x2="120" y2="80" stroke="#1a2159" stroke-width="4" />
        <polygon points="130,70 120,80 130,90" fill="#1a2159" />

        {/* <!-- Bottom Left --> */}
        <line x1="50" y1="150" x2="80" y2="120" stroke="#1a2159" stroke-width="4" />
        <polygon points="70,130 80,120 90,130" fill="#1a2159" />

        {/* <!-- Bottom Right --> */}
        <line x1="150" y1="150" x2="120" y2="120" stroke="#1a2159" stroke-width="4" />
        <polygon points="130,130 120,120 130,110" fill="#1a2159" />
    </svg>
    );

};

export default Logo;