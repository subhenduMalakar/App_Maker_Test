import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { Image as ImageIcon, ImagePlus, Paintbrush, Wand2, Crop, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Images: NextPage = () => {
  return (
    <ToolsLayout>
      <Head>
        <title>Images - AI Tools</title>
        <meta name="description" content="Generate and edit images with AI technology" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">        <div className="flex flex-col items-center text-center mb-10">
          <ImageIcon className="h-16 w-16 text-indigo-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">AI Image Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Create stunning images with our AI-powered tools. Generate original artwork, 
            edit photos, and enhance visuals for any project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Image Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImagePlus className="h-5 w-5 text-indigo-600" />
                Image Generation
              </CardTitle>
              <CardDescription>
                Create images from text descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Generate unique images from text descriptions. Create artwork, illustrations, and photorealistic images.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate Image</Button>
            </CardFooter>
          </Card>

          {/* Image Editing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5 text-indigo-600" />
                Image Editing
              </CardTitle>
              <CardDescription>
                Edit and enhance images with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Advanced image editing with AI assistance. Remove objects, change backgrounds, and enhance photos.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Edit Images</Button>
            </CardFooter>
          </Card>

          {/* Style Transfer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-indigo-600" />
                Style Transfer
              </CardTitle>
              <CardDescription>
                Transform images with artistic styles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Apply artistic styles to your images. Transform photos into paintings, sketches, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Styles</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Projects */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Image Projects</h2>
          <p className="text-gray-500 mb-6">You don't have any recent image projects. Create a new project to get started.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <ImagePlus className="h-4 w-4" />
              New Project
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Image
            </Button>
          </div>
        </div>      </div>
    </ToolsLayout>
  );
};

export default Images;
