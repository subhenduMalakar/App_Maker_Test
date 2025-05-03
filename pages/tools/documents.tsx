import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { FileText, Upload, Download, Edit, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Documents: NextPage = () => {
  return (
    <ToolsLayout>
      <Head>
        <title>Documents - AI Tools</title>
        <meta name="description" content="Create and edit documents using AI" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <FileText className="h-16 w-16 text-purple-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">AI Document Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Create, edit, and enhance your documents with our powerful AI tools. Generate professional content, 
            improve readability, and collaborate seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Document Creation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilePlus className="h-5 w-5 text-purple-600" />
                Create New Document
              </CardTitle>
              <CardDescription>
                Generate a new document from scratch using AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Start with a blank canvas or use our templates to create professional documents in seconds.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-purple-600" />
                Upload & Enhance
              </CardTitle>
              <CardDescription>
                Improve existing documents with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Upload your documents and let our AI enhance readability, fix grammar, and improve structure.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Upload Document</Button>
            </CardFooter>
          </Card>

          {/* Document Editing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-purple-600" />
                Edit & Format
              </CardTitle>
              <CardDescription>
                Powerful editing tools with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Access advanced editing features with AI suggestions to make your documents shine.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Open Editor</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Documents Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Documents</h2>
          <p className="text-gray-500 mb-6">You don't have any recent documents. Create or upload a document to get started.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <FilePlus className="h-4 w-4" />
              New Document
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>        </div>
      </div>
    </ToolsLayout>
  );
};

export default Documents;
