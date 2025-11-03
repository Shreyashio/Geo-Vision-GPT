import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Upload, 
  File, 
  CheckCircle, 
  AlertCircle, 
  Image as ImageIcon,
  Zap,
  Brain
} from 'lucide-react';
import { apiService } from '../services/api';

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  onAnalysisStart?: () => void;
}

export function FileUpload({ onFileSelect, onAnalysisStart }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const f = files[0];
      setSelectedFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      onFileSelect?.(f);
    }
  }, [onFileSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const f = files[0];
      setSelectedFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      onFileSelect?.(f);
    }
  }, [onFileSelect]);

  const simulateAnalysis = useCallback(async () => {
    setIsProcessing(true);
    setProgress(0);
    onAnalysisStart?.();

    const steps = [
      'Preprocessing image...',
      'Running classification model...',
      'Analyzing vegetation (NDVI)...',
      'Environmental assessment...',
      'Generating insights...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(steps[i]);
      
      // Simulate processing time with realistic progress
      const stepProgress = ((i + 1) / steps.length) * 100;
      let currentProgress = i * 20;
      
      while (currentProgress < stepProgress) {
        currentProgress += Math.random() * 3;
        setProgress(Math.min(currentProgress, stepProgress));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    try {
      if (selectedFile) {
        // Call backend for real analysis and upload; shows different results per image
        const params = new URLSearchParams();
        // Optionally let power users set ?gptModel=... in the page URL
        const urlModel = new URL(window.location.href).searchParams.get('gptModel');
        if (urlModel) params.set('gptModel', urlModel);
        const analysis = await apiService.uploadImageForAnalysis(selectedFile);
        setResult(analysis);
      }
      setProgress(100);
      setAnalysisStep('Analysis complete!');
    } catch (e) {
      setAnalysisStep('Analysis failed');
    } finally {
      setTimeout(() => setIsProcessing(false), 600);
    }
  }, [onAnalysisStart, selectedFile]);

  return (
    <section className="py-24 bg-slate-800 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Upload className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm">Try It Now</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            Upload & Analyze
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Upload your satellite images and experience the power of AI-driven analysis
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 bg-slate-700/50 border-slate-600/50 backdrop-blur-sm">
              {!selectedFile ? (
                <motion.div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-cyan-400 bg-cyan-400/5'
                      : 'border-slate-500 hover:border-slate-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <motion.div
                    animate={{ y: isDragging ? -10 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Upload className={`w-16 h-16 mx-auto mb-4 ${
                      isDragging ? 'text-cyan-400' : 'text-slate-400'
                    }`} />
                    
                    <h3 className="text-xl text-white mb-2">
                      {isDragging ? 'Drop your image here' : 'Upload Satellite Image'}
                    </h3>
                    
                    <p className="text-slate-400 mb-6">
                      Drag and drop your satellite image or click to browse
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                      <label htmlFor="file-upload">
                        <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 cursor-pointer">
                          <span>
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Choose File
                          </span>
                        </Button>
                      </label>
                      
                      <span className="text-slate-500">or</span>
                      
                      <Button 
                        variant="outline" 
                        className="border-slate-500 text-slate-300 hover:bg-slate-600"
                      >
                        Use Sample Image
                      </Button>
                    </div>
                    
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <p className="text-xs text-slate-500 mt-4">
                      Supported formats: JPEG, PNG, TIFF (Max: 10MB)
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Always show a visible image preview */}
                  {previewUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-600/20 rounded-lg border border-slate-600"
                    >
                      <div className="w-full flex items-center justify-center">
                        <img src={previewUrl} alt="preview" className="max-w-[360px] max-h-[260px] object-contain rounded" />
                      </div>
                    </motion.div>
                  )}
                  {/* Selected file info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-4 bg-slate-600/30 rounded-lg border border-slate-600"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <File className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-white mb-1">{selectedFile.name}</h4>
                      <p className="text-sm text-slate-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </motion.div>

                  {/* Analysis section */}
                  {isProcessing ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Brain className="w-6 h-6 text-cyan-400" />
                        </motion.div>
                        <span className="text-cyan-300">{analysisStep}</span>
                      </div>
                      
                      <Progress value={progress} className="h-2" />
                      
                      <div className="text-center">
                        <span className="text-sm text-slate-400">
                          Processing... {Math.round(progress)}% complete
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                      <Button
                        onClick={simulateAnalysis}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Start AI Analysis
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => { setSelectedFile(null); setResult(null); setPreviewUrl(null); }}
                        className="border-slate-500 text-slate-300 hover:bg-slate-600"
                      >
                        Choose Different File
                      </Button>
                    </motion.div>
                  )}

                  {/* Show uploaded image and results */}
                  {result && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-600/20 p-4 rounded-lg border border-slate-600">
                        <div className="w-full flex items-center justify-center">
                          <img src={result.imageUrl || previewUrl || ''} alt={result.filename} className="max-w-[380px] max-h-[280px] rounded object-contain" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border border-slate-600 bg-slate-600/20">
                          <h4 className="text-cyan-300 mb-2">AI-Powered Satellite Analysis</h4>
                          <p className="text-slate-300 text-sm mb-2">
                            Advanced satellite analysis detected land use patterns with {Math.round((result.classification?.confidence||0)*100)}% confidence.
                          </p>
                          <div className="w-full h-2 bg-slate-700 rounded">
                            <div className="h-2 rounded bg-gradient-to-r from-red-400 via-yellow-400 to-green-400" style={{ width: `${Math.round((result.classification?.confidence||0)*100)}%` }} />
                          </div>
                          <div className="text-xs text-slate-400 mt-1">AI Confidence</div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {Object.entries(result.classification?.landUse || {}).map(([label, value]: any) => (
                            <div key={label} className="text-center p-3 rounded-lg bg-slate-600/20 border border-slate-600">
                              <div className="text-2xl text-cyan-300 font-semibold">{Number(value).toFixed(1)}%</div>
                              <div className="text-xs text-slate-400">{label}</div>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 rounded-lg border border-slate-600 bg-slate-600/20">
                          <h4 className="text-green-300 mb-2">Advanced Vegetation Analysis</h4>
                          <div className="text-slate-200 text-sm">NDVI: {result.ndvi?.mean} (±{result.ndvi?.std})</div>
                          <div className="text-slate-400 text-sm">Health Score: {result.ndvi?.healthScore}</div>
                        </div>

                        {/* AI Report */}
                        {result.explanation && (
                          <div className="p-4 rounded-lg border border-slate-600 bg-slate-700/30">
                            <h4 className="text-white mb-2">AI Report</h4>
                            <p className="text-slate-300 text-sm whitespace-pre-line">{result.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Supported analysis types */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: ImageIcon, label: 'Classification' },
              { icon: Zap, label: 'NDVI Analysis' },
              { icon: AlertCircle, label: 'Environmental' },
              { icon: Brain, label: 'Q&A Chat' }
            ].map((item, index) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
              >
                <item.icon className="w-6 h-6 text-cyan-400" />
                <span className="text-sm text-slate-300">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}