import { useState, useEffect } from 'react';
import { 
  getToolsConfig, 
  isToolEnabled, 
  isCategoryEnabled, 
  isSectionEnabled,
  ToolsConfig
} from '@/utils/toolsConfig';

/**
 * Custom hook to access tools configuration in React components
 */
export function useToolsConfig() {
  const [config, setConfig] = useState<ToolsConfig>(getToolsConfig());
  
  // Check if a tool is enabled
  const checkToolEnabled = (toolId: string): boolean => {
    return isToolEnabled(toolId);
  };
  
  // Check if a tool category is enabled
  const checkCategoryEnabled = (categoryId: string, isFreeTools: boolean = false): boolean => {
    return isCategoryEnabled(categoryId, isFreeTools);
  };
  
  // Check if an entire section is enabled
  const checkSectionEnabled = (section: 'aiTools' | 'freeAiTools'): boolean => {
    return isSectionEnabled(section);
  };
  
  return {
    config,
    isToolEnabled: checkToolEnabled,
    isCategoryEnabled: checkCategoryEnabled,
    isSectionEnabled: checkSectionEnabled
  };
}
