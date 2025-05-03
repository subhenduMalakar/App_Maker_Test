import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { Presentation, PenTool, ImagePlus, LayoutTemplate, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Presentations: NextPage = () => {
  return (
    <ToolsLayout>
      <Head>
        <title>Presentations - AI Tools</title>
        <meta name="description" content="Create beautiful presentations with AI assistance" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <Presentation className="h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">AI Presentation Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Create stunning presentations with advanced AI assistance. Generate slides, 
            visualize data, and deliver impactful presentations with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutTemplate className="h-5 w-5 text-blue-600" />
                Presentation Templates
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
              <Button className="w-full">Browse Templates</Button>
            </CardFooter>
          </Card>

          {/* AI Content Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-blue-600" />
                AI Content Creation
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
              <Button className="w-full">Create Content</Button>
            </CardFooter>
          </Card>

          {/* Visual Elements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImagePlus className="h-5 w-5 text-blue-600" />
                Visual Elements
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
              <Button className="w-full">Create Visuals</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Presentations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Presentations</h2>
          <p className="text-gray-500 mb-6">You don't have any recent presentations. Create a new presentation to get started.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4" />
              New from Template
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              View Tutorial
            </Button>
          </div>        </div>
      </div>
    </ToolsLayout>
  );
};

export default Presentations;
