const cache = new Map();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchUrlMetadata = async (url) => {
  const apiKey = process.env.REACT_APP_LINKPREVIEW_API_KEY;
  if (!apiKey) {
    console.error('LinkPreview API key is not set');
    return null;
  }

  // Check cache first
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    await delay(1000); // Wait 1 second between requests
    const response = await fetch(`https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const metadata = {
      title: data.title || '',
      description: data.description || '',
      image: data.image || '',
    };
    
    // Cache the result
    cache.set(url, metadata);
    
    return metadata;
  } catch (error) {
    console.error('Error fetching URL metadata:', error);
    return null;
  }
};

export default fetchUrlMetadata;