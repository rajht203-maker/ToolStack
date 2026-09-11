import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { 
  Upload, 
  Image as ImageIcon, 
  Download, 
  RefreshCw, 
  Check, 
  Copy, 
  Sliders, 
  Maximize2, 
  QrCode, 
  Sparkles, 
  Code, 
  Wifi, 
  Globe, 
  Eye
} from 'lucide-react';
import { ToolItem } from '../../types';

interface ImageToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const ImageTools: React.FC<ImageToolsProps> = ({ tool, onSuccess }) => {
  // Common states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image');
  const [fileSize, setFileSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compressor states
  const [quality, setQuality] = useState<number>(80);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  // Resizer states
  const [origWidth, setOrigWidth] = useState<number>(800);
  const [origHeight, setOrigHeight] = useState<number>(600);
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);

  // Format Converter states
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/webp');
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

  // Favicon states
  const [faviconEmoji, setFaviconEmoji] = useState<string>('🚀');
  const [faviconZipUrl, setFaviconZipUrl] = useState<string | null>(null);
  const [faviconPreviewUrl, setFaviconPreviewUrl] = useState<string | null>(null);

  // QR Generator states
  const [qrType, setQrType] = useState<'url' | 'text' | 'wifi'>('url');
  const [qrText, setQrText] = useState<string>('https://toolstack.dev');
  const [wifiSsid, setWifiSsid] = useState<string>('HomeNetwork');
  const [wifiPassword, setWifiPassword] = useState<string>('SecretPassword123');
  const [wifiAuth, setWifiAuth] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [qrFgColor, setQrFgColor] = useState<string>('#1e1b4b');
  const [qrBgColor, setQrBgColor] = useState<string>('#ffffff');
  const [qrResultUrl, setQrResultUrl] = useState<string | null>(null);

  // SVG Optimizer states
  const [svgInput, setSvgInput] = useState<string>(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <!-- Circle Logo -->
  <circle cx="50" cy="50" r="45" fill="#4f46e5" />
  <polygon points="35,25 75,50 35,75" fill="#ffffff" />
</svg>`
  );
  const [optimizedSvg, setOptimizedSvg] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name.replace(/\.[^/.]+$/, ''));
      setFileSize(file.size);

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setSelectedImage(dataUrl);

        const img = new Image();
        img.onload = () => {
          setOrigWidth(img.width);
          setOrigHeight(img.height);
          setTargetWidth(img.width);
          setTargetHeight(img.height);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  // --- COMPRESSOR ACTION ---
  const handleCompress = () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const mimeType = 'image/jpeg';
      const compressedDataUrl = canvas.toDataURL(mimeType, quality / 100);
      setCompressedUrl(compressedDataUrl);

      // Estimate compressed size from base64
      const stringLength = compressedDataUrl.length - 'data:image/jpeg;base64,'.length;
      const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383634;
      setCompressedSize(Math.round(sizeInBytes));
      setIsProcessing(false);
      onSuccess(`Compressed image to ${(sizeInBytes / 1024).toFixed(1)} KB.`);
    };
    img.src = selectedImage;
  };

  // --- RESIZER ACTION ---
  const handleResize = () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const resizedDataUrl = canvas.toDataURL('image/png');
      setResizedUrl(resizedDataUrl);
      setIsProcessing(false);
      onSuccess(`Resized image to ${targetWidth}x${targetHeight}px.`);
    };
    img.src = selectedImage;
  };

  const applyPreset = (w: number, h: number) => {
    setTargetWidth(w);
    setTargetHeight(h);
  };

  // --- FORMAT CONVERTER ACTION ---
  const handleFormatConvert = () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL(targetFormat, 0.92);
      setConvertedUrl(dataUrl);
      setIsProcessing(false);
      const ext = targetFormat.split('/')[1];
      onSuccess(`Converted image to ${ext.toUpperCase()}.`);
    };
    img.src = selectedImage;
  };

  // --- FAVICON GENERATOR ACTION ---
  const handleFaviconGenerate = async () => {
    setIsProcessing(true);
    try {
      const zip = new JSZip();
      const sizes = [16, 32, 48, 180];
      let previewUrl = '';

      for (const size of sizes) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;

        if (selectedImage) {
          const img = new Image();
          await new Promise<void>((resolve) => {
            img.onload = () => {
              ctx.drawImage(img, 0, 0, size, size);
              resolve();
            };
            img.src = selectedImage;
          });
        } else {
          // Render Emoji favicon
          ctx.font = `${Math.floor(size * 0.8)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(faviconEmoji, size / 2, size / 2 + 2);
        }

        const dataUrl = canvas.toDataURL('image/png');
        if (size === 32) previewUrl = dataUrl;
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        zip.file(size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`, base64Data, { base64: true });
      }

      // Add HTML code snippet file
      const htmlSnippet = `<!-- ToolStack Favicon Tags -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;
      zip.file('favicon-html-tags.html', htmlSnippet);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      setFaviconZipUrl(URL.createObjectURL(zipBlob));
      setFaviconPreviewUrl(previewUrl);
      onSuccess('Generated full multi-resolution favicon package.');
    } catch (e: any) {
      setError('Failed to generate favicon package.');
    } finally {
      setIsProcessing(false);
    }
  };

