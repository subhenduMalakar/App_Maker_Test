import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { Image as ImageIcon, ImagePlus, Paintbrush, Wand2, Crop, Upload, Palette, Camera, Layers, ScissorsSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentUploadViewer from '@/components/DocumentUploadViewer';

const Images: NextPage = () => {
  return (
    <ToolsLayout>
      <Head>
        <title>AI Image Generator - AI Tools</title>
        <meta name="description" content="Create and edit images with AI" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-fuchsia-600 rounded-full opacity-75 blur"></div>
            <ImageIcon className="h-16 w-16 text-white bg-gradient-to-r from-indigo-600 to-fuchsia-700 rounded-full p-3 relative" />
          </div>
          <h1 className="text-3xl font-bold mb-2 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-700">AI Image Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Generate stunning images, edit photos, and create visual content with our powerful AI tools.
            From sketches to photorealistic compositions, our AI can help bring your vision to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* AI Image Generation Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-indigo-50 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-600"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Wand2 className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-lg font-bold">AI Image Generation</CardTitle>
              </div>
              <CardDescription>Turn text prompts into stunning images</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-gray-600 mb-4">Create beautiful, unique images from simple text descriptions. Our advanced AI can generate art, photos, and designs in various styles.</p>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700">
                Generate Images
              </Button>
            </CardContent>
          </Card>
          
          {/* Image Editing Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-indigo-50 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-600"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Paintbrush className="h-5 w-5 text-violet-600" />
                <CardTitle className="text-lg font-bold">AI Image Editing</CardTitle>
              </div>
              <CardDescription>Edit and enhance existing images</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-gray-600 mb-4">Improve your photos with AI-powered editing tools. Remove backgrounds, retouch portraits, enhance colors, and apply creative effects.</p>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
                Edit Images
              </Button>
            </CardContent>
          </Card>
          
          {/* Style Transfer Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-indigo-50 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-pink-600"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Palette className="h-5 w-5 text-fuchsia-600" />
                <CardTitle className="text-lg font-bold">AI Style Transfer</CardTitle>
              </div>
              <CardDescription>Apply artistic styles to your images</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-gray-600 mb-4">Transform your photos into artwork inspired by famous artists and styles. Turn photos into paintings, sketches, or apply custom styles.</p>
              <Button className="w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700">
                Apply Styles
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* More Tools Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-700">More Image Tools</h2>
            <div className="grid grid-cols-1 gap-4">
              <Card className="border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-full bg-indigo-100 p-2">
                    <Crop className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Smart Cropping</h3>
                    <p className="text-sm text-gray-500">Automatically crop and resize images while keeping the important content</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-full bg-fuchsia-100 p-2">
                    <Layers className="h-5 w-5 text-fuchsia-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Background Removal</h3>
                    <p className="text-sm text-gray-500">Remove backgrounds from images with a single click</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="rounded-full bg-violet-100 p-2">
                    <ScissorsSquare className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">AI Object Selection</h3>
                    <p className="text-sm text-gray-500">Precisely select objects in your images using AI</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Document Upload and Viewer */}
          <DocumentUploadViewer />
        </div>
        
        {/* Recent Projects */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-700">Recent Image Projects</h2>
          <p className="text-gray-500 mb-6">You don't have any recent image projects. Create a new project to get started.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300">
              <ImagePlus className="h-4 w-4" />
              New Project
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-fuchsia-200 text-fuchsia-600 hover:bg-fuchsia-50 hover:text-fuchsia-700 hover:border-fuchsia-300">
              <Upload className="h-4 w-4" />
              Upload Images
            </Button>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
};

export default Images;
