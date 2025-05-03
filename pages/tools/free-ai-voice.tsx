import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic } from "lucide-react";
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

export default function FreeAIVoice() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('female1');
  const [speed, setSpeed] = useState([1]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();

  const handleGenerate = () => {
    if (!user) {
      // If not logged in, the auth redirect is handled by ToolsLayout
      return;
    }
    
    setIsGenerating(true);
    // Simulate generation (would be replaced with actual API call)
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <ToolsLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <Mic className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Free AI Voice Generator</h1>
            <p className="text-gray-500">Convert text to natural-sounding voice overs with our free AI voice generation tool.</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create Your Voiceover</CardTitle>
            <CardDescription>
              Enter your text and customize the voice settings to create a natural-sounding voiceover.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Textarea
                  placeholder="Enter the text you want to convert to speech..."
                  className="min-h-[150px]"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Voice</label>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger>
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
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={handleGenerate}
                disabled={!text || isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Voiceover'}
              </Button>
              {!user && (
                <div className="text-center mt-4 p-4 bg-purple-50 rounded-md">
                  <p className="mb-2 text-purple-800">Please sign in to use this free tool</p>
                  <Link href="/auth">
                    <Button variant="outline" className="mr-2">Sign In</Button>
                  </Link>
                  <Link href="/auth?signup=true">
                    <Button>Sign Up Free</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Why Use Our Free AI Voice Generator?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Natural-Sounding Voices</h3>
                <p className="text-gray-600">Create human-like voiceovers that sound professional and engaging.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Multiple Use Cases</h3>
                <p className="text-gray-600">Perfect for videos, presentations, podcasts, e-learning, and more.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Customizable</h3>
                <p className="text-gray-600">Choose from different voices and adjust speaking speed to match your needs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
