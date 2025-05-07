import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { ToolsConfig } from '@/utils/toolsConfig';

const ToolsConfigPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [config, setConfig] = useState<ToolsConfig | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  
  // Load the initial configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/api/tools-config');
        if (!response.ok) throw new Error('Failed to load configuration');
        
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Error loading tools config:', error);
        setMessage({ type: 'error', text: 'Failed to load configuration' });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConfig();
  }, []);
  
  // Redirect non-authenticated users
  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);
  
  // Function to update a tool's enabled state
  const handleToggleTool = async (id: string, enabled: boolean, isFreeTools: boolean = false) => {
    setIsSaving(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/tools-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggleTool',
          id,
          enabled,
          isFreeTools
        })
      });
      
      if (!response.ok) throw new Error('Failed to update tool');
      
      const data = await response.json();
      setConfig(data);
      setMessage({ type: 'success', text: `Tool "${id}" ${enabled ? 'enabled' : 'disabled'} successfully` });
    } catch (error) {
      console.error('Error updating tool:', error);
      setMessage({ type: 'error', text: 'Failed to update tool' });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Function to update a category's enabled state
  const handleToggleCategory = async (id: string, enabled: boolean, isFreeTools: boolean = false) => {
    setIsSaving(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/tools-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggleCategory',
          id,
          enabled,
          isFreeTools
        })
      });
      
      if (!response.ok) throw new Error('Failed to update category');
      
      const data = await response.json();
      setConfig(data);
      setMessage({ type: 'success', text: `Category "${id}" ${enabled ? 'enabled' : 'disabled'} successfully` });
    } catch (error) {
      console.error('Error updating category:', error);
      setMessage({ type: 'error', text: 'Failed to update category' });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Function to update a section's enabled state
  const handleToggleSection = async (id: 'aiTools' | 'freeAiTools', enabled: boolean) => {
    setIsSaving(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/tools-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggleSection',
          id,
          enabled
        })
      });
      
      if (!response.ok) throw new Error('Failed to update section');
      
      const data = await response.json();
      setConfig(data);
      setMessage({ 
        type: 'success', 
        text: `${id === 'aiTools' ? 'AI Tools' : 'Free AI Tools'} section ${enabled ? 'enabled' : 'disabled'} successfully` 
      });
    } catch (error) {
      console.error('Error updating section:', error);
      setMessage({ type: 'error', text: 'Failed to update section' });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Map from camelCase to display name
  const formatName = (name: string): string => {
    // Convert camelCase to spaces and capitalize each word
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };
  
  if (!user) {
    return <div>Please login to access this page</div>;
  }
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!config) {
    return <div>Configuration not available</div>;
  }
  
  return (
    <Layout>
      <Head>
        <title>Tools Configuration - Admin</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tools Configuration</h1>
        
        {message && (
          <div className={`mb-6 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Tools Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Tools</CardTitle>
                <Switch
                  id="ai-tools-toggle"
                  checked={config.tools.aiTools.enabled}
                  onCheckedChange={(checked) => handleToggleSection('aiTools', checked)}
                  disabled={isSaving}
                />
              </div>
              <CardDescription>
                Configure premium AI tools visibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {/* Document Tools Category */}
                {Object.entries(config.tools.aiTools.categories).map(([categoryKey, category]) => (
                  <AccordionItem key={categoryKey} value={categoryKey}>
                    <AccordionTrigger className="flex justify-between hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>{formatName(categoryKey)}</span>
                        <Switch
                          checked={category.enabled}
                          onCheckedChange={(checked) => handleToggleCategory(categoryKey, checked)}
                          onClick={(e) => e.stopPropagation()}
                          disabled={!config.tools.aiTools.enabled || isSaving}
                        />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {Object.entries(category.items).map(([itemKey, enabled]) => (
                          <div key={itemKey} className="flex items-center justify-between">
                            <Label htmlFor={`${categoryKey}-${itemKey}`} className="cursor-pointer">
                              {formatName(itemKey)}
                            </Label>
                            <Switch
                              id={`${categoryKey}-${itemKey}`}
                              checked={enabled}
                              onCheckedChange={(checked) => handleToggleTool(itemKey, checked)}
                              disabled={!config.tools.aiTools.enabled || !category.enabled || isSaving}
                            />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          
          {/* Free AI Tools Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Free AI Tools</CardTitle>
                <Switch
                  id="free-ai-tools-toggle"
                  checked={config.tools.freeAiTools.enabled}
                  onCheckedChange={(checked) => handleToggleSection('freeAiTools', checked)}
                  disabled={isSaving}
                />
              </div>
              <CardDescription>
                Configure free AI tools visibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {Object.entries(config.tools.freeAiTools.categories).map(([categoryKey, category]) => (
                  <AccordionItem key={categoryKey} value={categoryKey}>
                    <AccordionTrigger className="flex justify-between hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>{formatName(categoryKey)}</span>
                        <Switch
                          checked={category.enabled}
                          onCheckedChange={(checked) => handleToggleCategory(categoryKey, checked, true)}
                          onClick={(e) => e.stopPropagation()}
                          disabled={!config.tools.freeAiTools.enabled || isSaving}
                        />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {Object.entries(category.items).map(([itemKey, enabled]) => (
                          <div key={itemKey} className="flex items-center justify-between">
                            <Label htmlFor={`free-${categoryKey}-${itemKey}`} className="cursor-pointer">
                              {formatName(itemKey)}
                            </Label>
                            <Switch
                              id={`free-${categoryKey}-${itemKey}`}
                              checked={enabled}
                              onCheckedChange={(checked) => handleToggleTool(itemKey, checked, true)}
                              disabled={!config.tools.freeAiTools.enabled || !category.enabled || isSaving}
                            />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ToolsConfigPage;
