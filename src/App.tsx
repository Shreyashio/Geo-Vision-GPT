import { useState } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { FileUpload } from './components/FileUpload';
import { ChatDemo } from './components/ChatDemo';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleAnalysisStart = () => {
    // This could trigger scrolling to results section or other actions
    console.log('Analysis started for:', selectedFile?.name);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Hero />
      <Features />
      <HowItWorks />
      <FileUpload 
        onFileSelect={handleFileSelect}
        onAnalysisStart={handleAnalysisStart}
      />
      <ChatDemo />
      <Footer />
    </div>
  );
}