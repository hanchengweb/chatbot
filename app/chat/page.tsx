'use client'

import { useState, useEffect } from 'react'
import { Message } from '../types/chat'
import { sendMessage } from '../services/api'
import { storage } from '../services/storage'

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 加载保存的消息
  useEffect(() => {
    const savedMessages = storage.loadMessages()
    if (savedMessages.length > 0) {
      setMessages(savedMessages)
    }
  }, [])

  // 保存消息到本地存储
  useEffect(() => {
    if (messages.length > 0) {
      storage.saveMessages(messages)
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const allMessages = [...messages, userMessage]
      const response = await sendMessage(allMessages)
      
      const aiMessage: Message = {
        role: 'assistant',
        content: response.choices[0].message.content
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('发送消息失败:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，发生了一些错误。请稍后重试。'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // 清除聊天记录
  const handleClearChat = () => {
    setMessages([])
    storage.clearMessages()
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 聊天头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">AI 助手</h1>
          <button
            onClick={handleClearChat}
            className="text-gray-600 hover:text-gray-900"
          >
            清除对话
          </button>
        </div>
      </header>

      {/* 聊天消息区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-500">
              开始和AI助手对话吧！
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 输入区域 */}
      <div className="border-t bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入您的问题..."
              disabled={isLoading}
              className="flex-1 rounded-xl border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? '发送中...' : '发送'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 