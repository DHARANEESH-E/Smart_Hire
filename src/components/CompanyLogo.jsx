import React, { useState } from 'react';

const CompanyLogo = ({ company, size = '100%' }) => {
    const [imgError, setImgError] = useState(false);

    // Color generator based on string
    const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        return '#' + '00000'.substring(0, 6 - c.length) + c;
    };

    if (company.logo && !imgError) {
        return (
            <img
                src={company.logo}
                alt={company.name}
                style={{ width: size, height: size, objectFit: 'contain' }}
                onError={() => setImgError(true)}
            />
        );
    }

    // Fallback Avatar
    return (
        <div style={{
            width: size,
            height: size,
            background: stringToColor(company.name),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: typeof size === 'number' ? size * 0.5 : '1.5rem',
            borderRadius: '8px' // slight adjustment
        }}>
            {company.name[0]}
        </div>
    );
};

export default CompanyLogo;