  // --- QR GENERATOR ACTION ---
  useEffect(() => {
    if (tool.id === 'qr-generator') {
      generateQrCode();
    }
  }, [qrType, qrText, wifiSsid, wifiPassword, wifiAuth, qrFgColor, qrBgColor]);

  const generateQrCode = async () => {
    let payload = qrText;
    if (qrType === 'wifi') {
      payload = `WIFI:T:${wifiAuth};S:${wifiSsid};P:${wifiPassword};;`;
    }

    try {
      const url = await QRCode.toDataURL(payload, {
        width: 600,
        margin: 2,
        color: {
          dark: qrFgColor,
          light: qrBgColor
        }
      });
      setQrResultUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  // --- SVG OPTIMIZER ACTION ---
  const handleOptimizeSvg = () => {
    try {
      // Strip XML comments
      let clean = svgInput.replace(/<!--[\s\S]*?-->/g, '');
      // Collapse whitespace between tags
      clean = clean.replace(/>\s+</g, '><');
      // Trim spaces
      clean = clean.trim();
      setOptimizedSvg(clean);
      const originalBytes = new Blob([svgInput]).size;
      const cleanBytes = new Blob([clean]).size;
      const saved = Math.max(0, originalBytes - cleanBytes);
      onSuccess(`Optimized SVG (saved ${saved} bytes).`);
    } catch (e) {
      setError('Invalid SVG markup format.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {/* 1. IMAGE COMPRESSOR */}
      {tool.id === 'image-compressor' && (
        <div className="space-y-6">
          {!selectedImage ? (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-slate-50/50 dark:bg-slate-900/50">
              <Upload className="w-12 h-12 mx-auto text-amber-500 mb-3" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Upload Image to Compress
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Supports JPG, PNG, and WebP. Adjust quality to reduce size without noticeable visual loss.
              </p>
              <label className="mt-5 inline-flex items-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm rounded-xl cursor-pointer shadow-sm">
                <span>Select Image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Controls */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Compression Quality: <span className="text-amber-600 dark:text-amber-400 font-bold">{quality}%</span>
                  </span>
                  <button
                    onClick={() => { setSelectedImage(null); setCompressedUrl(null); }}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Change Image
                  </button>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Smaller File (10%)</span>
                  <span>Balanced (80%)</span>
                  <span>Maximum Quality (100%)</span>
                </div>
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Compress Image
                </button>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Original Image ({(fileSize / 1024).toFixed(1)} KB)
                  </div>
                  <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={selectedImage} alt="Original" className="max-h-full object-contain" />
                  </div>
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800">
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 flex justify-between">
                    <span>Compressed</span>
                    {compressedSize && (
                      <span>
                        {(compressedSize / 1024).toFixed(1)} KB (
                        {Math.max(0, Math.round((1 - compressedSize / fileSize) * 100))}% saved)
                      </span>
                    )}
                  </div>
                  <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                    {compressedUrl ? (
                      <img src={compressedUrl} alt="Compressed" className="max-h-full object-contain" />
                    ) : (
                      <div className="text-xs text-slate-400 text-center px-4">
                        Adjust slider and click "Compress Image" to preview
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {compressedUrl && (
                <div className="flex justify-end">
                  <a
                    href={compressedUrl}
                    download={`compressed-${fileName}.jpg`}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4" /> Download Compressed Image
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. IMAGE RESIZER */}
      {tool.id === 'image-resizer' && (
        <div className="space-y-6">
          {!selectedImage ? (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-slate-50/50 dark:bg-slate-900/50">
              <Maximize2 className="w-12 h-12 mx-auto text-amber-500 mb-3" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Upload Image to Resize
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Set exact width and height or choose popular social media presets.
              </p>
              <label className="mt-5 inline-flex items-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm rounded-xl cursor-pointer shadow-sm">
                <span>Choose Image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Dimensions Input */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Original Size: {origWidth} × {origHeight} px
                  </span>
                  <button
                    onClick={() => { setSelectedImage(null); setResizedUrl(null); }}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Change Image
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={targetWidth}
                      onChange={(e) => {
                        const w = Number(e.target.value);
                        setTargetWidth(w);
                        if (lockAspectRatio && origWidth > 0) {
                          setTargetHeight(Math.round((w / origWidth) * origHeight));
                        }
                      }}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={targetHeight}
                      onChange={(e) => {
                        const h = Number(e.target.value);
                        setTargetHeight(h);
                        if (lockAspectRatio && origHeight > 0) {
                          setTargetWidth(Math.round((h / origHeight) * origWidth));
                        }
                      }}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
                    />
                  </div>
                </div>

                {/* Aspect ratio lock & presets */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lockAspectRatio}
                      onChange={(e) => setLockAspectRatio(e.target.checked)}
                      className="text-amber-600 rounded"
                    />
                    Lock Aspect Ratio
                  </label>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs text-slate-400">Presets:</span>
                    <button
                      type="button"
                      onClick={() => applyPreset(1080, 1080)}
                      className="px-2 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:border-amber-500"
                    >
                      1:1 Square (1080x1080)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(1280, 720)}
                      className="px-2 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:border-amber-500"
                    >
                      16:9 HD (1280x720)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(1920, 1080)}
                      className="px-2 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:border-amber-500"
                    >
                      Full HD (1920x1080)
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleResize}
                  disabled={isProcessing}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Maximize2 className="w-4 h-4" />}
                  Apply Dimensions & Resize
                </button>
              </div>

              {resizedUrl && (
                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Resized Result ({targetWidth} × {targetHeight} px)
                    </span>
                    <a
                      href={resizedUrl}
                      download={`resized-${targetWidth}x${targetHeight}-${fileName}.png`}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                  <div className="max-h-80 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-2">
                    <img src={resizedUrl} alt="Resized output" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. FORMAT CONVERTER */}
      {tool.id === 'image-format-converter' && (
        <div className="space-y-6">
          {!selectedImage ? (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-slate-50/50 dark:bg-slate-900/50">
              <RefreshCw className="w-12 h-12 mx-auto text-amber-500 mb-3" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Upload Image to Convert Format
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Convert between JPG, PNG, and WebP instantly with zero quality loss.
              </p>
              <label className="mt-5 inline-flex items-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm rounded-xl cursor-pointer shadow-sm">
                <span>Select Image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Target Format
                </span>
                <button
                  onClick={() => { setSelectedImage(null); setConvertedUrl(null); }}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Change Image
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'WebP (Recommended)', value: 'image/webp', desc: 'Smallest size, high quality' },
                  { label: 'PNG', value: 'image/png', desc: 'Lossless with transparency' },
                  { label: 'JPG / JPEG', value: 'image/jpeg', desc: 'Universal compatibility' },
                ].map((fmt) => (
                  <button
                    key={fmt.value}
                    type="button"
                    onClick={() => setTargetFormat(fmt.value as any)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      targetFormat === fmt.value
                        ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs">{fmt.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{fmt.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleFormatConvert}
                disabled={isProcessing}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Convert to {targetFormat.split('/')[1].toUpperCase()}
              </button>

              {convertedUrl && (
                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 rounded-xl flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    Converted to {targetFormat.split('/')[1].toUpperCase()}!
                  </span>
                  <a
                    href={convertedUrl}
                    download={`converted-${fileName}.${targetFormat.split('/')[1]}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. FAVICON GENERATOR */}
      {tool.id === 'favicon-generator' && (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
              Source Asset: Upload Logo or Pick Emoji
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 text-center">
                <span className="text-xs font-medium text-slate-500 block mb-2">Option A: Upload Image</span>
                <label className="inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg cursor-pointer">
                  <span>{selectedImage ? 'Change Image' : 'Select Image'}</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
                {selectedImage && <div className="text-[11px] text-emerald-600 mt-2">✓ Image loaded</div>}
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 text-center">
                <span className="text-xs font-medium text-slate-500 block mb-2">Option B: Emoji Favicon</span>
                <div className="flex justify-center gap-2">
                  {['🚀', '⚡', '🔥', '💎', '🌟', '💻', '🛠️'].map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => { setFaviconEmoji(em); setSelectedImage(null); }}
                      className={`text-xl p-2 rounded-lg border transition-all ${
                        faviconEmoji === em && !selectedImage
                          ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Browser Tab Simulation Preview */}
            <div className="p-4 bg-slate-200 dark:bg-slate-900 rounded-xl">
              <span className="text-xs font-medium text-slate-500 block mb-2">Simulated Browser Tab</span>
              <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-t-lg shadow-sm border border-b-0 border-slate-300 dark:border-slate-700">
                {selectedImage ? (
                  <img src={selectedImage} alt="Favicon preview" className="w-4 h-4 rounded object-cover" />
                ) : (
                  <span className="text-sm">{faviconEmoji}</span>
                )}
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  ToolStack — My Web Application
                </span>
              </div>
            </div>

            <button
              onClick={handleFaviconGenerate}
              disabled={isProcessing}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate Multi-Size Favicon Package (16, 32, 48, 180px + HTML)
            </button>

            {faviconZipUrl && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    Complete Favicon ZIP Package Ready!
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400">
                    Includes 16x16, 32x32, 48x48, apple-touch-icon.png, and HTML snippet.
                  </div>
                </div>
                <a
                  href={faviconZipUrl}
                  download="favicon-package.zip"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download ZIP
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. QR CODE GENERATOR */}
      {tool.id === 'qr-generator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div className="flex gap-2">
              {(['url', 'text', 'wifi'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setQrType(t)}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl uppercase tracking-wider border transition-all ${
                    qrType === t
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {qrType === 'url' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Target Website URL
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            {qrType === 'text' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Plain Text Content
                </label>
                <textarea
                  rows={3}
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  placeholder="Enter any text, notes, or messages..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {qrType === 'wifi' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    WiFi Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    WiFi Password
                  </label>
                  <input
                    type="text"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={qrFgColor}
                    onChange={(e) => setQrFgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-500">{qrFgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-500">{qrBgColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 bg-white dark:bg-slate-800 flex flex-col items-center justify-center text-center space-y-4">
            {qrResultUrl ? (
              <>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 inline-block">
                  <img src={qrResultUrl} alt="Generated QR Code" className="w-48 h-48 rounded-lg" />
                </div>
                <div className="flex gap-3 w-full max-w-xs">
                  <a
                    href={qrResultUrl}
                    download="qrcode.png"
                    onClick={() => onSuccess('Downloaded high-resolution QR code.')}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PNG
                  </a>
                  <button
                    onClick={() => {
                      copyToClipboard(qrResultUrl);
                      onSuccess('Copied QR code data URL.');
                    }}
                    className="py-2.5 px-3 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </>
            ) : (
              <QrCode className="w-16 h-16 text-slate-300 animate-pulse" />
            )}
          </div>
        </div>
      )}

      {/* 6. SVG OPTIMIZER */}
      {tool.id === 'svg-optimizer' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Raw SVG Code
              </label>
              <textarea
                rows={10}
                value={svgInput}
                onChange={(e) => setSvgInput(e.target.value)}
                className="w-full font-mono text-xs p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Live Vector Preview
              </label>
              <div className="h-[235px] border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                <div dangerouslySetInnerHTML={{ __html: optimizedSvg || svgInput }} />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleOptimizeSvg}
              className="py-2.5 px-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Clean & Optimize SVG
            </button>
            {optimizedSvg && (
              <button
                onClick={() => copyToClipboard(optimizedSvg)}
                className="py-2.5 px-4 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium rounded-xl flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                Copy Minified SVG
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
