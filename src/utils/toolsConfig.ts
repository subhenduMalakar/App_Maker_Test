import toolsConfig from '@/config/toolsConfig.json';

/**
 * Type definitions for tool configuration
 */
export interface ToolItem {
  enabled: boolean;
}

export interface ToolCategory {
  enabled: boolean;
  items: Record<string, boolean>;
}

export interface ToolCategoryGroup {
  enabled: boolean;
  categories: Record<string, ToolCategory>;
}

export interface ToolsConfig {
  tools: {
    aiTools: ToolCategoryGroup;
    freeAiTools: ToolCategoryGroup;
  };
}

/**
 * Get the current tools configuration
 */
export function getToolsConfig(): ToolsConfig {
  return toolsConfig as ToolsConfig;
}

/**
 * Check if a specific tool is enabled
 * @param toolId The ID of the tool to check
 */
export function isToolEnabled(toolId: string): boolean {
  const config = getToolsConfig();
  
  // For premium/regular tools
  if (toolId.indexOf('free-') !== 0 && !toolId.startsWith('free')) {
    // Check if AI Tools are enabled first
    if (!config.tools.aiTools.enabled) return false;
    
    // Find the category and check if it's enabled
    for (const catKey in config.tools.aiTools.categories) {
      const category = config.tools.aiTools.categories[catKey];
      if (!category.enabled) continue;
      
      // Normalize toolId for matching (remove dashes, lowercase)
      const normalizedId = toolId.replace(/-/g, '').toLowerCase();
      
      // Check each item in the category
      for (const itemKey in category.items) {
        if (itemKey.toLowerCase() === normalizedId && category.items[itemKey]) {
          return true;
        }
      }
    }
  } 
  // For free tools
  else {
    // Check if Free AI Tools are enabled first
    if (!config.tools.freeAiTools.enabled) return false;
    
    // Find the category and check if it's enabled
    for (const catKey in config.tools.freeAiTools.categories) {
      const category = config.tools.freeAiTools.categories[catKey];
      if (!category.enabled) continue;
      
      // Convert from free-ai-document to freeAiDocument format
      const normalizedId = toolId
        .replace('free-ai-', '')
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      
      const normalizedItemId = 'freeAi' + normalizedId.charAt(0).toUpperCase() + normalizedId.slice(1);
      
      // Check each item in the category
      for (const itemKey in category.items) {
        if (itemKey === normalizedItemId && category.items[itemKey]) {
          return true;
        }
      }
    }
  }
  
  return false;
}

/**
 * Check if a tool category is enabled
 * @param categoryId The ID of the category to check
 * @param isFreeTools Whether the category is in free tools
 */
export function isCategoryEnabled(categoryId: string, isFreeTools: boolean = false): boolean {
  const config = getToolsConfig();
  const categoryGroup = isFreeTools ? config.tools.freeAiTools : config.tools.aiTools;
  
  if (!categoryGroup.enabled) return false;
  
  return !!categoryGroup.categories[categoryId]?.enabled;
}

/**
 * Check if the entire tool section (AI Tools or Free AI Tools) is enabled
 * @param section 'aiTools' or 'freeAiTools'
 */
export function isSectionEnabled(section: 'aiTools' | 'freeAiTools'): boolean {
  const config = getToolsConfig();
  return config.tools[section].enabled;
}

/**
 * Client-side stub for updating tools config
 * The actual implementation is in the API route
 */
export async function updateToolsConfig(newConfig: ToolsConfig): Promise<void> {
  console.warn('updateToolsConfig is only available server-side');
  return Promise.resolve();
}

/**
 * Client-side stub for toggling tool visibility
 * The actual implementation is in the API route
 */
export async function toggleTool(toolId: string, enabled: boolean): Promise<void> {
  console.warn('toggleTool is only available server-side');
  return Promise.resolve();
}

/**
 * Client-side stub for toggling category visibility
 * The actual implementation is in the API route
 */
export async function toggleCategory(
  categoryId: string, 
  enabled: boolean, 
  isFreeTools: boolean = false
): Promise<void> {
  console.warn('toggleCategory is only available server-side');
  return Promise.resolve();
}

/**
 * Client-side stub for toggling section visibility
 * The actual implementation is in the API route
 */
export async function toggleSection(
  section: 'aiTools' | 'freeAiTools', 
  enabled: boolean
): Promise<void> {
  console.warn('toggleSection is only available server-side');
  return Promise.resolve();
}

export default {
  getToolsConfig,
  isToolEnabled,
  isCategoryEnabled,
  isSectionEnabled,
  updateToolsConfig,
  toggleTool,
  toggleCategory,
  toggleSection
};
