export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  id: string
  model: string
  choices: {
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }[]
} 