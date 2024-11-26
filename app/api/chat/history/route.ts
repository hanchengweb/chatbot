import { NextResponse } from 'next/server';
import { Message } from '@/app/types/chat';

// 模拟数据存储
const chatHistory: { [key: string]: Message[] } = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: '需要用户ID' }, { status: 400 });
  }

  return NextResponse.json({
    messages: chatHistory[userId] || [],
  });
}

export async function POST(request: Request) {
  try {
    const { userId, messages } = await request.json();

    if (!userId || !messages) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    chatHistory[userId] = messages;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('保存聊天历史失败:', error);
    return NextResponse.json(
      { error: '保存历史记录失败' },
      { status: 500 }
    );
  }
} 