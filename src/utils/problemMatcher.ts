import { ToolItem } from '../types';
import { TOOLS_DATA } from '../data/toolsData';

export interface ProblemMatchResult {
  tool: ToolItem;
  score: number;
  reason: string;
}

// Preset common user problems and suggestions
export const POPULAR_PROBLEMS = [
  {
    problem: "Need a professional business card with company logo and scannable QR code",
    category: "Image & Media",
    suggestedToolSlug: "business-card-maker"
  },
  {
    problem: "Generate custom QR code with company logo in the center for print or web",
    category: "Image & Media",
    suggestedToolSlug: "qr-code-logo-generator"
  },
  {
    problem: "Format passport or visa photos for US, UK, or Schengen standards on 4x6 print sheet",
    category: "Image & Media",
    suggestedToolSlug: "image-passport-visa-photo-maker"
  },
  {
    problem: "Stamp Bates numbering on legal discovery or medical records PDF documents",
    category: "PDF & Documents",
    suggestedToolSlug: "pdf-bates-numbering-tool"
  },
  {
    problem: "Impose multi-page PDF into 2-up or 4-up booklet grid sheets",
    category: "PDF & Documents",
    suggestedToolSlug: "pdf-nup-multi-page-grid"
  },
  {
    problem: "Generate printable lined, 5mm graph, or bullet journal dot-grid paper PDF",
    category: "PDF & Documents",
    suggestedToolSlug: "pdf-printable-lined-graph-paper"
  },
  {
    problem: "Design professional award or completion certificate PDF",
    category: "PDF & Documents",
    suggestedToolSlug: "pdf-certificate-award-maker"
  },
  {
    problem: "Create vintage Polaroid frame with handwritten photo caption",
    category: "Image & Media",
    suggestedToolSlug: "image-polaroid-vintage-frame"
  },
  {
    problem: "Stamp official RECEIVED, APPROVED, or PAID date on PDF pages",
    category: "PDF & Documents",
    suggestedToolSlug: "pdf-timestamp-datestamp-marker"
  },
  {
    problem: "Embed scannable QR verification code directly into PDF corner",
    category: "PDF & Documents",
    suggestedToolSlug: "pdf-add-qr-code-verification"
  },
  {
    problem: "Stamp confidential or copyright watermark on my PDF pages",
    category: "PDF & Documents",
    suggestedToolSlug: "pdf-watermark-stamper"
  },
  {
    problem: "My scanned PDF pages are upside down or sideways and need rotation",
    category: "PDF & Documents",
    suggestedToolSlug: "pdf-page-rotator"
  },
  {
    problem: "My PDF is too big and I can't send it via email",
    category: "PDF & Documents",
    suggestedToolSlug: "pdf-compress"
  },
  {
    problem: "I need to test and verify a Stripe or GitHub webhook HMAC signature",
    category: "Developer",
    suggestedToolSlug: "webhook-tester-simulator"
  },
  {
    problem: "Need to generate realistic fake users and mock JSON data for an API test",
    category: "Developer",
    suggestedToolSlug: "mock-data-generator"
  },
  {
    problem: "Convert my PNG/JPEG images to modern high-speed WebP format",
    category: "Image & Media",
    suggestedToolSlug: "webp-converter"
  },
  {
    problem: "Calculate monthly mortgage payments and full amortization interest schedule",
    category: "Calculators",
    suggestedToolSlug: "loan-amortization-schedule"
  },
  {
    problem: "My SQL query is unformatted, messy, and hard to read",
    category: "Developer",
    suggestedToolSlug: "sql-formatter-pro"
  },
  {
    problem: "Convert SQL CREATE TABLE schema directly into TypeScript interfaces",
    category: "Developer",
    suggestedToolSlug: "sql-to-typescript-converter"
  },
  {
    problem: "Generate high-entropy 256-bit secure API keys and secret tokens",
    category: "Security",
    suggestedToolSlug: "api-key-entropy-generator"
  },
  {
    problem: "Fix CORS errors with proper Access-Control-Allow-Origin response headers",
    category: "Developer",
    suggestedToolSlug: "cors-header-builder"
  },
  {
    problem: "Audit my .env file for leaked secrets, duplicates, and invalid formatting",
    category: "Developer",
    suggestedToolSlug: "env-file-auditor"
  },
  {
    problem: "Convert HTML table markup to GitHub Flavored Markdown table format",
    category: "Developer",
    suggestedToolSlug: "html-table-to-markdown"
  },
  {
    problem: "Calculate IPv4 CIDR subnet masks, usable host ranges, and broadcast IPs",
    category: "Developer",
    suggestedToolSlug: "ipv4-cidr-calculator"
  }
];

// Symptom / Problem keyword mapping
const PROBLEM_INTENT_MAP: Record<string, { toolSlugs: string[]; reason: string }> = {
  "business card": {
    toolSlugs: ["business-card-maker", "qr-code-logo-generator"],
    reason: "Designs double-sided 3.5\" x 2\" print-ready business cards with custom logo and vCard QR code."
  },
  "qr code with logo": {
    toolSlugs: ["qr-code-logo-generator", "business-card-maker"],
    reason: "Embeds company logos in QR code centers with High (H) error-correction to guarantee 100% scan rate."
  },
  "qr with logo": {
    toolSlugs: ["qr-code-logo-generator"],
    reason: "Generates custom branded QR codes with your center logo, custom colors, and error recovery."
  },
  "watermark pdf": {
    toolSlugs: ["pdf-watermark-stamper"],
    reason: "Stamps confidential text, copyright notices, and custom angled watermarks across PDF pages."
  },
  "rotate pdf": {
    toolSlugs: ["pdf-page-rotator"],
    reason: "Rotates upside down or sideways PDF pages by 90°, 180°, or 270°."
  },
  "number pdf": {
    toolSlugs: ["pdf-page-numberer"],
    reason: "Inserts professional 'Page X of Y' numbers into headers or footers of PDF documents."
  },
  "palette from image": {
    toolSlugs: ["image-color-palette-extractor"],
    reason: "Extracts dominant colors and HEX swatches from photos and graphics."
  },
  "pdf too big": {
    toolSlugs: ["pdf-compress", "pdf-split"],
    reason: "Compresses PDF files client-side to fit email attachment limits without data loss."
  },
  "compress pdf": {
    toolSlugs: ["pdf-compress"],
    reason: "Reduces PDF file size instantly in your browser."
  },
  "merge pdf": {
    toolSlugs: ["pdf-merge"],
    reason: "Combines multiple PDF documents into a single organized file."
  },
  "split pdf": {
    toolSlugs: ["pdf-split"],
    reason: "Splits multipage PDFs or extracts specific page ranges."
  },
  "pdf to image": {
    toolSlugs: ["pdf-to-image"],
    reason: "Converts PDF pages into high-resolution PNG or JPEG images."
  },
  "compress image": {
    toolSlugs: ["image-compress", "webp-converter"],
    reason: "Optimizes image dimensions and compresses file sizes without visible loss."
  },
  "convert to webp": {
    toolSlugs: ["webp-converter"],
    reason: "Converts PNG/JPG images to modern next-gen WebP format for faster web performance."
  },
  "resize image": {
    toolSlugs: ["image-resizer"],
    reason: "Rescales and crops image dimensions with aspect ratio locking."
  },
  "format sql": {
    toolSlugs: ["sql-formatter-pro", "sql-formatter"],
    reason: "Beautifies, standardizes keywords, and indents complex SQL queries cleanly."
  },
  "beautify sql": {
    toolSlugs: ["sql-formatter-pro", "sql-formatter"],
    reason: "Beautifies, standardizes keywords, and indents complex SQL queries cleanly."
  },
  "stripe webhook": {
    toolSlugs: ["webhook-tester-simulator"],
    reason: "Simulates and verifies cryptographic HMAC SHA-256 signatures for Stripe webhooks."
  },
  "github webhook": {
    toolSlugs: ["webhook-tester-simulator"],
    reason: "Verifies GitHub webhook payloads with secret HMAC cryptographic signing."
  },
  "webhook signature": {
    toolSlugs: ["webhook-tester-simulator"],
    reason: "Simulates and validates HMAC SHA-256 webhook signatures in real-time."
  },
  "mock data": {
    toolSlugs: ["mock-data-generator"],
    reason: "Generates realistic fake user profiles, transactions, and JSON schemas for API testing."
  },
  "fake users": {
    toolSlugs: ["mock-data-generator"],
    reason: "Generates realistic mock user records with names, emails, and roles."
  },
  "loan amortization": {
    toolSlugs: ["loan-amortization-schedule", "mortgage-calc", "emi-calc"],
    reason: "Calculates exact monthly breakdown of principal, cumulative interest, and payoff schedule."
  },
  "calculate mortgage": {
    toolSlugs: ["loan-amortization-schedule", "mortgage-calc"],
    reason: "Calculates monthly mortgage payments, total interest, and full amortization."
  },
  "calculate roi": {
    toolSlugs: ["roi-investment-calculator"],
    reason: "Calculates SaaS/startup ARR, gross margin, payback periods, and annualized ROI."
  },
  "cors error": {
    toolSlugs: ["cors-header-builder"],
    reason: "Generates correct Access-Control-Allow-Origin, Headers, and Methods server policies."
  },
  "access-control-allow-origin": {
    toolSlugs: ["cors-header-builder"],
    reason: "Configures origin restrictions, preflight max-age, and CORS headers."
  },
  "sql to typescript": {
    toolSlugs: ["sql-to-typescript-converter"],
    reason: "Automatically translates SQL CREATE TABLE schemas into type-safe TypeScript interfaces."
  },
  "env secrets": {
    toolSlugs: ["env-file-auditor"],
    reason: "Audits .env files to detect accidentally exposed credentials and syntax syntax bugs."
  },
  "api key": {
    toolSlugs: ["api-key-entropy-generator"],
    reason: "Generates cryptographically strong 128-bit, 256-bit, or 512-bit tokens with custom prefixes."
  },
  "regex test": {
    toolSlugs: ["regex-syntax-debugger", "regex-tester"],
    reason: "Tests regular expressions with live match capture groups and error highlighting."
  },
  "jwt token": {
    toolSlugs: ["jwt-token-signer", "jwt-debugger"],
    reason: "Signs, inspects, and debugs JSON Web Tokens with header and payload claims."
  },
  "dockerfile": {
    toolSlugs: ["dockerfile-builder", "docker-compose-generator"],
    reason: "Builds production-ready multi-stage Dockerfiles for Node.js, Python, Go, and Rust."
  },
  "ipv4 cidr": {
    toolSlugs: ["ipv4-cidr-calculator"],
    reason: "Calculates network IP, broadcast IP, usable host limits, and subnet masks."
  },
  "subnet mask": {
    toolSlugs: ["ipv4-cidr-calculator"],
    reason: "Solves CIDR prefix lengths, subnet masks, and available host counts."
  },
  "html table to markdown": {
    toolSlugs: ["html-table-to-markdown"],
    reason: "Parses HTML <table> tags and converts them into GitHub Flavored Markdown tables."
  },
  "case convert": {
    toolSlugs: ["case-converter-pro"],
    reason: "Swaps strings instantly between camelCase, snake_case, kebab-case, and PascalCase."
  },
  "camelcase": {
    toolSlugs: ["case-converter-pro"],
    reason: "Formats text into camelCase, snake_case, PascalCase, or CONSTANT_CASE."
  },
  "morse code": {
    toolSlugs: ["text-morse-audio-player"],
    reason: "Translates text into Morse code and synthesizes real-time Web Audio beeps."
  },
  "chmod": {
    toolSlugs: ["unix-file-permissions-calc"],
    reason: "Calculates Unix file permission octal numbers (e.g. 755) and symbolic flags."
  },
  "unix permissions": {
    toolSlugs: ["unix-file-permissions-calc"],
    reason: "Visualizes Read, Write, and Execute permissions for owner, group, and others."
  },
  "css triangle": {
    toolSlugs: ["css-triangle-generator"],
    reason: "Generates zero-dependency pure CSS border triangles for tooltips and pointers."
  },
  "utm builder": {
    toolSlugs: ["utm-campaign-generator", "utm-builder"],
    reason: "Attaches proper utm_source, utm_medium, and campaign parameters to marketing URLs."
  },
  "social card": {
    toolSlugs: ["social-share-card-debugger", "meta-tag-generator"],
    reason: "Previews how Open Graph and Twitter Card tags will render when shared on social networks."
  },
  "lorem markdown": {
    toolSlugs: ["lorem-markdown-generator"],
    reason: "Generates mock Markdown documentation with code blocks, checklists, and tables."
  },
  "remove duplicates": {
    toolSlugs: ["list-sorter-deduplicator"],
    reason: "Cleans multiline lists by stripping duplicate entries and alphabetizing items."
  },
  "percentage change": {
    toolSlugs: ["percentage-change-calculator", "percentage-calc"],
    reason: "Calculates percent increase, decrease, and variance between two numbers."
  },
  "letter frequency": {
    toolSlugs: ["character-frequency-analyzer"],
    reason: "Analyzes letter distributions, vowels, consonants, and character density."
  },
  "screen resolution": {
    toolSlugs: ["screen-resolution-detector"],
    reason: "Detects real-time viewport dimensions, hardware monitor specs, and DPR."
  },
  "hex to rgb": {
    toolSlugs: ["hex-rgb-hsl-picker", "color-palette-generator"],
    reason: "Converts and balances color values across HEX, RGB, RGBA, and HSL formats."
  }
};

