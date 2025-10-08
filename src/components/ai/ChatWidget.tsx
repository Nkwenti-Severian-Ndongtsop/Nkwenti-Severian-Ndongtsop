import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatWidget = () => {

  // Use full backend URL for now to bypass Nginx proxy issues
  const apiEndpoint = 'https://backend-ai-x0er.onrender.com/api/chat';
  
  // Debug log
  console.log('Using API endpoint:', apiEndpoint);

  const [isOpen, setIsOpen] = useState(false);
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm Nkwenti's AI bot. Ask me about his projects, skills, experience or life!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
      console.log('Sending request to:', apiEndpoint);
      console.log('Request payload:', { message: userMessage });
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
        credentials: 'include', // Include credentials (cookies)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data.response || "I received an empty response from the server.";
    } catch (error) {
      console.error('Error in getAIResponse:', error);
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
      if (e.ctrlKey || e.metaKey) {
        // Ctrl+Enter or Cmd+Enter sends the message
        e.preventDefault();
        handleSubmit(e as any);
      }
      // Regular Enter creates a new line (default behavior)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
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
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 glass rounded-xl shadow-elegant border border-border/50 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Nkwenti's Bot</h3>
                <p className="text-xs text-muted-foreground">Ask me anything!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap ${
                    message.isBot
                      ? "bg-muted text-foreground"
                      : "bg-gradient-primary text-primary-foreground"
                  }`}
                >
                  {message.text}
                </div>
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
          <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
            <div className="flex space-x-2 items-end">
              <div className="flex-1">
                <Textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about nkwenti... (Ctrl+Enter to send)"
                  className="min-h-[40px] max-h-[120px] resize-none"
                  rows={1}
                />
              </div>
              <Button type="submit" size="sm" className="bg-gradient-primary h-10">
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