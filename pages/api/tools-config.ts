// filepath: c:\Users\Subhendu Malakar\OneDrive\Youtube\webapp\App_Maker_Test\pages\api\tools-config.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getToolsConfig, ToolsConfig } from '@/utils/toolsConfig';
import fs from 'fs';
import path from 'path';

// These server-side implementations can only be used within API routes
async function updateToolsConfigServer(newConfig: ToolsConfig): Promise<void> {
  const configPath = path.join(process.cwd(), 'src', 'config', 'toolsConfig.json');
  await fs.promises.writeFile(configPath, JSON.stringify(newConfig, null, 2));
}

async function toggleToolServer(toolId: string, enabled: boolean): Promise<void> {
  const config = getToolsConfig();
  let updated = false;
  
  // For premium/regular tools
  if (toolId.indexOf('free-') !== 0 && !toolId.startsWith('free')) {
    // Find the category
    for (const catKey in config.tools.aiTools.categories) {
      const category = config.tools.aiTools.categories[catKey];
      
      // Normalize toolId for matching (remove dashes, lowercase)
      const normalizedId = toolId.replace(/-/g, '').toLowerCase();
      
      // Check each item in the category
      for (const itemKey in category.items) {
        if (itemKey.toLowerCase() === normalizedId) {
          category.items[itemKey] = enabled;
          updated = true;
          break;
        }
      }
      
      if (updated) break;
    }
  } 
  // For free tools
  else {
    // Find the category
    for (const catKey in config.tools.freeAiTools.categories) {
      const category = config.tools.freeAiTools.categories[catKey];
      
      // Convert from free-ai-document to freeAiDocument format
      const normalizedId = toolId
        .replace('free-ai-', '')
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      
      const normalizedItemId = 'freeAi' + normalizedId.charAt(0).toUpperCase() + normalizedId.slice(1);
      
      // Check each item in the category
      for (const itemKey in category.items) {
        if (itemKey === normalizedItemId) {
          category.items[itemKey] = enabled;
          updated = true;
          break;
        }
      }
      
      if (updated) break;
    }
  }
  
  if (updated) {
    await updateToolsConfigServer(config);
  }
}

async function toggleCategoryServer(
  categoryId: string, 
  enabled: boolean, 
  isFreeTools: boolean = false
): Promise<void> {
  const config = getToolsConfig();
  const categoryGroup = isFreeTools ? config.tools.freeAiTools : config.tools.aiTools;
  
  if (categoryGroup.categories[categoryId]) {
    categoryGroup.categories[categoryId].enabled = enabled;
    await updateToolsConfigServer(config);
  }
}

async function toggleSectionServer(
  section: 'aiTools' | 'freeAiTools', 
  enabled: boolean
): Promise<void> {
  const config = getToolsConfig();
  
  if (config.tools[section]) {
    config.tools[section].enabled = enabled;
    await updateToolsConfigServer(config);
  }
}

/**
 * API handler for managing tool configuration
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET and POST requests
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // GET request to retrieve current configuration
  if (req.method === 'GET') {
    try {
      const config = getToolsConfig();
      return res.status(200).json(config);
    } catch (error) {
      console.error('Error getting tools config:', error);
      return res.status(500).json({ error: 'Failed to get tools configuration' });
    }
  }
  
  // POST request to update configuration
  if (req.method === 'POST') {
    // You should implement proper authentication here
    // This is a simplified version - in a real app, verify the user has admin rights
    
    const { action, id, enabled, isFreeTools } = req.body;
    
    if (!action || enabled === undefined) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    try {
      switch (action) {
        case 'toggleTool':
          if (!id) return res.status(400).json({ error: 'Tool ID is required' });
          await toggleToolServer(id, enabled);
          break;
        
        case 'toggleCategory':
          if (!id) return res.status(400).json({ error: 'Category ID is required' });
          await toggleCategoryServer(id, enabled, isFreeTools);
          break;
        
        case 'toggleSection':
          if (!id || (id !== 'aiTools' && id !== 'freeAiTools')) {
            return res.status(400).json({ error: 'Valid section ID is required' });
          }
          await toggleSectionServer(id as 'aiTools' | 'freeAiTools', enabled);
          break;
        
        case 'updateConfig':
          if (!req.body.config) {
            return res.status(400).json({ error: 'Configuration object is required' });
          }
          await updateToolsConfigServer(req.body.config);
          break;
        
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
      
      // Return the updated config
      const updatedConfig = getToolsConfig();
      return res.status(200).json(updatedConfig);
    } catch (error) {
      console.error('Error updating tools config:', error);
      return res.status(500).json({ error: 'Failed to update tools configuration' });
    }
  }
}
