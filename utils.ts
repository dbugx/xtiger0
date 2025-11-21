// Determines if a file is an image based on its extension.
export const isImageFile = (fileName: string): boolean => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
        case 'webp':
            return true;
        default:
            return false;
    }
}

// Creates a placeholder image as a data URL for mock purposes.
export const getMockImageDataUrl = (fileName:string): string => {
  const canvas = document.createElement('canvas');
  const width = 512;
  const height = 512;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#E0E7FF');
    gradient.addColorStop(1, '#C7D2FE');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Text
    ctx.fillStyle = '#4338CA';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(fileName, width / 2, height / 2 - 15);
    
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#6D28D9';
    ctx.fillText('(Mock Image Preview)', width / 2, height / 2 + 20);

    // Border
    ctx.strokeStyle = '#A5B4FC';
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, width, height);
  }

  return canvas.toDataURL('image/jpeg');
};

// Parses a file size string (e.g., "1.5MB", "200KB") into bytes.
export const parseSize = (sizeStr: string): number => {
    const sizeLower = sizeStr.toLowerCase();
    const value = parseFloat(sizeStr);

    if (isNaN(value)) return 0;

    if (sizeLower.includes('mb')) {
        return value * 1024 * 1024;
    }
    if (sizeLower.includes('kb')) {
        return value * 1024;
    }
    // Assume bytes if no unit or unit is not recognized
    return value;
};


// Generates mock file content for previewing.
export const getMockFileContent = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'md':
      return `# ${fileName}\n\nThis is a sample markdown file.\n\n- List item 1\n- List item 2\n\n\`\`\`javascript\nconsole.log("Hello, World!");\n\`\`\``;
    case 'json':
      return JSON.stringify({
        name: fileName,
        status: "mock_content",
        version: "1.0.0",
        data: {
          items: [1, 2, 3],
          nested: {
            "key": "value"
          }
        }
      }, null, 2);
    case 'txt':
      return `This is the content of ${fileName}.\n\nIt's a plain text file used for demonstration purposes in this application. You can see how the preview pane displays simple text content.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    case 'docx':
    case 'pdf':
       return `This is a mock preview for ${fileName}. Actual document rendering is not supported in this demo.`;
    default:
      return `Content preview is not available for this file type.`;
  }
};