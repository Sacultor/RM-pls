import React, { useState } from 'react';
import Header from './components/Header';
import ControlArea from './components/ControlArea';
import Preview from './components/Preview';
import Footer from './components/Footer';

declare function acquireVsCodeApi(): any;

const App: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [style, setStyle] = useState<string>('hacker');
    const vscode = acquireVsCodeApi();

    const handleGenerate = () => {
        setLoading(true);
        vscode.postMessage({
            command: 'generate',
            style: style
        });
    };

    const handleCopy = () => {
        vscode.postMessage({
            command: 'copy',
            text: markdown
        });
    };

    React.useEffect(() => {
        window.addEventListener('message', (event) => {
            const message = event.data;
            switch (message.command) {
                case 'updateMarkdown':
                    setMarkdown(message.text);
                    setLoading(false);
                    break;
            }
        });
    }, []);

    return (
        <div className="container">
            <Header />
            <ControlArea
                style={style}
                onStyleChange={setStyle}
                onGenerate={handleGenerate}
            />
            <Preview
                markdown={markdown}
                loading={loading}
            />
            <Footer onCopy={handleCopy} />
        </div>
    );
};

export default App;
