import { useState, useCallback } from 'react';
import { apiService, ChatMessage, ChatResponse } from '../services/api';

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export const useChat = (imageId?: string) => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      type: 'user',
      timestamp: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await apiService.chatWithImage(
        imageId || 'default',
        content,
        state.messages
      );

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        type: 'assistant',
        timestamp: new Date().toISOString(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false,
      }));

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to send message';

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      throw error;
    }
  }, [imageId, state.messages]);

  const clearMessages = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    });
  }, []);

  const initializeChat = useCallback((welcomeMessage?: string) => {
    const initialMessage: ChatMessage = {
      id: '1',
      content: welcomeMessage || 'Hello! I\'ve analyzed your satellite image. Feel free to ask me any questions about what I found - land use, vegetation, water bodies, or anything else you\'d like to know!',
      type: 'assistant',
      timestamp: new Date().toISOString(),
    };

    setState({
      messages: [initialMessage],
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    sendMessage,
    clearMessages,
    initializeChat,
  };
};