import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Removed dotenv import

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

// --- Data Fetching ---

// Function to read JSON file
const readJsonFile = (filePath) => {
  try {
    const rawData = fs.readFileSync(path.resolve(projectRoot, filePath), 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading JSON file ${filePath}:`, error);
    // Return null or throw error to indicate failure
    return null;
  }
};

// Read site config to get BASE_URL
const siteConfig = readJsonFile('src/config/siteConfig.json');
const BASE_URL = siteConfig?.site?.baseUrl;

if (!BASE_URL) {
  console.error("Error: baseUrl not found in src/config/siteConfig.json under the 'site' object.");
  console.error("Please ensure src/config/siteConfig.json exists and contains a 'site.baseUrl' field.");
  process.exit(1); // Exit if URL is not found
}

const publicDir = path.join(projectRoot, 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

// --- Data Fetching ---

// Function to read TS file and extract data (simple regex approach)
// NOTE: This is a basic approach and might break with complex TS syntax.
// A more robust solution might involve using the TypeScript compiler API or a dedicated parser.
const readDirectoryDataFromTs = (filePath) => {
    try {
        const rawData = fs.readFileSync(path.resolve(projectRoot, filePath), 'utf8');
        // Find the directoryData array assignment
        const match = rawData.match(/export const directoryData: DirectoryItem\[] = (\[[\s\S]*?\]);/);
        if (match && match[1]) {
            // Use Function constructor for safer evaluation than eval()
            // Still carries some risk if the file content is malicious
            const dataArray = new Function(`return ${match[1]}`)();
            return dataArray.map(item => item.id); // Extract only IDs
        }
        console.error(`Could not find or parse directoryData in ${filePath}`);
        return [];
    } catch (error) {
        console.error(`Error reading or parsing TS file ${filePath}:`, error);
        return [];
    }
};


const blogPosts = readJsonFile('src/blog/blogData.json') || []; // Use default empty array if read fails
const directoryIds = readDirectoryDataFromTs('src/data/directoryData.ts');
const staticPages = readJsonFile('src/data/staticPages.json') || []; // Read static pages

// --- URL Generation ---

const staticRoutes = [
  '/',
  '/about',
  '/blog',
  '/favorites',
  // Add other static routes here if needed
];

const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add static routes
staticRoutes.forEach(route => {
  sitemapContent += `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
});

// Add blog post routes
blogPosts.forEach(post => {
  if (post.slug) {
    sitemapContent += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }
});

// Add directory detail routes
directoryIds.forEach(id => {
  sitemapContent += `
  <url>
    <loc>${BASE_URL}/directory/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

// Add static page routes
staticPages.forEach(page => {
  if (page.slug) {
    sitemapContent += `
  <url>
    <loc>${BASE_URL}/page/${page.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority> <!-- Lower priority for static pages -->
  </url>`;
  }
});

sitemapContent += `
</urlset>`;

// --- Write Sitemap File ---

try {
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(sitemapPath, sitemapContent.trim());
  console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
} catch (error) {
  console.error("Error writing sitemap file:", error);
  process.exit(1);
}