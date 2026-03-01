import React from 'react';

interface FooterProps {
    onCopy: () => void;
}

const Footer: React.FC<FooterProps> = ({ onCopy }) => {
    return (
        <div className="footer">
            <button className="copy-btn" onClick={onCopy}>
                Copy to Clipboard
            </button>
        </div>
    );
};

export default Footer;
