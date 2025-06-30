import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant powered by Gemini. I can help you with questions, provide information, and have conversations. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiKey = 'AIzaSyCjvpSJUBhG8zxMvTeTV2j6qAPgrhalj4E'; // Permanent API key
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Context for the AI (you can customize this)
  const userContext = `
    You are a helpful AI assistant. You should be friendly, informative, and concise in your responses.
    Current date: ${new Date().toLocaleDateString()}
    
    Guidelines:
    - Be helpful and accurate
    - Keep responses concise but informative
    - If you're unsure about something, say so
    - Be conversational and friendly
  `;

  const predefinedQuestions = [
    "What can you help me with?",
    "Tell me a fun fact",
    "How's the weather?",
    "Give me a recipe idea",
    "Explain quantum computing",
    "Write a short poem",
    "Tech news summary",
    "Learning tips"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGeminiAPI = async (userMessage: string, conversationHistory: Message[]) => {
    try {
      // Build conversation context
      const conversationContext = conversationHistory
        .slice(-10)
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      const prompt = `${userContext}

Previous conversation:
${conversationContext}

Current user message: ${userMessage}

Please provide a helpful response.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024,
            stopSequences: []
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const getFallbackResponse = (userMessage: string): string => {
    const lowerInput = userMessage.toLowerCase();
    
    const responses: { [key: string]: string } = {
      "hello": "Hello! How can I help you today? 👋",
      "help": "I'm here to assist you! I can answer questions, provide information, help with various topics, and have conversations. What would you like to know?",
      "weather": "I don't have access to real-time weather data, but I'd recommend checking a weather app or website for current conditions in your area! ☀️",
      "time": `The current time is ${new Date().toLocaleTimeString()}. ⏰`,
      "date": `Today's date is ${new Date().toLocaleDateString()}. 📅`,
      "joke": "Why don't scientists trust atoms? Because they make up everything! 😄",
      "fact": "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible! 🍯",
      "recipe": "Here's a quick recipe idea: Pasta Aglio e Olio - cook spaghetti, then toss with olive oil, garlic, red pepper flakes, and parsley. Simple and delicious! 🍝"
    };

    for (const [key, response] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }

    return "I'm here to help! Please set up your Gemini API key to get started with AI responses, or I can provide basic assistance with common questions. What would you like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await callGeminiAPI(inputMessage, [...messages, userMessage]);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      setError(error.message || 'Sorry, I encountered an error. Please try again.');
      console.error('Chat error:', error);
      
      // Add fallback response on error
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getFallbackResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        handleSendMessage();
      }
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setError(null);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-32 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center border-4 border-gold-400
          ${isOpen 
            ? 'bg-forest-500 hover:bg-forest-600 rotate-90' 
            : 'bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 hover:scale-110'}
        `}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-forest-500" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-44 right-6 w-96 h-[600px] bg-cream-50 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border-2 border-gold-400">
          {/* Header */}
          <div className="bg-gradient-to-r from-forest-500 to-gold-400 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold-400/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-forest-500" />
              </div>
              <div>
                <h3 className="font-semibold text-cream-100">AI Assistant</h3>
                <p className="text-xs opacity-90 text-cream-100">Powered by Gemini</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-gold-400/20 rounded transition-colors"
              >
                <X className="w-5 h-5 text-cream-100" />
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border-b border-red-200 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl flex items-start space-x-2 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-forest-500'
                      : 'bg-white text-forest-500 border border-gold-100'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <Bot className="w-4 h-4 mt-0.5 text-gold-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <p className={`text-xs mt-1 opacity-70 ${
                      message.sender === 'user' ? 'text-forest-500' : 'text-gold-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gold-100 p-3 rounded-2xl flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-gold-400" />
                  <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                  <span className="text-sm text-forest-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-3 border-t bg-gold-50">
            <p className="text-xs text-forest-500 mb-2 font-medium">Quick questions:</p>
            <div className="flex flex-wrap gap-1">
              {predefinedQuestions.slice(0, 4).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="text-xs px-2 py-1 bg-white border border-gold-200 rounded-full hover:bg-gold-100 hover:border-gold-400 transition-colors text-forest-500"
                >
                  {question.length > 15 ? question.substring(0, 13) + '...' : question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gold-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent bg-cream-50 text-forest-500"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '100px' }}
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 bg-gradient-to-r from-gold-400 to-gold-500 text-forest-500 rounded-xl flex items-center justify-center hover:from-gold-500 hover:to-gold-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all border-2 border-gold-400"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiChatbot;