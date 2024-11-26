import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          欢迎使用我们的聊天机器人
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          智能对话，从这里开始
        </p>
        <Link
          href="/auth"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          开始使用
        </Link>
      </div>
    </div>
  )
}
