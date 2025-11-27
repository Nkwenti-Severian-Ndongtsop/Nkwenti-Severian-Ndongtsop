import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatWidget = () => {

  // Direct backend URL for chat requests
  const apiEndpoint = 'https://backend-ai-x0er.onrender.com/api/chat';

  const [isOpen, setIsOpen] = useState(false);
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  
  // Load messages from localStorage or use default
  const getInitialMessages = (): Message[] => {
    if (typeof window !== 'undefined') {
      try {
        const savedMessages = localStorage.getItem('nkwenti-chat-messages');
        if (savedMessages) {
          const parsed: Message[] = JSON.parse(savedMessages);
          // Convert timestamp strings back to Date objects
          return parsed.map((msg: Message) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        }
      } catch (error) {
        // Silently fail - use default messages
      }
    }
    
    // Default welcome message
    return [
      {
        id: "1",
        text: "👋 Hi! I'm Nkwenti's AI assistant. Ask me about his projects, skills, experience, or background!",
        isBot: true,
        timestamp: new Date(),
      },
    ];
  };

  const [messages, setMessages] = useState<Message[]>(getInitialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nkwenti-chat-messages', JSON.stringify(messages));
      } catch (error) {
        // Silently fail - chat history save failed
      }
    }
  }, [messages]);

  // Hide notification dot when chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowNotificationDot(false);
    }
  }, [isOpen]);

  // Periodically show notification dot to grab attention
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setShowNotificationDot(true);
        setTimeout(() => setShowNotificationDot(false), 3000); // Hide after 3 seconds
      }
    }, 15000); // Show every 15 seconds

    return () => clearInterval(interval);
  }, [isOpen]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
        credentials: 'include', // Include credentials (cookies)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return data.response || "I received an empty response from the server.";
    } catch (error) {
      return `I'm having trouble connecting to the AI service right now. Please try again later. (${error instanceof Error ? error.message : 'Unknown error'})`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Get AI response
    try {
      const aiResponse = await getAIResponse(inputValue);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift+Enter creates a new line (default behavior)
        return;
      } else {
        // Regular Enter sends the message
        e.preventDefault();
        handleSubmit(e as React.FormEvent);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Limit to 120 characters
    if (value.length <= 120) {
      setInputValue(value);
      
      // Auto-resize textarea
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedMessageId(messageId);
        setTimeout(() => setCopiedMessageId(null), 2000);
      } catch (fallbackError) {
        // Fallback copy failed
      }
      document.body.removeChild(textArea);
    }
  };

  const clearChatHistory = () => {
    const defaultMessages = [
      {
        id: "1",
        text: "👋 Hi! I'm Nkwenti's AI assistant. Ask me about his projects, skills, experience, or background!",
        isBot: true,
        timestamp: new Date(),
      },
    ];
    setMessages(defaultMessages);
    
    // Also clear from localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('nkwenti-chat-messages');
      } catch (error) {
        // Silently fail - chat history clear failed
      }
    }
  };

  return (
    <>
      {/* Chat Widget Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Horizontal Orbital Text Animation */}
        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="animate-orbit-horizontal">
              <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg whitespace-nowrap border border-white/20">
                <span className="text-sm font-semibold animate-text-glow">💬 Let's chat! 👋</span>
              </div>
            </div>
          </div>
        )}

        {/* Multiple Pulsing Ring Animations */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 w-14 h-14 rounded-full bg-gradient-primary opacity-20 animate-chat-pulse-ring"></div>
            <div className="absolute inset-0 w-14 h-14 rounded-full bg-gradient-primary opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </>
        )}

        {/* Chat Toggle Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 rounded-full bg-gradient-primary hover-glow shadow-elegant transition-all duration-300 ${
            isOpen ? 'rotate-180' : 'hover:scale-110 animate-chat-wiggle'
          }`}
          size="sm"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          
          {/* Notification Dot */}
          {showNotificationDot && !isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce border-2 border-white">
              <div className="w-full h-full bg-red-500 rounded-full animate-ping"></div>
            </div>
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100vh-6rem)] glass rounded-xl shadow-elegant border border-border/50 animate-slide-up overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Nkwenti's AI</h3>
                <p className="text-xs text-muted-foreground">Ask me anything!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChatHistory}
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 transition-all duration-200 hover:scale-105 group"
              title="Clear chat history"
            >
              <Trash2 className="h-3 w-3 group-hover:animate-pulse" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden space-y-3 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.isBot ? "items-start" : "items-end"} min-w-0 group`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg text-sm break-words overflow-hidden ${
                    message.isBot
                      ? "bg-muted text-foreground"
                      : "bg-gradient-primary text-primary-foreground"
                  }`}
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  {message.text}
                </div>
                {/* Copy Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(message.text, message.id)}
                  className="h-6 w-6 p-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-muted/50"
                  title="Copy message"
                >
                  {copiedMessageId === message.id ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3 text-muted-foreground" />
                  )}
                </Button>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm flex-shrink-0">
            <div className="flex space-x-3 items-start">
              <div className="flex-1 min-w-0 overflow-hidden">
                <Textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about Nkwenti..."
                  className="min-h-[44px] max-h-[100px] resize-none w-full text-sm overflow-hidden whitespace-pre-wrap"
                  rows={1}
                  wrap="soft"
                  style={{ 
                    wordWrap: 'break-word', 
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowX: 'hidden'
                  }}
                />
                <div className="flex justify-between items-center mt-2 px-1">
                  <div className="text-xs text-muted-foreground">
                    Enter to send • Shift+Enter for new line
                  </div>
                  <div className={`text-xs font-medium ${
                    inputValue.length > 120 
                      ? 'text-orange-500' 
                      : inputValue.length === 120 
                        ? 'text-red-500' 
                        : 'text-muted-foreground'
                  }`}>
                    {inputValue.length}/120
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                size="sm" 
                className="bg-gradient-primary h-11 px-3 flex-shrink-0 mt-0"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;