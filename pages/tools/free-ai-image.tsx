import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon } from "lucide-react";
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

export default function FreeAIImage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('medium');
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
          <ImageIcon className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Free AI Image Generator</h1>
            <p className="text-gray-500">Generate beautiful images and graphics with our free AI image creation tools.</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create Your Image</CardTitle>
            <CardDescription>
              Describe the image you want to create, and our AI will generate it for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Textarea
                  placeholder="Describe the image you want to create in detail..."
                  className="min-h-[100px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                      <SelectItem value="3d">3D Render</SelectItem>
                      <SelectItem value="pixel">Pixel Art</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Size</label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (512x512)</SelectItem>
                      <SelectItem value="medium">Medium (1024x1024)</SelectItem>
                      <SelectItem value="large">Large (1536x1536)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Image'}
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
          <h2 className="text-xl font-semibold mb-4">Why Use Our Free AI Image Generator?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">High Quality</h3>
                <p className="text-gray-600">Generate stunning, high-resolution images from simple text descriptions.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Multiple Styles</h3>
                <p className="text-gray-600">Choose from various artistic styles to match your creative vision.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">No Design Skills Needed</h3>
                <p className="text-gray-600">Create professional-looking images without any design experience.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
