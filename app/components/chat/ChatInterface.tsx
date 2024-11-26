'use client';

import { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Message } from '@/app/types/chat';
import { v4 as uuidv4 } from 'uuid';

interface ChatInterfaceProps {
  user: User;
}

export default function ChatInterface({ user }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 加载历史记录
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await fetch(`/api/chat/history?userId=${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error('加载历史记录失败:', error);
      }
    };

    loadChatHistory();
  }, [user.uid]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentTypingMessage]);

  // 打字机效果
  const typewriterEffect = async (text: string, messageId: string) => {
    setCurrentTypingMessage(messageId);
    const delay = 30; // 每个字符的延迟时间（毫秒）
    let currentText = '';

    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, content: currentText } : msg
        )
      );
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    setCurrentTypingMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const userMessageId = uuidv4();
    const assistantMessageId = uuidv4();
    setInput('');
    
    // 添加用户消息
    const newUserMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          userId: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error('请求失败');
      }

      const data = await response.json();
      
      // 添加助手消息
      const newAssistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
      
      // 开始打字机效果
      await typewriterEffect(data.response, assistantMessageId);
      
      // 保存到历史记录
      await fetch('/api/chat/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          messages: [...messages, newUserMessage, { ...newAssistantMessage, content: data.response }],
        }),
      });
      
    } catch (error) {
      console.error('发送消息失败:', error);
      setMessages(prev => [
        ...prev,
        {
          id: assistantMessageId,
          role: 'assistant',
          content: '抱歉，我遇到了一些问题。请稍后再试。',
          timestamp: Date.now()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
              {currentTypingMessage === message.id && (
                <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
              )}
            </div>
          </div>
        ))}
        {isLoading && !currentTypingMessage && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-800">
              正在思考...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的问题..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-6 py-2 rounded-lg text-white ${
              isLoading || !input.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            发送
          </button>
        </div>
      </form>
    </div>
  );
} 