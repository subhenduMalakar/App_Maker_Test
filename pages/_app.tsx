import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout"; // Assuming Layout is still in src/components
import { AuthProvider } from '../src/context/AuthContext'; // Import AuthProvider

import '../src/index.css'; // Import global styles

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider> {/* Wrap with AuthProvider */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider> {/* Close AuthProvider */}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default MyApp;