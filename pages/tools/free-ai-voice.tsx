import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Languages, VolumeX, Volume2, Play, Pause, Download, Copy, ExternalLink, Info, Check, Ban, Globe, Clock, BarChart3, ChevronRight } from "lucide-react";
import ToolsLayout from '@/components/ToolsLayout';
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function FreeAIVoice() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('female1');
  const [speed, setSpeed] = useState([1]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [generatedAudio, setGeneratedAudio] = useState(null);
  const [usageProgress, setUsageProgress] = useState(35);
  const { user } = useAuth();

  const handleGenerate = () => {
    if (!text.trim() || !user) {
      return;
    }
    
    setIsGenerating(true);
    // Simulate generation (would be replaced with actual API call)
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedAudio({
        id: 'sample-audio-123',
        duration: '00:15',
        created: new Date().toLocaleDateString(),
        size: '234 KB'
      });
      setUsageProgress(prev => Math.min(prev + 10, 100));
      setActiveTab("preview");
    }, 2000);
  };
  
  const handlePlayPreview = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <ToolsLayout>      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <div className="relative mr-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-75 blur-sm"></div>
            <Mic className="h-8 w-8 text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-1.5 relative" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Free AI Voice Generator</h1>
            <p className="text-gray-500">Convert text to natural-sounding voice overs with our free AI voice generation tool.</p>
          </div>
        </div>

        <Card className="mb-6 border-0 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-gray-100 p-0 h-12">
                <TabsTrigger value="create" className="flex-1 h-full rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none">
                  <div className="flex items-center">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Create Voiceover
                  </div>
                </TabsTrigger>
                <TabsTrigger value="preview" disabled={!generatedAudio} className="flex-1 h-full rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none">
                  <div className="flex items-center">
                    <Play className="h-4 w-4 mr-2" />
                    Preview & Download
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="create" className="mt-0 space-y-4">
              <div>
                <Textarea
                  placeholder="Enter the text you want to convert to speech..."
                  className="min-h-[150px] border-purple-200 focus:border-purple-400"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{text.length} characters</span>
                  <span>{text.split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Voice</label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger className="border-purple-200 focus:border-purple-400">
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
                  <label className="block text-sm font-medium mb-2">Speaking Speed</label>
                  <Slider 
                    value={speed} 
                    onValueChange={setSpeed} 
                    min={0.5} 
                    max={2} 
                    step={0.1} 
                    className="mb-1"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Slow</span>
                    <span>Normal ({speed[0]}x)</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700" 
                  onClick={handleGenerate}
                  disabled={!text.trim() || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Mic className="mr-2 h-4 w-4 animate-pulse" />
                      Generating Voiceover...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Generate Voiceover
                    </>
                  )}
                </Button>
              </div>
              
              {!user && (
                <div className="text-center mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-100">
                  <p className="mb-2 text-purple-800">Please sign in to use this free tool</p>
                  <div className="flex justify-center gap-2">
                    <Link href="/auth">
                      <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">Sign In</Button>
                    </Link>
                    <Link href="/auth?signup=true">
                      <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">Sign Up Free</Button>
                    </Link>
                  </div>
                </div>
              )}
              
              {user && (
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-100">                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-purple-800">Free Usage Limit</span>
                    <span className="text-purple-800 font-medium">{usageProgress}% used</span>
                  </div>
                  <div className="h-2 w-full bg-purple-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300"
                      style={{ width: `${usageProgress}%` }}
                    ></div>
                  </div>
                  <div className="mt-3 text-xs text-purple-700">
                    <p>Free tier: Up to 10 minutes of generated audio per month</p>
                    <div className="flex justify-between mt-2">
                      <Link href="/tools/voiceovers" className="text-indigo-600 hover:text-indigo-700 flex items-center">
                        Upgrade for unlimited access
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              {generatedAudio && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-md">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-purple-800">Your Generated Voiceover</h3>
                      <p className="text-sm text-gray-600">Created on {generatedAudio.created}</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-md border border-purple-100 mb-4">
                      <p className="text-gray-700">{text}</p>
                    </div>
                    
                    <div className="bg-purple-100 rounded-md p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 rounded-full text-purple-700"
                          onClick={handlePlayPreview}
                          disabled={isPlaying}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <div className="h-1 bg-purple-200 rounded-full flex-1 mx-3 max-w-[200px]">
                          <div 
                            className="h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" 
                            style={{ width: isPlaying ? '60%' : '0%', transition: 'width 3s linear' }} 
                          ></div>
                        </div>
                        <span className="text-xs text-purple-700">{generatedAudio.duration}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-xs flex items-center border-purple-200 text-purple-700">
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" className="h-8 text-xs flex items-center bg-gradient-to-r from-purple-500 to-indigo-600">
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div className="flex items-center bg-white p-2 rounded border border-purple-100">
                        <Clock className="h-4 w-4 text-purple-600 mr-1.5" />
                        <div>
                          <span className="block text-gray-500">Duration</span>
                          <span className="font-medium">{generatedAudio.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-white p-2 rounded border border-purple-100">
                        <Volume2 className="h-4 w-4 text-purple-600 mr-1.5" />
                        <div>
                          <span className="block text-gray-500">Voice</span>
                          <span className="font-medium">{voice === 'female1' ? 'Female (Standard)' : voice}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-white p-2 rounded border border-purple-100">
                        <BarChart3 className="h-4 w-4 text-purple-600 mr-1.5" />
                        <div>
                          <span className="block text-gray-500">Speed</span>
                          <span className="font-medium">{speed[0]}x</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-white p-2 rounded border border-purple-100">
                        <Download className="h-4 w-4 text-purple-600 mr-1.5" />
                        <div>
                          <span className="block text-gray-500">File Size</span>
                          <span className="font-medium">{generatedAudio.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("create")} className="border-purple-200 text-purple-700">
                      Create Another
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-indigo-600">
                      Save to Library
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </CardContent>        </Card>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Why Use Our Free AI Voice Generator?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-500"></div>
              <CardContent className="pt-6">
                <div className="mb-4 bg-purple-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium text-lg mb-2 text-purple-900">Natural-Sounding Voices</h3>
                <p className="text-purple-700">Create human-like voiceovers that sound professional and engaging.</p>
                <ul className="mt-4 text-sm space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-purple-600 mr-2 mt-0.5" />
                    <span>High-quality synthetic voices</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-purple-600 mr-2 mt-0.5" />
                    <span>Natural intonation and emphasis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-purple-600 mr-2 mt-0.5" />
                    <span>Multiple voice options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-indigo-50">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-indigo-500"></div>
              <CardContent className="pt-6">
                <div className="mb-4 bg-indigo-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                  <Mic className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-medium text-lg mb-2 text-indigo-900">Multiple Use Cases</h3>
                <p className="text-indigo-700">Perfect for videos, presentations, podcasts, e-learning, and more.</p>
                <ul className="mt-4 text-sm space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-indigo-600 mr-2 mt-0.5" />
                    <span>Social media content</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-indigo-600 mr-2 mt-0.5" />
                    <span>Marketing materials</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-indigo-600 mr-2 mt-0.5" />
                    <span>Educational resources</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-500"></div>
              <CardContent className="pt-6">
                <div className="mb-4 bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-lg mb-2 text-blue-900">Customizable</h3>
                <p className="text-blue-700">Choose from different voices and adjust speaking speed to match your needs.</p>
                <ul className="mt-4 text-sm space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Adjustable speaking rates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Different voice types</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>Easy download options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:max-w-[60%]">
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                Need More Advanced Features?
              </h3>
              <p className="text-gray-600">
                Upgrade to our premium voice tools for additional features like voice cloning, 
                audiobook creation, multi-language support, and unlimited usage.
              </p>
            </div>
            
            <Link href="/tools/voiceovers">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800">
                Explore Premium Features
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
