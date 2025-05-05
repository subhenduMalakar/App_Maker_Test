import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { FileText, Upload, Download, Edit, FilePlus, FileCheck, FileCode, PenSquare, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentUploadViewer from '@/components/DocumentUploadViewer';

const Documents: NextPage = () => {
  return (
    <ToolsLayout>
      <Head>
        <title>Documents - AI Tools</title>
        <meta name="description" content="Create and edit documents using AI" />
      </Head>
        <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full opacity-75 blur"></div>
            <FileText className="h-16 w-16 text-white bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full p-3 relative" />
          </div>
          <h1 className="text-3xl font-bold mb-2 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">AI Document Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Create, edit, and enhance your documents with our powerful AI tools. Generate professional content, 
            improve readability, and collaborate seamlessly.
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Document Creation */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <FilePlus className="h-6 w-6 text-purple-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800 group-hover:from-purple-700 group-hover:to-indigo-900 transition-all duration-300">Create New Document</span>
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
              <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-0">Get Started</Button>
            </CardFooter>
          </Card>          {/* Document Upload */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <FileCheck className="h-6 w-6 text-blue-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 group-hover:from-blue-700 group-hover:to-indigo-900 transition-all duration-300">Upload & Enhance</span>
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
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0">Upload Document</Button>
            </CardFooter>
          </Card>          {/* Document Editing */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <PenSquare className="h-6 w-6 text-green-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-700 group-hover:from-green-700 group-hover:to-teal-800 transition-all duration-300">Edit & Format</span>
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
              <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 border-0">Open Editor</Button>
            </CardFooter>
          </Card>
        </div>{/* Recent Documents Section */}
        <DocumentUploadViewer />
        
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
