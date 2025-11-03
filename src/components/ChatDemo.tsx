import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageSquare, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const sampleQuestions = [
  "What does this satellite image show?",
  "What's the vegetation health in this area?",
  "Are there any water bodies visible?",
  "What land use patterns can you identify?"
];

const botResponses = [
  "This satellite image shows a mixed landscape with approximately 60% vegetation coverage, 25% developed land, and 15% water features. The vegetation appears healthy with strong NDVI values indicating active photosynthesis.",
  "The vegetation health in this area appears excellent, with NDVI values ranging from 0.6 to 0.8. The high chlorophyll content suggests well-irrigated cropland or dense forest coverage.",
  "Yes, I can identify several water bodies including what appears to be a river system running north-south through the image, and two smaller ponds or reservoirs in the eastern section.",
  "The land use patterns show a well-organized agricultural area with rectangular field boundaries, indicating intensive farming. There's also urban development concentrated in the western portion with a clear road network."
];

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'ve analyzed your satellite image. Feel free to ask me any questions about what I found - land use, vegetation, water bodies, or anything else you\'d like to know!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSampleQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
            <MessageSquare className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-sm">Interactive Q&A</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            Ask Questions About Your Image
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Chat with our AI to get detailed insights about your satellite imagery
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Sample Questions Panel */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-slate-700/50 border-slate-600/50 backdrop-blur-sm h-fit">
                <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Try These Questions
                </h3>
                
                <div className="space-y-3">
                  {sampleQuestions.map((question, index) => (
                    <motion.button
                      key={question}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => handleSampleQuestion(question)}
                      className="w-full text-left p-3 rounded-lg bg-slate-600/50 hover:bg-slate-600/70 border border-slate-500/50 hover:border-slate-400/50 transition-all duration-200 text-sm text-slate-300 hover:text-white"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-700/50 border-slate-600/50 backdrop-blur-sm overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-600/50 bg-gradient-to-r from-slate-600/50 to-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white">AI Earth Analyst</h3>
                      <p className="text-xs text-slate-400">Analyzing your satellite image</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-slate-400">Online</span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                          : 'bg-slate-600/50 text-slate-200 border border-slate-500/50'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>

                      {message.type === 'user' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-slate-600/50 border border-slate-500/50 rounded-lg px-4 py-2">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-slate-400 rounded-full"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-600/50 bg-slate-800/50">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                      placeholder="Ask about vegetation, land use, water bodies..."
                      className="flex-1 bg-slate-600/50 border-slate-500/50 text-white placeholder-slate-400 focus:border-cyan-400"
                    />
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}