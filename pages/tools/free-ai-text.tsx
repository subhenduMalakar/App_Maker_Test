import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Terminal } from "lucide-react";
import ToolsLayout from '@/components/ToolsLayout';
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FreeAIText() {
  const [prompt, setPrompt] = useState('');
  const [textType, setTextType] = useState('general');
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
          <Terminal className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Free AI Text Generator</h1>
            <p className="text-gray-500">Generate high-quality text content for any purpose with our free AI text generator.</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Generate Text Content</CardTitle>
            <CardDescription>
              Describe what kind of text you need, and our AI will generate it for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Content Type</label>
                <Select value={textType} onValueChange={setTextType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Text</SelectItem>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="marketing">Marketing Copy</SelectItem>
                    <SelectItem value="business">Business Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Textarea
                  placeholder="Enter your text prompt here... (e.g. Write a product description for a new smartphone)"
                  className="min-h-[150px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Text'}
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
          <h2 className="text-xl font-semibold mb-4">Why Use Our Free AI Text Generator?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">High-Quality Content</h3>
                <p className="text-gray-600">Generate professionally written text that sounds natural and engaging.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Versatile</h3>
                <p className="text-gray-600">Create content for blogs, social media, marketing, business, and more.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Time-Efficient</h3>
                <p className="text-gray-600">Save hours of writing and editing with instant AI-generated text.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
