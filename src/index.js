const fs = require('fs');
const fsp = fs.promises;

async function cat(filePaths, outputFilePath) {
  const outputLines = [];
  for (const filePath of filePaths) {
    try {
      const stat = await fsp.stat(filePath);
      if (stat.isFile()) {
        const content = await fsp.readFile(filePath, 'utf-8');
        outputLines.push(content);
      } else if (stat.isDirectory()) {
        outputLines.push("Is a directory");
      } else {
        outputLines.push("File not found");
      }
    } catch (err) {
      outputLines.push("File not found");
    }
  }
  await fsp.writeFile(outputFilePath, outputLines.join('\n'), 'utf-8');
}
module.exports = { cat };

