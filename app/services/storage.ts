import { Message } from '../types/chat'

const STORAGE_KEY = 'chat_messages'

export const storage = {
  saveMessages(messages: Message[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch (error) {
      console.error('保存消息失败:', error)
    }
  },

  loadMessages(): Message[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('加载消息失败:', error)
      return []
    }
  },

  clearMessages() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('清除消息失败:', error)
    }
  }
} 