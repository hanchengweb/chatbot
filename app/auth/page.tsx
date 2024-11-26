'use client';

import { useState } from 'react';
import AuthForm from '@/app/components/auth/AuthForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? '欢迎回来' : '创建账户'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin
              ? '使用您的账户继续访问'
              : '只需几步即可开始使用我们的服务'}
          </p>
        </div>

        <AuthForm isLogin={isLogin} />

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isLogin ? '还没有账户？创建一个' : '已有账户？立即登录'}
          </button>
        </div>
      </div>
    </div>
  );
} 