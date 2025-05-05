import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import ToolsLayout from '@/components/ToolsLayout';
import { Mic, VolumeX, Volume2, Wand2, Languages, Upload, Music, Sparkles, Globe, PenTool, Megaphone, BookOpen, GalleryThumbnails, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import DocumentUploadViewer from '@/components/DocumentUploadViewer';

const Voiceovers: NextPage = () => {
  const [previewText, setPreviewText] = useState('Hello! This is a sample of how your AI-generated voiceover will sound.');
  const [selectedVoice, setSelectedVoice] = useState('female1');
  const [speed, setSpeed] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('text-to-speech');
  
  const handlePlayPreview = () => {
    // In a real implementation, this would call an API to generate and play audio
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <ToolsLayout>
      <Head>
        <title>Voiceovers - AI Tools</title>
        <meta name="description" content="Create natural-sounding voiceovers with AI voice technology" />
      </Head>
        <div className="container mx-auto px-4 py-8">        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-75 blur"></div>
            <Mic className="h-16 w-16 text-white bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full p-3 relative" />
          </div>
          <h1 className="text-3xl font-bold mb-2 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700">AI Voiceover Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Generate natural-sounding voiceovers with our advanced AI voice technology. 
            Perfect for videos, presentations, podcasts, and more.
          </p>
        </div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Text to Speech */}          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-cyan-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <Volume2 className="h-6 w-6 text-cyan-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-cyan-800 group-hover:from-cyan-700 group-hover:to-cyan-900 transition-all duration-300">Text to Speech</span>
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
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 border-0">Create Voiceover</Button>
            </CardFooter>
          </Card>{/* Audio Enhancement */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <Sparkles className="h-6 w-6 text-blue-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300">Audio Enhancement</span>
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
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 border-0">Enhance Audio</Button>
            </CardFooter>
          </Card>          {/* Multi-language Support */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <Globe className="h-6 w-6 text-purple-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 group-hover:from-purple-700 group-hover:to-purple-900 transition-all duration-300">Multi-language Support</span>
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
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 border-0">Translate & Voice</Button>
            </CardFooter>          </Card>
        </div>
        
        {/* Voice Preview Section */}
        <div className="mt-12 bg-gradient-to-r from-cyan-50 to-blue-50 p-6 md:p-8 rounded-xl border border-cyan-100">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700">Try Our AI Voices</h2>
          <p className="text-gray-600 mb-6">Test out our different AI voices with your own text</p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-white">
              <TabsTrigger value="text-to-speech" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span>Text to Speech</span>
              </TabsTrigger>
              <TabsTrigger value="voice-settings" className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                <span>Voice Settings</span>
              </TabsTrigger>
              <TabsTrigger value="languages" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Languages</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text-to-speech" className="pt-2">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Enter text to preview</label>
                    <Textarea 
                      placeholder="Type your text here to test how it sounds..." 
                      value={previewText}
                      onChange={(e) => setPreviewText(e.target.value)}
                      className="min-h-[100px] bg-white border-cyan-200 focus:border-cyan-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Voice</label>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger className="bg-white border-cyan-200 focus:border-cyan-400">
                          <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female1">Female (Standard)</SelectItem>
                          <SelectItem value="female2">Female (Professional)</SelectItem>
                          <SelectItem value="male1">Male (Standard)</SelectItem>
                          <SelectItem value="male2">Male (Deep)</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Speed</label>
                      <Slider 
                        value={speed} 
                        onValueChange={setSpeed} 
                        min={0.5} 
                        max={2} 
                        step={0.1} 
                        className="mt-3"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handlePlayPreview}
                    disabled={isPlaying || !previewText}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="mr-2 h-4 w-4 animate-pulse" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Preview Voice
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-cyan-100">
                  <h3 className="font-medium text-lg mb-4 text-cyan-800">Voice Characteristics</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium text-gray-700">Clarity</span>
                        <span className="text-cyan-600">High</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium text-gray-700">Naturalness</span>
                        <span className="text-cyan-600">Very High</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium text-gray-700">Emotion</span>
                        <span className="text-cyan-600">Medium</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium text-gray-700">Accent</span>
                        <span className="text-cyan-600">Neutral American</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-gray-700 mb-2">Best for:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></div>
                        Professional presentations
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></div>
                        Marketing videos
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></div>
                        E-learning content
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="voice-settings" className="pt-2">
              <div className="bg-white p-6 rounded-lg border border-cyan-100 text-center">
                <p className="text-gray-600 mb-4">Additional voice customization options will be available in the full version.</p>
                <Button variant="outline" className="border-cyan-200 text-cyan-700 hover:bg-cyan-50">Upgrade for Advanced Settings</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="languages" className="pt-2">
              <div className="bg-white p-6 rounded-lg border border-cyan-100">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {["English (US)", "English (UK)", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean", "Russian", "Arabic"].map((language) => (
                    <div key={language} className="p-3 border border-gray-100 rounded-md hover:border-cyan-200 hover:bg-cyan-50 transition-colors cursor-pointer">
                      {language}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">Premium voices are available in all languages shown above. Free tier includes English (US) only.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Advanced Voice Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700">Advanced Voice Features</h2>
          <p className="text-gray-600 mb-6">Explore our premium voice tools for professional-grade content creation</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Voice Cloning */}
            <Card className="group border border-gray-100 hover:border-cyan-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <PenTool className="h-5 w-5 text-cyan-600" />
                  <span>Voice Cloning</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-xs text-gray-600">
                  Create a digital copy of your voice or any voice for consistent branding.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full text-xs border-cyan-200 text-cyan-700 hover:bg-cyan-50">
                  Try Voice Cloning
                </Button>
              </CardFooter>
            </Card>
            
            {/* Narrative Audiobooks */}
            <Card className="group border border-gray-100 hover:border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <span>Audiobook Creator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-xs text-gray-600">
                  Convert books and long-form content into engaging audiobooks with chapter markers.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full text-xs border-purple-200 text-purple-700 hover:bg-purple-50">
                  Create Audiobook
                </Button>
              </CardFooter>
            </Card>
            
            {/* Ad Voiceovers */}
            <Card className="group border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Megaphone className="h-5 w-5 text-blue-600" />
                  <span>Ad Voiceovers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-xs text-gray-600">
                  Create professional commercial voiceovers with the perfect tone and emphasis.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                  Create Ad Voice
                </Button>
              </CardFooter>
            </Card>
            
            {/* Video Narration */}
            <Card className="group border border-gray-100 hover:border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <GalleryThumbnails className="h-5 w-5 text-green-600" />
                  <span>Video Narration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-xs text-gray-600">
                  Perfectly timed voiceovers for videos, tutorials, and presentations with auto-sync.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full text-xs border-green-200 text-green-700 hover:bg-green-50">
                  Create Video Voice
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Document Upload and Viewer Section */}
        <DocumentUploadViewer />        {/* Recent Projects */}        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700">Recent Voiceover Projects</h2>
          
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-xl border border-cyan-100 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Ready to create your first voiceover?</h3>
                <p className="text-gray-600 max-w-lg">
                  Create professional voiceovers for your videos, presentations, podcasts, and more in just a few clicks. 
                  Our AI technology makes it easy to get started.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  New Project
                </Button>
                <Button variant="outline" className="flex items-center gap-2 border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300">
                  <Upload className="h-4 w-4" />
                  Upload Script
                </Button>
                <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300">
                  <Music className="h-4 w-4" />
                  Import Audio
                </Button>
              </div>
            </div>
          </div>
          
          <p className="text-gray-500 mb-4">No recent projects found. Your projects will appear here once created.</p>
          
          {/* Sample project cards that would appear once created */}
          <div className="opacity-50 hover:opacity-70 transition-opacity duration-300 cursor-not-allowed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Product Demo', 'Tutorial Narration', 'Podcast Intro'].map((title, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">{title}</h4>
                      <p className="text-xs text-gray-500">Created: Sample Date</p>
                    </div>
                    <div className="bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded">Draft</div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full mb-3">
                    <div className="h-1.5 bg-gray-300 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-xs text-gray-600">
                      <PenTool className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs text-gray-600">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
};

export default Voiceovers;
