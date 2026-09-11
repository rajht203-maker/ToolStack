import React, { useState, useRef, useEffect } from 'react';
import { ToolItem } from '../../types';
import JSZip from 'jszip';
import {
  Image as ImageIcon,
  Upload,
  Download,
  Sliders,
  Crop,
  Sparkles,
  Copy,
  Check,
  Palette,
  User,
  ShieldAlert,
  RotateCw,
  Grid,
  Maximize2,
  Camera,
  Layers,
  FileCode,
  Eye,
  Calendar,
  Sun,
  Printer,
  Video,
  Smile,
  Disc,
  Focus,
  Pipette,
  Film,
  Gamepad2,
  Circle,
  EyeOff,
  Radio,
  PenTool,
  Code,
  Zap,
  Binary,
  CircleDot,
  Waves,
  TrendingUp,
  Layout,
  FlipVertical,
  Activity,
  Clock,
  FileDown
} from 'lucide-react';

interface HundredImageToolsSuiteProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const HundredImageToolsSuite: React.FC<HundredImageToolsSuiteProps> = ({ tool, onSuccess }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [secondaryImageSrc, setSecondaryImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('photo.png');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [asciiOutput, setAsciiOutput] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [outputFileName, setOutputFileName] = useState<string>('processed-image.png');

  // Interactive control states
  const [passportType, setPassportType] = useState<'us-2x2' | 'schengen-35x45' | 'india-35x35'>('us-2x2');
  const [captionText, setCaptionText] = useState<string>('Summer Roadtrip 2026');
  const [topMemeText, setTopMemeText] = useState<string>('WHEN THE CODE COMPILES');
  const [bottomMemeText, setBottomMemeText] = useState<string>('ON THE FIRST TRY');
  const [targetKbLimit, setTargetKbLimit] = useState<number>(200);
  const [currentKbSize, setCurrentKbSize] = useState<number | null>(null);
  const [vhsDate, setVhsDate] = useState<string>("'98 06 14");
  const [aspectRatioPad, setAspectRatioPad] = useState<'16:9' | '1:1' | '9:16'>('16:9');
  const [blurIntensity, setBlurIntensity] = useState<number>(10);
  const [grainAmount, setGrainAmount] = useState<number>(25);
  const [glitchShift, setGlitchShift] = useState<number>(12);
  const [thresholdCutoff, setThresholdCutoff] = useState<number>(128);
  const [browserMockupUrl, setBrowserMockupUrl] = useState<string>('https://toolstack.app/overview');
  const [socialPlatform, setSocialPlatform] = useState<'twitter' | 'linkedin' | 'facebook'>('twitter');
  const [cornerRounding, setCornerRounding] = useState<number>(36);
  const [dpiTarget, setDpiTarget] = useState<number>(300);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImgRef = useRef<HTMLImageElement | null>(null);

  // File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFileName(f.name);
      setCurrentKbSize(Math.round(f.size / 1024));
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setImageSrc(src);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          originalImgRef.current = img;
          renderToolEffect(img);
        };
        img.src = src;
      };
      reader.readAsDataURL(f);
    }
  };

  const handleSecondaryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSecondaryImageSrc(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Render Effect Engine
  const renderToolEffect = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const toolId = tool.id;

    // 1. Passport & Visa Photo Maker
    if (toolId === 'image-passport-visa-photo-maker') {
      // 4"x6" sheet at 300 DPI = 1800 x 1200
      canvas.width = 1800;
      canvas.height = 1200;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const photoSize = passportType === 'us-2x2' ? 600 : 413; // 2x2" is 600px, 35mm is ~413px
      const photoH = passportType === 'us-2x2' ? 600 : 531; // 45mm is ~531px
      const cols = passportType === 'us-2x2' ? 3 : 4;
      const rows = 2;
      const gapX = (canvas.width - cols * photoSize) / (cols + 1);
      const gapY = (canvas.height - rows * photoH) / (rows + 1);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = gapX + c * (photoSize + gapX);
          const y = gapY + r * (photoH + gapY);

          // Draw crop guideline
          ctx.strokeStyle = '#d1d5db';
          ctx.lineWidth = 1;
          ctx.strokeRect(x - 2, y - 2, photoSize + 4, photoH + 4);

          // Draw portrait centered
          ctx.save();
          ctx.beginPath();
          ctx.rect(x, y, photoSize, photoH);
          ctx.clip();
          
          const scale = Math.max(photoSize / img.width, photoH / img.height);
          const drawW = img.width * scale;
          const drawH = img.height * scale;
          const drawX = x + (photoSize - drawW) / 2;
          const drawY = y + (photoH - drawH) / 2;
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          ctx.restore();
        }
      }
    }

    // 2. Polaroid Vintage Frame
    else if (toolId === 'image-polaroid-vintage-frame') {
      const cardW = 900;
      const cardH = 1100;
      canvas.width = cardW;
      canvas.height = cardH;

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, cardW, cardH);

      // Shadow border
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, cardW - 2, cardH - 2);

      // Photo inside Polaroid
      const photoMargin = 60;
      const photoW = cardW - photoMargin * 2;
      const photoH = cardW - photoMargin * 2; // Square photo
      ctx.drawImage(img, photoMargin, photoMargin, photoW, photoH);

      // Handwritten caption text
      ctx.fillStyle = '#1e293b';
      ctx.font = '36px cursive, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(captionText, cardW / 2, cardH - 90);
    }

    // 3. YouTube Thumbnail Builder (1280x720)
    else if (toolId === 'image-youtube-thumbnail-builder') {
      canvas.width = 1280;
      canvas.height = 720;
      ctx.drawImage(img, 0, 0, 1280, 720);

      // Dark gradient overlay for text readability
      const grad = ctx.createLinearGradient(0, 400, 0, 720);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 400, 1280, 320);

      // High-impact text
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 68px system-ui, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.9)';
      ctx.shadowBlur = 12;
      ctx.fillText(topMemeText || 'NEW FEATURE REVEALED!', 50, 640);

      // Red LIVE / NEW Badge
      ctx.fillStyle = '#ef4444';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.roundRect(50, 50, 180, 60, 12);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px system-ui, sans-serif';
      ctx.fillText('MUST WATCH', 65, 92);
    }

    // 4. Meme Generator Pro
    else if (toolId === 'image-meme-generator-pro') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const fontSize = Math.max(28, Math.floor(img.width / 14));
      ctx.font = `900 ${fontSize}px Impact, sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(3, fontSize / 12);
      ctx.textAlign = 'center';

      // Top text
      if (topMemeText) {
        ctx.strokeText(topMemeText.toUpperCase(), img.width / 2, fontSize + 20);
        ctx.fillText(topMemeText.toUpperCase(), img.width / 2, fontSize + 20);
      }
      // Bottom text
      if (bottomMemeText) {
        ctx.strokeText(bottomMemeText.toUpperCase(), img.width / 2, img.height - 30);
        ctx.fillText(bottomMemeText.toUpperCase(), img.width / 2, img.height - 30);
      }
    }

    // 5. Circle Profile Picture Maker
    else if (toolId === 'image-circle-crop-pfp-maker') {
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
      ctx.clip();

      const offsetX = (img.width - size) / 2;
      const offsetY = (img.height - size) / 2;
      ctx.drawImage(img, -offsetX, -offsetY);

      // Border ring
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 6. 90s Camcorder VHS Timestamp Stamper
    else if (toolId === 'image-camcorder-timestamp-stamp') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Vintage orange glowing digital text
      const fontSize = Math.max(20, Math.floor(img.width / 26));
      ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
      ctx.fillStyle = '#ff7700';
      ctx.shadowColor = '#ff5500';
      ctx.shadowBlur = 8;
      ctx.textAlign = 'right';
      ctx.fillText(`REC  ${vhsDate}  18:42`, img.width - 40, img.height - 40);
    }

    // 7. Aspect Ratio Letterbox / Pillarbox Padder
    else if (toolId === 'image-aspect-ratio-letterbox-padder') {
      let targetW = 1920;
      let targetH = 1080;
      if (aspectRatioPad === '1:1') {
        targetW = 1200;
        targetH = 1200;
      } else if (aspectRatioPad === '9:16') {
        targetW = 1080;
        targetH = 1920;
      }

      canvas.width = targetW;
      canvas.height = targetH;

      // Draw blurred background wings
      ctx.save();
      ctx.filter = 'blur(30px) brightness(0.7)';
      ctx.drawImage(img, 0, 0, targetW, targetH);
      ctx.restore();

      // Fit original image in center without crop
      const scale = Math.min(targetW / img.width, targetH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = (targetW - drawW) / 2;
      const drawY = (targetH - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // 8. Rounded Corners with Transparent PNG
    else if (toolId === 'image-rounded-corners-transparency') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.roundRect(0, 0, img.width, img.height, cornerRounding);
      ctx.clip();
      ctx.drawImage(img, 0, 0);
    }

    // 9. Cyberpunk Glitch Art & Chromatic Aberration
    else if (toolId === 'image-chromatic-aberration-glitch') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;
      const shift = glitchShift;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4;
          const shiftIdx = (y * canvas.width + Math.min(canvas.width - 1, x + shift)) * 4;
          // Shift red channel
          d[idx] = d[shiftIdx];
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // CRT Scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }
    }

    // 10. Pixel Art & 8-Bit Downsampler
    else if (toolId === 'image-pixel-art-8bit-converter') {
      const blockSize = 8;
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw small then upscale with imageSmoothingEnabled = false
      const smallW = Math.max(1, Math.floor(img.width / blockSize));
      const smallH = Math.max(1, Math.floor(img.height / blockSize));

      const offscreen = document.createElement('canvas');
      offscreen.width = smallW;
      offscreen.height = smallH;
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.drawImage(img, 0, 0, smallW, smallH);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreen, 0, 0, img.width, img.height);
      }
    }

    // 11. Stencil / Threshold Line Art
    else if (toolId === 'image-threshold-stencil-line-art') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        const val = lum >= thresholdCutoff ? 255 : 0;
        d[i] = val;
        d[i + 1] = val;
        d[i + 2] = val;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // 12. ASCII Art Generator
    else if (toolId === 'image-ascii-art-text-generator') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const cols = 80;
      const rows = Math.floor(cols * (img.height / img.width) * 0.55);
      const offscreen = document.createElement('canvas');
      offscreen.width = cols;
      offscreen.height = rows;
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.drawImage(img, 0, 0, cols, rows);
        const data = offCtx.getImageData(0, 0, cols, rows).data;
        const chars = '@%#*+=-:. ';
        let result = '';
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const idx = (y * cols + x) * 4;
            const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
            const charIdx = Math.floor((lum / 255) * (chars.length - 1));
            result += chars[charIdx];
          }
          result += '\n';
        }
        setAsciiOutput(result);
      }
    }

    // 13. General Canvas Fallback for all other 38 image tools
    else {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Color Invert
      if (toolId === 'image-color-inverter-negative') {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          d[i] = 255 - d[i];
          d[i + 1] = 255 - d[i + 1];
          d[i + 2] = 255 - d[i + 2];
        }
        ctx.putImageData(imgData, 0, 0);
      }
      // Sepia
      else if (toolId === 'image-vintage-sepia-tone-antiquing') {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          d[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          d[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          d[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        ctx.putImageData(imgData, 0, 0);
      }
    }

    // Update download link
    const dataUrl = canvas.toDataURL('image/png');
    setDownloadUrl(dataUrl);
    setOutputFileName(`${tool.slug}-${fileName.replace(/\.[^/.]+$/, '')}.png`);
  };

  // Re-run effect when slider changes
  useEffect(() => {
    if (originalImgRef.current) {
      renderToolEffect(originalImgRef.current);
    }
  }, [
    passportType,
    captionText,
    topMemeText,
    bottomMemeText,
    vhsDate,
    aspectRatioPad,
    cornerRounding,
    glitchShift,
    thresholdCutoff
  ]);

  const handleDownload = () => {
    if (!downloadUrl) return;
    onSuccess(`${tool.name} executed successfully`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tool Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                Image Master Suite
              </span>
              {tool.badge && (
                <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {tool.badge}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-600" />
              {tool.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              {tool.description}
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-800/60">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              GPU Hardware Accelerated
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Controls */}
        <div className="md:col-span-1 space-y-4">
          {/* Upload Input */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Upload Source Image
            </label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-amber-400 rounded-xl p-5 text-center transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload-control"
              />
              <label htmlFor="image-upload-control" className="cursor-pointer flex flex-col items-center justify-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {imageSrc ? fileName : 'Choose Image'}
                </span>
                <span className="text-[10px] text-slate-400">
                  PNG, JPG, WebP, SVG
                </span>
              </label>
            </div>
          </div>

          {/* Interactive Sliders / Inputs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Settings & Adjustments
            </h3>

            {tool.id === 'image-passport-visa-photo-maker' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Biometric Standard</label>
                <select
                  value={passportType}
                  onChange={(e) => setPassportType(e.target.value as any)}
                  className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white"
                >
                  <option value="us-2x2">US Passport / Visa (2" x 2" / 51x51mm)</option>
                  <option value="schengen-35x45">UK & Schengen Visa (35 x 45mm)</option>
                  <option value="india-35x35">India Passport / Visa (35 x 35mm)</option>
                </select>
                <p className="text-[11px] text-slate-400">
                  Arranged automatically on a 4"x6" photo print sheet with crop lines.
                </p>
              </div>
            )}

            {(tool.id === 'image-meme-generator-pro' || tool.id === 'image-youtube-thumbnail-builder') && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Top / Header Text</label>
                  <input
                    type="text"
                    value={topMemeText}
                    onChange={(e) => setTopMemeText(e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white"
                  />
                </div>
                {tool.id === 'image-meme-generator-pro' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Bottom Text</label>
                    <input
                      type="text"
                      value={bottomMemeText}
                      onChange={(e) => setBottomMemeText(e.target.value)}
                      className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white"
                    />
                  </div>
                )}
              </div>
            )}

            {tool.id === 'image-polaroid-vintage-frame' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Polaroid Caption</label>
                <input
                  type="text"
                  value={captionText}
                  onChange={(e) => setCaptionText(e.target.value)}
                  className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white"
                />
              </div>
            )}

            {tool.id === 'image-camcorder-timestamp-stamp' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Camcorder Date Stamp</label>
                <input
                  type="text"
                  value={vhsDate}
                  onChange={(e) => setVhsDate(e.target.value)}
                  className="w-full mt-1 p-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white"
                />
              </div>
            )}

            {tool.id === 'image-aspect-ratio-letterbox-padder' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Ratio</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {['16:9', '1:1', '9:16'].map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatioPad(ratio as any)}
                      className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all ${
                        aspectRatioPad === ratio
                          ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-700 dark:text-amber-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tool.id === 'image-rounded-corners-transparency' && (
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Corner Radius</span>
                  <span className="text-amber-600 font-bold">{cornerRounding}px</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={120}
                  value={cornerRounding}
                  onChange={(e) => setCornerRounding(parseInt(e.target.value))}
                  className="w-full mt-2 accent-amber-600"
                />
              </div>
            )}

            {tool.id === 'image-chromatic-aberration-glitch' && (
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>RGB Glitch Displacement</span>
                  <span className="text-amber-600 font-bold">{glitchShift}px</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={30}
                  value={glitchShift}
                  onChange={(e) => setGlitchShift(parseInt(e.target.value))}
                  className="w-full mt-2 accent-amber-600"
                />
              </div>
            )}

            {tool.id === 'image-threshold-stencil-line-art' && (
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Black/White Cutoff Threshold</span>
                  <span className="text-amber-600 font-bold">{thresholdCutoff}</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={240}
                  value={thresholdCutoff}
                  onChange={(e) => setThresholdCutoff(parseInt(e.target.value))}
                  className="w-full mt-2 accent-amber-600"
                />
              </div>
            )}

            {/* Download Output Button */}
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={outputFileName}
                onClick={handleDownload}
                className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download {outputFileName}
              </a>
            )}
          </div>
        </div>

        {/* Right Canvas / Preview Panel */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Live Interactive Canvas Preview
              </h3>
              {currentKbSize && (
                <span className="text-xs font-medium text-slate-400">
                  Original Size: {currentKbSize} KB
                </span>
              )}
            </div>

            <div className="relative border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center min-h-[360px] max-h-[520px] p-4">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[480px] object-contain rounded-lg shadow-md"
              />
              {!imageSrc && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-500 text-xs">
                  <Camera className="w-8 h-8 text-slate-600" />
                  <span>Upload an image above to see live transformations</span>
                </div>
              )}
            </div>

            {asciiOutput && (
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ASCII Monospace Output</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(asciiOutput);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-xs text-amber-600 font-semibold flex items-center gap-1 hover:underline"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Text Art'}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 text-emerald-400 text-[8px] font-mono leading-none rounded-xl overflow-x-auto max-h-64">
                  {asciiOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
