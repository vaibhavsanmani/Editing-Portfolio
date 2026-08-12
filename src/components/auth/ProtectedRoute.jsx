import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
}) 
{
  const { user, loading } = useAuth();

  // Wait for Firebase to determine auth state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in
  return children;
}