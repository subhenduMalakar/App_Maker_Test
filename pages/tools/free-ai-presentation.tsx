import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Presentation } from "lucide-react";
import ToolsLayout from '@/components/ToolsLayout';
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import { Input } from "@/components/ui/input";

export default function FreeAIPresentation() {
  const [topic, setTopic] = useState('');
  const [slides, setSlides] = useState('10');
  const [details, setDetails] = useState('');
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
          <Presentation className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Free AI Presentation Maker</h1>
            <p className="text-gray-500">Create stunning presentations and PowerPoint slides with our free AI presentation tools.</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create Your Presentation</CardTitle>
            <CardDescription>
              Describe your presentation topic and our AI will generate professional slides for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Presentation Topic</label>
                <Input
                  placeholder="Enter your presentation topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Number of Slides</label>
                <Input
                  type="number"
                  min="5"
                  max="30"
                  value={slides}
                  onChange={(e) => setSlides(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Additional Details</label>
                <Textarea
                  placeholder="Add any specific details or requirements for your presentation"
                  className="min-h-[100px]"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleGenerate}
                disabled={!topic || isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Presentation'}
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
          <h2 className="text-xl font-semibold mb-4">Why Use Our Free AI Presentation Maker?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Professional Designs</h3>
                <p className="text-gray-600">Create beautiful, professionally designed presentations in minutes.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Content Generation</h3>
                <p className="text-gray-600">AI generates both slide content and structure based on your topic.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Ready to Present</h3>
                <p className="text-gray-600">Download as PowerPoint or present directly from our platform.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
