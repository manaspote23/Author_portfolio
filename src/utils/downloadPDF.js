// Utility function for handling PDF downloads
export const downloadPDF = (filename) => {
  // In a real application, this would fetch from your server
  console.log(`Initiating download for: ${filename}`);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = `/assets/pdfs/${filename}`;
  link.download = filename;
  link.target = '_blank';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // For demonstration, you can use a mock download
  // alert(`Downloading: ${filename}\n\nIn a real application, this would download the actual PDF file.`);
};

// Mock PDF data for development
export const mockPDFs = {
  'enchanted-forest-sample.pdf': {
    title: 'The Enchanted Forest - Sample Chapter',
    pages: 15,
    size: '2.4 MB'
  },
  'whispers-ancient-sample.pdf': {
    title: 'Whispers of the Ancient - Sample',
    pages: 12,
    size: '1.8 MB'
  }
};