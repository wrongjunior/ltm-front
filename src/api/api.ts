import axios from 'axios';

// Запрос на анализ текста
export const analyzeText = async (text: string, readingSpeed: number = 200, hasVisuals: boolean = false, workerCount: number = 4) => {
    const response = await axios.post(`/estimate/reading-time`, {
        text,
        readingSpeed,
        hasVisuals,
        workerCount // Добавляем workerCount, который был в cURL
    });
    return response.data;
};

// Запрос на анализ файла
export const analyzeFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`/estimate/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
