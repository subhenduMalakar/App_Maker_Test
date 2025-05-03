import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
// CV imports removed
import { Eye, Check, ArrowRight } from 'lucide-react';

export default function Templates() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Head>
        <title>AI Tools Templates | AIToolsSuite</title>
      </Head>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Our AI Tools</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of AI-powered tools for content creation, data analysis, and more.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Will be replaced with AI tools grid */}
        </div>
      </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            onClick={handleUseTemplate}
            disabled={!selectedTemplate}
          >
            Use Selected Template
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
