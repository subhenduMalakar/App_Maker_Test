import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function Builder() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push('/auth');
      return;
    }

    // Redirect to AI tools page since CV Builder is no longer supported
    router.push('/tools');
  }, [user, router]);

  // Simple loading screen while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">Redirecting...</h1>
        <p className="text-gray-600">Taking you to our AI Tools</p>
      </div>
    </div>  );
}
