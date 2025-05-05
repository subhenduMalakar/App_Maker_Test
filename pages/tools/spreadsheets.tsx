import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { Table, BarChart2, Database, FileSpreadsheet, Calculator, LineChart, PieChart, Layers, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentUploadViewer from '@/components/DocumentUploadViewer';

const Spreadsheets: NextPage = () => {
  return (
    <ToolsLayout>
      <Head>
        <title>Spreadsheets - AI Tools</title>
        <meta name="description" content="Create, analyze and visualize data with AI spreadsheet tools" />
      </Head>
        <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full opacity-75 blur"></div>
            <Table className="h-16 w-16 text-white bg-gradient-to-r from-green-600 to-emerald-700 rounded-full p-3 relative" />
          </div>
          <h1 className="text-3xl font-bold mb-2 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700">AI Spreadsheet Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Create powerful spreadsheets with AI assistance. Analyze data, generate insights, 
            and build visualizations automatically.
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Data Analysis */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <Calculator className="h-6 w-6 text-green-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700 group-hover:from-green-700 group-hover:to-emerald-800 transition-all duration-300">Data Analysis</span>
              </CardTitle>
              <CardDescription>
                Analyze data with AI insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Automatically analyze your data to find patterns, outliers, and trends. Get AI-powered insights in seconds.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0">Analyze Data</Button>
            </CardFooter>
          </Card>          {/* Data Visualization */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-teal-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-green-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <PieChart className="h-6 w-6 text-teal-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-green-700 group-hover:from-teal-700 group-hover:to-green-800 transition-all duration-300">Data Visualization</span>
              </CardTitle>
              <CardDescription>
                Create charts and graphs with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Let AI suggest the best visualizations for your data. Create professional charts, graphs, and dashboards.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 border-0">Create Visuals</Button>
            </CardFooter>
          </Card>          {/* Data Processing */}
          <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-emerald-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-lime-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-25 blur transition-all duration-300"></div>
                  <Filter className="h-6 w-6 text-emerald-600 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-lime-700 group-hover:from-emerald-700 group-hover:to-lime-800 transition-all duration-300">Data Processing</span>
              </CardTitle>
              <CardDescription>
                Clean and transform data with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Automatically clean, format, and transform your data. Fix errors, handle missing values, and prepare for analysis.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-lime-600 hover:from-emerald-600 hover:to-lime-700 border-0">Process Data</Button>
            </CardFooter>
          </Card>
        </div>{/* Recent Spreadsheets */}
        <DocumentUploadViewer />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Spreadsheets</h2>
          <p className="text-gray-500 mb-6">You don't have any recent spreadsheets. Create a new spreadsheet to get started.</p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              New Spreadsheet
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Import Data
            </Button>
          </div>        </div>
      </div>
    </ToolsLayout>
  );
};

export default Spreadsheets;
