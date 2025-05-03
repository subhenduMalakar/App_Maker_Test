
import siteConfig from "@/config/siteConfig.json";

/**
 * Gets a value from the site configuration using dot notation
 * @param path - Path to the configuration value (e.g., "site.title")
 * @param defaultValue - Default value if the path is not found
 */
export function getConfigValue<T>(path: string, defaultValue: T): T {
  const keys = path.split('.');
  let value: any = siteConfig;
  
  try {
    for (const key of keys) {
      value = value[key];
      if (value === undefined) return defaultValue;
    }
    return value as T;
  } catch (error) {
    return defaultValue;
  }
}

/**
 * Updates the site configuration in memory (does not persist to file)
 * Useful for dynamic configuration changes during runtime
 * @param path - Path to the configuration value (e.g., "site.title")
 * @param newValue - New value to set
 */
export function updateConfigValue(path: string, newValue: any): void {
  const keys = path.split('.');
  let current: any = siteConfig;
  
  // Navigate to the proper nesting level
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }
  
  // Set the value
  current[keys[keys.length - 1]] = newValue;
}

export default {
  getConfigValue,
  updateConfigValue
};
