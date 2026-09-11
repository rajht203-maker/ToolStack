import { CategoryInfo, ToolItem } from '../types';
import { NEW_SUITES_TOOLS_DATA } from './newSuitesToolsData';
import { HUNDRED_PDF_AND_IMAGE_TOOLS_DATA } from './hundredPdfAndImageToolsData';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, compress, and convert PDF documents securely in your browser.',
    icon: 'FileText',
    gradient: 'from-rose-500 to-red-600'
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Compress, resize, convert, and generate favicons or QR codes in seconds.',
    icon: 'Image',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'text',
    name: 'Text & Content',
    description: 'Count words, convert casing, inspect text diffs, and generate clean slugs.',
    icon: 'Type',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Format JSON, encode Base64, test regex, generate UUIDs, and convert data formats.',
    icon: 'Code2',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'calculator',
    name: 'Calculators',
    description: 'Financial, health, age, discount, EMI, and percentage precision calculators.',
    icon: 'Calculator',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    id: 'converter',
    name: 'Unit Converters',
    description: 'Convert lengths, weights, temperatures, data storage, and color codes.',
    icon: 'ArrowRightLeft',
    gradient: 'from-cyan-500 to-sky-600'
  },
  {
    id: 'security',
    name: 'Security & Keys',
    description: 'Generate high-entropy passwords, compute cryptographic hashes, and validate cards.',
    icon: 'ShieldCheck',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'seo',
    name: 'SEO & Webmaster',
    description: 'Generate robots.txt, XML sitemaps, meta tags, UTM URLs, and preview social cards.',
    icon: 'Globe',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'social',
    name: 'Social & Media',
    description: 'Generate engaging hashtags, profile bios, and copy-ready marketing text.',
    icon: 'Sparkles',
    gradient: 'from-fuchsia-500 to-purple-600'
  },
  {
    id: 'ai',
    name: 'AI & Next-Gen',
    description: 'Prompt engineering, token counters, system prompt builders, and readability analyzers.',
    icon: 'Brain',
    gradient: 'from-indigo-600 to-violet-600'
  }
];

