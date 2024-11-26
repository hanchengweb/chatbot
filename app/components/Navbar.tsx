'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '@/app/config/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/auth');
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            AI 助手
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/chat" className="text-sm text-gray-600 hover:text-gray-900">
                  聊天
                </Link>
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  登出
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 