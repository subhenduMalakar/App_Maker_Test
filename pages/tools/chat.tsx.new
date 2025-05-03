import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { MessageCircle, Send, CornerDownLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

const Chat: NextPage = () => {
  const [messages, setMessages] = useState<{text: string, isUser: boolean, time: string}[]>([
    {text: "Hi there! How can I assist you today?", isUser: false, time: "Just now"}
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      
      setMessages(prev => [...prev, {text: inputValue, isUser: true, time: timeString}]);
      
      // Simulate AI response (in a real app, this would be an API call)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Thanks for your message. I'm an AI assistant ready to help with your needs.",
          isUser: false,
          time: "Just now"
        }]);
      }, 1000);
      
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ToolsLayout>
      <Head>
        <title>Chat - AI Tools</title>
        <meta name="description" content="Chat with our intelligent AI assistant" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-6">
          <MessageCircle className="h-16 w-16 text-yellow-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">AI Chat Assistant</h1>
          <p className="text-gray-600 max-w-2xl">
            Chat with our intelligent AI assistant. Get answers, generate content, 
            solve problems, and more.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar with conversation history */}
          <div className="md:col-span-1">
            <Card className="h-[500px]">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Conversations</h3>
                  <Button variant="ghost" size="icon" title="New chat">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <span className="truncate">New conversation</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat window */}
          <div className="md:col-span-3">
            <Card className="h-[500px] flex flex-col">
              <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.isUser 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{message.text}</p>
                        <span className={`text-xs ${message.isUser ? 'text-purple-200' : 'text-gray-500'}`}>
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-grow"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  <span>Press Enter to send</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear chat
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
};

export default Chat;
