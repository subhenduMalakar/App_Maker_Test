import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookText } from "lucide-react";
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
import { Input } from "@/components/ui/input";

export default function FreeAIStory() {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('adventure');
  const [length, setLength] = useState('medium');
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
          <BookText className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Free AI Story Generator</h1>
            <p className="text-gray-500">Create engaging stories and narratives with our free AI story generation tool.</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create Your Story</CardTitle>
            <CardDescription>
              Describe your story idea, and our AI will craft an engaging narrative for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Genre</label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="scifi">Science Fiction</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="children">Children's Story</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Length</label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (500 words)</SelectItem>
                      <SelectItem value="medium">Medium (1000 words)</SelectItem>
                      <SelectItem value="long">Long (2000+ words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Story Prompt</label>
                <Textarea
                  placeholder="Describe your story idea, characters, setting, or plot..."
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
                {isGenerating ? 'Generating...' : 'Generate Story'}
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
          <h2 className="text-xl font-semibold mb-4">Why Use Our Free AI Story Generator?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Creative Inspiration</h3>
                <p className="text-gray-600">Overcome writer's block and get fresh creative ideas for your stories.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Multiple Genres</h3>
                <p className="text-gray-600">Create stories across different genres from fantasy to mystery.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Engaging Narratives</h3>
                <p className="text-gray-600">Generate captivating stories with well-developed characters and plots.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
