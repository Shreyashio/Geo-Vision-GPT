import { useState, useCallback } from 'react';
import { apiService, AnalysisResult, ApiError } from '../services/api';

export interface AnalysisState {
  isAnalyzing: boolean;
  progress: number;
  currentStep: string;
  result: AnalysisResult | null;
  error: string | null;
  analysisId: string | null;
}

export const useAnalysis = () => {
  const [state, setState] = useState<AnalysisState>({
    isAnalyzing: false,
    progress: 0,
    currentStep: '',
    result: null,
    error: null,
    analysisId: null,
  });

  const startAnalysis = useCallback(async (file: File) => {
    setState({
      isAnalyzing: true,
      progress: 0,
      currentStep: 'Uploading image...',
      result: null,
      error: null,
      analysisId: null,
    });

    try {
      // Upload file and start analysis
      const result = await apiService.uploadImageForAnalysis(file);
      
      setState(prev => ({
        ...prev,
        progress: 100,
        currentStep: 'Analysis complete!',
        result,
        isAnalyzing: false,
        analysisId: result.id,
      }));

      return result;
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Analysis failed. Please try again.';
      
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: errorMessage,
        currentStep: 'Analysis failed',
      }));
      
      throw error;
    }
  }, []);

  const pollAnalysisStatus = useCallback(async (analysisId: string) => {
    try {
      const statusResponse = await apiService.getAnalysisStatus(analysisId);
      
      setState(prev => ({
        ...prev,
        progress: statusResponse.progress,
        currentStep: statusResponse.currentStep,
      }));

      if (statusResponse.status === 'completed' && statusResponse.result) {
        setState(prev => ({
          ...prev,
          isAnalyzing: false,
          result: statusResponse.result!,
          progress: 100,
          currentStep: 'Analysis complete!',
        }));
      } else if (statusResponse.status === 'failed') {
        setState(prev => ({
          ...prev,
          isAnalyzing: false,
          error: statusResponse.error || 'Analysis failed',
          currentStep: 'Analysis failed',
        }));
      }

      return statusResponse;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: 'Failed to check analysis status',
      }));
      throw error;
    }
  }, []);

  const downloadReport = useCallback(async (format: 'pdf' | 'csv' | 'json' = 'pdf') => {
    if (!state.analysisId) {
      throw new Error('No analysis available for download');
    }

    try {
      const blob = await apiService.downloadReport(state.analysisId, format);
      const filename = `analysis-${state.analysisId}.${format}`;
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }, [state.analysisId]);

  const resetAnalysis = useCallback(() => {
    setState({
      isAnalyzing: false,
      progress: 0,
      currentStep: '',
      result: null,
      error: null,
      analysisId: null,
    });
  }, []);

  return {
    ...state,
    startAnalysis,
    pollAnalysisStatus,
    downloadReport,
    resetAnalysis,
  };
};