import React from 'react';
import './ResultsStyles.css';

interface AnalysisResultsProps {
    results: {
        readingTime: number;
        wordCount: number;
        sentenceCount: number;
        syllableCount: number;
        fleschKincaidIndex: number;
    };
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
    return (
        <div className="results-container">
            <h3>Analysis Results</h3>
            <table className="results-table">
                <tbody>
                <tr>
                    <td>Reading Time (minutes):</td>
                    <td>{results.readingTime}</td>
                </tr>
                <tr>
                    <td>Word Count:</td>
                    <td>{results.wordCount}</td>
                </tr>
                <tr>
                    <td>Sentence Count:</td>
                    <td>{results.sentenceCount}</td>
                </tr>
                <tr>
                    <td>Syllable Count:</td>
                    <td>{results.syllableCount}</td>
                </tr>
                <tr>
                    <td>Flesch-Kincaid Index:</td>
                    <td>{results.fleschKincaidIndex}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AnalysisResults;
