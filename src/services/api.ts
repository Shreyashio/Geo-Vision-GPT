// API Configuration (Vite-compatible)
const runtimeOrigin = (typeof window !== 'undefined' && window.location?.origin) ? window.location.origin : '';
// If the app is served by Express on 8080, use that; allow override via VITE_API_URL
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080';

// Types for API responses
export interface AnalysisResult {
  id: string;
  filename: string;
  imageUrl?: string;
  classification: {
    landUse: Record<string, number>;
    confidence: number;
  };
  ndvi: {
    mean: number;
    std: number;
    healthScore: number;
  };
  environmental: {
    sustainabilityScore: number;
    climateImpact: number;
    biodiversityIndex: number;
  };
  explanation?: string;
  changeDetection?: {
    changePercentage: number;
    changeType: string;
    timespan: string;
  };
  processingTime: number;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: string;
}

export interface ChatResponse {
  message: string;
  confidence: number;
  sources?: string[];
}

// API Service Class
class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Generic request handler
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // File Upload for Analysis
  async uploadImageForAnalysis(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('analysis_types', JSON.stringify([
      'classification',
      'ndvi',
      'environmental',
      'change_detection'
    ]));

    const response = await fetch(`${this.baseURL}/api/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Get Analysis Status (for long-running processes)
  async getAnalysisStatus(analysisId: string): Promise<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    currentStep: string;
    result?: AnalysisResult;
    error?: string;
  }> {
    return this.request(`/api/analysis/${analysisId}/status`);
  }

  // Chat with AI about image
  async chatWithImage(
    imageId: string,
    message: string,
    conversationHistory?: ChatMessage[]
  ): Promise<ChatResponse> {
    return this.request('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        image_id: imageId,
        message,
        conversation_history: conversationHistory,
      }),
    });
  }

  // Get supported file formats
  async getSupportedFormats(): Promise<string[]> {
    return this.request('/api/formats');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; version: string }> {
    return this.request('/api/health');
  }

  // Download analysis report
  async downloadReport(
    analysisId: string,
    format: 'pdf' | 'csv' | 'json' = 'pdf'
  ): Promise<Blob> {
    const response = await fetch(
      `${this.baseURL}/api/analysis/${analysisId}/report?format=${format}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    return await response.blob();
  }

  // Get analysis history
  async getAnalysisHistory(limit: number = 10): Promise<AnalysisResult[]> {
    return this.request(`/api/analysis/history?limit=${limit}`);
  }
}

// Create and export API instance
export const apiService = new ApiService();

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Response wrapper for better error handling
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Hook for API calls with loading states
export function useApiCall<T>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = async (apiCall: () => Promise<T>) => {
    setState({ data: null, error: null, loading: true });
    
    try {
      const result = await apiCall();
      setState({ data: result, error: null, loading: false });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState({ data: null, error: errorMessage, loading: false });
      throw error;
    }
  };

  return { ...state, execute };
}

// Utility functions
export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export default apiService;