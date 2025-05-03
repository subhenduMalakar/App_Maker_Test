import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import Link from 'next/link';
import {
  FileText,
  Presentation,
  Table,
  Mic,
  Image,
  MessageCircle,
  Terminal,
  BookText,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ToolsIndex: NextPage = () => {
  // List of premium tools
  const premiumTools = [
    {
      icon: FileText,
      title: "Documents",
      description: "Create and edit documents with AI assistance",
      path: "/tools/documents",
      color: "text-purple-600"
    },
    {
      icon: Presentation,
      title: "Presentations",
      description: "Create stunning presentations with AI assistance",
      path: "/tools/presentations",
      color: "text-blue-600"
    },
    {
      icon: Table,
      title: "Spreadsheets",
      description: "Analyze data and create spreadsheets with AI",
      path: "/tools/spreadsheets",
      color: "text-green-600"
    },
    {
      icon: Mic,
      title: "Voiceovers",
      description: "Generate natural-sounding voiceovers with AI",
      path: "/tools/voiceovers",
      color: "text-red-600"
    },
    {
      icon: Image,
      title: "Images",
      description: "Create and edit images with AI technology",
      path: "/tools/images",
      color: "text-indigo-600"
    },
    {
      icon: MessageCircle,
      title: "Chat",
      description: "Chat with our intelligent AI assistant",
      path: "/tools/chat",
      color: "text-yellow-600"
    },
    {
      icon: Terminal,
      title: "AI Text Generator",
      description: "Generate high-quality text content with AI",
      path: "/tools/ai-text-generator",
      color: "text-violet-600"
    },
    {
      icon: BookText,
      title: "AI Story Generator",
      description: "Create original stories with AI storytelling",
      path: "/tools/ai-story-generator",
      color: "text-teal-600"
    }
  ];
  
  // List of free tools
  const freeTools = [
    {
      icon: FileText,
      title: "Free AI Document Creator",
      description: "Create professional documents, essays, and articles with our free AI document tool.",
      path: "/tools/free-ai-document",
      color: "text-purple-600"
    },
    {
      icon: Terminal,
      title: "Free AI Text Generator",
      description: "Generate high-quality text content for any purpose with our free AI text generator.",
      path: "/tools/free-ai-text",
      color: "text-blue-600"
    },
    {
      icon: Presentation,
      title: "Free AI Presentation Maker",
      description: "Create stunning presentations and PowerPoint slides with our free AI presentation tools.",
      path: "/tools/free-ai-presentation",
      color: "text-green-600"
    },
    {
      icon: Image,
      title: "Free AI Image Generator",
      description: "Generate beautiful images and graphics with our free AI image creation tools.",
      path: "/tools/free-ai-image",
      color: "text-indigo-600"
    },
    {
      icon: MessageCircle,
      title: "Free AI Email Generator",
      description: "Draft professional emails quickly with our free AI email generation tool.",
      path: "/tools/free-ai-email",
      color: "text-yellow-600"
    },
    {
      icon: BookText,
      title: "Free AI Story Generator",
      description: "Create engaging stories and narratives with our free AI story generation tool.",
      path: "/tools/free-ai-story",
      color: "text-red-600"
    },
    {
      icon: Mic,
      title: "Free AI Voice Generator",
      description: "Convert text to natural-sounding voice overs with our free AI voice generation tool.",
      path: "/tools/free-ai-voice",
      color: "text-teal-600"
    },
    {
      icon: Table,
      title: "Free AI Spreadsheet Maker",
      description: "Create and analyze data with our free AI spreadsheet generation tools.",
      path: "/tools/free-ai-spreadsheet",
      color: "text-orange-600"
    }
  ];
  
  return (
    <ToolsLayout>
      <Head>
        <title>AI Tools - All-in-One Productivity Suite</title>
        <meta name="description" content="Explore our suite of AI-powered tools for productivity and creativity" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">AI Tools Suite</h1>
          <p className="text-gray-600 max-w-2xl">
            Explore our comprehensive suite of AI-powered tools designed to enhance your productivity,
            creativity, and workflow. From document creation to image generation, we've got you covered.
          </p>
        </div>

        {/* Free AI Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-yellow-500 mr-2">✨</span> Free AI Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freeTools.map((tool, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow border-t-2 border-yellow-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <tool.icon className={`h-5 w-5 ${tool.color}`} />
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className={`w-full h-32 flex items-center justify-center ${tool.color} bg-opacity-10 rounded-md mb-2`}>
                    <tool.icon className={`h-16 w-16 ${tool.color} opacity-50`} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={tool.path} className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      <span>Try Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium AI Tools Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-purple-600 mr-2">⚡</span> Premium Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumTools.map((tool, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <tool.icon className={`h-5 w-5 ${tool.color}`} />
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className={`w-full h-32 flex items-center justify-center ${tool.color} bg-opacity-10 rounded-md mb-2`}>
                    <tool.icon className={`h-16 w-16 ${tool.color} opacity-50`} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={tool.path} className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      <span>Open Tool</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Unlock More Features with Premium</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            While our free tools provide great value, our premium tools offer advanced features, 
            higher limits, and more customization options to help you achieve even better results.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </ToolsLayout>
  );
};

export default ToolsIndex;

        {/* Free AI Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-yellow-500 mr-2">✨</span> Free AI Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freeTools.map((tool, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow border-t-2 border-yellow-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <tool.icon className={`h-5 w-5 ${tool.color}`} />
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className={`w-full h-32 flex items-center justify-center ${tool.color} bg-opacity-10 rounded-md mb-2`}>
                    <tool.icon className={`h-16 w-16 ${tool.color} opacity-50`} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={tool.path} className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      <span>Try Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium AI Tools Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-purple-600 mr-2">⚡</span> Premium Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumTools.map((tool, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <tool.icon className={`h-5 w-5 ${tool.color}`} />
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className={`w-full h-32 flex items-center justify-center ${tool.color} bg-opacity-10 rounded-md mb-2`}>
                    <tool.icon className={`h-16 w-16 ${tool.color} opacity-50`} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={tool.path} className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      <span>Open Tool</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        </div>        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Unlock More Features with Premium</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            While our free tools provide great value, our premium tools offer advanced features, 
            higher limits, and more customization options to help you achieve even better results.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            Upgrade to Premium
          </Button>
        </div>      </div>
    </ToolsLayout>
  );
};

export default ToolsIndex;
