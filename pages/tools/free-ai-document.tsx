import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import ToolsLayout from '@/components/ToolsLayout';
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';

export default function FreeAIDocument() {
  const [prompt, setPrompt] = useState('');
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
          <FileText className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Free AI Document Creator</h1>
            <p className="text-gray-500">Create professional documents, essays, and articles with our free AI document tool.</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create Your Document</CardTitle>
            <CardDescription>
              Describe what you want your document to be about, and our AI will generate it for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Textarea
                  placeholder="Enter your document prompt here... (e.g. Write a research paper about renewable energy sources)"
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
                {isGenerating ? 'Generating...' : 'Generate Document'}
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
          <h2 className="text-xl font-semibold mb-4">Why Use Our Free AI Document Creator?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Professional Quality</h3>
                <p className="text-gray-600">Create professional-looking documents that are well-structured and error-free.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Time Saving</h3>
                <p className="text-gray-600">Generate complete documents in seconds instead of spending hours writing.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Versatile</h3>
                <p className="text-gray-600">Perfect for essays, reports, articles, research papers, and more.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
