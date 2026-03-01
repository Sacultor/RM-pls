import React from 'react';

interface ControlAreaProps {
    style: string;
    onStyleChange: (style: string) => void;
    onGenerate: () => void;
}

const ControlArea: React.FC<ControlAreaProps> = ({ style, onStyleChange, onGenerate }) => {
    return (
        <div className="control-area">
            <select
                className="style-select"
                value={style}
                onChange={(e) => onStyleChange(e.target.value)}
            >
                <option value="hacker">Hacker Style</option>
                <option value="academic">Academic Style</option>
                <option value="bytedance">ByteDance Style</option>
            </select>
            <button
                className="generate-btn"
                onClick={onGenerate}
            >
                Generate & Wrap My Project
            </button>
        </div>
    );
};

export default ControlArea;
