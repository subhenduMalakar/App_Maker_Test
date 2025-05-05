import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { Presentation, PenTool, ImagePlus, LayoutTemplate, Play, SlidersHorizontal, Sparkles, BarChart2, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentUploadViewer from '@/components/DocumentUploadViewer';

const Presentations: NextPage = () => {
  return (
    <ToolsLayout>
      <Head>
        <title>Presentations - AI Tools</title>
        <meta name="description" content="Create beautiful presentations with AI assistance" />
      </Head>
        <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full opacity-75 blur"></div>
            <Presentation className="h-16 w-16 text-white bg-gradient-to-r from-blue-600 to-cyan-700 rounded-full p-3 relative" />
          </div>
          <h1 className="text-3xl font-bold mb-2 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-700">AI Presentation Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Create stunning presentations with advanced AI assistance. Generate slides, 
            visualize data, and deliver impactful presentations with ease.
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Templates */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <LayoutTemplate className="h-6 w-6 text-blue-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-700 group-hover:from-blue-700 group-hover:to-cyan-800 transition-all duration-300">Presentation Templates</span>
              </CardTitle>
              <CardDescription>
                Start with professionally designed templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Choose from a variety of templates designed for different purposes - business proposals, educational slides, pitches, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-0">Browse Templates</Button>
            </CardFooter>
          </Card>          {/* AI Content Generation */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <Sparkles className="h-6 w-6 text-purple-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-700 group-hover:from-purple-700 group-hover:to-blue-800 transition-all duration-300">AI Content Creation</span>
              </CardTitle>
              <CardDescription>
                Generate slide content with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Let AI suggest content for your slides based on your topic. Generate outlines, bullet points, and complete slides.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 border-0">Create Content</Button>
            </CardFooter>
          </Card>          {/* Visual Elements */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-cyan-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-teal-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <BarChart2 className="h-6 w-6 text-cyan-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-700 group-hover:from-cyan-700 group-hover:to-teal-800 transition-all duration-300">Visual Elements</span>
              </CardTitle>
              <CardDescription>
                Enhance presentations with AI-generated visuals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Create charts, diagrams, and illustrations that match your presentation style, all powered by AI.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 border-0">Create Visuals</Button>
            </CardFooter>
          </Card>
        </div>        {/* Recent Presentations */}
        <DocumentUploadViewer />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-700">Recent Presentations</h2>
          <p className="text-gray-500 mb-6">You don't have any recent presentations. Create a new presentation to get started.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
              <LayoutTemplate className="h-4 w-4" />
              New from Template
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300">
              <Play className="h-4 w-4" />
              View Tutorial
            </Button>
          </div></div>
      </div>
    </ToolsLayout>
  );
};

export default Presentations;
