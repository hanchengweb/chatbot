import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">仪表盘</h1>
        {/* 这里添加仪表盘内容 */}
      </div>
    </ProtectedRoute>
  );
} 