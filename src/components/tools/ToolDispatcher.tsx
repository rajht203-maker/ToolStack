import React from 'react';
import { ToolItem } from '../../types';
import { PdfTools } from './PdfTools';
import { ImageTools } from './ImageTools';
import { TextTools } from './TextTools';
import { DevTools } from './DevTools';
import { CalculatorTools } from './CalculatorTools';
import { ConverterTools } from './ConverterTools';
import { SecurityTools } from './SecurityTools';
import { SeoTools } from './SeoTools';
import { AiFutureTools } from './AiFutureTools';
import { NextGenDevTools } from './NextGenDevTools';
import { ModernMediaTools } from './ModernMediaTools';
import { ModernBusinessTools } from './ModernBusinessTools';
import { PremiumDevTools } from './PremiumDevTools';
import { PremiumProductivityTools } from './PremiumProductivityTools';
import { PublicUtilityTools } from './PublicUtilityTools';
import { AdvancedMemberTools } from './AdvancedMemberTools';
import { BusinessCardMakerTool } from './BusinessCardMakerTool';
import { QrCodeLogoGeneratorTool } from './QrCodeLogoGeneratorTool';
import { NewPdfToolsSuite } from './NewPdfToolsSuite';
import { NewImageToolsSuite } from './NewImageToolsSuite';
import { HundredPdfToolsSuite } from './HundredPdfToolsSuite';
import { HundredImageToolsSuite } from './HundredImageToolsSuite';
import { HUNDRED_PDF_TOOL_IDS, HUNDRED_IMAGE_TOOL_IDS } from '../../data/hundredPdfAndImageToolsData';

interface ToolDispatcherProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

const NEW_PDF_TOOL_IDS = [
  'pdf-watermark-stamper',
  'pdf-page-numberer',
  'pdf-page-rotator',
  'pdf-page-reorder',
  'pdf-delete-pages',
  'pdf-protect-password',
  'pdf-metadata-editor',
  'pdf-metadata-stripper',
  'pdf-resize-pages',
  'pdf-blank-page-inserter',
  'pdf-extract-pages',
  'pdf-grayscale-converter',
  'pdf-header-footer-annotator',
  'pdf-extract-images',
  'pdf-form-flattener',
  'pdf-margin-adjuster',
  'pdf-invoice-template-builder',
  'pdf-booklet-maker',
  'pdf-reverse-order',
  'pdf-text-extractor'
];

const NEW_IMAGE_TOOL_IDS = [
  'image-filter-studio',
  'image-aspect-ratio-cropper',
  'image-watermark-overlay',
  'image-color-palette-extractor',
  'image-round-corner-avatar',
  'image-pixelator-blur-redact',
  'image-svg-data-url-converter',
  'image-duotone-gradient-map',
  'image-flip-mirror-rotate',
  'image-split-grid-slicer'
];

const PUBLIC_UTILITY_TOOL_IDS = [
  'lorem-markdown-generator',
  'character-frequency-analyzer',
  'sql-formatter-pro',
  'case-converter-pro',
  'screen-resolution-detector',
  'word-scrambler-anagram',
  'ipv4-cidr-calculator',
  'roman-numeral-converter',
  'css-cursor-previewer',
  'percentage-change-calculator',
  'hex-rgb-hsl-picker',
  'emoji-picker-search',
  'base64-image-previewer',
  'html-table-to-markdown',
  'meta-viewport-tag-generator',
  'text-morse-audio-player',
  'unix-file-permissions-calc',
  'css-triangle-generator',
  'speed-distance-time-calc',
  'list-sorter-deduplicator'
];

const ADVANCED_MEMBER_TOOL_IDS = [
  'webhook-tester-simulator',
  'regex-syntax-debugger',
  'jwt-token-signer',
  'git-command-generator',
  'user-agent-device-auditor',
  'content-security-policy-builder',
  'sql-to-typescript-converter',
  'dockerfile-builder',
  'env-file-auditor',
  'http-status-code-guide',
  'markdown-to-pdf-doc',
  'roi-investment-calculator',
  'loan-amortization-schedule',
  'mock-data-generator',
  'cors-header-builder',
  'social-share-card-debugger',
  'markdown-cheatsheet-sandbox',
  'meeting-agenda-builder',
  'utm-campaign-generator',
  'api-key-entropy-generator'
];

const PREMIUM_DEV_TOOL_IDS = [
  'dns-lookup',
  'ssl-checker',
  'api-tester',
  'color-palette-generator',
  'box-shadow-generator',
  'svg-to-jsx',
  'cron-job-scheduler',
  'code-diff-side-by-side',
  'json-schema-validator',
  'password-strength-auditor'
];

const PREMIUM_PRODUCTIVITY_TOOL_IDS = [
  'currency-converter',
  'salary-paycheck-calculator',
  'invoice-generator',
  'privacy-policy-generator',
  'terms-conditions-generator',
  'text-summarizer-cleaner',
  'readability-score',
  'pomodoro-timer',
  'speed-typing-test',
  'email-signature-generator'
];

const AI_TOOL_IDS = [
  'ai-prompt-builder',
  'ai-token-counter',
  'ai-system-prompt',
  'text-density-analyzer'
];

const NEXT_GEN_DEV_TOOL_IDS = [
  'curl-converter',
  'jwt-debugger',
  'sql-formatter',
  'cron-parser',
  'docker-compose-generator',
  'css-mesh-generator',
  'subnet-calculator',
  'user-agent-parser'
];

const MODERN_MEDIA_TOOL_IDS = [
  'svg-optimizer',
  'markdown-previewer',
  'qr-advanced-generator',
  'bcrypt-generator',
  'og-previewer'
];

const MODERN_BUSINESS_TOOL_IDS = [
  'inflation-calculator',
  'freelance-rate-calculator',
  'meeting-cost-calculator'
];

export const ToolDispatcher: React.FC<ToolDispatcherProps> = ({ tool, onSuccess }) => {
  // Check flagship Business Card Studio & QR Generator with Logo
  if (tool.id === 'business-card-maker' || tool.slug === 'business-card-maker') {
    return <BusinessCardMakerTool tool={tool} onSuccess={onSuccess} />;
  }

  if (tool.id === 'qr-code-logo-generator' || tool.slug === 'qr-code-logo-generator') {
    return <QrCodeLogoGeneratorTool tool={tool} onSuccess={onSuccess} />;
  }

  // Check 20 new PDF tools
  if (NEW_PDF_TOOL_IDS.includes(tool.id) || NEW_PDF_TOOL_IDS.includes(tool.slug)) {
    return <NewPdfToolsSuite tool={tool} onSuccess={onSuccess} />;
  }

  // Check 10 new Image tools
  if (NEW_IMAGE_TOOL_IDS.includes(tool.id) || NEW_IMAGE_TOOL_IDS.includes(tool.slug)) {
    return <NewImageToolsSuite tool={tool} onSuccess={onSuccess} />;
  }

  // Check 100 new PDF & Image tools
  if (HUNDRED_PDF_TOOL_IDS.includes(tool.id) || HUNDRED_PDF_TOOL_IDS.includes(tool.slug)) {
    return <HundredPdfToolsSuite tool={tool} onSuccess={onSuccess} />;
  }

  if (HUNDRED_IMAGE_TOOL_IDS.includes(tool.id) || HUNDRED_IMAGE_TOOL_IDS.includes(tool.slug)) {
    return <HundredImageToolsSuite tool={tool} onSuccess={onSuccess} />;
  }

  // Check newly added public utility tools and advanced member tools
  if (PUBLIC_UTILITY_TOOL_IDS.includes(tool.id) || PUBLIC_UTILITY_TOOL_IDS.includes(tool.slug)) {
    return <PublicUtilityTools tool={tool} onSuccess={onSuccess} />;
  }

  if (ADVANCED_MEMBER_TOOL_IDS.includes(tool.id) || ADVANCED_MEMBER_TOOL_IDS.includes(tool.slug)) {
    return <AdvancedMemberTools tool={tool} onSuccess={onSuccess} />;
  }

  // Check premium member tool groups first
  if (PREMIUM_DEV_TOOL_IDS.includes(tool.id) || PREMIUM_DEV_TOOL_IDS.includes(tool.slug)) {
    return <PremiumDevTools tool={tool} onSuccess={onSuccess} />;
  }

  if (PREMIUM_PRODUCTIVITY_TOOL_IDS.includes(tool.id) || PREMIUM_PRODUCTIVITY_TOOL_IDS.includes(tool.slug)) {
    return <PremiumProductivityTools tool={tool} onSuccess={onSuccess} />;
  }

  // Check special tool group IDs
  if (tool.category === 'ai' || AI_TOOL_IDS.includes(tool.id) || AI_TOOL_IDS.includes(tool.slug)) {
    return <AiFutureTools tool={tool} onSuccess={onSuccess} />;
  }

  if (NEXT_GEN_DEV_TOOL_IDS.includes(tool.id) || NEXT_GEN_DEV_TOOL_IDS.includes(tool.slug)) {
    return <NextGenDevTools tool={tool} onSuccess={onSuccess} />;
  }

  if (MODERN_MEDIA_TOOL_IDS.includes(tool.id) || MODERN_MEDIA_TOOL_IDS.includes(tool.slug)) {
    return <ModernMediaTools tool={tool} onSuccess={onSuccess} />;
  }

  if (MODERN_BUSINESS_TOOL_IDS.includes(tool.id) || MODERN_BUSINESS_TOOL_IDS.includes(tool.slug)) {
    return <ModernBusinessTools tool={tool} onSuccess={onSuccess} />;
  }

  // Category-based routing
  if (tool.category === 'pdf') {
    return <PdfTools tool={tool} onSuccess={onSuccess} />;
  }

  if (tool.category === 'image') {
    return <ImageTools tool={tool} onSuccess={onSuccess} />;
  }

  if (tool.category === 'text') {
    return <TextTools tool={tool} onSuccess={onSuccess} />;
  }

  if (tool.category === 'developer') {
    return <DevTools tool={tool} onSuccess={onSuccess} />;
  }

  if (tool.category === 'calculator') {
    return <CalculatorTools tool={tool} onSuccess={onSuccess} />;
  }

  if (tool.category === 'converter') {
    return <ConverterTools tool={tool} onSuccess={onSuccess} />;
  }

  if (tool.category === 'security') {
    return <SecurityTools tool={tool} onSuccess={onSuccess} />;
  }

  if (tool.category === 'seo' || tool.category === 'social') {
    return <SeoTools tool={tool} onSuccess={onSuccess} />;
  }

  // Fallback to text tool
  return <TextTools tool={tool} onSuccess={onSuccess} />;
};
