import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            与AI对话，探索无限可能
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            基于先进的人工智能技术，为您提供智能、自然、流畅的对话体验
          </p>
          <div className="mt-10">
            <Link 
              href="/chat"
              className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              开始对话
            </Link>
          </div>
        </div>

        {/* 特性展示 */}
        <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="rounded-xl bg-indigo-50 p-4 w-12 h-12 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">智能对话</h3>
            <p className="mt-2 text-gray-600">自然流畅的对话体验，理解上下文，提供精准回答</p>
          </div>

          <div className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="rounded-xl bg-indigo-50 p-4 w-12 h-12 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">多场景应用</h3>
            <p className="mt-2 text-gray-600">支持多种对话场景，从日常聊天到专业咨询</p>
          </div>

          <div className="relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="rounded-xl bg-indigo-50 p-4 w-12 h-12 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">快速响应</h3>
            <p className="mt-2 text-gray-600">毫秒级响应速度，让对话更加流畅自然</p>
          </div>
        </div>
      </div>
    </main>
  )
}
