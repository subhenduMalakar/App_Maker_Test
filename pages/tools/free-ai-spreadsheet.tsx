import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Table } from "lucide-react";
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

export default function FreeAISpreadsheet() {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('data');
  const [rows, setRows] = useState('10');
  const [columns, setColumns] = useState('5');
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
          <Table className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Free AI Spreadsheet Maker</h1>
            <p className="text-gray-500">Create and analyze data with our free AI spreadsheet generation tools.</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create Your Spreadsheet</CardTitle>
            <CardDescription>
              Describe the data you need, and our AI will generate a formatted spreadsheet for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Spreadsheet Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select spreadsheet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data">Data Table</SelectItem>
                    <SelectItem value="budget">Budget Template</SelectItem>
                    <SelectItem value="schedule">Schedule/Calendar</SelectItem>
                    <SelectItem value="tracker">Tracker</SelectItem>
                    <SelectItem value="inventory">Inventory Management</SelectItem>
                    <SelectItem value="invoice">Invoice Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rows (approx.)</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={rows}
                    onChange={(e) => setRows(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Columns (approx.)</label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={columns}
                    onChange={(e) => setColumns(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  placeholder="Describe the spreadsheet you want to create (e.g., Monthly budget tracker with income and expense categories)"
                  className="min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleGenerate}
                disabled={!description || isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Spreadsheet'}
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
          <h2 className="text-xl font-semibold mb-4">Why Use Our Free AI Spreadsheet Maker?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Pre-Configured Templates</h3>
                <p className="text-gray-600">Save time with professionally designed templates for various needs.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Data Organization</h3>
                <p className="text-gray-600">AI helps structure your data logically with proper formatting and formulas.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">Export Options</h3>
                <p className="text-gray-600">Download your spreadsheet in Excel, CSV, or Google Sheets format.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
