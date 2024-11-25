import { Message } from '../types/chat'

const API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY
const API_URL = process.env.NEXT_PUBLIC_DEEPSEEK_API_URL

const TIMEOUT_MS = 30000 // 30秒超时
const MAX_RETRIES = 3 // 最大重试次数

export async function sendMessage(messages: Message[]) {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

      const response = await fetch(API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API错误详情:', errorData)
        throw new Error(`API请求失败: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      retries++
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('请求超时')
        } else {
          console.error('API调用错误:', error)
        }
      }

      if (retries === MAX_RETRIES) {
        throw error
      }

      // 指数退避重试
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000))
    }
  }
} 