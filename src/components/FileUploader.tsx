import React, { useState } from 'react';
import { analyzeFile } from '../api/api';
import AnalysisResults from './AnalysisResults';
import './FormStyles.css';

const FileUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [results, setResults] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError(null); // Сбрасываем ошибку перед новым запросом
        try {
            const data = await analyzeFile(file);
            const transformedData = {
                readingTime: data.ReadingTime,
                wordCount: data.WordCount,
                sentenceCount: data.SentenceCount,
                syllableCount: data.SyllableCount,
                fleschKincaidIndex: data.FleschKincaidIndex,
            };
            setResults(transformedData);
        } catch (error) {
            setError('Failed to upload file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Upload File for Analysis</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="file" onChange={handleFileChange} className="file-input" required />
                <button type="submit" disabled={loading || !file} className="submit-button">
                    {loading ? 'Uploading...' : 'Upload File'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {results && <AnalysisResults results={results} />}
        </div>
    );
};

export default FileUploader;
