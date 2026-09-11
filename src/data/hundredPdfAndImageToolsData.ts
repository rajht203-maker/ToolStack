import { ToolItem } from '../types';
import { HUNDRED_PDF_TOOLS_DATA } from './hundredPdfToolsData';
import { HUNDRED_IMAGE_TOOLS_DATA } from './hundredImageToolsData';

export const HUNDRED_PDF_AND_IMAGE_TOOLS_DATA: ToolItem[] = [
  ...HUNDRED_PDF_TOOLS_DATA,
  ...HUNDRED_IMAGE_TOOLS_DATA
];

export const HUNDRED_PDF_TOOL_IDS = HUNDRED_PDF_TOOLS_DATA.map(t => t.id);
export const HUNDRED_IMAGE_TOOL_IDS = HUNDRED_IMAGE_TOOLS_DATA.map(t => t.id);
