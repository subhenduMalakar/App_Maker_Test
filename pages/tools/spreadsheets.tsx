import { NextPage } from 'next';
import Head from 'next/head';
import ToolsLayout from '@/components/ToolsLayout';
import { Table, BarChart2, Database, FileSpreadsheet, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Spreadsheets: NextPage = () => {
  return (
    <ToolsLayout>
      <Head>
        <title>Spreadsheets - AI Tools</title>
        <meta name="description" content="Create, analyze and visualize data with AI spreadsheet tools" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-10">
          <Table className="h-16 w-16 text-green-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">AI Spreadsheet Tools</h1>
          <p className="text-gray-600 max-w-2xl">
            Create powerful spreadsheets with AI assistance. Analyze data, generate insights, 
            and build visualizations automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Data Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-600" />
                Data Analysis
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
              <Button className="w-full">Analyze Data</Button>
            </CardFooter>
          </Card>

          {/* Data Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-green-600" />
                Data Visualization
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
              <Button className="w-full">Create Visuals</Button>
            </CardFooter>
          </Card>

          {/* Data Processing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Data Processing
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
              <Button className="w-full">Process Data</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Spreadsheets */}
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
