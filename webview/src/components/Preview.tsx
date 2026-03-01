import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
    markdown: string;
    loading: boolean;
}

const Preview: React.FC<PreviewProps> = ({ markdown, loading }) => {
    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <div>Scanning and analyzing...</div>
            </div>
        );
    }

    if (!markdown) {
        return (
            <div className="preview-area">
                <p style={{ color: '#808080', textAlign: 'center', marginTop: '100px' }}>
                    Click "Generate & Wrap My Project" to create your README
                </p>
            </div>
        );
    }

    return (
        <div className="preview-area">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default Preview;
