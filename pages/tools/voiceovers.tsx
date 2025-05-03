import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { Mic, VolumeX, Volume2, Wand2, Languages, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Voiceovers: NextPage = () => {
  return (
    <ToolsLayout>
      <Head>
        <title>Voiceovers - AI Tools</title>
        <meta name="description" content="Create natural-sounding voiceovers with AI voice technology" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <Mic className="h-16 w-16 text-red-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">AI Voiceover Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Generate natural-sounding voiceovers with our advanced AI voice technology. 
            Perfect for videos, presentations, podcasts, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Text to Speech */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-red-600" />
                Text to Speech
              </CardTitle>
              <CardDescription>
                Convert text to lifelike speech
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Transform any text into natural-sounding speech. Choose from diverse voices, accents, and languages.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create Voiceover</Button>
            </CardFooter>
          </Card>

          {/* Audio Enhancement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-red-600" />
                Audio Enhancement
              </CardTitle>
              <CardDescription>
                Improve audio quality with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Enhance audio quality, remove background noise, and improve clarity with our AI audio processing.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Enhance Audio</Button>
            </CardFooter>
          </Card>

          {/* Multi-language Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-red-600" />
                Multi-language Support
              </CardTitle>
              <CardDescription>
                Translate and create voiceovers in multiple languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Translate your content and generate voiceovers in over 30 languages with regional accents.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Translate & Voice</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Projects */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Voiceover Projects</h2>
          <p className="text-gray-500 mb-6">You don't have any recent voiceover projects. Create a new project to get started.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              New Project
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Script
            </Button>
          </div>        </div>
      </div>
    </ToolsLayout>
  );
};

export default Voiceovers;
