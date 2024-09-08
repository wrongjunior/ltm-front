import React from 'react';
import './App.css';
import TextAnalyzerForm from './components/TextAnalyzerForm';
import FileUploader from './components/FileUploader';

const App: React.FC = () => {
  return (
      <div className="App">
        <h1>Text and File Analysis</h1>
        <div className="content">
          <TextAnalyzerForm />
          <FileUploader />
        </div>
      </div>
  );
};

export default App;