/**
 * Searches and scores tools that directly solve the user's defined problem.
 * Matches on problem intent keywords, tool descriptions, tags, and howToUse.
 */
export function findToolsForProblem(rawProblem: string): ProblemMatchResult[] {
  const query = rawProblem.trim().toLowerCase();
  if (!query) return [];

  const resultsMap = new Map<string, { tool: ToolItem; score: number; reason: string }>();

  // 1. Check intent dictionary
  for (const [intentKey, data] of Object.entries(PROBLEM_INTENT_MAP)) {
    if (query.includes(intentKey) || intentKey.includes(query)) {
      data.toolSlugs.forEach(slug => {
        const foundTool = TOOLS_DATA.find(t => t.slug === slug || t.id === slug);
        if (foundTool) {
          const current = resultsMap.get(foundTool.id);
          const newScore = (current?.score || 0) + 50;
          resultsMap.set(foundTool.id, {
            tool: foundTool,
            score: newScore,
            reason: data.reason
          });
        }
      });
    }
  }

  // 2. Tokenized natural language search across all 140+ tools
  const queryTokens = query
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);

  TOOLS_DATA.forEach(tool => {
    let score = 0;
    const reasons: string[] = [];

    // Check exact name match
    if (tool.name.toLowerCase().includes(query)) {
      score += 40;
      reasons.push(`Direct match with tool name "${tool.name}"`);
    }

    // Check description match
    if (tool.description.toLowerCase().includes(query)) {
      score += 30;
      reasons.push(tool.description);
    }

    // Check tag matches
    tool.tags.forEach(tag => {
      if (query.includes(tag.toLowerCase()) || tag.toLowerCase().includes(query)) {
        score += 20;
      }
    });

    // Token-based matching
    queryTokens.forEach(token => {
      if (tool.name.toLowerCase().includes(token)) score += 12;
      if (tool.description.toLowerCase().includes(token)) score += 8;
      if (tool.tags.some(t => t.toLowerCase().includes(token))) score += 10;
      if (tool.howToUse?.some(step => step.toLowerCase().includes(token))) score += 6;
      if (tool.category.toLowerCase().includes(token)) score += 5;
    });

    if (score > 0) {
      const existing = resultsMap.get(tool.id);
      if (existing) {
        existing.score += score;
      } else {
        const defaultReason = reasons[0] || tool.description;
        resultsMap.set(tool.id, {
          tool,
          score,
          reason: defaultReason
        });
      }
    }
  });

  // Sort descending by score
  return Array.from(resultsMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
}
