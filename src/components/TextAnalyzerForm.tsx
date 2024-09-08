import React, { useState } from 'react';
import { analyzeText } from '../api/api';
import AnalysisResults from './AnalysisResults';
import './FormStyles.css';

const TextAnalyzerForm: React.FC = () => {
    const [text, setText] = useState('');
    const [results, setResults] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Сбрасываем ошибку перед новым запросом
        try {
            const data = await analyzeText(text, 200, false, 4); // Обработка данных
            const transformedData = {
                readingTime: data.ReadingTime,
                wordCount: data.WordCount,
                sentenceCount: data.SentenceCount,
                syllableCount: data.SyllableCount,
                fleschKincaidIndex: data.FleschKincaidIndex,
            };
            setResults(transformedData);
        } catch (error) {
            setError('Failed to analyze text. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Analyze Text</h2>
            <form onSubmit={handleSubmit} className="form">
                <textarea
                    className="textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text for analysis..."
                    rows={5}
                    required
                />
                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Analyzing...' : 'Analyze'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {results && <AnalysisResults results={results} />}
        </div>
    );
};

export default TextAnalyzerForm;
