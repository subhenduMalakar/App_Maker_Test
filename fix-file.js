const fs = require('fs');
const path = require('path');

// Paths
const originalFilePath = path.join(__dirname, 'src', 'components', 'ToolsLayout.tsx');
const newFilePath = path.join(__dirname, 'src', 'components', 'ToolsLayout.tsx.new2');

// Delete original file if it exists
try {
  if (fs.existsSync(originalFilePath)) {
    fs.unlinkSync(originalFilePath);
    console.log('Deleted original file');
  }
} catch (err) {
  console.error('Error deleting original file:', err);
  process.exit(1);
}

// Copy new file to original location
try {
  const data = fs.readFileSync(newFilePath, 'utf8');
  fs.writeFileSync(originalFilePath, data, 'utf8');
  console.log('Successfully copied new file to original location');
} catch (err) {
  console.error('Error copying file:', err);
  process.exit(1);
}
