import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { 
  FileText, 
  Presentation, 
  Table, 
  Mic, 
  Image as ImageIcon, 
  MessageCircle,
  Bot,
  BookText,
  ArrowRight
} from 'lucide-react';

export default function Templates() {
  const router = useRouter();
  const { user } = useAuth();
  
  // Define AI tools
  const aiTools = [
    {
      id: 'documents',
      name: 'AI Document Creator',
      description: 'Create professional documents with AI assistance',
      icon: <FileText className="h-12 w-12 text-blue-500" />,
      path: '/tools/documents'
    },
    {
      id: 'presentations',
      name: 'AI Presentation Maker',
      description: 'Create stunning presentations in minutes',
      icon: <Presentation className="h-12 w-12 text-purple-500" />,
      path: '/tools/presentations'
    },
    {
      id: 'spreadsheets',
      name: 'AI Spreadsheet Assistant',
      description: 'Generate and analyze spreadsheet data',
      icon: <Table className="h-12 w-12 text-green-500" />,
      path: '/tools/spreadsheets'
    },
    {
      id: 'voiceovers',
      name: 'AI Voice Generator',
      description: 'Convert text to natural-sounding speech',
      icon: <Mic className="h-12 w-12 text-red-500" />,
      path: '/tools/voiceovers'
    },
    {
      id: 'images',
      name: 'AI Image Creator',
      description: 'Generate custom images from text descriptions',
      icon: <ImageIcon className="h-12 w-12 text-amber-500" />,
      path: '/tools/images'
    },
    {
      id: 'chat',
      name: 'AI Chat Assistant',
      description: 'Get answers and assistance from our AI chat',
      icon: <MessageCircle className="h-12 w-12 text-indigo-500" />,
      path: '/tools/chat'
    }
  ];

  const handleToolSelect = (path: string) => {
    if (!user) {
      router.push('/auth');
      return;
    }
    router.push(path);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Head>
        <title>AI Tools | AIToolsSuite</title>
      </Head>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Our AI Tools</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of AI-powered tools for content creation, data analysis, and more.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool) => (
            <Card 
              key={tool.id}
              className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
              onClick={() => handleToolSelect(tool.path)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-gray-100">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <Button size="sm" className="mt-auto">
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            onClick={() => router.push('/tools')}
          >
            View All Tools
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