export const TOOLS_DATA: ToolItem[] = [
  // --- PDF TOOLS ---
  {
    id: 'pdf-merge',
    slug: 'pdf-merge',
    name: 'PDF Merge',
    category: 'pdf',
    description: 'Combine multiple PDF files into a single unified document in order.',
    icon: 'Files',
    tags: ['pdf', 'merge', 'combine', 'join', 'documents'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Upload two or more PDF files via the file picker or drag & drop.',
      'Reorder documents using the order arrows if desired.',
      'Click "Merge PDFs" to stitch the pages together.',
      'Download your consolidated PDF file immediately.'
    ],
    faqs: [
      {
        question: 'Are my uploaded PDF documents safe?',
        answer: 'Yes! All merging is performed locally in your browser using WebAssembly and client-side processing. Your files never leave your computer.'
      },
      {
        question: 'Is there a limit on how many PDFs I can merge?',
        answer: 'There is no hard limit. You can merge 2, 5, or 20+ PDF documents easily.'
      }
    ],
    relatedToolIds: ['pdf-split', 'pdf-compress', 'jpg-to-pdf'],
    seoTitle: 'PDF Merge - Combine Multiple PDFs Online for Free | ToolStack',
    seoDescription: 'Merge PDF files online for free. Combine multiple PDFs into a single document in seconds without installing software. 100% private and secure.'
  },
  {
    id: 'pdf-split',
    slug: 'pdf-split',
    name: 'PDF Split',
    category: 'pdf',
    description: 'Extract specific page ranges or split a PDF into separate files.',
    icon: 'Scissors',
    tags: ['pdf', 'split', 'extract', 'pages', 'slice'],
    popular: true,
    howToUse: [
      'Upload the PDF you wish to divide.',
      'Specify page ranges (e.g. "1-3, 5, 7-10") or choose single page extraction.',
      'Click "Split PDF" to generate the target documents.',
      'Download the extracted PDF or ZIP archive.'
    ],
    faqs: [
      {
        question: 'How do I specify multiple page ranges?',
        answer: 'Enter comma-separated ranges like "1-3, 5, 8-12". ToolStack will extract the exact pages.'
      }
    ],
    relatedToolIds: ['pdf-merge', 'pdf-compress', 'pdf-to-jpg'],
    seoTitle: 'PDF Splitter - Extract Pages from PDF Online Free | ToolStack',
    seoDescription: 'Split PDF files online for free. Extract custom page ranges or separate individual pages quickly and securely.'
  },
  {
    id: 'pdf-compress',
    slug: 'pdf-compress',
    name: 'PDF Compress',
    category: 'pdf',
    description: 'Optimize PDF structure and compress content to reduce file size.',
    icon: 'Minimize2',
    tags: ['pdf', 'compress', 'reduce size', 'optimize', 'shrink'],
    trending: true,
    badge: 'Trending',
    howToUse: [
      'Select or drop your PDF document.',
      'Choose your target compression level (High, Balanced, or Light).',
      'Click "Compress PDF" to process.',
      'Inspect the size reduction and download the optimized PDF.'
    ],
    faqs: [
      {
        question: 'Does compressing alter the text content?',
        answer: 'No, compression cleans duplicate metadata streams, optimizes embedded fonts and downsamples high-res imagery while preserving crisp text readability.'
      }
    ],
    relatedToolIds: ['pdf-merge', 'pdf-split', 'image-compressor'],
    seoTitle: 'Compress PDF Online - Free PDF Size Reducer | ToolStack',
    seoDescription: 'Compress PDF documents online for free. Reduce PDF file size without losing readability or quality.'
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    category: 'pdf',
    description: 'Convert PDF pages into high-resolution JPG or PNG images.',
    icon: 'FileImage',
    tags: ['pdf', 'jpg', 'converter', 'export image', 'png'],
    howToUse: [
      'Upload any PDF file.',
      'Select page resolution quality (Standard or High Definition).',
      'Click "Convert to JPG" to rasterize pages.',
      'Download individual images or a complete ZIP package.'
    ],
    faqs: [
      {
        question: 'Can I convert multi-page PDFs?',
        answer: 'Yes! Each page is rendered cleanly onto a high-DPI canvas and exported as a crisp image.'
      }
    ],
    relatedToolIds: ['jpg-to-pdf', 'image-format-converter', 'pdf-split'],
    seoTitle: 'PDF to JPG Converter - Convert PDF to Images Free | ToolStack',
    seoDescription: 'Convert PDF documents into high quality JPG images online for free. Fast, client-side rendering with no data collection.'
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    category: 'pdf',
    description: 'Convert JPG, PNG, and WebP images into a clean, printable PDF document.',
    icon: 'FileOutput',
    tags: ['jpg', 'pdf', 'image to pdf', 'photos to pdf'],
    popular: true,
    howToUse: [
      'Upload one or more image files (JPG, PNG, WebP).',
      'Select page orientation (Portrait, Landscape, or Auto).',
      'Click "Generate PDF" to compile.',
      'Download your PDF instantly.'
    ],
    faqs: [
      {
        question: 'Can I combine multiple photos into one PDF?',
        answer: 'Yes, add as many photos as you want and they will be arranged neatly across pages.'
      }
    ],
    relatedToolIds: ['pdf-merge', 'pdf-to-jpg', 'image-resizer'],
    seoTitle: 'JPG to PDF Converter - Convert Images to PDF Online | ToolStack',
    seoDescription: 'Convert JPG, PNG, and WebP images to PDF document format in seconds. Free, easy to use, and high quality.'
  },

  // --- IMAGE TOOLS ---
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'image',
    description: 'Compress JPG, PNG, and WebP photos with custom quality control and live preview.',
    icon: 'Cpu',
    tags: ['image', 'compress', 'shrink', 'photo size', 'optimize'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Drag and drop an image or click to upload.',
      'Adjust the quality slider (1% to 100%).',
      'Preview the real-time file size comparison (Before vs After).',
      'Download the compressed file.'
    ],
    faqs: [
      {
        question: 'How much file size can I save?',
        answer: 'Typically between 50% and 85% with virtually unnoticeable perceptual visual difference.'
      }
    ],
    relatedToolIds: ['image-resizer', 'image-format-converter', 'favicon-generator'],
    seoTitle: 'Free Image Compressor - Reduce JPG, PNG, WebP Size | ToolStack',
    seoDescription: 'Compress images online without losing quality. Reduce file sizes up to 80% for faster websites and easy sharing.'
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    name: 'Image Resizer',
    category: 'image',
    description: 'Resize images to exact pixel dimensions or scale percentages while preserving aspect ratio.',
    icon: 'Maximize',
    tags: ['image', 'resize', 'dimensions', 'crop', 'scale'],
    popular: true,
    howToUse: [
      'Upload your image.',
      'Enter custom width/height or select standard presets (Instagram, Full HD, Thumbnail).',
      'Toggle "Lock Aspect Ratio" as needed.',
      'Click "Resize Image" and download the result.'
    ],
    faqs: [
      {
        question: 'Will resizing pixelate my image?',
        answer: 'Downscaling preserves extreme sharpness using bi-cubic canvas sampling. Upscaling beyond original dimensions can cause slight softness.'
      }
    ],
    relatedToolIds: ['image-compressor', 'aspect-ratio-calculator', 'favicon-generator'],
    seoTitle: 'Image Resizer - Change Image Dimensions Online Free | ToolStack',
    seoDescription: 'Resize images to exact dimensions in pixels or percentage. Free online image resizer with social media presets.'
  },
  {
    id: 'image-format-converter',
    slug: 'image-format-converter',
    name: 'JPG / PNG / WebP Converter',
    category: 'image',
    description: 'Convert between JPG, PNG, WebP, GIF, and BMP formats instantly.',
    icon: 'RefreshCw',
    tags: ['image', 'converter', 'png to jpg', 'webp to png', 'jpg to webp'],
    trending: true,
    howToUse: [
      'Upload any photo in any standard format.',
      'Select your target output format (JPG, PNG, WebP).',
      'Click "Convert Image".',
      'Download the converted asset.'
    ],
    faqs: [
      {
        question: 'Why convert to WebP?',
        answer: 'WebP provides superior compression and quality characteristics, producing images 25-35% smaller than comparable JPGs and PNGs.'
      }
    ],
    relatedToolIds: ['image-compressor', 'image-resizer', 'favicon-generator'],
    seoTitle: 'Image Converter - Convert JPG, PNG, WebP Online | ToolStack',
    seoDescription: 'Convert images between JPG, PNG, WebP, and other formats instantly in your browser. Fast, free, and no upload limits.'
  },
  {
    id: 'favicon-generator',
    slug: 'favicon-generator',
    name: 'Favicon Generator',
    category: 'image',
    description: 'Generate multi-size web favicons (16x16, 32x32, 48x48, 180x180) from an image or emoji.',
    icon: 'Sparkles',
    tags: ['favicon', 'icon', 'apple-touch-icon', 'ico', 'website icon'],
    recentlyAdded: true,
    badge: 'New',
    howToUse: [
      'Upload a square logo, image, or choose an emoji.',
      'Preview the favicon in a simulated browser tab.',
      'Generate all standard web icon dimensions with matching HTML code.',
      'Download the complete ZIP package containing favicon files and link tags.'
    ],
    faqs: [
      {
        question: 'Which sizes are generated?',
        answer: '16x16, 32x32, 48x48, and 180x180 Apple Touch Icon, plus ready-to-paste HTML header snippets.'
      }
    ],
    relatedToolIds: ['qr-generator', 'meta-tag-generator', 'image-resizer'],
    seoTitle: 'Favicon Generator - Create Website Favicons Free | ToolStack',
    seoDescription: 'Generate complete favicon packages for websites from any image or emoji. Includes HTML snippets and multi-resolution PNGs.'
  },
  {
    id: 'qr-generator',
    slug: 'qr-generator',
    name: 'QR Code Generator',
    category: 'image',
    description: 'Create custom QR codes for URLs, WiFi credentials, plain text, emails, and phone numbers.',
    icon: 'QrCode',
    tags: ['qr code', 'generator', 'wifi qr', 'barcode', 'scan'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Select your QR code type (URL, Plain Text, WiFi Network, Contact vCard).',
      'Enter the destination content.',
      'Customize foreground color, background color, and size.',
      'Download as PNG or SVG, or copy directly to clipboard.'
    ],
    faqs: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No! These are static QR codes that directly encode the raw data. They never expire and work offline forever.'
      }
    ],
    relatedToolIds: ['utm-builder', 'url-encoder', 'bio-generator'],
    seoTitle: 'Free QR Code Generator - Create Custom QR Codes | ToolStack',
    seoDescription: 'Generate custom QR codes for links, text, WiFi passwords, and contacts. Free, high-resolution PNG/SVG downloads.'
  },
  {
    id: 'svg-optimizer',
    slug: 'svg-optimizer',
    name: 'SVG Optimizer & Cleaner',
    category: 'image',
    description: 'Preview, clean bloated SVG files by stripping XML doctypes, metadata, and unused attributes with live preview.',
    icon: 'Layers',
    tags: ['svg', 'vector', 'optimizer', 'clean', 'minify', 'xml', 'image'],
    popular: true,
    trending: false,
    badge: 'Popular',
    howToUse: [
      'Paste raw SVG code or upload an .svg file.',
      'Inspect the live rendered visual vector and size comparison.',
      'Click "Clean & Optimize SVG" to strip comments, redundant spaces, and metadata.',
      'Copy the clean minified code or download the file.'
    ],
    faqs: [
      {
        question: 'Does SVG optimization reduce file size?',
        answer: 'Yes, typically reduces raw vector code size by 20% to 50% without altering visual geometry.'
      },
      {
        question: 'Does this alter the visual appearance of the SVG?',
        answer: 'No, optimization strips non-rendering metadata, editor comments, and redundant spacing while leaving paths and geometry intact.'
      }
    ],
    relatedToolIds: ['favicon-generator', 'image-compressor', 'css-mesh-generator'],
    seoTitle: 'SVG Optimizer & Viewer Online - Clean Vector Graphics | ToolStack',
    seoDescription: 'Clean, inspect, and minify SVG files online. Remove bloated XML metadata and preview vector graphics instantly.'
  },

  // --- TEXT & CONTENT TOOLS ---
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word & Character Counter',
    category: 'text',
    description: 'Real-time word, character, sentence, paragraph, reading time, and keyword density metrics.',
    icon: 'AlignLeft',
    tags: ['word counter', 'character count', 'reading time', 'content analysis'],
    popular: true,
    howToUse: [
      'Type or paste your text into the editor.',
      'View instant live counts of words, characters (with and without spaces), sentences, and paragraphs.',
      'Check estimated speaking and reading time.',
      'Analyze the top keyword frequency table.'
    ],
    faqs: [
      {
        question: 'How is reading time calculated?',
        answer: 'Based on an average adult silent reading speed of 200 to 250 words per minute.'
      }
    ],
    relatedToolIds: ['case-converter', 'diff-checker', 'lorem-ipsum'],
    seoTitle: 'Word Counter - Real-time Character & Sentence Counter | ToolStack',
    seoDescription: 'Count words, characters, sentences, paragraphs, and reading time in real time. Free online text statistics calculator.'
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'text',
    description: 'Transform text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.',
    icon: 'Type',
    tags: ['case converter', 'uppercase', 'camelcase', 'snake_case', 'text formatting'],
    popular: true,
    howToUse: [
      'Enter or paste text into the input field.',
      'Click the button for your desired casing format.',
      'Copy the converted text with one click.'
    ],
    faqs: [
      {
        question: 'What is camelCase vs PascalCase?',
        answer: 'camelCase starts with a lowercase letter (e.g. "myVariableName"), while PascalCase capitalizes all words ("MyVariableName").'
      }
    ],
    relatedToolIds: ['word-counter', 'slug-generator', 'url-encoder'],
    seoTitle: 'Case Converter - Convert UPPERCASE, lowercase, Title Case | ToolStack',
    seoDescription: 'Easily convert text between uppercase, lowercase, sentence case, title case, camelCase, kebab-case, and snake_case.'
  },
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    name: 'URL Slug Generator',
    category: 'text',
    description: 'Convert article titles and headlines into SEO-friendly, URL-safe slugs.',
    icon: 'Link2',
    tags: ['slug', 'url friendly', 'seo url', 'permalink', 'kebab-case'],
    howToUse: [
      'Type your title or headline.',
      'Choose delimiter style (hyphens, underscores) and toggle lowercase/strip accents.',
      'Get an instant sanitized slug ready for CMS or markdown permalinks.'
    ],
    faqs: [
      {
        question: 'What makes a slug SEO-friendly?',
        answer: 'Short, lowercase words separated by single hyphens, stripped of punctuation, numbers, and stop words.'
      }
    ],
    relatedToolIds: ['case-converter', 'meta-tag-generator', 'utm-builder'],
    seoTitle: 'URL Slug Generator - Create SEO Friendly Permalinks | ToolStack',
    seoDescription: 'Generate clean, URL-safe slugs from article titles and headers. Optimize permalinks for blogs and websites.'
  },
  {
    id: 'lorem-ipsum',
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    category: 'text',
    description: 'Generate customizable dummy placeholder text by paragraphs, sentences, or word counts.',
    icon: 'FileCode',
    tags: ['lorem ipsum', 'placeholder', 'dummy text', 'filler text'],
    howToUse: [
      'Select count type (Paragraphs, Words, Sentences, or Lists).',
      'Set the desired quantity.',
      'Toggle whether to start with standard "Lorem ipsum dolor sit amet...".',
      'Copy the generated placeholder text.'
    ],
    faqs: [
      {
        question: 'Where does Lorem Ipsum come from?',
        answer: 'It originates from sections 1.10.32 and 1.10.33 of Cicero\'s "de Finibus Bonorum et Malorum", written in 45 BC.'
      }
    ],
    relatedToolIds: ['word-counter', 'case-converter', 'markdown-previewer'],
    seoTitle: 'Lorem Ipsum Generator - Generate Placeholder Dummy Text | ToolStack',
    seoDescription: 'Generate custom Lorem Ipsum filler text in paragraphs, sentences, or words. Perfect for web design mockups and prototypes.'
  },
  {
    id: 'diff-checker',
    slug: 'diff-checker',
    name: 'Text Difference Checker',
    category: 'text',
    description: 'Compare two text blocks side-by-side or inline to highlight additions, deletions, and modifications.',
    icon: 'GitCompare',
    tags: ['diff', 'compare text', 'difference checker', 'text compare'],
    trending: true,
    howToUse: [
      'Paste original text in the left panel.',
      'Paste revised or modified text in the right panel.',
      'Inspect highlighted additions (green) and deletions (red).',
      'Switch between split view and unified inline view.'
    ],
    faqs: [
      {
        question: 'Is this suitable for code comparisons?',
        answer: 'Yes! It provides line-by-line and character-level diff highlighting for code, markdown, and prose.'
      }
    ],
    relatedToolIds: ['word-counter', 'json-formatter', 'regex-tester'],
    seoTitle: 'Text Diff Checker - Compare Two Texts Online Free | ToolStack',
    seoDescription: 'Compare two text fragments or code snippets to find differences, additions, and deletions online for free.'
  },
  {
    id: 'morse-code',
    slug: 'morse-code',
    name: 'Morse Code Translator',
    category: 'text',
    description: 'Translate text to Morse code dots & dashes and decode Morse back to plain English with audio playback.',
    icon: 'Radio',
    tags: ['morse code', 'translator', 'dots and dashes', 'cipher'],
    howToUse: [
      'Type plain text or enter Morse code (. and -).',
      'Toggle translation direction.',
      'Listen to real synthesized Morse audio beeps with play/pause.',
      'Copy output.'
    ],
    faqs: [
      {
        question: 'What is standard Morse code timing?',
        answer: 'A dash is three times the duration of a dot. Spaces between letters are 3 dots; between words are 7 dots.'
      }
    ],
    relatedToolIds: ['binary-text', 'base64-encoder', 'hash-generator'],
    seoTitle: 'Morse Code Translator & Audio Player Online | ToolStack',
    seoDescription: 'Translate text to Morse code and Morse code back to text. Features real audio synthesizer playback.'
  },
  {
    id: 'binary-text',
    slug: 'binary-text',
    name: 'Binary to Text Converter',
    category: 'text',
    description: 'Convert between ASCII English text and 8-bit binary numbers (0s and 1s).',
    icon: 'Binary',
    tags: ['binary', 'text to binary', 'binary converter', 'ascii'],
    howToUse: [
      'Enter plain text or 8-bit binary strings separated by spaces.',
      'Click "Convert" to see immediate reciprocal results.',
      'Copy output with one click.'
    ],
    faqs: [
      {
        question: 'What format should binary be in?',
        answer: 'Space-separated 8-bit bytes (e.g., "01001000 01100101 01101100 01101100 01101111" = Hello).'
      }
    ],
    relatedToolIds: ['base64-encoder', 'morse-code', 'hex-converter'],
    seoTitle: 'Binary to Text & Text to Binary Converter | ToolStack',
    seoDescription: 'Convert text to binary and binary code back to text with this free, fast online binary translator.'
  },

  // --- DEVELOPER & DATA TOOLS ---
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'developer',
    description: 'Format, validate, beautify, and minify JSON payloads with syntax error detection.',
    icon: 'Braces',
    tags: ['json', 'formatter', 'validator', 'beautify', 'minify', 'parser'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Paste your raw JSON into the editor.',
      'Click "Format JSON" to beautify with 2 or 4 space indentation.',
      'Click "Minify" to strip all unnecessary whitespace.',
      'Detect syntax errors with exact line and column locations.'
    ],
    faqs: [
      {
        question: 'Can this fix malformed JSON?',
        answer: 'It pinpoints exact syntax errors like trailing commas, missing quotes, or mismatched braces.'
      }
    ],
    relatedToolIds: ['csv-to-json', 'base64-encoder', 'regex-tester'],
    seoTitle: 'JSON Formatter & Validator - Beautify JSON Online | ToolStack',
    seoDescription: 'Format, beautify, validate, and minify JSON online. Instant syntax checking, tree view, and error pinpointing.'
  },
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    name: 'Base64 Encoder / Decoder',
    category: 'developer',
    description: 'Encode plain text and files to Base64 strings or decode Base64 back to text.',
    icon: 'Code',
    tags: ['base64', 'encoder', 'decoder', 'ascii', 'utf-8'],
    popular: true,
    howToUse: [
      'Choose "Encode" or "Decode" mode.',
      'Enter or paste your text or upload a small file.',
      'View instant encoded/decoded output.',
      'Copy output or download.'
    ],
    faqs: [
      {
        question: 'Does Base64 encrypt data?',
        answer: 'No! Base64 is an encoding scheme, not encryption. Anyone can decode it back to plain text.'
      }
    ],
    relatedToolIds: ['url-encoder', 'hash-generator', 'json-formatter'],
    seoTitle: 'Base64 Encode & Decode Online - Fast & Free | ToolStack',
    seoDescription: 'Encode plain text and data to Base64 format or decode Base64 strings back to text. 100% private and client-side.'
  },
  {
    id: 'url-encoder',
    slug: 'url-encoder',
    name: 'URL Encoder / Decoder',
    category: 'developer',
    description: 'Encode special characters for URL query strings (RFC 3986) or decode percent-encoded URLs.',
    icon: 'ExternalLink',
    tags: ['url encoder', 'percent encoding', 'url decode', 'uri component'],
    popular: true,
    howToUse: [
      'Type or paste your URL or query parameter.',
      'Select "Encode" or "Decode".',
      'Toggle standard encodeURI vs encodeURIComponent for strict parameter escaping.',
      'Copy the transformed URL.'
    ],
    faqs: [
      {
        question: 'When should I use encodeURIComponent?',
        answer: 'When encoding individual query string keys or values containing reserved characters like &, =, or ?.'
      }
    ],
    relatedToolIds: ['utm-builder', 'base64-encoder', 'slug-generator'],
    seoTitle: 'URL Encoder & Decoder - Percent Encode URLs Online | ToolStack',
    seoDescription: 'Encode and decode URLs and URI components online. Cleanly escape query parameters and unsafe URL characters.'
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    category: 'developer',
    description: 'Generate cryptographically random UUID v4 and v1 identifiers in bulk.',
    icon: 'Key',
    tags: ['uuid', 'guid', 'unique id', 'uuid v4', 'random id'],
    popular: true,
    howToUse: [
      'Choose quantity (1 to 100 UUIDs).',
      'Toggle formatting options: uppercase, hyphens, and brackets.',
      'Click "Generate UUIDs".',
      'Copy individual UUIDs or the entire batch.'
    ],
    faqs: [
      {
        question: 'Are UUIDs guaranteed to be unique?',
        answer: 'UUID v4 uses 122 bits of cryptographic randomness. The probability of collision is statistically negligible (1 in billions of years).'
      }
    ],
    relatedToolIds: ['password-generator', 'hash-generator', 'random-number-generator'],
    seoTitle: 'UUID Generator - Generate UUID v4 & GUID Online Free | ToolStack',
    seoDescription: 'Generate random, cryptographically secure UUIDs (v4) and GUIDs online. Bulk generation with custom formatting.'
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    name: 'Regex Tester & Debugger',
    category: 'developer',
    description: 'Test JavaScript regular expressions against test strings with live match highlighting and explanation.',
    icon: 'Terminal',
    tags: ['regex', 'regular expression', 'regex tester', 'pattern match'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Type your regular expression pattern (e.g. `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`).',
      'Select regex flags: Global (g), Case Insensitive (i), Multiline (m).',
      'Enter test strings to test against.',
      'View highlighted matches, capture groups, and match counts in real time.'
    ],
    faqs: [
      {
        question: 'Which regex engine is used?',
        answer: 'The standard ECMAScript / JavaScript regular expression engine running directly in your browser.'
      }
    ],
    relatedToolIds: ['json-formatter', 'diff-checker', 'word-counter'],
    seoTitle: 'Regex Tester Online - Test Regular Expressions Live | ToolStack',
    seoDescription: 'Test and debug JavaScript regular expressions online with real-time match highlighting, group extraction, and flags.'
  },
  {
    id: 'csv-to-json',
    slug: 'csv-to-json',
    name: 'CSV to JSON Converter',
    category: 'developer',
    description: 'Convert delimited CSV and TSV spreadsheets into structured JSON arrays and objects.',
    icon: 'FileSpreadsheet',
    tags: ['csv to json', 'convert csv', 'data converter', 'tsv'],
    howToUse: [
      'Paste your CSV content or upload a .csv file.',
      'Choose delimiter (comma, semicolon, tab).',
      'Toggle options like "Parse numbers and booleans" or "First row is header".',
      'Copy the resulting JSON or download as a .json file.'
    ],
    faqs: [
      {
        question: 'Does it handle commas inside quoted strings?',
        answer: 'Yes, it follows RFC 4180 rules for escaping commas inside quotes.'
      }
    ],
    relatedToolIds: ['json-to-csv', 'json-formatter', 'sql-formatter'],
    seoTitle: 'CSV to JSON Converter Online - Free Data Tool | ToolStack',
    seoDescription: 'Convert CSV spreadsheet data into formatted JSON arrays online. Fast, browser-based, and supports custom delimiters.'
  },
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    name: 'JSON to CSV Converter',
    category: 'developer',
    description: 'Flatten and export JSON arrays into download-ready CSV spreadsheets.',
    icon: 'Table',
    tags: ['json to csv', 'export csv', 'json converter', 'excel export'],
    howToUse: [
      'Paste your JSON array of objects.',
      'Click "Convert to CSV".',
      'Preview the parsed table.',
      'Download as CSV or copy to clipboard.'
    ],
    faqs: [
      {
        question: 'Can it convert nested JSON objects?',
        answer: 'Yes, nested keys are flattened using dot notation (e.g. user.address.city).'
      }
    ],
    relatedToolIds: ['csv-to-json', 'json-formatter', 'sql-formatter'],
    seoTitle: 'JSON to CSV Converter - Export JSON to Spreadsheet | ToolStack',
    seoDescription: 'Convert JSON data to CSV files online for free. Export JSON tables into Excel-ready CSV spreadsheets with one click.'
  },
  {
    id: 'sql-formatter',
    slug: 'sql-formatter',
    name: 'SQL Query Formatter',
    category: 'developer',
    description: 'Format, beautify, and indent complex SQL queries with uppercase keywords and syntax cleanliness.',
    icon: 'Database',
    tags: ['sql', 'formatter', 'beautify sql', 'database query', 'postgresql', 'mysql'],
    popular: true,
    trending: true,
    badge: 'Hot',
    howToUse: [
      'Paste unformatted or minified SQL queries.',
      'Adjust indentation spacing and toggle uppercase keywords.',
      'Click "Format & Capitalize SQL" or view beautified output.',
      'Copy clean query for database migrations or code.'
    ],
    faqs: [
      {
        question: 'Which keywords are capitalized?',
        answer: 'SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, HAVING, INSERT, UPDATE, DELETE, and all standard ANSI/PostgreSQL/MySQL reserved words.'
      }
    ],
    relatedToolIds: ['json-formatter', 'curl-converter', 'diff-checker'],
    seoTitle: 'SQL Formatter Online - Beautify & Clean SQL Queries | ToolStack',
    seoDescription: 'Format, beautify, and indent SQL queries online. Standardize SQL syntax, capitalize keywords, and clean query layout.'
  },
  {
    id: 'css-minifier',
    slug: 'css-minifier',
    name: 'CSS Minifier & Beautifier',
    category: 'developer',
    description: 'Compress stylesheet size by stripping comments and whitespace or beautify compact CSS.',
    icon: 'Code2',
    tags: ['css minifier', 'minify css', 'beautify css', 'web performance'],
    howToUse: [
      'Paste CSS stylesheets.',
      'Choose "Minify" to compact or "Beautify" to indent.',
      'Inspect before vs after byte savings.',
      'Copy or download minified CSS.'
    ],
    faqs: [
      {
        question: 'Does minifying break styles?',
        answer: 'No, minification safely removes comments, redundant spaces, and trailing semicolons without affecting CSS cascade logic.'
      }
    ],
    relatedToolIds: ['html-minifier', 'svg-optimizer', 'json-formatter'],
    seoTitle: 'CSS Minifier - Minify & Beautify CSS Stylesheets | ToolStack',
    seoDescription: 'Minify CSS files online to reduce load times and improve Core Web Vitals. Free and fast client-side CSS compression.'
  },
  {
    id: 'html-minifier',
    slug: 'html-minifier',
    name: 'HTML Minifier & Formatter',
    category: 'developer',
    description: 'Strip HTML comments, collapse whitespace, and compress HTML documents.',
    icon: 'FileCode2',
    tags: ['html minifier', 'minify html', 'html formatter', 'web dev'],
    howToUse: [
      'Paste HTML markup.',
      'Toggle options: remove comments, collapse whitespaces.',
      'Click "Process HTML".',
      'Copy clean output.'
    ],
    faqs: [
      {
        question: 'Does this remove script and style content?',
        answer: 'It preserves inline scripts and styles while trimming redundant spaces around HTML elements.'
      }
    ],
    relatedToolIds: ['css-minifier', 'svg-optimizer', 'json-formatter'],
    seoTitle: 'HTML Minifier - Compress HTML Markup Online | ToolStack',
    seoDescription: 'Minify HTML documents online for free. Remove comments, compress whitespace, and speed up page load speeds.'
  },
  {
    id: 'timestamp-converter',
    slug: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    category: 'developer',
    description: 'Convert Unix epoch timestamps (seconds and milliseconds) to human-readable dates in multiple timezones.',
    icon: 'Clock',
    tags: ['unix timestamp', 'epoch', 'epoch converter', 'date time'],
    popular: true,
    howToUse: [
      'Enter an epoch timestamp (e.g. 1772635200) or choose a calendar date.',
      'View instant conversions in UTC, local time, ISO 8601, and relative format (e.g. "in 3 months").',
      'Click "Current Timestamp" to get right now in seconds and milliseconds.'
    ],
    faqs: [
      {
        question: 'What is a Unix epoch timestamp?',
        answer: 'The total number of seconds that have elapsed since midnight Coordinated Universal Time (UTC) on January 1, 1970.'
      }
    ],
    relatedToolIds: ['uuid-generator', 'base64-encoder', 'age-calculator'],
    seoTitle: 'Unix Timestamp Converter - Epoch to Human Date Online | ToolStack',
    seoDescription: 'Convert Unix timestamps to human-readable dates and human dates to epoch time in seconds and milliseconds.'
  },
  {
    id: 'http-headers',
    slug: 'http-headers',
    name: 'HTTP Headers Inspector',
    category: 'developer',
    description: 'Inspect, explain, and validate standard HTTP response and security headers.',
    icon: 'Network',
    tags: ['http headers', 'security headers', 'cors', 'csp', 'hsts'],
    howToUse: [
      'Paste raw HTTP header blocks or select a preset (e.g. Strict Security, Cache Control).',
      'View explanations of each header (CSP, HSTS, X-Frame-Options, Cache-Control).',
      'Check for missing recommended security headers.'
    ],
    faqs: [
      {
        question: 'Why are security headers important?',
        answer: 'Headers like Content-Security-Policy and HSTS guard against cross-site scripting (XSS), clickjacking, and man-in-the-middle attacks.'
      }
    ],
    relatedToolIds: ['url-encoder', 'utm-builder', 'json-formatter'],
    seoTitle: 'HTTP Header Analyzer & Security Header Inspector | ToolStack',
    seoDescription: 'Analyze HTTP headers, check for security recommendations (CSP, HSTS, X-Frame), and understand caching directives.'
  },

  // --- CALCULATORS ---
  {
    id: 'emi-calculator',
    slug: 'emi-calculator',
    name: 'Loan EMI Calculator',
    category: 'calculator',
    description: 'Calculate monthly home, car, or personal loan EMIs with total interest and amortization breakdown.',
    icon: 'Landmark',
    tags: ['emi calculator', 'loan calculator', 'interest calculator', 'mortgage', 'finance'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Enter total loan principal amount.',
      'Input the annual interest rate (%).',
      'Specify loan tenure in years or months.',
      'Get instant monthly EMI, total interest payable, and total amount.'
    ],
    faqs: [
      {
        question: 'What formula is used for EMI calculation?',
        answer: 'EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is tenure in months.'
      }
    ],
    relatedToolIds: ['compound-interest', 'gst-calculator', 'percentage-calculator'],
    seoTitle: 'Loan EMI Calculator - Calculate Monthly EMIs Free | ToolStack',
    seoDescription: 'Calculate monthly loan EMIs for home, car, or personal loans. Visual interest-to-principal breakdown and repayment schedules.'
  },
  {
    id: 'gst-calculator',
    slug: 'gst-calculator',
    name: 'GST / VAT Calculator',
    category: 'calculator',
    description: 'Add or remove GST / VAT from any amount with standard tax slab percentages.',
    icon: 'Receipt',
    tags: ['gst calculator', 'vat calculator', 'tax calculator', 'sales tax'],
    popular: true,
    howToUse: [
      'Enter net or gross amount.',
      'Select or type GST percentage rate (e.g. 5%, 12%, 18%, 28%).',
      'Choose "Exclusive" (add GST) or "Inclusive" (extract GST).',
      'View the exact tax amount and final total.'
    ],
    faqs: [
      {
        question: 'How to calculate GST inclusive amount?',
        answer: 'GST Amount = Value - [Value / (1 + Rate / 100)].'
      }
    ],
    relatedToolIds: ['sales-tax-calculator', 'discount-calculator', 'percentage-calculator'],
    seoTitle: 'GST Calculator Online - Add or Remove GST Free | ToolStack',
    seoDescription: 'Calculate Goods and Services Tax (GST) and VAT amounts easily. Add or remove tax with one click for any rate.'
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'calculator',
    description: 'Calculate percentage of a number, percentage increase/decrease, and proportion ratios.',
    icon: 'Percent',
    tags: ['percentage calculator', 'percent increase', 'percentage change', 'math'],
    popular: true,
    howToUse: [
      'Select calculation mode: "What is X% of Y?", "X is what % of Y?", or "% Increase/Decrease from X to Y".',
      'Input the values.',
      'Get instant results with step-by-step mathematical explanation.'
    ],
    faqs: [
      {
        question: 'How do you calculate percentage increase?',
        answer: 'Subtract the old value from the new value, divide by the absolute old value, and multiply by 100.'
      }
    ],
    relatedToolIds: ['discount-calculator', 'gst-calculator', 'emi-calculator'],
    seoTitle: 'Percentage Calculator - Calculate Percentages Easily | ToolStack',
    seoDescription: 'Free online percentage calculator. Find percentage changes, percentage of a number, and fractional proportions quickly.'
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Exact Age Calculator',
    category: 'calculator',
    description: 'Calculate your exact age in years, months, days, hours, and find upcoming birthday milestones.',
    icon: 'Calendar',
    tags: ['age calculator', 'date of birth', 'exact age', 'birthday countdown'],
    popular: true,
    howToUse: [
      'Select your birth date.',
      'Choose comparison date (defaults to today).',
      'Get your exact chronological age in years, months, days, plus total weeks, hours, and minutes lived.',
      'See countdown to next birthday.'
    ],
    faqs: [
      {
        question: 'Does this account for leap years?',
        answer: 'Yes! All calendar calculations strictly account for leap years and varying month lengths.'
      }
    ],
    relatedToolIds: ['bmi-calculator', 'timestamp-converter', 'percentage-calculator'],
    seoTitle: 'Age Calculator - Calculate Exact Age in Years, Days | ToolStack',
    seoDescription: 'Calculate your exact age online in years, months, days, minutes, and seconds. Free, accurate birthday calculator.'
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    name: 'BMI Health Calculator',
    category: 'calculator',
    description: 'Calculate Body Mass Index (BMI) for adults and check WHO weight category classification.',
    icon: 'Activity',
    tags: ['bmi calculator', 'body mass index', 'health', 'fitness', 'weight'],
    popular: true,
    howToUse: [
      'Choose Metric (cm / kg) or Imperial (feet/inches / lbs) units.',
      'Enter your height and weight.',
      'Get instant BMI score with visual scale indicator (Underweight, Normal, Overweight, Obese).',
      'View recommended healthy weight range for your height.'
    ],
    faqs: [
      {
        question: 'What is a normal BMI range according to WHO?',
        answer: 'A BMI between 18.5 and 24.9 is considered the normal, healthy adult weight range.'
      }
    ],
    relatedToolIds: ['age-calculator', 'weight-converter', 'unit-converter'],
    seoTitle: 'BMI Calculator - Free Body Mass Index Calculator | ToolStack',
    seoDescription: 'Calculate your Body Mass Index (BMI) online. Support for metric and imperial units with WHO health categories.'
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    name: 'Discount & Savings Calculator',
    category: 'calculator',
    description: 'Calculate final sale prices, discount amounts, and total savings with optional tax calculation.',
    icon: 'Tag',
    tags: ['discount calculator', 'sale price', 'savings', 'shopping calculator'],
    howToUse: [
      'Enter original retail price.',
      'Input discount percentage or fixed amount off.',
      'Optionally add sales tax percentage.',
      'View final price to pay and total money saved.'
    ],
    faqs: [
      {
        question: 'Can I calculate double discounts (e.g. 20% + 10% off)?',
        answer: 'Yes, enter cumulative or sequential discount percentages easily.'
      }
    ],
    relatedToolIds: ['percentage-calculator', 'sales-tax-calculator', 'gst-calculator'],
    seoTitle: 'Discount Calculator - Calculate Sale Price & Savings | ToolStack',
    seoDescription: 'Find out exact sale prices and savings after discounts and sales tax. Free shopping and price reduction calculator.'
  },
  {
    id: 'compound-interest',
    slug: 'compound-interest',
    name: 'Compound Interest Calculator',
    category: 'calculator',
    description: 'Simulate wealth growth with compound interest, regular monthly contributions, and compounding frequencies.',
    icon: 'TrendingUp',
    tags: ['compound interest', 'investment calculator', 'savings growth', 'roi'],
    trending: true,
    badge: 'Trending',
    howToUse: [
      'Enter initial investment principal.',
      'Set monthly or yearly additional contribution.',
      'Input annual interest rate and investment duration in years.',
      'Choose compounding frequency (annually, quarterly, monthly).',
      'Inspect final future balance and total interest earned.'
    ],
    faqs: [
      {
        question: 'What is the power of compound interest?',
        answer: 'Compound interest generates earnings not just on the principal, but also on the accumulated interest from previous periods.'
      }
    ],
    relatedToolIds: ['emi-calculator', 'percentage-calculator', 'discount-calculator'],
    seoTitle: 'Compound Interest Calculator - Calculate Investment Growth | ToolStack',
    seoDescription: 'Calculate compound interest and investment growth with monthly contributions. Visual future value calculator.'
  },
  {
    id: 'tip-calculator',
    slug: 'tip-calculator',
    name: 'Tip & Bill Split Calculator',
    category: 'calculator',
    description: 'Calculate restaurant tips, total bills, and split the cost evenly among multiple people.',
    icon: 'Utensils',
    tags: ['tip calculator', 'split bill', 'restaurant tip', 'bill splitter'],
    howToUse: [
      'Enter total bill amount before tip.',
      'Select tip percentage preset (10%, 15%, 18%, 20%) or enter custom %.',
      'Specify number of people sharing the bill.',
      'Get exact tip amount, total bill, and cost per person.'
    ],
    faqs: [
      {
        question: 'What is the standard tipping rate?',
        answer: 'In North America, 15% to 20% is standard for full dining service; 10% for casual counter service.'
      }
    ],
    relatedToolIds: ['discount-calculator', 'sales-tax-calculator', 'percentage-calculator'],
    seoTitle: 'Tip Calculator - Split Restaurant Bills Online | ToolStack',
    seoDescription: 'Calculate tips and split the bill among dining guests quickly and accurately. Free online tip calculator.'
  },
  {
    id: 'sales-tax-calculator',
    slug: 'sales-tax-calculator',
    name: 'Sales Tax Calculator',
    category: 'calculator',
    description: 'Compute sales tax, pre-tax cost, and total purchase prices.',
    icon: 'DollarSign',
    tags: ['sales tax', 'tax calculator', 'state tax', 'checkout price'],
    howToUse: [
      'Enter pre-tax amount.',
      'Input local or state sales tax percentage rate.',
      'View tax owed and final total price.'
    ],
    faqs: [
      {
        question: 'Does this work for any country/state?',
        answer: 'Yes! Simply enter your specific local municipal or state tax rate.'
      }
    ],
    relatedToolIds: ['gst-calculator', 'discount-calculator', 'tip-calculator'],
    seoTitle: 'Sales Tax Calculator - Calculate Total Tax & Price | ToolStack',
    seoDescription: 'Calculate sales tax and total purchase cost online. Free and easy-to-use tax rate calculator.'
  },
  {
    id: 'aspect-ratio-calculator',
    slug: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    category: 'calculator',
    description: 'Calculate dimension scaling and aspect ratios (16:9, 4:3, 1:1, 21:9) for screens, images, and videos.',
    icon: 'Ratio',
    tags: ['aspect ratio', 'screen ratio', '16:9', 'dimensions', 'video scaling'],
    howToUse: [
      'Enter width and height of an image or video.',
      'View simplified ratio (e.g. 16:9, 4:3, 3:2).',
      'Change one dimension to auto-calculate the matching proportion.'
    ],
    faqs: [
      {
        question: 'What is the most common video aspect ratio?',
        answer: '16:9 (1920x1080 Full HD, 3840x2160 4K) is the global standard for monitors, TVs, and YouTube.'
      }
    ],
    relatedToolIds: ['image-resizer', 'image-compressor', 'unit-converter'],
    seoTitle: 'Aspect Ratio Calculator - Calculate Dimensions Online | ToolStack',
    seoDescription: 'Calculate and resize image and video aspect ratios (16:9, 4:3, 21:9). Maintain proportions effortlessly.'
  },

  // --- CONVERTERS ---
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Multi-Unit Converter',
    category: 'converter',
    description: 'All-in-one converter for length, mass, temperature, speed, area, volume, and data.',
    icon: 'ArrowRightLeft',
    tags: ['unit converter', 'metric imperial', 'measurements', 'conversion'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Select conversion category (Length, Weight, Speed, Volume).',
      'Pick the source unit and target unit.',
      'Enter the numerical value to convert.',
      'Copy the converted result.'
    ],
    faqs: [
      {
        question: 'How accurate are the conversion factors?',
        answer: 'All calculations use international SI measurement definitions with floating-point precision.'
      }
    ],
    relatedToolIds: ['temperature-converter', 'length-converter', 'weight-converter'],
    seoTitle: 'Unit Converter Online - Convert Metric & Imperial Units | ToolStack',
    seoDescription: 'Free online unit converter for length, mass, temperature, speed, and volume. Instant, accurate calculations.'
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    name: 'Temperature Converter',
    category: 'converter',
    description: 'Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K) with instant formula display.',
    icon: 'Thermometer',
    tags: ['temperature converter', 'celsius to fahrenheit', 'kelvin', 'weather'],
    popular: true,
    howToUse: [
      'Type any temperature value.',
      'Select starting unit (°C, °F, or K).',
      'See reciprocal values across all scales simultaneously with formula steps.'
    ],
    faqs: [
      {
        question: 'What temperature is the same in Celsius and Fahrenheit?',
        answer: '-40 degrees (-40°C = -40°F).'
      }
    ],
    relatedToolIds: ['unit-converter', 'length-converter', 'weight-converter'],
    seoTitle: 'Temperature Converter - Celsius, Fahrenheit & Kelvin | ToolStack',
    seoDescription: 'Convert between Celsius, Fahrenheit, and Kelvin temperature scales instantly. Includes conversion formulas.'
  },
  {
    id: 'length-converter',
    slug: 'length-converter',
    name: 'Length & Distance Converter',
    category: 'converter',
    description: 'Convert millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.',
    icon: 'Ruler',
    tags: ['length converter', 'distance converter', 'meters to feet', 'miles to km'],
    howToUse: [
      'Enter distance value.',
      'Select input and target measurement units.',
      'View instant precision result.'
    ],
    faqs: [
      {
        question: 'How many feet are in a meter?',
        answer: '1 meter is equal to approximately 3.28084 feet.'
      }
    ],
    relatedToolIds: ['unit-converter', 'weight-converter', 'temperature-converter'],
    seoTitle: 'Length Converter - Convert Meters, Feet, Inches, Miles | ToolStack',
    seoDescription: 'Convert lengths and distances between metric and imperial systems. Fast, free online length calculator.'
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    name: 'Weight & Mass Converter',
    category: 'converter',
    description: 'Convert milligrams, grams, kilograms, metric tons, ounces, pounds, and stone.',
    icon: 'Scale',
    tags: ['weight converter', 'mass converter', 'kg to lbs', 'grams to ounces'],
    howToUse: [
      'Enter weight value.',
      'Choose source unit (e.g. Kilograms) and destination unit (e.g. Pounds).',
      'Copy the converted result.'
    ],
    faqs: [
      {
        question: 'How many pounds are in 1 kilogram?',
        answer: '1 kilogram is approximately equal to 2.20462 pounds.'
      }
    ],
    relatedToolIds: ['unit-converter', 'bmi-calculator', 'length-converter'],
    seoTitle: 'Weight Converter - Convert Kilograms, Pounds, Ounces | ToolStack',
    seoDescription: 'Convert weights and masses between grams, kilograms, pounds, and ounces online for free.'
  },
  {
    id: 'data-storage-converter',
    slug: 'data-storage-converter',
    name: 'Data Storage Converter',
    category: 'converter',
    description: 'Convert bits, bytes, KB, MB, GB, TB, and PB in both decimal (1000) and binary (1024 KiB) formats.',
    icon: 'HardDrive',
    tags: ['data converter', 'mb to gb', 'bytes converter', 'terabytes'],
    howToUse: [
      'Enter data size.',
      'Select starting unit (Bytes, KB, MB, GB, TB).',
      'Toggle 1000 standard (SI) or 1024 standard (IEC / KiB).',
      'View comprehensive comparison across all data levels.'
    ],
    faqs: [
      {
        question: 'Why is a 1TB hard drive only 931GB on Windows?',
        answer: 'Drive manufacturers use decimal (1,000,000,000,000 bytes = 1TB), while Windows calculates in binary GiB (1024^3), yielding ~931.3 GiB.'
      }
    ],
    relatedToolIds: ['unit-converter', 'binary-text', 'base64-encoder'],
    seoTitle: 'Data Storage Converter - Convert KB, MB, GB, TB, PB | ToolStack',
    seoDescription: 'Convert digital storage sizes between bytes, megabytes, gigabytes, and terabytes with decimal and binary standards.'
  },
  {
    id: 'color-converter',
    slug: 'color-converter',
    name: 'Color Code Converter',
    category: 'converter',
    description: 'Convert color values between HEX, RGB, HSL, and CMYK with a visual color picker and palette preview.',
    icon: 'Palette',
    tags: ['color converter', 'hex to rgb', 'rgb to hsl', 'color picker', 'cmyk'],
    popular: true,
    howToUse: [
      'Pick a color using the interactive color wheel or enter a HEX, RGB, or HSL code.',
      'View synchronized values across HEX, RGB, RGBA, HSL, HSLA, and CMYK.',
      'Copy any format with a single click.'
    ],
    faqs: [
      {
        question: 'Which color model is best for print vs screen?',
        answer: 'RGB and HEX are optimized for digital display screens (light emission), while CMYK is required for physical color printing.'
      }
    ],
    relatedToolIds: ['css-minifier', 'svg-optimizer', 'favicon-generator'],
    seoTitle: 'Color Converter - Convert HEX, RGB, HSL & CMYK Online | ToolStack',
    seoDescription: 'Convert color codes between HEX, RGB, HSL, and CMYK. Free online color picker with live palette and contrast previews.'
  },

  // --- SECURITY & UTILITY ---
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Strong Password Generator',
    category: 'security',
    description: 'Generate high-entropy, cryptographically secure passwords with custom length and character rules.',
    icon: 'Lock',
    tags: ['password generator', 'strong password', 'security', 'random password'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Choose password length using the slider (8 to 64 characters).',
      'Toggle character sets: Uppercase, Lowercase, Numbers, and Symbols.',
      'Inspect the live entropy strength meter (Weak, Medium, Strong, Military-grade).',
      'Click "Copy Password" to copy securely to clipboard.'
    ],
    faqs: [
      {
        question: 'How are passwords generated?',
        answer: 'Using the browser\'s window.crypto.getRandomValues API, providing cryptographically strong pseudo-random numbers.'
      }
    ],
    relatedToolIds: ['hash-generator', 'uuid-generator', 'credit-card-validator'],
    seoTitle: 'Password Generator - Create Secure Random Passwords | ToolStack',
    seoDescription: 'Generate secure, random passwords with custom lengths and symbols. Features a real-time entropy strength meter.'
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Cryptographic Hash Generator',
    category: 'security',
    description: 'Compute cryptographic hashes (SHA-1, SHA-256, SHA-384, SHA-512) for text and files.',
    icon: 'Shield',
    tags: ['hash generator', 'sha256', 'sha512', 'checksum', 'cryptography'],
    popular: true,
    howToUse: [
      'Enter plain text or upload a verification file.',
      'View SHA-256, SHA-384, and SHA-512 hashes generated client-side via the SubtleCrypto API.',
      'Compare against an expected hash to verify file integrity.'
    ],
    faqs: [
      {
        question: 'Can a hash be decrypted back to the original text?',
        answer: 'No, cryptographic hash functions are one-way mathematical operations designed to be irreversible.'
      }
    ],
    relatedToolIds: ['password-generator', 'base64-encoder', 'uuid-generator'],
    seoTitle: 'Hash Generator Online - SHA-256, SHA-512 Checksum Tool | ToolStack',
    seoDescription: 'Generate SHA-256, SHA-384, and SHA-512 cryptographic hashes online. Verify checksums and file integrity securely.'
  },
  {
    id: 'random-number-generator',
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    category: 'security',
    description: 'Generate single or multiple random integers and decimals within any min/max range with no duplicates option.',
    icon: 'Dice5',
    tags: ['random number generator', 'rng', 'random picker', 'dice'],
    howToUse: [
      'Set minimum and maximum boundaries (e.g. 1 to 100).',
      'Choose quantity of numbers to generate.',
      'Toggle "Allow Duplicates" or "Sort Ascending/Descending".',
      'Click "Generate Numbers".'
    ],
    faqs: [
      {
        question: 'Is this random number generator truly unbiased?',
        answer: 'Yes, it uses crypto-quality random sampling to ensure uniform distribution across all possible values.'
      }
    ],
    relatedToolIds: ['password-generator', 'uuid-generator', 'percentage-calculator'],
    seoTitle: 'Random Number Generator - Pick Numbers Online Free | ToolStack',
    seoDescription: 'Generate random numbers within any range. Supports bulk generation, non-duplicate lotteries, and sorting.'
  },
  {
    id: 'credit-card-validator',
    slug: 'credit-card-validator',
    name: 'Credit Card Luhn Validator',
    category: 'security',
    description: 'Validate credit card numbers using the standard Luhn algorithm (Mod 10) and identify card network issuer.',
    icon: 'CreditCard',
    tags: ['credit card validator', 'luhn algorithm', 'card checker', 'mod 10'],
    howToUse: [
      'Enter a card number to validate format.',
      'Check Luhn checksum mathematical validity.',
      'Detect card issuer brand: Visa, Mastercard, American Express, Discover, JCB.',
      'Note: Card numbers are never transmitted or stored anywhere.'
    ],
    faqs: [
      {
        question: 'Is it safe to type card numbers here?',
        answer: 'Validation runs 100% locally in your browser memory without server requests. However, we recommend testing with dummy sample test card numbers.'
      }
    ],
    relatedToolIds: ['password-generator', 'hash-generator', 'regex-tester'],
    seoTitle: 'Credit Card Validator - Check Card Validity with Luhn | ToolStack',
    seoDescription: 'Validate credit card numbers with the Luhn Mod-10 algorithm. Identify card brand (Visa, Mastercard, Amex) securely.'
  },

  // --- SEO & WEBMASTER ---
  {
    id: 'utm-builder',
    slug: 'utm-builder',
    name: 'Campaign UTM Link Builder',
    category: 'seo',
    description: 'Build trackable campaign URLs with utm_source, utm_medium, utm_campaign, utm_term, and utm_content.',
    icon: 'Crosshair',
    tags: ['utm builder', 'campaign url', 'google analytics', 'tracking link', 'marketing'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Enter destination website URL.',
      'Fill in Campaign Source (e.g. newsletter, google, twitter).',
      'Enter Campaign Medium (e.g. cpc, email, banner) and Campaign Name.',
      'Copy your generated tracking link or generate a matching QR code.'
    ],
    faqs: [
      {
        question: 'Why are UTM parameters necessary?',
        answer: 'They allow Google Analytics and other attribution platforms to pinpoint which marketing channels drive traffic and conversions.'
      }
    ],
    relatedToolIds: ['qr-generator', 'url-encoder', 'slug-generator'],
    seoTitle: 'UTM Builder - Google Analytics Campaign URL Creator | ToolStack',
    seoDescription: 'Create trackable marketing URLs with custom UTM parameters (source, medium, campaign) for Google Analytics.'
  },
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'Meta Tag & SEO Title Generator',
    category: 'seo',
    description: 'Generate complete HTML meta titles, descriptions, viewport tags, Open Graph, and Twitter Cards.',
    icon: 'FileSpreadsheet',
    tags: ['meta tags', 'seo generator', 'meta description', 'open graph tags'],
    popular: true,
    howToUse: [
      'Input site name, page title, and meta description.',
      'Check recommended character length counters (Title: 50-60 chars, Description: 150-160 chars).',
      'Add Open Graph image URL and canonical link.',
      'Copy the ready-to-paste `<head>` HTML tags.'
    ],
    faqs: [
      {
        question: 'What is the optimal meta description length?',
        answer: 'Between 140 and 160 characters. Search engines like Google truncate descriptions exceeding ~160 characters.'
      }
    ],
    relatedToolIds: ['open-graph-preview', 'robots-txt-generator', 'sitemap-generator'],
    seoTitle: 'Meta Tag Generator - Create SEO HTML Tags Free | ToolStack',
    seoDescription: 'Generate HTML meta tags, SEO titles, descriptions, and Open Graph tags for optimal search engine ranking.'
  },
  {
    id: 'robots-txt-generator',
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'seo',
    description: 'Generate customized robots.txt files with crawl rules for Googlebot, Bingbot, and AI crawlers.',
    icon: 'Bot',
    tags: ['robots.txt', 'crawler', 'seo', 'googlebot', 'sitemap'],
    popular: true,
    howToUse: [
      'Specify user-agents to allow or disallow (Googlebot, Bing, GPTBot, all bots).',
      'Add paths to block (e.g. /admin/, /private/, /api/).',
      'Include your XML sitemap URL.',
      'Download your generated robots.txt file.'
    ],
    faqs: [
      {
        question: 'Where should robots.txt be placed?',
        answer: 'In the root directory of your website domain (e.g. https://example.com/robots.txt).'
      }
    ],
    relatedToolIds: ['sitemap-generator', 'meta-tag-generator', 'utm-builder'],
    seoTitle: 'Robots.txt Generator - Create Web Crawler Rules | ToolStack',
    seoDescription: 'Create a customized robots.txt file for your website. Control crawler access for Google, Bing, and AI search bots.'
  },
  {
    id: 'sitemap-generator',
    slug: 'sitemap-generator',
    name: 'XML Sitemap Generator',
    category: 'seo',
    description: 'Generate clean, valid XML sitemaps with custom page priorities, change frequencies, and timestamps.',
    icon: 'Network',
    tags: ['sitemap generator', 'xml sitemap', 'seo sitemap', 'google indexing'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Enter base website URL.',
      'Add page paths (e.g. /, /about, /services, /tools).',
      'Set change frequency (Daily, Weekly, Monthly) and priority (0.1 to 1.0).',
      'Download the valid sitemap.xml file ready to submit to Google Search Console.'
    ],
    faqs: [
      {
        question: 'Why do websites need an XML sitemap?',
        answer: 'It acts as an index roadmap that helps search engines discover, crawl, and index all your important pages efficiently.'
      }
    ],
    relatedToolIds: ['robots-txt-generator', 'meta-tag-generator', 'open-graph-preview'],
    seoTitle: 'XML Sitemap Generator - Create Sitemaps for Google | ToolStack',
    seoDescription: 'Create clean, valid XML sitemaps for your website. Submit to Google Search Console for accelerated search indexing.'
  },
  {
    id: 'open-graph-preview',
    slug: 'open-graph-preview',
    name: 'Open Graph Social Previewer',
    category: 'seo',
    description: 'Preview how your webpage links appear when shared on Google, Facebook, Twitter (X), and LinkedIn.',
    icon: 'Share2',
    tags: ['open graph', 'social preview', 'twitter card', 'og image preview'],
    trending: true,
    howToUse: [
      'Enter title, description, website URL, and banner image URL.',
      'Switch between live preview tabs: Google Search Snippet, Facebook Card, Twitter/X Summary Large Card, and LinkedIn Card.',
      'Test your social presentation before publishing.'
    ],
    faqs: [
      {
        question: 'What is the recommended Open Graph image size?',
        answer: '1200 x 630 pixels (1.91:1 ratio) for crisp display on high-DPI retina devices across social networks.'
      }
    ],
    relatedToolIds: ['meta-tag-generator', 'utm-builder', 'favicon-generator'],
    seoTitle: 'Open Graph Preview - Social Media Card Previewer | ToolStack',
    seoDescription: 'Preview and optimize Open Graph tags for Facebook, Twitter/X, and Google Search snippets in real time.'
  },

  // --- SOCIAL & MARKETING ---
  {
    id: 'hashtag-generator',
    slug: 'hashtag-generator',
    name: 'Hashtag Generator',
    category: 'social',
    description: 'Generate trending, high-reach hashtag sets for Instagram, TikTok, LinkedIn, and YouTube.',
    icon: 'Hash',
    tags: ['hashtags', 'instagram hashtags', 'tiktok', 'social media', 'reach'],
    popular: true,
    trending: true,
    badge: 'Trending',
    howToUse: [
      'Enter your niche topic or keyword (e.g. "fitness", "web development", "photography", "travel").',
      'Select category style (High Volume, Niche Community, or Balanced).',
      'Copy the optimized hashtag group with a single click.'
    ],
    faqs: [
      {
        question: 'How many hashtags should I use on Instagram?',
        answer: 'Current recommendations favor 3 to 5 highly relevant, contextual hashtags rather than spamming 30 broad tags.'
      }
    ],
    relatedToolIds: ['bio-generator', 'utm-builder', 'word-counter'],
    seoTitle: 'Hashtag Generator - Create Trending Hashtags Online | ToolStack',
    seoDescription: 'Generate trending hashtags for Instagram, TikTok, LinkedIn, and Twitter. Boost engagement and reach organically.'
  },
  {
    id: 'bio-generator',
    slug: 'bio-generator',
    name: 'Social Bio & Headline Generator',
    category: 'social',
    description: 'Craft high-converting, punchy bio profiles for Twitter/X, Instagram, LinkedIn, and GitHub.',
    icon: 'UserCheck',
    tags: ['bio generator', 'social bio', 'linkedin headline', 'profile description'],
    popular: true,
    howToUse: [
      'Select your platform (Twitter/X, LinkedIn, Instagram, or GitHub).',
      'Enter your title/profession, key interests, and optional call to action.',
      'Choose tone: Professional, Creative, Minimalist, or Punchy.',
      'Generate multiple tailored bio variants and copy your favorite.'
    ],
    faqs: [
      {
        question: 'What are the character limits for social bios?',
        answer: 'Twitter/X: 160 characters; Instagram: 150 characters; LinkedIn Headline: 220 characters.'
      }
    ],
    relatedToolIds: ['hashtag-generator', 'word-counter', 'case-converter'],
    seoTitle: 'Social Bio Generator - Create Instagram & Twitter Bios | ToolStack',
    seoDescription: 'Generate creative, professional bios and headlines for Instagram, Twitter/X, LinkedIn, and GitHub profiles.'
  },

  // --- NEW HIGH-TRAFFIC & FUTURE TOOLS (20 TOOLS) ---
  {
    id: 'ai-prompt-builder',
    slug: 'ai-prompt-builder',
    name: 'AI Prompt Optimizer',
    category: 'ai',
    description: 'Architect high-performance meta-prompts with role assignments, constraints, and dynamic variables.',
    icon: 'Sparkles',
    tags: ['ai', 'prompt', 'llm', 'gpt4', 'claude', 'gemini', 'engineering'],
    popular: true,
    trending: true,
    badge: 'Hot',
    howToUse: [
      'Select the target expert persona or role.',
      'Enter your core task or challenge objective.',
      'Configure style, tone, format constraints, and variable tokens.',
      'Copy your optimized meta-prompt ready for any AI model.'
    ],
    faqs: [
      {
        question: 'Why does prompt architecture matter?',
        answer: 'Well-structured prompts with role definition, guardrails, and output schemas reduce AI hallucinations by over 60% and ensure consistent results.'
      }
    ],
    relatedToolIds: ['ai-token-counter', 'ai-system-prompt', 'text-density-analyzer'],
    seoTitle: 'AI Prompt Optimizer - Meta-Prompt Architecture Studio | ToolStack',
    seoDescription: 'Generate bulletproof AI prompts for ChatGPT, Claude, and Gemini with persona modeling, guardrails, and schema constraints.'
  },
  {
    id: 'ai-token-counter',
    slug: 'ai-token-counter',
    name: 'AI Token Counter & Cost',
    category: 'ai',
    description: 'Count prompt tokens and estimate real-time API inference costs across GPT-4o, Claude 3.5, Gemini, and DeepSeek.',
    icon: 'Coins',
    tags: ['ai', 'tokens', 'cost', 'pricing', 'calculator', 'llm'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Paste or type your input prompt, system context, or code.',
      'View real-time token estimation, word counts, and character lengths.',
      'Compare estimated API execution costs across top AI models.'
    ],
    faqs: [
      {
        question: 'How are tokens calculated?',
        answer: 'Tokens are approximated using standard Byte Pair Encoding (BPE) heuristics averaging ~3.85 to 4 characters per token in English and programming code.'
      }
    ],
    relatedToolIds: ['ai-prompt-builder', 'word-counter', 'text-density-analyzer'],
    seoTitle: 'AI Token Counter & Model Cost Estimator | ToolStack',
    seoDescription: 'Estimate AI tokens and calculate exact API pricing for GPT-4o, Claude 3.5 Sonnet, Gemini 2.0 Flash, and DeepSeek R1.'
  },
  {
    id: 'ai-system-prompt',
    slug: 'ai-system-prompt',
    name: 'AI System Prompt Architect',
    category: 'ai',
    description: 'Generate hardened system instructions, XML personas, anti-hallucination guardrails, and structured outputs.',
    icon: 'Brain',
    tags: ['ai', 'system', 'persona', 'guardrails', 'prompt engineering'],
    popular: false,
    trending: true,
    badge: 'New',
    howToUse: [
      'Specify agent identity and operational domain.',
      'Select strictness tier and output format requirements.',
      'Copy the generated XML-structured system instructions block.'
    ],
    faqs: [
      {
        question: 'What is a system prompt?',
        answer: 'System prompts define the foundational personality, behavioral bounds, and rules that guide an AI model before any user input is processed.'
      }
    ],
    relatedToolIds: ['ai-prompt-builder', 'ai-token-counter'],
    seoTitle: 'AI System Prompt Architect - System Instructions Builder | ToolStack',
    seoDescription: 'Create enterprise system prompts with XML tags, behavioral bounds, and strict output schemas.'
  },
  {
    id: 'text-density-analyzer',
    slug: 'text-density-analyzer',
    name: 'AI Text Readability & Density',
    category: 'ai',
    description: 'Analyze Flesch-Kincaid grade levels, syllable counts, sentence complexity, and estimated reading times.',
    icon: 'FileSearch',
    tags: ['ai', 'readability', 'flesch', 'grammar', 'density', 'content'],
    popular: false,
    trending: false,
    badge: 'New',
    howToUse: [
      'Paste your article, documentation, or marketing copy.',
      'Instantly view Flesch Reading Ease score, US school grade level, and read time.'
    ],
    faqs: [
      {
        question: 'What is a good Flesch Reading Ease score?',
        answer: 'Scores between 60 and 70 are considered standard Plain English, easily understood by 8th-9th grade students and optimal for web audiences.'
      }
    ],
    relatedToolIds: ['word-counter', 'ai-prompt-builder'],
    seoTitle: 'Text Readability & Flesch Grade Level Analyzer | ToolStack',
    seoDescription: 'Calculate Flesch Reading Ease, grade level comprehension, and syllable density in your browser.'
  },
  {
    id: 'curl-converter',
    slug: 'curl-converter',
    name: 'cURL Command Converter',
    category: 'developer',
    description: 'Convert curl terminal commands into clean JavaScript Fetch, Axios, Python Requests, and Go code.',
    icon: 'Terminal',
    tags: ['curl', 'fetch', 'axios', 'python', 'api', 'http'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Paste a cURL command containing URL, headers, and request body.',
      'Select your destination language (Fetch, Axios, Python, or Go).',
      'Copy the ready-to-run HTTP client snippet.'
    ],
    faqs: [
      {
        question: 'Does this handle POST requests with JSON data?',
        answer: 'Yes! Request methods (-X POST), authorization headers (-H), and JSON bodies (-d) are automatically parsed.'
      }
    ],
    relatedToolIds: ['json-formatter', 'jwt-debugger', 'url-encoder'],
    seoTitle: 'cURL Converter - Convert cURL to Fetch, Axios & Python | ToolStack',
    seoDescription: 'Transform cURL commands into JavaScript Fetch, Axios, Python Requests, and Go net/http code online.'
  },
  {
    id: 'jwt-debugger',
    slug: 'jwt-debugger',
    name: 'JWT Debugger & Inspector',
    category: 'developer',
    description: 'Decode JSON Web Tokens, inspect header claims and payload signatures, and verify token expiration.',
    icon: 'Key',
    tags: ['jwt', 'token', 'auth', 'oauth', 'decode', 'security'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Paste your encoded JSON Web Token into the input field.',
      'Examine decoded header algorithms, payload subject/roles, and expiration timestamp.'
    ],
    faqs: [
      {
        question: 'Are my tokens sent to a remote server?',
        answer: 'No! All token parsing and decoding occurs entirely in your browser memory. Your secrets and claims are 100% private.'
      }
    ],
    relatedToolIds: ['base64-converter', 'curl-converter', 'hash-generator'],
    seoTitle: 'JWT Debugger - Decode and Inspect JSON Web Tokens | ToolStack',
    seoDescription: 'Decode and inspect JWT header and payload claims with expiration checking. Fast, client-side, and private.'
  },
  {
    id: 'cron-parser',
    slug: 'cron-parser',
    name: 'Cron Expression Parser',
    category: 'developer',
    description: 'Parse cron schedules into human-readable descriptions and calculate upcoming execution intervals.',
    icon: 'Clock',
    tags: ['cron', 'schedule', 'timer', 'crontab', 'developer', 'interval'],
    popular: true,
    trending: false,
    badge: 'Popular',
    howToUse: [
      'Enter a 5-part cron expression (e.g., */15 0 1,15 * 1-5).',
      'Read the clear plain-English explanation of when the job executes.'
    ],
    faqs: [
      {
        question: 'What do the 5 cron fields represent?',
        answer: 'Standard crontab format is: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6).'
      }
    ],
    relatedToolIds: ['epoch-converter', 'curl-converter'],
    seoTitle: 'Cron Expression Parser & Human Translator | ToolStack',
    seoDescription: 'Translate cron schedule expressions into readable human language. Understand crontab schedules instantly.'
  },
  {
    id: 'docker-compose-generator',
    slug: 'docker-compose-generator',
    name: 'Docker Compose Stack Builder',
    category: 'developer',
    description: 'Visually assemble production-ready docker-compose.yml stacks with Node.js, Postgres, Redis, and Nginx.',
    icon: 'Box',
    tags: ['docker', 'compose', 'container', 'devops', 'stack'],
    popular: false,
    trending: true,
    badge: 'New',
    howToUse: [
      'Toggle desired microservices (Node.js, Postgres, Redis, Nginx).',
      'Configure exposed ports and volume mappings.',
      'Copy the production-ready docker-compose.yml file.'
    ],
    faqs: [
      {
        question: 'Does this include persistent database volume mounts?',
        answer: 'Yes, database containers automatically configure named Docker volumes to protect your data across container restarts.'
      }
    ],
    relatedToolIds: ['curl-converter', 'sql-formatter'],
    seoTitle: 'Docker Compose Generator - Visual Compose File Builder | ToolStack',
    seoDescription: 'Generate docker-compose.yml configurations for Node, PostgreSQL, Redis, and Nginx stacks.'
  },
  {
    id: 'css-mesh-generator',
    slug: 'css-mesh-generator',
    name: 'CSS Mesh & Glassmorphism',
    category: 'developer',
    description: 'Generate modern frosted glass and mesh gradient CSS styles with live blur and opacity controls.',
    icon: 'Palette',
    tags: ['css', 'glassmorphism', 'tailwind', 'styles', 'ui', 'design'],
    popular: false,
    trending: true,
    badge: 'New',
    howToUse: [
      'Adjust backdrop blur, background transparency, and border light.',
      'Preview the glass card in real-time over dynamic gradients.',
      'Copy standard CSS or Tailwind classes.'
    ],
    faqs: [
      {
        question: 'Is backdrop-filter widely supported?',
        answer: 'Yes! CSS backdrop-filter is supported in all modern versions of Chrome, Safari, Edge, and Firefox.'
      }
    ],
    relatedToolIds: ['color-converter', 'svg-optimizer'],
    seoTitle: 'CSS Glassmorphism & Mesh Gradient Generator | ToolStack',
    seoDescription: 'Create frosted glass UI effects with live backdrop-filter controls and copy-ready CSS and Tailwind code.'
  },
  {
    id: 'subnet-calculator',
    slug: 'subnet-calculator',
    name: 'IP Subnet & CIDR Mask',
    category: 'developer',
    description: 'Calculate network ranges, broadcast IPs, usable host counts, wildcard masks, and CIDR prefixes.',
    icon: 'Network',
    tags: ['network', 'ip', 'subnet', 'cidr', 'mask', 'sysadmin'],
    popular: false,
    trending: false,
    badge: 'New',
    howToUse: [
      'Enter an IPv4 address and CIDR prefix length (e.g. /24).',
      'Inspect network address, broadcast address, netmask, and usable host count.'
    ],
    faqs: [
      {
        question: 'What is CIDR notation?',
        answer: 'Classless Inter-Domain Routing (CIDR) specifies an IP address followed by a slash and the number of bits in the network prefix.'
      }
    ],
    relatedToolIds: ['curl-converter', 'user-agent-parser'],
    seoTitle: 'IP Subnet Calculator - CIDR Mask & Host Range | ToolStack',
    seoDescription: 'Calculate IP network addresses, broadcast IPs, subnet masks, and usable host counts online.'
  },
  {
    id: 'user-agent-parser',
    slug: 'user-agent-parser',
    name: 'User-Agent & Hardware Inspector',
    category: 'developer',
    description: 'Inspect browser user-agent tokens, screen dimensions, CPU concurrency threads, and device memory.',
    icon: 'Monitor',
    tags: ['useragent', 'browser', 'device', 'hardware', 'screen'],
    popular: false,
    trending: false,
    badge: 'New',
    howToUse: [
      'View your current browser user-agent and device hardware profile automatically.',
      'Paste any foreign user-agent string to inspect operating system and browser family.'
    ],
    faqs: [
      {
        question: 'How is hardware concurrency determined?',
        answer: 'Hardware concurrency reports the number of logical CPU processing cores available on your system via navigator.hardwareConcurrency.'
      }
    ],
    relatedToolIds: ['curl-converter', 'subnet-calculator'],
    seoTitle: 'User-Agent Parser & Device Hardware Inspector | ToolStack',
    seoDescription: 'Inspect browser user-agent strings, screen resolution, CPU concurrency, and hardware specs.'
  },
  {
    id: 'markdown-previewer',
    slug: 'markdown-previewer',
    name: 'Markdown Live Previewer',
    category: 'text',
    description: 'Write Markdown in real-time with instant formatted preview, word counting, and copyable HTML output.',
    icon: 'FileText',
    tags: ['markdown', 'html', 'preview', 'editor', 'writer'],
    popular: true,
    trending: false,
    badge: 'Popular',
    howToUse: [
      'Type or paste Markdown syntax on the left.',
      'View styled HTML preview and rendered formatting on the right.',
      'Copy raw HTML output with a single click.'
    ],
    faqs: [
      {
        question: 'What Markdown elements are supported?',
        answer: 'Supports headings, bold/italic text, blockquotes, inline code, ordered/unordered lists, and paragraph formatting.'
      }
    ],
    relatedToolIds: ['word-counter', 'case-converter', 'text-diff'],
    seoTitle: 'Markdown Live Previewer & HTML Exporter | ToolStack',
    seoDescription: 'Edit Markdown with live side-by-side preview. Convert Markdown to clean HTML and copy in seconds.'
  },
  {
    id: 'qr-advanced-generator',
    slug: 'qr-advanced-generator',
    name: 'Stylized QR Code Generator',
    category: 'social',
    description: 'Generate high-resolution custom color QR codes with adjustable margins and instant PNG image download.',
    icon: 'QrCode',
    tags: ['qr', 'qrcode', 'barcode', 'generator', 'social', 'marketing'],
    popular: true,
    trending: true,
    badge: 'Hot',
    howToUse: [
      'Enter destination URL, Wi-Fi configuration, or plain text.',
      'Choose custom brand foreground and background colors.',
      'Download high-res PNG image for print or digital media.'
    ],
    faqs: [
      {
        question: 'Do these QR codes ever expire?',
        answer: 'Never! These are static QR codes that encode your text or URL directly into the matrix, so they function forever.'
      }
    ],
    relatedToolIds: ['qr-generator', 'og-previewer', 'social-bio-generator'],
    seoTitle: 'Stylized QR Code Generator with Custom Colors | ToolStack',
    seoDescription: 'Create custom branded QR codes with custom colors and instant PNG download. 100% free and permanent.'
  },
  {
    id: 'bcrypt-generator',
    slug: 'bcrypt-generator',
    name: 'Bcrypt Hash & Verifier',
    category: 'security',
    description: 'Generate salted bcrypt password hashes with configurable work factor rounds and test hash matching.',
    icon: 'ShieldCheck',
    tags: ['bcrypt', 'hash', 'password', 'security', 'salt', 'crypto'],
    popular: true,
    trending: false,
    badge: 'Popular',
    howToUse: [
      'Type any plaintext password and choose salt rounds (cost factor).',
      'Copy the resulting $2a$... hash string.',
      'Paste any hash in the verifier box to test password validity.'
    ],
    faqs: [
      {
        question: 'What cost factor should I use in production?',
        answer: 'Cost factor 10 or 12 is recommended for modern web applications, providing strong brute-force resistance with ~100-250ms hashing latency.'
      }
    ],
    relatedToolIds: ['hash-generator', 'password-generator', 'jwt-debugger'],
    seoTitle: 'Bcrypt Hash Generator and Password Verifier | ToolStack',
    seoDescription: 'Generate salted bcrypt hashes with adjustable cost rounds and verify passwords against existing hashes.'
  },
  {
    id: 'og-previewer',
    slug: 'og-previewer',
    name: 'Social Open Graph Previewer',
    category: 'seo',
    description: 'Preview how your webpage links appear when shared across Twitter/X, Facebook, LinkedIn, and Google search.',
    icon: 'Share2',
    tags: ['seo', 'opengraph', 'social', 'meta', 'twitter', 'preview'],
    popular: true,
    trending: false,
    badge: 'Popular',
    howToUse: [
      'Enter title, description, URL, and image banner.',
      'Review the live simulated social card previews across networks.'
    ],
    faqs: [
      {
        question: 'What is the optimal Open Graph image size?',
        answer: 'The recommended dimensions for og:image are 1200 x 630 pixels (1.91:1 ratio) to ensure sharp rendering on all social platforms.'
      }
    ],
    relatedToolIds: ['meta-tag-generator', 'qr-advanced-generator'],
    seoTitle: 'Open Graph Social Card Previewer | ToolStack',
    seoDescription: 'Preview social sharing cards for Twitter/X, Facebook, and LinkedIn. Test og:title and og:image tags.'
  },
  {
    id: 'inflation-calculator',
    slug: 'inflation-calculator',
    name: 'Inflation & Future Value',
    category: 'calculator',
    description: 'Calculate the erosive effect of annual inflation on purchasing power and future living costs.',
    icon: 'TrendingUp',
    tags: ['finance', 'inflation', 'money', 'calculator', 'purchasing power'],
    popular: true,
    trending: false,
    badge: 'Popular',
    howToUse: [
      'Enter present amount, expected annual inflation rate, and time horizon.',
      'View future required amount, purchasing power lost percentage, and total nominal increase.'
    ],
    faqs: [
      {
        question: 'What is the historical average inflation rate?',
        answer: 'In the United States, historical average inflation over the last 50 years has averaged approximately 3.8% annually.'
      }
    ],
    relatedToolIds: ['percentage-calculator', 'emi-calculator', 'freelance-rate-calculator'],
    seoTitle: 'Inflation & Future Purchasing Power Calculator | ToolStack',
    seoDescription: 'Calculate how annual inflation erodes purchasing power over time. Compute future nominal money requirements.'
  },
  {
    id: 'freelance-rate-calculator',
    slug: 'freelance-rate-calculator',
    name: 'Freelance Rate Calculator',
    category: 'calculator',
    description: 'Compute hourly and day rates needed to hit your target net income after taxes, business expenses, and time off.',
    icon: 'Briefcase',
    tags: ['freelance', 'rate', 'hourly', 'income', 'business', 'calculator'],
    popular: true,
    trending: true,
    badge: 'Hot',
    howToUse: [
      'Enter desired take-home annual income and operating expenses.',
      'Set tax rate percentage, vacation weeks, and billable hours per week.',
      'See your minimum viable hourly rate and standard day rate.'
    ],
    faqs: [
      {
        question: 'Why not count 40 billable hours per week?',
        answer: 'Freelancers spend significant time on unbillable tasks like marketing, proposals, and invoicing. A realistic billable target is 20-30 hours per week.'
      }
    ],
    relatedToolIds: ['meeting-cost-calculator', 'inflation-calculator', 'percentage-calculator'],
    seoTitle: 'Freelance Hourly & Day Rate Calculator | ToolStack',
    seoDescription: 'Calculate what hourly rate you need to charge as a freelancer based on target salary, taxes, and expenses.'
  },
  {
    id: 'meeting-cost-calculator',
    slug: 'meeting-cost-calculator',
    name: 'Live Meeting Cost Clock',
    category: 'calculator',
    description: 'Real-time burn rate clock that tracks financial meeting costs second-by-second based on headcount and salary.',
    icon: 'Clock',
    tags: ['meeting', 'cost', 'productivity', 'timer', 'business', 'burn rate'],
    popular: true,
    trending: true,
    badge: 'Hot',
    howToUse: [
      'Enter number of attendees and their average annual compensation.',
      'Click "Start Meeting Clock" as the meeting begins.',
      'Watch real-time cumulative dollar cost increment second-by-second.'
    ],
    faqs: [
      {
        question: 'How is cost calculated per second?',
        answer: 'Calculated using standard 2,080 annual working hours per employee multiplied by attendees count divided by 3,600 seconds.'
      }
    ],
    relatedToolIds: ['freelance-rate-calculator', 'pomodoro-timer', 'stopwatch'],
    seoTitle: 'Live Meeting Cost Clock - Real-Time Burn Rate Tracker | ToolStack',
    seoDescription: 'Track the real-time financial burn rate of corporate meetings second-by-second based on headcount and salaries.'
  },
  {
    id: 'dns-lookup',
    slug: 'dns-lookup',
    name: 'DNS Records & Lookup Inspector',
    category: 'developer',
    description: 'Inspect authoritative A, AAAA, CNAME, MX, TXT, and NS records for any domain in real-time via secure DNS-over-HTTPS.',
    icon: 'Globe',
    tags: ['dns', 'whois', 'lookup', 'nameserver', 'mx', 'network', 'records'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Enter any domain name (e.g. google.com or github.com).',
      'Select target DNS record type: A, AAAA, MX, TXT, NS, or CNAME.',
      'Click Query DNS to inspect authoritative response, TTL, and target addresses.'
    ],
    faqs: [
      {
        question: 'How are the DNS records queried?',
        answer: 'Queries are executed directly via Google Public DNS-over-HTTPS (DoH) API with client-side fallback.'
      }
    ],
    relatedToolIds: ['ssl-checker', 'api-tester', 'http-headers'],
    seoTitle: 'DNS Records & Lookup Inspector - Real-Time DNS Tool | ToolStack',
    seoDescription: 'Inspect domain DNS records (A, AAAA, MX, TXT, NS) in real-time with TTL and status diagnostics.'
  },
  {
    id: 'ssl-checker',
    slug: 'ssl-checker',
    name: 'SSL/TLS Certificate Checker',
    category: 'security',
    description: 'Inspect SSL/TLS certificate validity, expiry countdown, issuer authority, SAN domains, and HTTPS handshake health.',
    icon: 'ShieldCheck',
    tags: ['ssl', 'tls', 'certificate', 'security', 'https', 'expiry'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Input the hostname to inspect (e.g. github.com).',
      'Optionally specify HTTPS port (default 443).',
      'Click Inspect SSL Certificate to review remaining validity days, issuer CA, and SAN coverage.'
    ],
    faqs: [
      {
        question: 'Why monitor SSL certificate expiration?',
        answer: 'Expired certificates break website access for users and hurt search engine rankings immediately.'
      }
    ],
    relatedToolIds: ['dns-lookup', 'password-strength-auditor', 'jwt-debugger'],
    seoTitle: 'SSL/TLS Certificate Checker - Expiry & Security Inspector | ToolStack',
    seoDescription: 'Verify SSL certificate validity, issuer authority, and days until expiration online.'
  },
  {
    id: 'api-tester',
    slug: 'api-tester',
    name: 'REST API Tester & Client',
    category: 'developer',
    description: 'Test REST API endpoints with GET, POST, PUT, DELETE, custom headers, JSON body payloads, and millisecond latency metrics.',
    icon: 'Terminal',
    tags: ['api', 'rest', 'http', 'fetch', 'postman', 'curl', 'tester'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Choose HTTP method (GET, POST, PUT, DELETE).',
      'Enter the target REST URL endpoint.',
      'Configure headers or JSON request body as needed.',
      'Click Send Request to view response status, headers, and formatted data.'
    ],
    faqs: [
      {
        question: 'Does this work with private APIs?',
        answer: 'Yes! All requests execute from your browser client directly to the destination endpoint.'
      }
    ],
    relatedToolIds: ['curl-converter', 'json-formatter', 'jwt-debugger'],
    seoTitle: 'REST API Tester & Client - Online HTTP Request Inspector | ToolStack',
    seoDescription: 'Test REST API endpoints with custom headers, JSON body payloads, and real-time response diagnostics.'
  },
  {
    id: 'color-palette-generator',
    slug: 'color-palette-generator',
    name: 'Color Palette & Harmony Studio',
    category: 'developer',
    description: 'Generate harmonized color schemes (monochromatic, analogous, triadic, complementary) with contrast scores and CSS variables.',
    icon: 'Palette',
    tags: ['color', 'palette', 'harmony', 'css', 'design', 'tailwind', 'hex'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Pick a base brand color or enter a HEX code.',
      'Select the harmony model (Analogous, Triadic, Monochromatic, Complementary).',
      'Copy individual color HEX values or export the full CSS variables snippet.'
    ],
    faqs: [
      {
        question: 'Can I export the palette to CSS variables?',
        answer: 'Yes! The tool provides a ready-to-use `:root` CSS variables block and individual hex swatches.'
      }
    ],
    relatedToolIds: ['css-mesh-generator', 'color-converter', 'box-shadow-generator'],
    seoTitle: 'Color Palette & Harmony Studio - Generate Color Schemes | ToolStack',
    seoDescription: 'Create harmonious 5-color palettes with CSS variable exports and instant hex copy.'
  },
  {
    id: 'box-shadow-generator',
    slug: 'box-shadow-generator',
    name: 'CSS Box Shadow Designer',
    category: 'developer',
    description: 'Design multi-layered smooth box shadows, neon glows, and inset elevations with instant CSS copy.',
    icon: 'Layers',
    tags: ['css', 'shadow', 'box-shadow', 'elevation', 'design', 'ui'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Adjust horizontal (X), vertical (Y), blur, and spread sliders.',
      'Toggle inset mode for inner recessed shadows.',
      'Test preset depths (Subtle, Floating, Layered) and copy the generated CSS rule.'
    ],
    faqs: [
      {
        question: 'What is spread radius in box-shadow?',
        answer: 'Spread radius causes the shadow shape to expand or contract in all directions before blur is applied.'
      }
    ],
    relatedToolIds: ['color-palette-generator', 'css-mesh-generator', 'css-minifier'],
    seoTitle: 'CSS Box Shadow Designer - Live Elevation Preview | ToolStack',
    seoDescription: 'Create smooth layered CSS box shadows with interactive sliders and instant copy.'
  },
  {
    id: 'svg-to-jsx',
    slug: 'svg-to-jsx',
    name: 'SVG to React JSX Converter',
    category: 'developer',
    description: 'Transform raw SVG vector files into clean, typed React TypeScript JSX components with camelCase attributes.',
    icon: 'Code2',
    tags: ['svg', 'jsx', 'react', 'typescript', 'converter', 'components'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Paste your raw SVG markup into the editor.',
      'Choose component name and toggle TypeScript (TSX) mode.',
      'Copy the production-ready React component code directly into your project.'
    ],
    faqs: [
      {
        question: 'Are attributes like stroke-width converted?',
        answer: 'Yes, all hyphenated HTML vector attributes are automatically converted to standard camelCase JSX properties.'
      }
    ],
    relatedToolIds: ['svg-optimizer', 'json-formatter', 'html-minifier'],
    seoTitle: 'SVG to React JSX Converter - Clean React Components | ToolStack',
    seoDescription: 'Convert raw SVG markup into clean, typed React TypeScript JSX components in one click.'
  },
  {
    id: 'cron-job-scheduler',
    slug: 'cron-job-scheduler',
    name: 'Cron Schedule Timeline & Humanizer',
    category: 'developer',
    description: 'Compute the next 10 upcoming run timestamps, human readable schedules, and timezone breakdowns for cron expressions.',
    icon: 'Clock',
    tags: ['cron', 'scheduler', 'devops', 'crontab', 'automation', 'timeline'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Type or paste a 5-part cron expression (e.g. 0 9 * * 1-5).',
      'Read the clear human English translation.',
      'Review the timeline of the next 10 upcoming execution timestamps.'
    ],
    faqs: [
      {
        question: 'What do the five cron fields represent?',
        answer: 'Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6, Sun-Sat).'
      }
    ],
    relatedToolIds: ['cron-parser', 'docker-compose-generator', 'timestamp-converter'],
    seoTitle: 'Cron Schedule Timeline & Humanizer - Next Run Dates | ToolStack',
    seoDescription: 'Translate cron expressions into plain English and preview the next 10 execution dates.'
  },
  {
    id: 'code-diff-side-by-side',
    slug: 'code-diff-side-by-side',
    name: 'Side-by-Side Code Diff Inspector',
    category: 'developer',
    description: 'Inspect side-by-side code diffs with line-by-line additions, deletions, modifications, and unified patch stats.',
    icon: 'GitCompare',
    tags: ['diff', 'compare', 'code', 'git', 'patch', 'side-by-side'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Paste original code on the left pane and modified code on the right pane.',
      'View synchronized side-by-side line numbers and diff badges.',
      'Review total additions and deletions statistics.'
    ],
    faqs: [
      {
        question: 'Can I compare large files?',
        answer: 'Yes! All line-by-line diffing is computed in client-side memory with zero file size upload restrictions.'
      }
    ],
    relatedToolIds: ['diff-checker', 'json-formatter', 'markdown-previewer'],
    seoTitle: 'Side-by-Side Code Diff Inspector - Compare Code Online | ToolStack',
    seoDescription: 'Compare code side-by-side with additions, deletions, and modified line highlights.'
  },
  {
    id: 'json-schema-validator',
    slug: 'json-schema-validator',
    name: 'JSON Schema Validator & Inferrer',
    category: 'developer',
    description: 'Infer JSON Schema definitions automatically from sample payloads and validate JSON data structures in real-time.',
    icon: 'FileCheck2',
    tags: ['json', 'schema', 'validator', 'draft-07', 'types', 'api'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Paste your sample JSON payload into the input editor.',
      'The tool automatically infers property types, nested objects, and arrays.',
      'Copy the generated Draft-07 JSON Schema for API validation.'
    ],
    faqs: [
      {
        question: 'Which JSON Schema version is supported?',
        answer: 'Generates standard JSON Schema Draft-07 compatible with OpenAPI, Ajv, and Pydantic.'
      }
    ],
    relatedToolIds: ['json-formatter', 'csv-to-json', 'jwt-debugger'],
    seoTitle: 'JSON Schema Validator & Inferrer - Auto-Generate Schemas | ToolStack',
    seoDescription: 'Generate Draft-07 JSON Schema automatically from sample JSON data.'
  },
  {
    id: 'password-strength-auditor',
    slug: 'password-strength-auditor',
    name: 'Password Security & Entropy Auditor',
    category: 'security',
    description: 'Audit password strength with Shannon entropy bit calculations, brute-force crack time estimates, and vulnerability flags.',
    icon: 'Key',
    tags: ['password', 'entropy', 'security', 'audit', 'crack time', 'zxcvbn'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Type or paste a candidate password to inspect.',
      'Examine Shannon entropy bits and brute-force crack resistance time.',
      'Check character diversity indicators (Uppercase, Lowercase, Digits, Symbols).'
    ],
    faqs: [
      {
        question: 'Is my password sent to any server?',
        answer: 'Never! All entropy calculations occur strictly inside your browser client memory.'
      }
    ],
    relatedToolIds: ['password-generator', 'hash-generator', 'bcrypt-generator'],
    seoTitle: 'Password Security & Entropy Auditor - Test Strength Free | ToolStack',
    seoDescription: 'Audit password strength with Shannon entropy calculations and brute-force crack time estimates.'
  },
  {
    id: 'currency-converter',
    slug: 'currency-converter',
    name: 'Multi-Currency Exchange Converter',
    category: 'calculator',
    description: 'Convert fiat currencies across USD, EUR, GBP, JPY, CAD, AUD, INR, and more with exchange rate comparisons.',
    icon: 'Coins',
    tags: ['currency', 'exchange', 'money', 'forex', 'usd', 'eur', 'finance'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Enter the base monetary amount.',
      'Select source currency (From) and target currency (To).',
      'Read the real-time converted total and exchange rate breakdown.'
    ],
    faqs: [
      {
        question: 'Which currencies are supported?',
        answer: 'Supports major global reserve and trade currencies including USD, EUR, GBP, JPY, CAD, AUD, INR, CHF, CNY, and SGD.'
      }
    ],
    relatedToolIds: ['salary-paycheck-calculator', 'invoice-generator', 'percentage-calculator'],
    seoTitle: 'Multi-Currency Exchange Converter - Instant Forex Tool | ToolStack',
    seoDescription: 'Convert global currencies with real-time mid-market rates and conversion breakdowns.'
  },
  {
    id: 'salary-paycheck-calculator',
    slug: 'salary-paycheck-calculator',
    name: 'Salary to Hourly & Paycheck Calculator',
    category: 'calculator',
    description: 'Convert gross annual compensation into hourly, daily, bi-weekly, and net monthly take-home estimates.',
    icon: 'DollarSign',
    tags: ['salary', 'paycheck', 'hourly', 'income', 'taxes', 'take-home'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Enter your annual gross compensation.',
      'Adjust hours worked per week and estimated tax rate slider.',
      'View itemized hourly, daily, bi-weekly, and net monthly take-home amounts.'
    ],
    faqs: [
      {
        question: 'How is the hourly rate calculated?',
        answer: 'Based on 52 weeks multiplied by weekly work hours (default 2,080 hours per year).'
      }
    ],
    relatedToolIds: ['freelance-rate-calculator', 'currency-converter', 'tax-calculator'],
    seoTitle: 'Salary to Hourly & Paycheck Calculator - Net Take-Home | ToolStack',
    seoDescription: 'Convert annual salary to hourly, bi-weekly, and net monthly take-home income estimates.'
  },
  {
    id: 'invoice-generator',
    slug: 'invoice-generator',
    name: 'Invoice Generator & PDF Maker',
    category: 'calculator',
    description: 'Create branded itemized invoices with line items, tax rates, discounts, client notes, and instant print/PDF export.',
    icon: 'Receipt',
    tags: ['invoice', 'pdf', 'billing', 'freelance', 'business', 'receipt'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Fill in your business details and recipient client information.',
      'Add itemized deliverables with quantities and unit prices.',
      'Set sales tax percentage and click Print / Save as PDF to export.'
    ],
    faqs: [
      {
        question: 'Can I export the invoice as a PDF?',
        answer: 'Yes! The Print button opens the native browser print preview where you can choose "Save as PDF".'
      }
    ],
    relatedToolIds: ['freelance-rate-calculator', 'meeting-cost-calculator', 'gst-calculator'],
    seoTitle: 'Invoice Generator & PDF Maker - Free Online Invoicing | ToolStack',
    seoDescription: 'Generate professional itemized invoices with taxes and export directly to PDF.'
  },
  {
    id: 'privacy-policy-generator',
    slug: 'privacy-policy-generator',
    name: 'GDPR / CCPA Privacy Policy Generator',
    category: 'seo',
    description: 'Generate compliant Privacy Policy documents tailored for websites, SaaS, apps, and ecommerce businesses.',
    icon: 'FileCheck',
    tags: ['privacy policy', 'gdpr', 'ccpa', 'legal', 'compliance', 'terms'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Enter your company name, website URL, and privacy support email.',
      'Review data collection terms including cookies, analytics, and billing.',
      'Copy the formatted Markdown policy to publish on your site.'
    ],
    faqs: [
      {
        question: 'Is this privacy policy GDPR and CCPA compliant?',
        answer: 'It includes standard clauses required by GDPR and CCPA covering user data rights, cookies, and contact procedures.'
      }
    ],
    relatedToolIds: ['terms-conditions-generator', 'meta-tag-generator', 'robots-txt-generator'],
    seoTitle: 'GDPR / CCPA Privacy Policy Generator - Free Legal Template | ToolStack',
    seoDescription: 'Generate compliant Privacy Policy documents for websites and SaaS platforms.'
  },
  {
    id: 'terms-conditions-generator',
    slug: 'terms-conditions-generator',
    name: 'Terms & Conditions Generator',
    category: 'seo',
    description: 'Create tailored website terms of service, acceptable use policies, intellectual property rights, and dispute clauses.',
    icon: 'FileSpreadsheet',
    tags: ['terms', 'conditions', 'tos', 'legal', 'agreement', 'disclaimer'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Provide your company name, platform URL, and governing legal jurisdiction.',
      'Read through the generated sections (Acceptable Use, Limitation of Liability, IP).',
      'Copy the Markdown document to add to your website footer.'
    ],
    faqs: [
      {
        question: 'Why does every website need Terms and Conditions?',
        answer: 'Terms protect your intellectual property, limit liability, and set binding rules for users of your service.'
      }
    ],
    relatedToolIds: ['privacy-policy-generator', 'meta-tag-generator', 'open-graph-preview'],
    seoTitle: 'Terms & Conditions Generator - Free Website Terms of Service | ToolStack',
    seoDescription: 'Create comprehensive Terms of Service documents tailored to your website and jurisdiction.'
  },
  {
    id: 'text-summarizer-cleaner',
    slug: 'text-summarizer-cleaner',
    name: 'Smart Text Summarizer & Extractor',
    category: 'text',
    description: 'Extract essential key sentences, calculate compression ratios, and remove filler prose using frequency analysis.',
    icon: 'FileText',
    tags: ['summarizer', 'extract', 'text', 'ai', 'compression', 'summary', 'bullets'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Paste your long article, report, or notes into the text box.',
      'Adjust the target summary length slider (20% - 80%).',
      'Review the bulleted takeaways and copy the executive summary.'
    ],
    faqs: [
      {
        question: 'How does the summarizer select sentences?',
        answer: 'It scores sentences by key term density, position, and information value to surface primary points.'
      }
    ],
    relatedToolIds: ['word-counter', 'readability-score', 'text-density-analyzer'],
    seoTitle: 'Smart Text Summarizer & Extractor - Key Bullets Online | ToolStack',
    seoDescription: 'Summarize long texts into concise key bullet points and calculate compression ratios.'
  },
  {
    id: 'readability-score',
    slug: 'readability-score',
    name: 'Readability Score & Grade Analyzer',
    category: 'seo',
    description: 'Analyze Flesch Reading Ease, Flesch-Kincaid Grade Level, syllable count, and comprehension targets for content.',
    icon: 'BookOpen',
    tags: ['readability', 'flesch', 'grade level', 'seo', 'content', 'writing'],
    popular: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Paste your copy, blog post, or essay.',
      'Inspect Flesch Reading Ease (0-100) and US Grade Level score.',
      'Use the reading comprehension target to ensure your writing matches your audience.'
    ],
    faqs: [
      {
        question: 'What is a good Flesch Reading Ease score?',
        answer: 'Scores between 60 and 70 correspond to standard 8th-9th grade English, recommended for web content.'
      }
    ],
    relatedToolIds: ['text-summarizer-cleaner', 'word-counter', 'meta-tag-generator'],
    seoTitle: 'Readability Score & Grade Analyzer - Flesch Kincaid Tool | ToolStack',
    seoDescription: 'Calculate Flesch Reading Ease and grade level readability scores for your text.'
  },
  {
    id: 'pomodoro-timer',
    slug: 'pomodoro-timer',
    name: 'Pomodoro Focus Flow Timer',
    category: 'text',
    description: 'Boost productivity with customizable 25/5 focus cycles, audio chimes, cycle counters, and task focus tagging.',
    icon: 'Timer',
    tags: ['pomodoro', 'focus', 'timer', 'productivity', 'study', 'work'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Choose Focus (25m), Short Break (5m), or Long Break (15m).',
      'Type your active task name to maintain single-tasking flow.',
      'Click Play to start the countdown with an audio completion chime.'
    ],
    faqs: [
      {
        question: 'What is the Pomodoro technique?',
        answer: 'A time management method that breaks work into 25-minute intervals separated by short 5-minute breaks.'
      }
    ],
    relatedToolIds: ['meeting-cost-calculator', 'speed-typing-test', 'timestamp-converter'],
    seoTitle: 'Pomodoro Focus Flow Timer - Free Online Productivity Clock | ToolStack',
    seoDescription: 'Stay in the flow with a clean 25/5 Pomodoro focus timer with audio cues.'
  },
  {
    id: 'speed-typing-test',
    slug: 'speed-typing-test',
    name: '60-Second Typing Speed Benchmark',
    category: 'text',
    description: 'Test your typing Words Per Minute (WPM), accuracy percentage, keystroke analytics, and error tracking in real-time.',
    icon: 'Keyboard',
    tags: ['typing', 'wpm', 'speed test', 'accuracy', 'keyboard', 'benchmark'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Click into the text area and begin typing the prompt prompt.',
      'Watch real-time WPM, accuracy percentage, and 60-second timer.',
      'Review your final Words Per Minute score and accuracy upon completion.'
    ],
    faqs: [
      {
        question: 'What is an average typing speed?',
        answer: 'The average typist types around 40 WPM. Professional programmers and writers often exceed 70-90 WPM.'
      }
    ],
    relatedToolIds: ['pomodoro-timer', 'word-counter', 'lorem-ipsum'],
    seoTitle: '60-Second Typing Speed Benchmark - Test WPM & Accuracy | ToolStack',
    seoDescription: 'Test your typing Words Per Minute (WPM) and accuracy in real-time with instant score grading.'
  },
  {
    id: 'email-signature-generator',
    slug: 'email-signature-generator',
    name: 'HTML Email Signature Generator',
    category: 'social',
    description: 'Design clean, responsive email signatures with avatar, job title, company links, contact info, and one-click copy.',
    icon: 'Mail',
    tags: ['email signature', 'html', 'gmail', 'outlook', 'branding', 'contact'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Fill in your name, job title, company, phone, email, and website.',
      'Provide an avatar or brand logo image URL.',
      'Preview the live signature and click Copy Signature HTML to paste into Gmail, Outlook, or Apple Mail.'
    ],
    faqs: [
      {
        question: 'Is this compatible with Gmail and Outlook?',
        answer: 'Yes! It generates standard inline-styled HTML tables universally supported across all major email clients.'
      }
    ],
    relatedToolIds: ['qr-generator', 'bio-generator', 'utm-builder'],
    seoTitle: 'HTML Email Signature Generator - Professional Signatures | ToolStack',
    seoDescription: 'Generate professional HTML email signatures for Gmail, Outlook, and Apple Mail.'
  },
  // ==========================================
  // 20 NEW PUBLIC TOOLS (NO LOGIN REQUIRED)
  // ==========================================
  {
    id: 'lorem-markdown-generator',
    slug: 'lorem-markdown-generator',
    name: 'Lorem Markdown Generator',
    category: 'developer',
    description: 'Generate realistic markdown test documents with headers, lists, code blocks, and data tables.',
    icon: 'FileText',
    tags: ['markdown generator', 'lorem ipsum markdown', 'dummy docs', 'readme generator'],
    popular: true,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Select which elements to include (Headings, Task Lists, Code Blocks, Tables).',
      'Preview the generated structured Markdown.',
      'Copy the Markdown document with 1-click for READMEs or documentation testing.'
    ],
    faqs: [
      {
        question: 'What markdown flavors are supported?',
        answer: 'Standard CommonMark and GitHub Flavored Markdown (GFM) including task lists and tables.'
      }
    ],
    relatedToolIds: ['markdown-previewer', 'lorem-ipsum', 'html-table-to-markdown'],
    seoTitle: 'Lorem Markdown Generator - Dummy Documentation Builder | ToolStack',
    seoDescription: 'Generate formatted markdown documents with sample headings, task lists, code snippets, and tables.'
  },
  {
    id: 'character-frequency-analyzer',
    slug: 'character-frequency-analyzer',
    name: 'Character Frequency Analyzer',
    category: 'text',
    description: 'Analyze letter frequency distribution, vowel-to-consonant ratios, and character density.',
    icon: 'Activity',
    tags: ['character frequency', 'letter count', 'cryptanalysis', 'text analytics'],
    popular: false,
    trending: true,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Paste or type text into the input field.',
      'Inspect total counts, vowel vs consonant proportions, and top letter frequency bars.',
      'Identify distribution patterns and frequency skews.'
    ],
    faqs: [
      {
        question: 'What does this help with?',
        answer: 'Cryptanalysis, frequency analysis, linguistic studies, and text optimization.'
      }
    ],
    relatedToolIds: ['word-counter', 'text-density-analyzer', 'readability-score'],
    seoTitle: 'Character Frequency Analyzer - Letter Distribution Tool | ToolStack',
    seoDescription: 'Analyze character frequencies, vowel-consonant ratios, and letter distributions in any text.'
  },
  {
    id: 'sql-formatter-pro',
    slug: 'sql-formatter-pro',
    name: 'SQL Query Beautifier Pro',
    category: 'developer',
    description: 'Format, indent, and uppercase SQL keywords for PostgreSQL, MySQL, and SQLite queries.',
    icon: 'Terminal',
    tags: ['sql beautifier', 'sql format', 'database query', 'indent sql'],
    popular: true,
    trending: true,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Paste raw or unformatted SQL query into the input.',
      'Inspect auto-capitalized keywords and structured line indentations.',
      'Click Copy Formatted SQL to paste directly into your IDE or database client.'
    ],
    faqs: [
      {
        question: 'Does this run safely client-side?',
        answer: 'Yes, your queries never leave your browser.'
      }
    ],
    relatedToolIds: ['sql-formatter', 'csv-to-json', 'json-formatter'],
    seoTitle: 'SQL Query Beautifier Pro - Format SQL Online | ToolStack',
    seoDescription: 'Format and indent messy SQL queries with standardized keyword casing and alignment.'
  },
  {
    id: 'case-converter-pro',
    slug: 'case-converter-pro',
    name: 'Case Converter Pro',
    category: 'text',
    description: 'Transform text into camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, and Title Case.',
    icon: 'Sliders',
    tags: ['case converter', 'camelCase', 'snake_case', 'kebab-case', 'pascal case'],
    popular: true,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Type or paste your text phrase.',
      'View all common programming and typography case variants simultaneously.',
      'Click the copy icon on any case style to copy it instantly.'
    ],
    faqs: [
      {
        question: 'Which cases are supported?',
        answer: 'camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, dot.case, Title Case, and Sentence case.'
      }
    ],
    relatedToolIds: ['case-converter', 'slug-generator', 'word-counter'],
    seoTitle: 'Case Converter Pro - Multi-Format Text Case Transformer | ToolStack',
    seoDescription: 'Convert text instantly to camelCase, snake_case, PascalCase, CONSTANT_CASE, and kebab-case.'
  },
  {
    id: 'screen-resolution-detector',
    slug: 'screen-resolution-detector',
    name: 'Screen Resolution & Display Inspector',
    category: 'developer',
    description: 'Detect monitor dimensions, viewport size, Device Pixel Ratio (DPR), color depth, and touch capabilities.',
    icon: 'Monitor',
    tags: ['screen resolution', 'viewport detector', 'device pixel ratio', 'dpr check'],
    popular: false,
    trending: true,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Open the tool to immediately see your hardware screen size, viewport width/height, and pixel ratio.',
      'Resize the browser window to see live viewport updates.',
      'Inspect touch support and color depth diagnostics.'
    ],
    faqs: [
      {
        question: 'What is Device Pixel Ratio (DPR)?',
        answer: 'DPR indicates how many physical hardware pixels correspond to one CSS resolution pixel (e.g. 2x on Retina screens).'
      }
    ],
    relatedToolIds: ['aspect-ratio-calculator', 'user-agent-parser', 'css-cursor-previewer'],
    seoTitle: 'Screen Resolution Detector - Viewport & DPR Checker | ToolStack',
    seoDescription: 'Inspect your monitor resolution, active viewport dimensions, device pixel ratio, and touch capabilities.'
  },
  {
    id: 'word-scrambler-anagram',
    slug: 'word-scrambler-anagram',
    name: 'Word Scrambler & Anagram Generator',
    category: 'text',
    description: 'Scramble words, generate letter anagrams, shuffle sentences, and reverse character sequences.',
    icon: 'Sparkles',
    tags: ['word scrambler', 'anagram maker', 'letter shuffler', 'text jumble'],
    popular: false,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Enter any word, phrase, or sentence.',
      'Click Re-Shuffle Letters to generate new permutations.',
      'Copy the scrambled output for puzzles, cryptography games, or testing.'
    ],
    faqs: [
      {
        question: 'Does this scramble each word independently?',
        answer: 'Yes, multi-word phrases maintain word boundaries while shuffling internal characters.'
      }
    ],
    relatedToolIds: ['word-counter', 'case-converter-pro', 'morse-code'],
    seoTitle: 'Word Scrambler & Anagram Generator - Jumble Words | ToolStack',
    seoDescription: 'Scramble letters, make anagrams, and generate randomized word puzzles online.'
  },
  {
    id: 'ipv4-cidr-calculator',
    slug: 'ipv4-cidr-calculator',
    name: 'IPv4 CIDR Subnet Calculator',
    category: 'developer',
    description: 'Compute network address, broadcast address, subnet mask, wildcard mask, and usable IP pool from CIDR prefix.',
    icon: 'Layers',
    tags: ['cidr calculator', 'ipv4 subnet', 'subnet mask', 'network address'],
    popular: true,
    trending: true,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Enter an IPv4 address (e.g. 192.168.1.50).',
      'Slide or select CIDR prefix length (e.g. /24, /16).',
      'View network ID, broadcast address, first and last usable host IPs, and total capacity.'
    ],
    faqs: [
      {
        question: 'How are usable hosts calculated?',
        answer: 'Total IPs is 2^(32 - CIDR). Usable hosts subtract 2 for network and broadcast addresses.'
      }
    ],
    relatedToolIds: ['subnet-calculator', 'dns-lookup', 'ssl-checker'],
    seoTitle: 'IPv4 CIDR Subnet Calculator - Network Range Finder | ToolStack',
    seoDescription: 'Calculate IPv4 network IP, broadcast address, wildcard mask, and total usable host count.'
  },
  {
    id: 'roman-numeral-converter',
    slug: 'roman-numeral-converter',
    name: 'Roman Numeral Converter',
    category: 'calculator',
    description: 'Convert between standard Arabic integers (1-3999) and classical Roman numerals with bidirectional calculation.',
    icon: 'Hash',
    tags: ['roman numeral converter', 'roman to arabic', 'numbers to roman', 'numeral translator'],
    popular: false,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Enter an Arabic number (e.g. 2026) to see its Roman numeral (MMXXVI).',
      'Or type Roman numerals (e.g. MCMLXXXIV) to calculate the integer value.',
      'Supports valid Roman numerals from 1 up to 3999.'
    ],
    faqs: [
      {
        question: 'What are the basic Roman numeral symbols?',
        answer: 'I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000.'
      }
    ],
    relatedToolIds: ['percentage-calculator', 'binary-text', 'unit-converter'],
    seoTitle: 'Roman Numeral Converter - Arabic to Roman Online | ToolStack',
    seoDescription: 'Translate between decimal Arabic numbers and Roman numerals instantly with bidirectional support.'
  },
  {
    id: 'css-cursor-previewer',
    slug: 'css-cursor-previewer',
    name: 'CSS Cursor Previewer & Gallery',
    category: 'developer',
    description: 'Interactive gallery of all standard CSS cursor properties with live hover preview and CSS snippets.',
    icon: 'Compass',
    tags: ['css cursor', 'pointer preview', 'cursor gallery', 'web design cursors'],
    popular: false,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Hover your mouse over any cursor tile to see how your pointer responds.',
      'Explore resize cursors, interaction cursors, and status indicators.',
      'Copy the exact CSS rule (cursor: pointer;) for your stylesheets.'
    ],
    faqs: [
      {
        question: 'Are these supported across all browsers?',
        answer: 'Yes, all displayed cursors are standard W3C CSS cursor specifications supported on all modern browsers.'
      }
    ],
    relatedToolIds: ['box-shadow-generator', 'css-mesh-generator', 'screen-resolution-detector'],
    seoTitle: 'CSS Cursor Previewer - Interactive Pointer Gallery | ToolStack',
    seoDescription: 'Test and preview all CSS cursor property values interactively with ready-to-copy code.'
  },
  {
    id: 'percentage-change-calculator',
    slug: 'percentage-change-calculator',
    name: 'Percentage Increase & Difference Calculator',
    category: 'calculator',
    description: 'Calculate percentage growth, rate of decrease, absolute differences, and relative change between values.',
    icon: 'Percent',
    tags: ['percentage change', 'percent increase', 'percent decrease', 'growth calculator'],
    popular: true,
    trending: true,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Enter the starting initial value.',
      'Enter the final comparative value.',
      'View the exact percentage increase/decrease and net numeric variance.'
    ],
    faqs: [
      {
        question: 'What is the formula for percentage change?',
        answer: '((Final Value - Initial Value) / Initial Value) × 100.'
      }
    ],
    relatedToolIds: ['percentage-calculator', 'discount-calculator', 'inflation-calculator'],
    seoTitle: 'Percentage Change Calculator - Increase & Decrease | ToolStack',
    seoDescription: 'Calculate the percentage change between two numbers with net difference and growth direction.'
  },
  {
    id: 'hex-rgb-hsl-picker',
    slug: 'hex-rgb-hsl-picker',
    name: 'Hex, RGB & HSL Color Mixer',
    category: 'developer',
    description: 'Mix red, green, blue channels with alpha transparency and get instant HEX, RGBA, and CSS values.',
    icon: 'Sliders',
    tags: ['color mixer', 'rgb to hex', 'hex color picker', 'color sliders'],
    popular: true,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Adjust the Red, Green, and Blue sliders from 0 to 255.',
      'See live color swatch update instantly.',
      'Copy HEX or RGBA formatted color codes with 1 click.'
    ],
    faqs: [
      {
        question: 'Does this support alpha transparency?',
        answer: 'Yes, RGBA values output with full opacity and alpha channel support.'
      }
    ],
    relatedToolIds: ['color-palette-generator', 'color-converter', 'box-shadow-generator'],
    seoTitle: 'Hex RGB HSL Color Mixer - Interactive Palette Picker | ToolStack',
    seoDescription: 'Mix RGB color channels with live visual preview and copy HEX and RGBA color codes.'
  },
  {
    id: 'emoji-picker-search',
    slug: 'emoji-picker-search',
    name: 'Emoji Search & Copy Picker',
    category: 'social',
    description: 'Search, browse, and copy modern unicode emojis with keyword filtering and quick copy.',
    icon: 'Sparkles',
    tags: ['emoji picker', 'search emojis', 'copy emoji', 'social emojis'],
    popular: true,
    trending: true,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Type keywords like "fire", "rocket", "star", or "code" into the search bar.',
      'Click any emoji to copy it straight to your clipboard.',
      'Paste into commit messages, tweets, emails, or chat applications.'
    ],
    faqs: [
      {
        question: 'Are these compatible with mobile and web?',
        answer: 'Yes, these are standard Unicode characters recognized across iOS, Android, Windows, and macOS.'
      }
    ],
    relatedToolIds: ['bio-generator', 'hashtag-generator', 'character-frequency-analyzer'],
    seoTitle: 'Emoji Search & Copy Picker - Fast Unicode Emojis | ToolStack',
    seoDescription: 'Search and 1-click copy emojis for social media, marketing, and developer commit messages.'
  },
  {
    id: 'base64-image-previewer',
    slug: 'base64-image-previewer',
    name: 'Base64 Image Decoder & Previewer',
    category: 'developer',
    description: 'Decode and preview Base64 data URI image strings with instant rendering and inspection.',
    icon: 'Layers',
    tags: ['base64 image', 'decode base64 image', 'data uri preview', 'inline image'],
    popular: false,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Paste your data:image/...;base64,... string into the input box.',
      'Preview the decoded image in real time.',
      'Verify image integrity before embedding in HTML or CSS.'
    ],
    faqs: [
      {
        question: 'What formats are supported?',
        answer: 'PNG, JPEG, WebP, SVG, and GIF data URIs.'
      }
    ],
    relatedToolIds: ['base64-encoder', 'image-format-converter', 'svg-to-jsx'],
    seoTitle: 'Base64 Image Decoder & Previewer - Test Data URIs | ToolStack',
    seoDescription: 'Paste Base64 data URI strings to decode and preview images safely in your browser.'
  },
  {
    id: 'html-table-to-markdown',
    slug: 'html-table-to-markdown',
    name: 'HTML Table to Markdown Converter',
    category: 'developer',
    description: 'Convert raw HTML table elements and table tags into clean GitHub Flavored Markdown (GFM) tables.',
    icon: 'FileText',
    tags: ['html to markdown table', 'table converter', 'gfm table', 'markdown table maker'],
    popular: true,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Paste an HTML table snippet with <table>, <thead>, and <tbody> elements.',
      'The tool automatically extracts column headers and cell rows.',
      'Copy the formatted Markdown table ready for GitHub or documentation.'
    ],
    faqs: [
      {
        question: 'Does this handle tables without headers?',
        answer: 'Yes, if no <th> is found, the first row is automatically treated as column headers.'
      }
    ],
    relatedToolIds: ['lorem-markdown-generator', 'markdown-previewer', 'csv-to-json'],
    seoTitle: 'HTML Table to Markdown Converter - GFM Tables | ToolStack',
    seoDescription: 'Convert HTML table code into clean GitHub Flavored Markdown tables with 1-click copy.'
  },
  {
    id: 'meta-viewport-tag-generator',
    slug: 'meta-viewport-tag-generator',
    name: 'Meta Viewport Tag Generator',
    category: 'seo',
    description: 'Generate responsive HTML meta viewport tags with custom scaling, device width, and notch cover options.',
    icon: 'Monitor',
    tags: ['meta viewport', 'responsive meta tag', 'viewport-fit cover', 'mobile meta tag'],
    popular: false,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Configure viewport width (default: device-width).',
      'Set user scalability preferences (accessible zoom vs locked).',
      'Select viewport-fit (cover for modern notch displays).',
      'Copy the generated <meta> tag for your index.html <head>.'
    ],
    faqs: [
      {
        question: 'Why is viewport-fit=cover used?',
        answer: 'It enables your web page to expand across the full display on iPhone notch and Dynamic Island devices.'
      }
    ],
    relatedToolIds: ['meta-tag-generator', 'screen-resolution-detector', 'open-graph-preview'],
    seoTitle: 'Meta Viewport Tag Generator - Responsive HTML Tags | ToolStack',
    seoDescription: 'Generate standards-compliant HTML meta viewport tags for responsive web development.'
  },
  {
    id: 'text-morse-audio-player',
    slug: 'text-morse-audio-player',
    name: 'Morse Code Audio Synthesizer',
    category: 'converter',
    description: 'Encode text into Morse code dots and dashes with real-time Web Audio API audio playback tone beeps.',
    icon: 'Activity',
    tags: ['morse audio', 'morse code player', 'morse beeps', 'audio synthesizer'],
    popular: false,
    trending: true,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Type any message or phrase in plain text.',
      'Inspect the Morse translation formatted with dots and dashes.',
      'Click Play Morse Audio to hear real acoustic 650Hz CW telegraph tones in real time.'
    ],
    faqs: [
      {
        question: 'How does audio playback work?',
        answer: 'It uses the browser Web Audio API oscillator to synthesize telegraph beeps without external audio files.'
      }
    ],
    relatedToolIds: ['morse-code', 'binary-text', 'word-scrambler-anagram'],
    seoTitle: 'Morse Code Audio Synthesizer - Listen to Morse Code | ToolStack',
    seoDescription: 'Convert text to Morse code and listen to realistic telegraph beeps synthesized in browser.'
  },
  {
    id: 'unix-file-permissions-calc',
    slug: 'unix-file-permissions-calc',
    name: 'Unix chmod Permissions Calculator',
    category: 'developer',
    description: 'Calculate Unix/Linux file permissions with interactive read/write/execute checkboxes and octal chmod output.',
    icon: 'Lock',
    tags: ['chmod calculator', 'unix permissions', 'octal permissions', 'file permissions 755'],
    popular: true,
    trending: true,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Check or uncheck Read (r), Write (w), and Execute (x) for Owner, Group, and Public.',
      'See real-time octal notation (e.g. 755, 644, 777) and symbolic string (-rwxr-xr-x).',
      'Copy the ready-to-run chmod command.'
    ],
    faqs: [
      {
        question: 'What does chmod 755 mean?',
        answer: 'Owner has full read, write, and execute rights (7); Group and Public can read and execute (5).'
      }
    ],
    relatedToolIds: ['dockerfile-builder', 'env-file-auditor', 'git-command-generator'],
    seoTitle: 'Unix chmod Permissions Calculator - Octal & Symbolic | ToolStack',
    seoDescription: 'Calculate chmod permissions with interactive checkboxes for Owner, Group, and Others.'
  },
  {
    id: 'css-triangle-generator',
    slug: 'css-triangle-generator',
    name: 'CSS Triangle & Arrow Generator',
    category: 'developer',
    description: 'Generate pure CSS border-trick triangles and chevrons with custom orientation, size, and color.',
    icon: 'Layers',
    tags: ['css triangle', 'css arrow', 'border triangle', 'css generator'],
    popular: false,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Select the triangle direction (Top, Bottom, Left, or Right).',
      'View the real-time geometric preview.',
      'Copy the generated zero-width border CSS snippet.'
    ],
    faqs: [
      {
        question: 'How do CSS border triangles work?',
        answer: 'By collapsing width and height to 0 and styling adjacent borders as transparent.'
      }
    ],
    relatedToolIds: ['box-shadow-generator', 'css-cursor-previewer', 'css-mesh-generator'],
    seoTitle: 'CSS Triangle Generator - Pure CSS Arrow Snippets | ToolStack',
    seoDescription: 'Create pure CSS triangles pointing in any direction with zero dependencies and copyable code.'
  },
  {
    id: 'speed-distance-time-calc',
    slug: 'speed-distance-time-calc',
    name: 'Speed, Distance & Time Calculator',
    category: 'calculator',
    description: 'Solve for vehicle speed, travel distance, or trip duration with kinematic physics formulas.',
    icon: 'TrendingUp',
    tags: ['speed calculator', 'distance time calculator', 'travel duration', 'velocity solver'],
    popular: true,
    trending: false,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Choose which parameter to solve for (Speed, Distance, or Time).',
      'Input the two known values.',
      'View the calculated result with accurate units.'
    ],
    faqs: [
      {
        question: 'What formulas are used?',
        answer: 'Speed = Distance / Time; Distance = Speed × Time; Time = Distance / Speed.'
      }
    ],
    relatedToolIds: ['percentage-calculator', 'compound-interest', 'age-calculator'],
    seoTitle: 'Speed Distance Time Calculator - Kinematics Solver | ToolStack',
    seoDescription: 'Calculate speed, distance, or travel time with instant formula solving and clean results.'
  },
  {
    id: 'list-sorter-deduplicator',
    slug: 'list-sorter-deduplicator',
    name: 'List Sorter & Deduplicator',
    category: 'text',
    description: 'Sort item lists alphabetically, by length, or reversed; strip duplicate entries; and trim whitespace.',
    icon: 'Sliders',
    tags: ['list sorter', 'remove duplicates', 'deduplicate list', 'alphabetize list'],
    popular: true,
    trending: true,
    badge: 'New',
    isNew: true,
    requiresAuth: false,
    howToUse: [
      'Paste your multiline list of items.',
      'Toggle duplicate removal and whitespace trimming.',
      'Choose sorting order (A to Z, Z to A, or length) and copy cleaned output.'
    ],
    faqs: [
      {
        question: 'Does this preserve unique casing?',
        answer: 'Exact duplicates are merged while preserving clean single representations.'
      }
    ],
    relatedToolIds: ['case-converter-pro', 'word-counter', 'character-frequency-analyzer'],
    seoTitle: 'List Sorter & Deduplicator - Clean Itemized Lists | ToolStack',
    seoDescription: 'Sort, alphabetize, and remove duplicate entries from multiline text lists online.'
  },

  // ==========================================
  // 20 NEW ADVANCED MEMBER TOOLS (LOGIN REQUIRED)
  // ==========================================
  {
    id: 'webhook-tester-simulator',
    slug: 'webhook-tester-simulator',
    name: 'Webhook Signature & HMAC Simulator',
    category: 'developer',
    description: 'Simulate and verify HMAC SHA-256 webhook signatures for Stripe, GitHub, and Shopify webhooks.',
    icon: 'ShieldCheck',
    tags: ['webhook tester', 'hmac sha256', 'stripe webhook', 'github signature'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Sign in to access advanced webhook diagnostic tools.',
      'Provide your secret signing key and sample JSON webhook body.',
      'Inspect the computed HMAC-SHA256 signature and test verification algorithms.'
    ],
    faqs: [
      {
        question: 'Why is webhook signing important?',
        answer: 'It guarantees that incoming HTTP webhook payloads genuinely originated from Stripe or GitHub and were not tampered with.'
      }
    ],
    relatedToolIds: ['api-tester', 'hash-generator', 'jwt-token-signer'],
    seoTitle: 'Webhook Signature Simulator - HMAC SHA-256 Verifier | ToolStack',
    seoDescription: 'Simulate and calculate cryptographic HMAC signatures for Stripe and GitHub webhook testing.'
  },
  {
    id: 'regex-syntax-debugger',
    slug: 'regex-syntax-debugger',
    name: 'Regex Syntax Debugger & Matcher',
    category: 'developer',
    description: 'Test regular expressions against sample text with real-time match highlighting, error detection, and flags.',
    icon: 'Terminal',
    tags: ['regex tester', 'regex debugger', 'regular expression', 'pattern matcher'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Enter a regex pattern and flags (e.g. /gims).',
      'Paste your sample test string.',
      'View individual extracted matches, match counts, and syntax validity warnings.'
    ],
    faqs: [
      {
        question: 'What flags are supported?',
        answer: 'g (global), i (case insensitive), m (multiline), and s (dotAll).'
      }
    ],
    relatedToolIds: ['regex-tester', 'text-summarizer-cleaner', 'code-diff-side-by-side'],
    seoTitle: 'Regex Syntax Debugger - Live Pattern Matcher | ToolStack',
    seoDescription: 'Debug and test regular expressions in real-time with match counting and flag controls.'
  },
  {
    id: 'jwt-token-signer',
    slug: 'jwt-token-signer',
    name: 'JWT Token Signer & Builder',
    category: 'security',
    description: 'Construct and sign custom JSON Web Tokens (JWT) with HMAC-SHA256 secrets, expirations, and custom claims.',
    icon: 'Key',
    tags: ['jwt generator', 'sign jwt', 'create jwt', 'json web token builder'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Edit header JSON and payload claims (sub, name, role, exp).',
      'Provide your HMAC secret key.',
      'Generate a valid 3-part base64url signed JWT string ready for API authentication.'
    ],
    faqs: [
      {
        question: 'Are tokens signed securely?',
        answer: 'Yes, tokens use standard HS256 base64url encoding and cryptographic hashing.'
      }
    ],
    relatedToolIds: ['jwt-debugger', 'hash-generator', 'api-key-entropy-generator'],
    seoTitle: 'JWT Token Signer & Builder - Generate Signed Tokens | ToolStack',
    seoDescription: 'Create and cryptographically sign custom JWT tokens with custom payload claims and secret keys.'
  },
  {
    id: 'git-command-generator',
    slug: 'git-command-generator',
    name: 'Git Advanced Command Assistant',
    category: 'developer',
    description: 'Interactive visual builder for complex Git operations: interactive rebases, cherry-picking, and branch cleaning.',
    icon: 'Code',
    tags: ['git command builder', 'git rebase', 'cherry pick', 'git cheat sheet'],
    popular: true,
    trending: false,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Choose the Git workflow (Interactive Rebase, Cherry Pick, Soft Undo, Stash).',
      'Fill in target branch names or commit counts.',
      'Copy safe, battle-tested terminal commands with explanatory notes.'
    ],
    faqs: [
      {
        question: 'What is a soft commit reset?',
        answer: 'git reset --soft HEAD~1 undoes the commit while preserving your changes in the staging area.'
      }
    ],
    relatedToolIds: ['code-diff-side-by-side', 'curl-converter', 'dockerfile-builder'],
    seoTitle: 'Git Advanced Command Assistant - Visual Git Builder | ToolStack',
    seoDescription: 'Build complex Git commands for rebasing, cherry picking, and branch hygiene easily.'
  },
  {
    id: 'user-agent-device-auditor',
    slug: 'user-agent-device-auditor',
    name: 'Deep User-Agent & Hardware Auditor',
    category: 'security',
    description: 'Deep audit of client User-Agent strings, browser engines, operating systems, and client hints.',
    icon: 'ShieldCheck',
    tags: ['user agent auditor', 'browser detector', 'client hints', 'device audit'],
    popular: false,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Inspect your own browser User-Agent or paste any custom client string.',
      'Analyze detected browser family, layout engine, operating system, and form factor.',
      'Diagnose bot signatures and compatibility profiles.'
    ],
    faqs: [
      {
        question: 'Can User-Agents be spoofed?',
        answer: 'Yes, User-Agent headers can be overridden by scrapers or web extensions, which is why client hints and feature detection are recommended.'
      }
    ],
    relatedToolIds: ['user-agent-parser', 'screen-resolution-detector', 'ssl-checker'],
    seoTitle: 'Deep User-Agent Auditor - Browser & OS Decoder | ToolStack',
    seoDescription: 'Decode and audit browser User-Agent strings, operating systems, and rendering engines.'
  },
  {
    id: 'content-security-policy-builder',
    slug: 'content-security-policy-builder',
    name: 'Content Security Policy (CSP) Builder',
    category: 'security',
    description: 'Build strict CSP HTTP security headers to protect web applications from XSS and data injection attacks.',
    icon: 'Lock',
    tags: ['csp builder', 'content security policy', 'csp header', 'xss protection'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Specify allowed source domains for script-src, connect-src, and style-src.',
      'Configure frame-ancestors to prevent clickjacking.',
      'Copy the ready-to-use HTTP header or HTML meta tag.'
    ],
    faqs: [
      {
        question: 'Why is CSP crucial?',
        answer: 'It restricts the sources of scripts and network requests, rendering most Cross-Site Scripting (XSS) attacks harmless.'
      }
    ],
    relatedToolIds: ['cors-header-builder', 'ssl-checker', 'dns-lookup'],
    seoTitle: 'CSP Builder - Content Security Policy Generator | ToolStack',
    seoDescription: 'Generate secure Content Security Policy headers to shield web applications from XSS vulnerabilities.'
  },
  {
    id: 'sql-to-typescript-converter',
    slug: 'sql-to-typescript-converter',
    name: 'SQL Schema to TypeScript Converter',
    category: 'developer',
    description: 'Convert SQL CREATE TABLE definitions into typed TypeScript interfaces and data models.',
    icon: 'FileCode',
    tags: ['sql to typescript', 'sql to ts', 'database to typescript', 'type generator'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Paste your SQL CREATE TABLE query.',
      'The tool maps SQL columns (UUID, VARCHAR, INT, TIMESTAMP, BOOLEAN) into TypeScript types.',
      'Copy the generated export interface code directly into your project.'
    ],
    faqs: [
      {
        question: 'Are nullable columns handled?',
        answer: 'Yes! Columns without NOT NULL are automatically marked as optional (?) in TypeScript.'
      }
    ],
    relatedToolIds: ['sql-formatter-pro', 'json-schema-validator', 'svg-to-jsx'],
    seoTitle: 'SQL Schema to TypeScript Converter - Type Generator | ToolStack',
    seoDescription: 'Convert PostgreSQL and MySQL table definitions into strongly-typed TypeScript interfaces.'
  },
  {
    id: 'dockerfile-builder',
    slug: 'dockerfile-builder',
    name: 'Multi-Stage Dockerfile Builder',
    category: 'developer',
    description: 'Generate production-hardened multi-stage Dockerfiles with non-root security and minimal image size.',
    icon: 'Terminal',
    tags: ['dockerfile generator', 'docker builder', 'multi-stage docker', 'container generator'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Select runtime base (Node.js Alpine) and target port.',
      'Review the generated multi-stage Dockerfile containing builder and slim runner stages.',
      'Copy the Dockerfile to compile small, secure container images.'
    ],
    faqs: [
      {
        question: 'Why use multi-stage builds?',
        answer: 'They keep development dependencies and build tools out of the final production container, reducing image size and attack surface.'
      }
    ],
    relatedToolIds: ['docker-compose-generator', 'unix-file-permissions-calc', 'env-file-auditor'],
    seoTitle: 'Multi-Stage Dockerfile Builder - Secure Container Maker | ToolStack',
    seoDescription: 'Generate optimized multi-stage Dockerfiles for Node.js and web services with security best practices.'
  },
  {
    id: 'env-file-auditor',
    slug: 'env-file-auditor',
    name: '.env Syntax & Secret Leak Auditor',
    category: 'developer',
    description: 'Audit environment variable files for syntax errors, unquoted spaces, duplicate keys, and exposed API keys.',
    icon: 'ShieldCheck',
    tags: ['env validator', 'env auditor', 'dotenv check', 'secret leak detection'],
    popular: true,
    trending: false,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Paste the content of your .env configuration.',
      'Review the automated diagnosis for duplicate definitions, unquoted values with spaces, and potential raw keys.',
      'Fix flagged issues to prevent runtime container crashes.'
    ],
    faqs: [
      {
        question: 'Are my environment secrets uploaded?',
        answer: 'No, all auditing happens strictly in your browser memory.'
      }
    ],
    relatedToolIds: ['api-key-entropy-generator', 'dockerfile-builder', 'jwt-token-signer'],
    seoTitle: '.env File Auditor - Syntax & Secret Leak Checker | ToolStack',
    seoDescription: 'Audit your .env files for syntax errors, duplicate keys, and potential leaked API keys.'
  },
  {
    id: 'http-status-code-guide',
    slug: 'http-status-code-guide',
    name: 'HTTP Status Code Diagnostic Guide',
    category: 'developer',
    description: 'Searchable reference guide of all 60+ HTTP status codes with RFC specifications and troubleshooting tips.',
    icon: 'Search',
    tags: ['http status codes', '404 not found', '500 error', 'http reference'],
    popular: true,
    trending: false,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Search by status code number (e.g. 429, 502) or description name.',
      'Read official RFC meanings, caching directives, and practical developer troubleshooting advice.',
      'Quickly resolve backend routing and proxy errors.'
    ],
    faqs: [
      {
        question: 'What is the difference between 401 and 403?',
        answer: '401 Unauthorized means authentication is missing or invalid; 403 Forbidden means the authenticated user lacks permission.'
      }
    ],
    relatedToolIds: ['api-tester', 'ssl-checker', 'dns-lookup'],
    seoTitle: 'HTTP Status Code Diagnostic Guide - Full RFC Reference | ToolStack',
    seoDescription: 'Search and diagnose all HTTP response status codes with developer troubleshooting guidance.'
  },
  {
    id: 'markdown-to-pdf-doc',
    slug: 'markdown-to-pdf-doc',
    name: 'Markdown to PDF Document Maker',
    category: 'pdf',
    description: 'Write Markdown in a split-view editor and format it into clean, printable executive PDF reports.',
    icon: 'Printer',
    tags: ['markdown to pdf', 'print markdown', 'markdown document maker', 'pdf report'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Compose or paste your documentation in Markdown.',
      'Check the live typographic preview.',
      'Click Print / Save PDF to export formatted documents via the browser print dialogue.'
    ],
    faqs: [
      {
        question: 'Can I customize font styles?',
        answer: 'Yes, the preview uses modern sans-serif typography optimized for print.'
      }
    ],
    relatedToolIds: ['markdown-previewer', 'pdf-merge', 'invoice-generator'],
    seoTitle: 'Markdown to PDF Document Maker - Export Reports | ToolStack',
    seoDescription: 'Convert and print formatted Markdown documents as elegant executive PDF reports.'
  },
  {
    id: 'roi-investment-calculator',
    slug: 'roi-investment-calculator',
    name: 'ROI & Capital Investment Calculator',
    category: 'calculator',
    description: 'Calculate Return on Investment (ROI), annualized compound return (CAGR), and net financial profit.',
    icon: 'TrendingUp',
    tags: ['roi calculator', 'return on investment', 'cagr calculator', 'investment profit'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Input initial capital invested.',
      'Input the final return value and investment timeframe in years.',
      'View overall percentage ROI, net dollar gain, and annualized compound growth rate.'
    ],
    faqs: [
      {
        question: 'How is annualized ROI calculated?',
        answer: 'Annualized ROI uses the Compound Annual Growth Rate (CAGR) formula: (Final/Initial)^(1/Years) - 1.'
      }
    ],
    relatedToolIds: ['compound-interest', 'salary-paycheck-calculator', 'inflation-calculator'],
    seoTitle: 'ROI Investment Calculator - Calculate Return on Capital | ToolStack',
    seoDescription: 'Calculate total ROI, net profit, and annualized compound growth rate for any financial investment.'
  },
  {
    id: 'loan-amortization-schedule',
    slug: 'loan-amortization-schedule',
    name: 'Loan Amortization Schedule Solver',
    category: 'calculator',
    description: 'Calculate monthly loan payments, total interest paid over time, and repayment schedule.',
    icon: 'DollarSign',
    tags: ['loan amortization', 'mortgage schedule', 'monthly payment solver', 'interest calculator'],
    popular: true,
    trending: false,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Enter the loan principal amount.',
      'Input annual interest rate and term in years.',
      'Instantly see exact monthly payment, total interest cost, and overall payback amount.'
    ],
    faqs: [
      {
        question: 'Does this apply to mortgages and car loans?',
        answer: 'Yes, standard compound amortization applies universally to fixed-rate mortgages, personal loans, and auto financing.'
      }
    ],
    relatedToolIds: ['emi-calculator', 'roi-investment-calculator', 'compound-interest'],
    seoTitle: 'Loan Amortization Schedule Solver - Payment Calculator | ToolStack',
    seoDescription: 'Calculate monthly loan installments and total interest over time with detailed amortization metrics.'
  },
  {
    id: 'mock-data-generator',
    slug: 'mock-data-generator',
    name: 'Mock Data JSON Generator',
    category: 'developer',
    description: 'Generate realistic mock JSON datasets with user profiles, emails, roles, timestamps, and IDs.',
    icon: 'Code',
    tags: ['mock data generator', 'fake json data', 'test fixtures', 'api mock'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Select the number of mock records to create with the slider.',
      'Inspect generated user arrays with realistic names, emails, roles, and ISO timestamps.',
      'Copy clean JSON data for unit tests, frontend prototypes, or seeding databases.'
    ],
    faqs: [
      {
        question: 'Is the data randomized?',
        answer: 'Yes, it generates diverse, realistic records ready to paste into mock APIs.'
      }
    ],
    relatedToolIds: ['json-formatter', 'sql-to-typescript-converter', 'api-tester'],
    seoTitle: 'Mock Data JSON Generator - Fake API Datasets | ToolStack',
    seoDescription: 'Generate mock JSON arrays of user profiles, timestamps, and IDs for testing web applications.'
  },
  {
    id: 'cors-header-builder',
    slug: 'cors-header-builder',
    name: 'CORS Header & Security Generator',
    category: 'developer',
    description: 'Generate secure Cross-Origin Resource Sharing (CORS) headers for Nginx, Express, and Next.js backends.',
    icon: 'Lock',
    tags: ['cors generator', 'cross origin headers', 'access control allow origin', 'cors nginx'],
    popular: true,
    trending: false,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Specify permitted origin domains.',
      'Configure allowed HTTP methods and credentials support.',
      'Copy production-ready Nginx configuration blocks or Express middleware code.'
    ],
    faqs: [
      {
        question: 'What causes CORS errors in browsers?',
        answer: 'When a web app requests resources from a different origin domain that does not return appropriate Access-Control-Allow-Origin response headers.'
      }
    ],
    relatedToolIds: ['content-security-policy-builder', 'api-tester', 'ssl-checker'],
    seoTitle: 'CORS Header Builder - Cross-Origin Security Generator | ToolStack',
    seoDescription: 'Generate safe CORS response headers and Nginx directives to prevent cross-origin errors.'
  },
  {
    id: 'social-share-card-debugger',
    slug: 'social-share-card-debugger',
    name: 'Social Share Card & OG Debugger',
    category: 'social',
    description: 'Live interactive preview of how website links appear on X/Twitter Large Cards, Facebook, and LinkedIn.',
    icon: 'Share2',
    tags: ['social card preview', 'og image preview', 'twitter card debugger', 'social metadata'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Provide page title, meta description, and social image preview URL.',
      'View an accurate visual mockup of the card rendered in a social feed.',
      'Ensure images adhere to the optimal 1.91:1 aspect ratio (1200x630).'
    ],
    faqs: [
      {
        question: 'What is the recommended Open Graph image resolution?',
        answer: '1200 × 630 pixels provides sharp rendering on Retina displays and social feeds.'
      }
    ],
    relatedToolIds: ['og-previewer', 'meta-tag-generator', 'utm-campaign-generator'],
    seoTitle: 'Social Share Card Debugger - Open Graph & Twitter Preview | ToolStack',
    seoDescription: 'Preview how your web links appear on social media cards before publishing.'
  },
  {
    id: 'markdown-cheatsheet-sandbox',
    slug: 'markdown-cheatsheet-sandbox',
    name: 'Markdown Cheatsheet & Sandbox',
    category: 'text',
    description: 'Interactive Markdown editor with 1-click syntax snippets for tables, code blocks, checklists, and formatting.',
    icon: 'FileText',
    tags: ['markdown sandbox', 'markdown cheat sheet', 'markdown editor', 'gfm guide'],
    popular: true,
    trending: false,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Click cheat sheet helper buttons to insert tables, code blocks, or task items.',
      'Type or edit freely in the left pane.',
      'View instant rendered output in the synchronized right pane.'
    ],
    faqs: [
      {
        question: 'Does this support task checkboxes?',
        answer: 'Yes, - [ ] and - [x] markdown syntax is supported.'
      }
    ],
    relatedToolIds: ['markdown-previewer', 'markdown-to-pdf-doc', 'lorem-markdown-generator'],
    seoTitle: 'Markdown Cheatsheet & Sandbox - Interactive Editor | ToolStack',
    seoDescription: 'Practice Markdown syntax with live split-view editing and quick-insert helper snippets.'
  },
  {
    id: 'meeting-agenda-builder',
    slug: 'meeting-agenda-builder',
    name: 'Structured Meeting Agenda Designer',
    category: 'text',
    description: 'Build structured corporate meeting agendas with timed discussion slots, objectives, and action item trackers.',
    icon: 'Clock',
    tags: ['meeting agenda builder', 'meeting planner', 'agenda template', 'team sync'],
    popular: false,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Set meeting title and time-allocated agenda topics.',
      'Preview structured agenda outline formatted with markdown checkboxes.',
      'Copy the agenda to paste into calendar invites or team chat.'
    ],
    faqs: [
      {
        question: 'Why allocate times per topic?',
        answer: 'Timeboxing agenda slots keeps discussions focused and ensures meetings end on schedule.'
      }
    ],
    relatedToolIds: ['meeting-cost-calculator', 'pomodoro-timer', 'markdown-cheatsheet-sandbox'],
    seoTitle: 'Meeting Agenda Designer - Timeboxed Team Agendas | ToolStack',
    seoDescription: 'Design structured, timeboxed meeting agendas with actionable checklists and 1-click export.'
  },
  {
    id: 'utm-campaign-generator',
    slug: 'utm-campaign-generator',
    name: 'Multi-Channel UTM Campaign Generator',
    category: 'seo',
    description: 'Build tagged tracking URLs with campaign source, medium, and campaign name for marketing attribution.',
    icon: 'Search',
    tags: ['utm generator', 'utm builder', 'campaign url builder', 'google analytics tracking'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Enter your landing page URL.',
      'Fill in Campaign Source (e.g. newsletter, google), Medium (e.g. email, cpc), and Campaign Name.',
      'Copy the encoded tracking URL to monitor marketing conversion funnels in Google Analytics.'
    ],
    faqs: [
      {
        question: 'What are UTM parameters?',
        answer: 'Tags appended to URLs that Google Analytics reads to report exactly where web traffic originated.'
      }
    ],
    relatedToolIds: ['utm-builder', 'social-share-card-debugger', 'qr-generator'],
    seoTitle: 'Multi-Channel UTM Campaign Generator - Link Tagger | ToolStack',
    seoDescription: 'Generate clean, tagged UTM campaign tracking links for digital marketing and analytics.'
  },
  {
    id: 'api-key-entropy-generator',
    slug: 'api-key-entropy-generator',
    name: 'Cryptographic API Key & Secret Generator',
    category: 'security',
    description: 'Generate cryptographically strong API keys, webhook secrets, and bearer tokens with customizable entropy bits.',
    icon: 'Key',
    tags: ['api key generator', 'secret token generator', 'crypto random key', 'bearer token maker'],
    popular: true,
    trending: true,
    isNew: true,
    requiresAuth: true,
    badge: 'Members',
    howToUse: [
      'Configure key prefix (e.g. sk_live_, whsec_, token_).',
      'Select entropy strength (128 bits, 256 bits, or 512 bits).',
      'Generate cryptographically secure tokens using window.crypto.getRandomValues().'
    ],
    faqs: [
      {
        question: 'How secure are these generated keys?',
        answer: 'They are generated via hardware-level cryptographically secure pseudo-random number generators (CSPRNG).'
      }
    ],
    relatedToolIds: ['password-generator', 'password-strength-auditor', 'jwt-token-signer'],
    seoTitle: 'Cryptographic API Key & Secret Generator - CSPRNG Tokens | ToolStack',
    seoDescription: 'Generate cryptographically secure API keys, tokens, and secrets with custom prefixes and entropy.'
  },
  ...NEW_SUITES_TOOLS_DATA,
  ...HUNDRED_PDF_AND_IMAGE_TOOLS_DATA
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS_DATA.find(t => t.slug === slug || t.id === slug);
}

export function getToolsByCategory(catId: string): ToolItem[] {
  return TOOLS_DATA.filter(t => t.category === catId);
}

export function getRelatedTools(tool: ToolItem): ToolItem[] {
  return TOOLS_DATA.filter(t => tool.relatedToolIds.includes(t.id));
}

export const PLATFORM_STATS = {
  totalTools: TOOLS_DATA.length,
  totalCategories: CATEGORIES.length,
  freeForever: '100%',
  privacyMode: 'Local Processing'
};
