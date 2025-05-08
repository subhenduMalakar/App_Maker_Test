import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useAuth } from '@/context/AuthContext';
import { useToolsConfig } from '@/hooks/use-tools-config';
import siteConfig from "@/config/siteConfig.json";
import { 
  ArrowRight, 
  FileText, 
  Presentation, 
  Table, 
  Mic, 
  Image as ImageIcon, 
  MessageCircle, 
  Terminal, 
  BookText 
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();  
  const { isToolEnabled } = useToolsConfig();
  
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-purple-600" />,
      title: "Free AI Document Creator",
      description: "Create professional documents, essays, and articles with our free AI document tool.",
      path: "/tools/free-ai-document"
    },
    {
      icon: <Terminal className="h-10 w-10 text-blue-600" />,
      title: "Free AI Text Generator",
      description: "Generate high-quality text content for any purpose with our free AI text generator.",
      path: "/tools/free-ai-text"
    },
    {
      icon: <Presentation className="h-10 w-10 text-green-600" />,
      title: "Free AI Presentation Maker",
      description: "Create stunning presentations and PowerPoint slides with our free AI presentation tools.",
      path: "/tools/free-ai-presentation"
    },
    {
      icon: <ImageIcon className="h-10 w-10 text-indigo-600" />,
      title: "Free AI Image Generator",
      description: "Generate beautiful images and graphics with our free AI image creation tools.",
      path: "/tools/free-ai-image"
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-yellow-600" />,
      title: "Free AI Email Generator",
      description: "Draft professional emails quickly with our free AI email generation tool.",
      path: "/tools/free-ai-email"
    },
    {
      icon: <BookText className="h-10 w-10 text-red-600" />,
      title: "Free AI Story Generator",
      description: "Create engaging stories and narratives with our free AI story generation tool.",
      path: "/tools/free-ai-story"
    },
    {
      icon: <Mic className="h-10 w-10 text-teal-600" />,
      title: "Free AI Voice Generator",
      description: "Convert text to natural-sounding voice overs with our free AI voice generation tool.",
      path: "/tools/free-ai-voice"
    },
    {
      icon: <Table className="h-10 w-10 text-orange-600" />,
      title: "Free AI Spreadsheet Maker",
      description: "Create and analyze data with our free AI spreadsheet generation tools.",
      path: "/tools/free-ai-spreadsheet"
    }
  ];

  return (
    <div className="min-h-screen">
      <Head>
        <title>{siteConfig.site.title}</title>
        <meta name="description" content={siteConfig.site.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>              <h1 className="text-4xl md:text-5xl font-bold mb-4">Free AI Document Creator Tools</h1>
              <p className="text-lg mb-4 text-blue-50">Create professional documents, emails, stories, presentations and more with our 100% free AI tools.</p>
              <div className="mb-6">                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => router.push('/tools')}
                >
                  Explore Free AI Tools
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>            <div className="w-full md:w-auto">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="font-bold text-gray-800 text-xl">Free AI Document Creator</h3>
                </div>
                <textarea 
                  className="w-full p-4 border border-gray-300 rounded-lg mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your topic or describe what you want to write about..."
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button variant="outline" size="sm">Blog Post</Button>
                  <Button variant="outline" size="sm">Email</Button>
                  <Button variant="outline" size="sm">Report</Button>
                  <Button variant="outline" size="sm">Essay</Button>
                  <Button variant="outline" size="sm">Article</Button>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Generate Document
                  <FileText className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Features Section */}      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Free AI Tools Suite</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Unlock the power of AI with our comprehensive collection of 100% free tools designed to enhance your productivity and creativity.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features
              .filter(tool => {
                // Extract the ID from path
                const id = tool.path.split('/').pop() || '';
                return isToolEnabled(id);
              })
              .map((feature, index) => (
              <Card key={index} className="p-5 hover:shadow-md transition-shadow border-t-4 border-t-blue-500">
                <div className="mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>                <Button 
                  variant="link" 
                  className="mt-3 p-0 h-auto text-blue-600 flex items-center"
                  onClick={() => router.push(feature.path)}
                >
                  Try Now <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of users who have enhanced their workflow with our AI-powered tools.</p>          <Button 
            size="lg" 
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => router.push('/tools')}
          >
            Get Started with AI Tools
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}