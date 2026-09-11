import { ToolItem } from '../types';

export const NEW_SUITES_TOOLS_DATA: ToolItem[] = [
  // ==========================================
  // FLAGSHIP TOOLS: BUSINESS CARD & QR WITH LOGO
  // ==========================================
  {
    id: 'business-card-maker',
    slug: 'business-card-maker',
    name: 'Business Card Maker Studio',
    category: 'image',
    description: 'Design professional double-sided business cards with custom logo upload, integrated vCard QR codes, and 300 DPI print export.',
    icon: 'CreditCard',
    tags: ['business card', 'card maker', 'vcard', 'qr code', 'branding', 'print', 'stationery'],
    popular: true,
    trending: true,
    badge: 'Flagship',
    howToUse: [
      'Fill in your name, job title, company, and contact coordinates.',
      'Upload your brand logo (which automatically scales onto the card and inside the QR code).',
      'Select a luxury, modern minimal, tech dark, or corporate theme.',
      'Preview both Front and Back sides with the 3D flip card toggle.',
      'Export high-resolution 300 DPI PNGs or print-ready 2-page PDF.'
    ],
    faqs: [
      {
        question: 'What dimensions are used for the cards?',
        answer: 'It uses standard US business card dimensions of 3.5" × 2.0" at 300 DPI (1050 × 600 pixels) with safe margins.'
      },
      {
        question: 'Does the QR code work when scanned by smartphones?',
        answer: 'Yes! It generates standard vCard 3.0 contact cards. When scanned with iOS or Android camera apps, it prompts to instantly save your contact card.'
      }
    ],
    relatedToolIds: ['qr-code-logo-generator', 'image-round-corner-avatar', 'pdf-invoice-template-builder'],
    seoTitle: 'Free Business Card Maker with Logo and QR Code | ToolStack',
    seoDescription: 'Create custom professional double-sided business cards online. Upload your logo, embed dynamic vCard QR codes, and export 300 DPI print-ready files.'
  },
  {
    id: 'qr-code-logo-generator',
    slug: 'qr-code-logo-generator',
    name: 'QR Code Generator with Logo',
    category: 'image',
    description: 'Create branded QR codes with your custom company logo centered, high error-correction resilience, and color palettes.',
    icon: 'QrCode',
    tags: ['qr code', 'logo qr', 'branded qr', 'vcard', 'wifi qr', 'barcode', 'generator'],
    popular: true,
    trending: true,
    badge: 'Popular',
    howToUse: [
      'Choose your data type: Website URL, Contact vCard, Wi-Fi password, or Email.',
      'Enter the destination text or details.',
      'Upload your logo or emblem image (PNG, SVG, or JPG).',
      'Adjust logo size, badge border shape, and custom foreground/background colors.',
      'Download high-DPI scannable PNG or copy directly to clipboard.'
    ],
    faqs: [
      {
        question: 'How can a QR code scan reliably with a logo covering the center?',
        answer: 'We configure Level H (High) Reed-Solomon error correction, allowing up to 30% of the QR matrix to be replaced by the logo while remaining 100% readable.'
      },
      {
        question: 'Can I generate Wi-Fi login QR codes with my logo?',
        answer: 'Yes! Select the Wi-Fi option, enter your network SSID and password, and guests can connect instantly.'
      }
    ],
    relatedToolIds: ['business-card-maker', 'image-watermark-overlay', 'image-svg-data-url-converter'],
    seoTitle: 'QR Code Generator with Custom Logo Online Free | ToolStack',
    seoDescription: 'Generate custom QR codes with company logo in center. High error correction H level ensures 100% scan rate. Free high-resolution downloads.'
  },

  // ==========================================
  // 20 NEW PDF TOOLS
  // ==========================================
  {
    id: 'pdf-watermark-stamper',
    slug: 'pdf-watermark-stamper',
    name: 'PDF Watermark & Stamp Studio',
    category: 'pdf',
    description: 'Apply custom text watermarks, confidential stamps, opacity, and rotation across all pages of your PDF document.',
    icon: 'Stamp',
    tags: ['pdf', 'watermark', 'stamp', 'confidential', 'security', 'copyright'],
    popular: true,
    badge: 'New',
    howToUse: [
      'Upload your target PDF document.',
      'Type your watermark phrase (e.g., CONFIDENTIAL, DRAFT, PROPRIETARY).',
      'Adjust opacity and angle slider.',
      'Click Execute to stamp all pages and download.'
    ],
    faqs: [
      {
        question: 'Does this alter the existing text inside the PDF?',
        answer: 'No, watermarks are composited as vector overlay layers without modifying underlying text streams.'
      }
    ],
    relatedToolIds: ['pdf-page-numberer', 'pdf-protect-password', 'pdf-header-footer-annotator'],
    seoTitle: 'PDF Watermark Stamper - Add Watermarks to PDF Online | ToolStack',
    seoDescription: 'Add custom text watermarks and confidential stamps to PDF files online for free. Adjust opacity, rotation, and font size.'
  },
  {
    id: 'pdf-page-numberer',
    slug: 'pdf-page-numberer',
    name: 'PDF Page Numberer & Paginate',
    category: 'pdf',
    description: 'Insert neat "Page X of Y" or sequential numbers into headers or footers across your entire PDF document.',
    icon: 'Hash',
    tags: ['pdf', 'page number', 'paginate', 'header', 'footer', 'numbering'],
    trending: true,
    badge: 'New',
    howToUse: [
      'Upload your PDF document.',
      'Choose numbering format ("Page X of Y" or single numbers).',
      'Select placement position (Bottom Center, Bottom Right, Top Right).',
      'Process and download the paginated document.'
    ],
    faqs: [
      {
        question: 'Can I customize the numbering location?',
        answer: 'Yes, you can place numbers at bottom-center, bottom-right, or top-right with automatic margin calculation.'
      }
    ],
    relatedToolIds: ['pdf-watermark-stamper', 'pdf-header-footer-annotator', 'pdf-merge'],
    seoTitle: 'PDF Page Numberer - Add Page Numbers to PDF Online | ToolStack',
    seoDescription: 'Add page numbers to PDF documents online. Custom positioning, Page X of Y formats, 100% private in-browser pagination.'
  },
  {
    id: 'pdf-page-rotator',
    slug: 'pdf-page-rotator',
    name: 'PDF Page Rotator & Fixer',
    category: 'pdf',
    description: 'Fix upside-down or sideways pages by rotating 90°, 180°, or 270° across all pages, odd pages, or even pages.',
    icon: 'RotateCw',
    tags: ['pdf', 'rotate', 'orientation', 'landscape', 'portrait', 'fix pages'],
    badge: 'New',
    howToUse: [
      'Upload the PDF with misaligned orientations.',
      'Select rotation degrees (+90°, +180°, +270°).',
      'Choose to rotate all pages, odd pages only, or even pages only.',
      'Process and download your correctly oriented PDF.'
    ],
    faqs: [
      {
        question: 'Does rotating reduce the visual quality of scanned pages?',
        answer: 'No, rotation updates the PDF coordinate matrix directly without recompressing images or text.'
      }
    ],
    relatedToolIds: ['pdf-page-reorder', 'pdf-reverse-order', 'pdf-delete-pages'],
    seoTitle: 'Rotate PDF Online - Free PDF Orientation Fixer | ToolStack',
    seoDescription: 'Rotate PDF pages permanently online for free. Fix portrait and landscape orientations with one click.'
  },
  {
    id: 'pdf-page-reorder',
    slug: 'pdf-page-reorder',
    name: 'PDF Page Reorder & Organizer',
    category: 'pdf',
    description: 'Rearrange and reorganize the flow of pages within any PDF document quickly and reliably.',
    icon: 'ArrowUpDown',
    tags: ['pdf', 'reorder', 'organize', 'sort', 'arrange pages'],
    badge: 'New',
    howToUse: [
      'Upload your document.',
      'Specify the desired page sequence or use reverse tools.',
      'Process to output the reorganized document.'
    ],
    faqs: [
      {
        question: 'Can I repeat or duplicate pages during reorder?',
        answer: 'Yes, entering the same page number multiple times will duplicate that page into the new document.'
      }
    ],
    relatedToolIds: ['pdf-reverse-order', 'pdf-delete-pages', 'pdf-extract-pages'],
    seoTitle: 'Reorder PDF Pages Online Free | ToolStack',
    seoDescription: 'Organize and reorder pages in your PDF documents. Fast, secure, client-side reordering with zero file uploads.'
  },
  {
    id: 'pdf-delete-pages',
    slug: 'pdf-delete-pages',
    name: 'PDF Delete Pages & Trimmer',
    category: 'pdf',
    description: 'Remove unwanted pages, blank scans, or confidential sheets from any PDF file with page range selection.',
    icon: 'Trash2',
    tags: ['pdf', 'delete', 'remove', 'pages', 'trim', 'cut'],
    popular: true,
    badge: 'New',
    howToUse: [
      'Upload the PDF document you want to trim.',
      'Enter the page numbers to remove (e.g., "1, 4, 7").',
      'Click Execute to trim pages and download clean PDF.'
    ],
    faqs: [
      {
        question: 'Can I delete multiple pages at once?',
        answer: 'Yes, list comma-separated page numbers to purge them simultaneously.'
      }
    ],
    relatedToolIds: ['pdf-extract-pages', 'pdf-split', 'pdf-page-reorder'],
    seoTitle: 'Delete PDF Pages Online - Free PDF Trimmer | ToolStack',
    seoDescription: 'Remove unwanted pages from PDF files online for free. Delete single or multiple pages securely in your browser.'
  },
  {
    id: 'pdf-protect-password',
    slug: 'pdf-protect-password',
    name: 'PDF Password Protect & Encryption',
    category: 'pdf',
    description: 'Encrypt your PDF documents with standard security keys to restrict unauthorized viewing and printing.',
    icon: 'Lock',
    tags: ['pdf', 'protect', 'password', 'encrypt', 'security', 'lock'],
    badge: 'New',
    howToUse: [
      'Upload the PDF file to encrypt.',
      'Enter your desired access password.',
      'Process to apply standard PDF cryptographic wrapper.'
    ],
    faqs: [
      {
        question: 'Can ToolStack see my password or file?',
        answer: 'Never! All encryption routines execute directly inside your browser WebAssembly sandbox.'
      }
    ],
    relatedToolIds: ['pdf-metadata-stripper', 'pdf-watermark-stamper', 'password-generator'],
    seoTitle: 'Password Protect PDF Online - Encrypt PDF Documents | ToolStack',
    seoDescription: 'Protect PDF files with strong passwords online. 100% private client-side encryption.'
  },
  {
    id: 'pdf-metadata-editor',
    slug: 'pdf-metadata-editor',
    name: 'PDF Metadata & Properties Editor',
    category: 'pdf',
    description: 'Inspect and edit document Title, Author, Subject, Keywords, Creator, and Producer metadata tags.',
    icon: 'FileText',
    tags: ['pdf', 'metadata', 'title', 'author', 'properties', 'tags'],
    badge: 'New',
    howToUse: [
      'Upload your PDF document.',
      'Update fields such as Document Title, Author, Subject, and Keywords.',
      'Download your PDF with clean updated metadata tags.'
    ],
    faqs: [
      {
        question: 'Why edit PDF metadata?',
        answer: 'Correct metadata ensures accurate citations in search engines, e-readers, and academic reference managers.'
      }
    ],
    relatedToolIds: ['pdf-metadata-stripper', 'seo-meta-tag-generator', 'pdf-text-extractor'],
    seoTitle: 'PDF Metadata Editor - Edit PDF Properties Online | ToolStack',
    seoDescription: 'Edit PDF Title, Author, Subject, and Keywords online for free. Update PDF document properties in seconds.'
  },
  {
    id: 'pdf-metadata-stripper',
    slug: 'pdf-metadata-stripper',
    name: 'PDF Privacy & Exif Metadata Stripper',
    category: 'pdf',
    description: 'Scrub all hidden author names, software identifiers, creation timestamps, and tracking tags for anonymous sharing.',
    icon: 'ShieldCheck',
    tags: ['pdf', 'strip', 'clean', 'privacy', 'sanitize', 'exif', 'metadata'],
    popular: true,
    badge: 'New',
    howToUse: [
      'Upload any PDF with sensitive author or company metadata.',
      'Click Execute to purge all embedded metadata dictionaries.',
      'Download your sanitized, privacy-safe document.'
    ],
    faqs: [
      {
        question: 'Does this remove text or images from the document?',
        answer: 'No, only non-visible metadata streams (author name, software version, editing history) are wiped.'
      }
    ],
    relatedToolIds: ['pdf-metadata-editor', 'pdf-protect-password', 'image-pixelator-blur-redact'],
    seoTitle: 'Strip PDF Metadata Online - Sanitize PDF Documents | ToolStack',
    seoDescription: 'Remove hidden metadata, author information, and revision history from PDF files for privacy and anonymous distribution.'
  },
  {
    id: 'pdf-resize-pages',
    slug: 'pdf-resize-pages',
    name: 'PDF Page Resizer (A4 / US Letter)',
    category: 'pdf',
    description: 'Standardize mismatched scanned pages to uniform international A4, US Letter, or US Legal dimensions.',
    icon: 'Maximize2',
    tags: ['pdf', 'resize', 'a4', 'letter', 'legal', 'dimensions', 'format'],
    badge: 'New',
    howToUse: [
      'Upload the PDF with irregular or non-standard page sizes.',
      'Select your target standard: A4, US Letter, or US Legal.',
      'Process to normalize all page dimensions across the document.'
    ],
    faqs: [
      {
        question: 'What are the dimensions of A4 vs US Letter in points?',
        answer: 'A4 is 595.28 × 841.89 points, while US Letter is 612 × 792 points.'
      }
    ],
    relatedToolIds: ['pdf-margin-adjuster', 'pdf-booklet-maker', 'pdf-blank-page-inserter'],
    seoTitle: 'Resize PDF Pages Online - Convert to A4 or US Letter | ToolStack',
    seoDescription: 'Standardize PDF page sizes to standard A4, US Letter, or Legal formats online for free.'
  },
  {
    id: 'pdf-blank-page-inserter',
    slug: 'pdf-blank-page-inserter',
    name: 'PDF Blank Page Inserter',
    category: 'pdf',
    description: 'Insert empty spacer pages at the beginning, end, or after specific pages for duplex booklet printing.',
    icon: 'Plus',
    tags: ['pdf', 'blank page', 'insert', 'add page', 'duplex', 'booklet'],
    badge: 'New',
    howToUse: [
      'Upload your PDF document.',
      'Choose insertion position: at start, at end, or after page number.',
      'Process to add the clean blank page.'
    ],
    faqs: [
      {
        question: 'Why insert blank pages into PDFs?',
        answer: 'Essential for double-sided booklet printing so chapter headings always begin on odd right-hand pages.'
      }
    ],
    relatedToolIds: ['pdf-booklet-maker', 'pdf-page-reorder', 'pdf-delete-pages'],
    seoTitle: 'Insert Blank Page into PDF Online Free | ToolStack',
    seoDescription: 'Add blank pages to your PDF document at custom positions for duplex printing and booklet layout.'
  },
  {
    id: 'pdf-extract-pages',
    slug: 'pdf-extract-pages',
    name: 'PDF Page Extractor & Range Exporter',
    category: 'pdf',
    description: 'Extract specific pages or page intervals (e.g. 1, 3-5, 8) into a standalone compact PDF file.',
    icon: 'Scissors',
    tags: ['pdf', 'extract', 'range', 'slice', 'pages', 'export'],
    popular: true,
    badge: 'New',
    howToUse: [
      'Upload the master PDF.',
      'Enter target page ranges (e.g. "1, 3-5, 9").',
      'Download your extracted PDF containing only the chosen pages.'
    ],
    faqs: [
      {
        question: 'Can I extract non-consecutive pages?',
        answer: 'Yes, comma-separate discrete numbers or hyphenated ranges like "1, 3-4, 7-9".'
      }
    ],
    relatedToolIds: ['pdf-split', 'pdf-delete-pages', 'pdf-page-reorder'],
    seoTitle: 'Extract Pages from PDF Online - Free PDF Extractor | ToolStack',
    seoDescription: 'Extract specific pages or page ranges from any PDF online. Free, secure, in-browser PDF extraction.'
  },
  {
    id: 'pdf-grayscale-converter',
    slug: 'pdf-grayscale-converter',
    name: 'PDF Grayscale & B/W Printer Mode',
    category: 'pdf',
    description: 'Convert colorful documents into black & white / grayscale mode for economic toner and printer usage.',
    icon: 'Printer',
    tags: ['pdf', 'grayscale', 'black and white', 'print', 'toner', 'eco'],
    badge: 'New',
    howToUse: [
      'Upload any color-heavy PDF document.',
      'Click Execute to apply the grayscale printing filter.',
      'Download the monochrome-ready PDF.'
    ],
    faqs: [
      {
        question: 'Does this save printer ink and toner?',
        answer: 'Yes! Grayscale documents prevent your printer from using expensive color inks on background elements.'
      }
    ],
    relatedToolIds: ['pdf-compress', 'pdf-resize-pages', 'image-filter-studio'],
    seoTitle: 'Convert PDF to Grayscale Online - Black & White PDF | ToolStack',
    seoDescription: 'Convert color PDF documents to grayscale black and white online. Save printer toner and ink easily.'
  },
  {
    id: 'pdf-header-footer-annotator',
    slug: 'pdf-header-footer-annotator',
    name: 'PDF Header & Footer Annotator',
    category: 'pdf',
    description: 'Add official corporate headers, confidential ribbons, dates, and classification banners to every page.',
    icon: 'Type',
    tags: ['pdf', 'header', 'footer', 'annotator', 'ribbon', 'banner'],
    badge: 'New',
    howToUse: [
      'Upload your PDF document.',
      'Configure header annotation ribbon.',
      'Process to draw unified classification headers across all pages.'
    ],
    faqs: [
      {
        question: 'Can this be used for legal or compliance banners?',
        answer: 'Yes, ideal for stamping "ATTORNEY-CLIENT PRIVILEGE" or "CONFIDENTIAL" banners.'
      }
    ],
    relatedToolIds: ['pdf-watermark-stamper', 'pdf-page-numberer', 'pdf-metadata-editor'],
    seoTitle: 'Add Header and Footer to PDF Online | ToolStack',
    seoDescription: 'Add professional headers, footers, and confidential classification ribbons to PDF documents online.'
  },
  {
    id: 'pdf-extract-images',
    slug: 'pdf-extract-images',
    name: 'PDF Image & Asset Extractor',
    category: 'pdf',
    description: 'Inspect, extract, and catalog embedded raster illustrations and photo assets from PDF documents.',
    icon: 'FileImage',
    tags: ['pdf', 'extract images', 'photos', 'export', 'assets', 'graphics'],
    badge: 'New',
    howToUse: [
      'Upload any PDF containing photos or diagrams.',
      'Process the document structure.',
      'Download extracted imagery packages.'
    ],
    faqs: [
      {
        question: 'Does this extract vector icons as well?',
        answer: 'It inspects embedded raster bitmaps (JPEG, PNG streams) at their original native resolution.'
      }
    ],
    relatedToolIds: ['pdf-to-jpg', 'jpg-to-pdf', 'image-compressor'],
    seoTitle: 'Extract Images from PDF Online Free | ToolStack',
    seoDescription: 'Extract all embedded images, diagrams, and photos from PDF files online without losing quality.'
  },
  {
    id: 'pdf-form-flattener',
    slug: 'pdf-form-flattener',
    name: 'PDF Form Flattener',
    category: 'pdf',
    description: 'Flatten interactive fillable form fields and annotations into permanent, read-only vector document text.',
    icon: 'Layers',
    tags: ['pdf', 'flatten', 'form', 'vector', 'lock', 'acroforms'],
    badge: 'New',
    howToUse: [
      'Upload your filled AcroForm or application document.',
      'Click Execute to merge form field inputs directly into the page content stream.',
      'Download your immutable, tamper-resistant PDF.'
    ],
    faqs: [
      {
        question: 'What does flattening a PDF form do?',
        answer: 'It converts interactive textboxes and checkboxes into permanent non-editable graphics so they cannot be altered.'
      }
    ],
    relatedToolIds: ['pdf-protect-password', 'pdf-metadata-stripper', 'pdf-watermark-stamper'],
    seoTitle: 'Flatten PDF Forms Online - Lock Form Fields | ToolStack',
    seoDescription: 'Flatten fillable PDF forms online. Lock interactive form inputs and signature fields into uneditable vector pages.'
  },
  {
    id: 'pdf-margin-adjuster',
    slug: 'pdf-margin-adjuster',
    name: 'PDF Margin & Padding Adjuster',
    category: 'pdf',
    description: 'Add generous outer margins or binding punch-hole padding so printed text is never cut off in binders.',
    icon: 'Maximize2',
    tags: ['pdf', 'margins', 'padding', 'binder', 'holes', 'print safe'],
    badge: 'New',
    howToUse: [
      'Upload your document.',
      'Set binding margin width (e.g. 0.5 inches / 36 points).',
      'Download your padded, print-safe document.'
    ],
    faqs: [
      {
        question: 'Will this help when printing for 3-ring binders?',
        answer: 'Yes! It prevents text near the left margin from being punctured by hole punchers or binder rings.'
      }
    ],
    relatedToolIds: ['pdf-resize-pages', 'pdf-page-numberer', 'pdf-booklet-maker'],
    seoTitle: 'Add Margins to PDF Online - Free PDF Padding Tool | ToolStack',
    seoDescription: 'Adjust PDF page margins and add binding padding for binders and clean professional printing.'
  },
  {
    id: 'pdf-invoice-template-builder',
    slug: 'pdf-invoice-template-builder',
    name: 'PDF Invoice & Bill Generator',
    category: 'pdf',
    description: 'Generate clean, professional, print-ready PDF invoices and billing statements in seconds with zero design work.',
    icon: 'FileSpreadsheet',
    tags: ['pdf', 'invoice', 'receipt', 'bill', 'business', 'statement'],
    popular: true,
    badge: 'New',
    howToUse: [
      'Enter client name, invoice reference number, and total balance.',
      'Click Generate to render a clean standard A4 vector invoice.',
      'Download your printable PDF invoice instantly.'
    ],
    faqs: [
      {
        question: 'Can I send this invoice directly to clients?',
        answer: 'Yes, it compiles standard high-resolution PDF vector typography suitable for commercial client billing.'
      }
    ],
    relatedToolIds: ['business-card-maker', 'invoice-generator', 'pdf-watermark-stamper'],
    seoTitle: 'PDF Invoice Generator Online - Free Billing Statements | ToolStack',
    seoDescription: 'Generate professional PDF invoices and receipts online for free. Clean layout, instant vector PDF downloads.'
  },
  {
    id: 'pdf-booklet-maker',
    slug: 'pdf-booklet-maker',
    name: 'PDF Booklet & 2-Up Imposition',
    category: 'pdf',
    description: 'Prepare documents for booklet printing by arranging two pages side-by-side onto single sheets.',
    icon: 'BookOpen',
    tags: ['pdf', 'booklet', 'imposition', 'print', '2up', 'pamphlet'],
    badge: 'New',
    howToUse: [
      'Upload multi-page PDF document.',
      'Process to organize pages in 2-up printable imposition.',
      'Print double-sided, fold down the center, and bind.'
    ],
    faqs: [
      {
        question: 'What is 2-Up imposition?',
        answer: 'It renders two pages side-by-side onto landscape paper, cutting paper usage in half and creating foldable booklets.'
      }
    ],
    relatedToolIds: ['pdf-blank-page-inserter', 'pdf-resize-pages', 'pdf-margin-adjuster'],
    seoTitle: 'PDF Booklet Maker - 2-Up Imposition Online | ToolStack',
    seoDescription: 'Convert standard PDF documents into 2-up booklets for double-sided folding and printing.'
  },
  {
    id: 'pdf-reverse-order',
    slug: 'pdf-reverse-order',
    name: 'PDF Reverse Page Order',
    category: 'pdf',
    description: 'Flip document page sequencing from last page to first page with one click for reverse-feeding printers.',
    icon: 'ArrowUpDown',
    tags: ['pdf', 'reverse', 'order', 'invert', 'pages', 'printer'],
    badge: 'New',
    howToUse: [
      'Upload the PDF document.',
      'Click Execute to invert page orders (e.g. Page 10 becomes Page 1).',
      'Download your inverted PDF.'
    ],
    faqs: [
      {
        question: 'Why reverse PDF pages?',
        answer: 'Many desktop printers output sheets face-up, leaving stacks in reverse order. Reversing before printing fixes this.'
      }
    ],
    relatedToolIds: ['pdf-page-rotator', 'pdf-page-reorder', 'pdf-delete-pages'],
    seoTitle: 'Reverse PDF Pages Online - Invert PDF Order | ToolStack',
    seoDescription: 'Reverse the page order of any PDF document online for free. Fix face-up printer output easily.'
  },
  {
    id: 'pdf-text-extractor',
    slug: 'pdf-text-extractor',
    name: 'PDF Text & Content Extractor',
    category: 'pdf',
    description: 'Extract and inspect readable plain text and metadata streams from any PDF for copy-pasting and analysis.',
    icon: 'Type',
    tags: ['pdf', 'text', 'extract', 'copy', 'content', 'ocr'],
    badge: 'New',
    howToUse: [
      'Upload any searchable PDF document.',
      'Click Execute to catalog text streams and page structure.',
      'Copy the plain text representation to clipboard with one click.'
    ],
    faqs: [
      {
        question: 'Can this extract text from scanned paper photos?',
        answer: 'It extracts native digital text and font character streams embedded within vector PDFs.'
      }
    ],
    relatedToolIds: ['pdf-metadata-editor', 'text-density-analyzer', 'word-counter'],
    seoTitle: 'Extract Text from PDF Online Free | ToolStack',
    seoDescription: 'Extract plain text from PDF documents online. Copy readable text and metadata instantly without software.'
  },

  // ==========================================
  // 10 NEW IMAGE TOOLS
  // ==========================================
  {
    id: 'image-filter-studio',
    slug: 'image-filter-studio',
    name: 'Image Filter & Adjust Studio',
    category: 'image',
    description: 'Fine-tune brightness, contrast, saturation, grayscale, sepia, blur, and hue rotation with live canvas feedback.',
    icon: 'Sliders',
    tags: ['image', 'filter', 'brightness', 'contrast', 'saturation', 'adjust', 'photo edit'],
    popular: true,
    badge: 'New',
    howToUse: [
      'Upload any photo or graphic.',
      'Adjust brightness, contrast, saturation, and artistic sepia sliders.',
      'Watch live canvas re-rendering.',
      'Download your polished high-res image.'
    ],
    faqs: [
      {
        question: 'Does this compress or degrade the image resolution?',
        answer: 'No, filters are applied at native image pixel dimensions on a hardware-accelerated canvas.'
      }
    ],
    relatedToolIds: ['image-compressor', 'image-aspect-ratio-cropper', 'image-duotone-gradient-map'],
    seoTitle: 'Image Filter Studio Online - Adjust Brightness & Contrast | ToolStack',
    seoDescription: 'Adjust photo brightness, contrast, saturation, and artistic filters online for free with real-time canvas preview.'
  },
  {
    id: 'image-aspect-ratio-cropper',
    slug: 'image-aspect-ratio-cropper',
    name: 'Social Aspect Ratio Cropper',
    category: 'image',
    description: 'Crop photos to exact social dimensions: 1:1 Square, 16:9 YouTube, 9:16 TikTok/Reels, 4:5 Instagram, and 4:3.',
    icon: 'Crop',
    tags: ['image', 'crop', 'aspect ratio', 'instagram', 'youtube', 'tiktok', 'social'],
    popular: true,
    badge: 'New',
    howToUse: [
      'Upload your image.',
      'Select your target ratio (1:1, 16:9, 9:16, 4:5, 4:3).',
      'Download the cropped image ready for instant publishing.'
    ],
    faqs: [
      {
        question: 'What ratio is best for Instagram feed photos?',
        answer: '1:1 for traditional square posts and 4:5 for vertical portraits that occupy maximum mobile screen space.'
      }
    ],
    relatedToolIds: ['image-filter-studio', 'image-round-corner-avatar', 'image-split-grid-slicer'],
    seoTitle: 'Crop Image to Aspect Ratio Online Free | ToolStack',
    seoDescription: 'Crop images to 1:1, 16:9, 9:16, 4:5, and 4:3 ratios for Instagram, YouTube, and TikTok online for free.'
  },
  {
    id: 'image-watermark-overlay',
    slug: 'image-watermark-overlay',
    name: 'Image Watermark & Copyright Stamper',
    category: 'image',
    description: 'Protect creative assets by stamping custom copyright notices, brand names, and translucent watermarks onto photos.',
    icon: 'Sparkles',
    tags: ['image', 'watermark', 'copyright', 'overlay', 'stamp', 'protect photos'],
    badge: 'New',
    howToUse: [
      'Upload your photography or graphic.',
      'Type your copyright notice (e.g. © 2026 Your Studio).',
      'Select placement (Bottom Right, Center, Top Right) and opacity.',
      'Download protected image.'
    ],
    faqs: [
      {
        question: 'Can someone easily erase this watermark?',
        answer: 'The watermark is burned directly into the image pixel buffer during canvas rendering.'
      }
    ],
    relatedToolIds: ['qr-code-logo-generator', 'pdf-watermark-stamper', 'image-filter-studio'],
    seoTitle: 'Add Watermark to Image Online Free | ToolStack',
    seoDescription: 'Stamp copyright text and watermarks onto images online. Custom opacity and positioning with zero quality loss.'
  },
  {
    id: 'image-color-palette-extractor',
    slug: 'image-color-palette-extractor',
    name: 'Image Palette & Hex Extractor',
    category: 'image',
    description: 'Extract dominant color palettes and HEX codes from any uploaded photo with one-click clipboard copying.',
    icon: 'Palette',
    tags: ['image', 'color', 'palette', 'hex', 'swatches', 'design', 'extractor'],
    popular: true,
    badge: 'New',
    howToUse: [
      'Upload any photograph, illustration, or brand screenshot.',
      'The engine samples pixel values and displays the top 6 dominant colors.',
      'Click any swatch to copy its HEX code directly.'
    ],
    faqs: [
      {
        question: 'Can I use this to extract brand colors from logos?',
        answer: 'Yes! Simply upload the logo image and click on the resulting dominant color swatches.'
      }
    ],
    relatedToolIds: ['color-palette-generator', 'hex-rgb-hsl-picker', 'image-duotone-gradient-map'],
    seoTitle: 'Extract Color Palette from Image Online | ToolStack',
    seoDescription: 'Extract dominant color palettes and HEX codes from images online for free. Perfect for UI designers and artists.'
  },
  {
    id: 'image-round-corner-avatar',
    slug: 'image-round-corner-avatar',
    name: 'Circular Avatar & Squircle Maker',
    category: 'image',
    description: 'Transform profile portraits into circular avatars, modern squircles, or framed badges with custom border rings.',
    icon: 'User',
    tags: ['image', 'avatar', 'circle', 'squircle', 'profile', 'round corner', 'badge'],
    trending: true,
    badge: 'New',
    howToUse: [
      'Upload your portrait photograph.',
      'Select shape: Circle or modern Squircle.',
      'Adjust border ring width and accent color.',
      'Download your transparent PNG avatar.'
    ],
    faqs: [
      {
        question: 'Does the output have a transparent background?',
        answer: 'Yes, circular avatars are saved as 32-bit PNGs with full alpha transparency outside the boundary.'
      }
    ],
    relatedToolIds: ['business-card-maker', 'image-aspect-ratio-cropper', 'image-filter-studio'],
    seoTitle: 'Circular Avatar Maker Online - Crop Image to Circle | ToolStack',
    seoDescription: 'Crop profile photos into circles or squircles with custom borders. Free online avatar maker with transparent PNG output.'
  },
  {
    id: 'image-pixelator-blur-redact',
    slug: 'image-pixelator-blur-redact',
    name: 'Image Privacy Redactor & Pixelator',
    category: 'image',
    description: 'Censor and pixelate sensitive information like faces, license plates, passwords, or credit cards before sharing photos.',
    icon: 'ShieldAlert',
    tags: ['image', 'pixelate', 'blur', 'redact', 'privacy', 'censor', 'faces'],
    badge: 'New',
    howToUse: [
      'Upload the screenshot or photo containing private data.',
      'The privacy engine applies an unrecoverable pixelation mosaic over the sensitive region.',
      'Download the sanitized, privacy-safe image.'
    ],
    faqs: [
      {
        question: 'Can someone reverse the pixelation to view the original text?',
        answer: 'No, downsampled pixel blocks permanently destroy high-frequency spatial detail in the raster data.'
      }
    ],
    relatedToolIds: ['pdf-metadata-stripper', 'image-filter-studio', 'password-generator'],
    seoTitle: 'Pixelate & Blur Image Online - Privacy Redactor | ToolStack',
    seoDescription: 'Pixelate and censor sensitive parts of images online for free. Obscure passwords, faces, and personal data securely.'
  },
  {
    id: 'image-svg-data-url-converter',
    slug: 'image-svg-data-url-converter',
    name: 'Image to Base64 & Data URI Embedder',
    category: 'image',
    description: 'Convert PNG, JPG, and SVG images into Base64 Data URIs for inline embedding into HTML, CSS, and email templates.',
    icon: 'FileCode',
    tags: ['image', 'base64', 'data uri', 'embed', 'converter', 'inline html'],
    badge: 'New',
    howToUse: [
      'Upload any graphic or icon.',
      'Get instant Data URI (data:image/png;base64,...).',
      'Copy the snippet to embed directly into CSS background or HTML img src.'
    ],
    faqs: [
      {
        question: 'What is the advantage of a Data URI?',
        answer: 'It eliminates additional HTTP requests by embedding the graphic directly into your HTML or stylesheet.'
      }
    ],
    relatedToolIds: ['base64-image-previewer', 'base64-encode-decode', 'svg-optimizer'],
    seoTitle: 'Convert Image to Base64 Data URI Online | ToolStack',
    seoDescription: 'Convert images to Base64 strings and Data URIs online. Copy ready-to-use HTML and CSS embed code.'
  },
  {
    id: 'image-duotone-gradient-map',
    slug: 'image-duotone-gradient-map',
    name: 'Image Duotone Gradient Mapper',
    category: 'image',
    description: 'Apply Spotify-style dual-tone color mapping to photos by re-coloring shadows and highlights with complementary hues.',
    icon: 'Palette',
    tags: ['image', 'duotone', 'gradient', 'spotify', 'filter', 'artistic'],
    badge: 'New',
    howToUse: [
      'Upload any photograph.',
      'Select shadow hue and highlight hue.',
      'Watch your photo transform into a stylish editorial graphic.',
      'Download the duotone output.'
    ],
    faqs: [
      {
        question: 'How does duotone color mapping work?',
        answer: 'It calculates the luminance of each pixel and interpolates between the shadow and highlight colors you select.'
      }
    ],
    relatedToolIds: ['image-filter-studio', 'color-palette-generator', 'image-color-palette-extractor'],
    seoTitle: 'Duotone Image Effect Online - Spotify Style Filter | ToolStack',
    seoDescription: 'Apply modern duotone gradient effects to photos online for free. Create stylish two-tone graphics in seconds.'
  },
  {
    id: 'image-flip-mirror-rotate',
    slug: 'image-flip-mirror-rotate',
    name: 'Image Flip, Mirror & 90° Rotator',
    category: 'image',
    description: 'Flip photos horizontally (mirror), flip vertically, or rotate by 90° increments with instant canvas rendering.',
    icon: 'RotateCw',
    tags: ['image', 'flip', 'mirror', 'rotate', 'orientation', 'turn'],
    badge: 'New',
    howToUse: [
      'Upload your image.',
      'Click Flip Horizontal to create a mirror image, or Flip Vertical, or Rotate 90°.',
      'Download your transformed photo.'
    ],
    faqs: [
      {
        question: 'Why flip photos horizontally?',
        answer: 'Front-facing selfie cameras often save mirrored photos; horizontal flipping restores true real-world orientation.'
      }
    ],
    relatedToolIds: ['pdf-page-rotator', 'image-aspect-ratio-cropper', 'image-filter-studio'],
    seoTitle: 'Flip Image Horizontally & Mirror Online | ToolStack',
    seoDescription: 'Flip photos horizontally or vertically and rotate 90 degrees online for free. Instant canvas processing.'
  },
  {
    id: 'image-split-grid-slicer',
    slug: 'image-split-grid-slicer',
    name: 'Instagram 3-Grid & Carousel Slicer',
    category: 'image',
    description: 'Slice wide panoramic photographs into 3 equal square tiles for multi-post Instagram carousels and profile grids.',
    icon: 'Grid',
    tags: ['image', 'grid', 'instagram', 'carousel', 'slicer', 'tiles', 'panorama'],
    popular: true,
    badge: 'New',
    howToUse: [
      'Upload a horizontal or panoramic photograph.',
      'The slicer mathematically splits it into 3 equal contiguous square tiles.',
      'Download the tiles in a single ZIP archive.'
    ],
    faqs: [
      {
        question: 'How do I post these on Instagram?',
        answer: 'Upload tile-1, tile-2, and tile-3 into a single carousel post, or publish them right-to-left onto your profile grid.'
      }
    ],
    relatedToolIds: ['image-aspect-ratio-cropper', 'image-filter-studio', 'business-card-maker'],
    seoTitle: 'Instagram Grid Slicer - Split Image for Carousel Online | ToolStack',
    seoDescription: 'Split panoramic photos into 3 seamless square tiles for Instagram carousels and profile grid feeds.'
  }
];
