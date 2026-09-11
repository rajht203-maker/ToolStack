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
  FileCode, 
  RotateCw, 
  Grid,
  Maximize2
} from 'lucide-react';

interface NewImageToolsSuiteProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const NewImageToolsSuite: React.FC<NewImageToolsSuiteProps> = ({ tool, onSuccess }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image.png');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Filter Studio
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [blur, setBlur] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);

  // 2. Aspect Ratio Cropper
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:5' | '4:3'>('1:1');

  // 3. Watermark
  const [wmText, setWmText] = useState('© COPYRIGHT 2026');
  const [wmOpacity, setWmOpacity] = useState(0.4);
  const [wmPosition, setWmPosition] = useState<'bottom-right' | 'center' | 'bottom-left' | 'top-right'>('bottom-right');

  // 4. Palette Extractor
  const [extractedColors, setExtractedColors] = useState<string[]>([]);

  // 5. Rounded Corner Avatar
  const [avatarShape, setAvatarShape] = useState<'circle' | 'squircle' | 'rounded'>('circle');
  const [avatarBorderWidth, setAvatarBorderWidth] = useState(4);
  const [avatarBorderColor, setAvatarBorderColor] = useState('#4f46e5');

  // 6. Duotone Map
  const [duoShadow, setDuoShadow] = useState('#1e1b4b'); // deep indigo
  const [duoHighlight, setDuoHighlight] = useState('#06b6d4'); // vibrant cyan

  // 7. Data URI & Base64
  const [base64Output, setBase64Output] = useState('');

  // 8. Flip & Mirror
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [imgRotation, setImgRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImgRef = useRef<HTMLImageElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFileName(f.name);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setImageSrc(src);
        setBase64Output(src);

        const img = new Image();
        img.onload = () => {
          originalImgRef.current = img;
          renderToolCanvas(img);
          if (tool.id === 'image-color-palette-extractor') {
            extractPalette(img);
          }
        };
        img.src = src;
      };
      reader.readAsDataURL(f);
    }
  };

  // Extract Top Colors
  const extractPalette = (img: HTMLImageElement) => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 100;
    tempCanvas.height = 100;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, 100, 100);
    const data = ctx.getImageData(0, 0, 100, 100).data;
    const colorCounts: { [hex: string]: number } = {};

    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }

    const sorted = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([hex]) => hex);

    setExtractedColors(sorted);
  };

  // Central Render function
  const renderToolCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Filter Studio
    if (tool.id === 'image-filter-studio') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px) hue-rotate(${hueRotate}deg)`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = 'none';
    }

    // 2. Aspect Ratio Cropper
    else if (tool.id === 'image-aspect-ratio-cropper') {
      const ratios = {
        '1:1': 1,
        '16:9': 16 / 9,
        '9:16': 9 / 16,
        '4:5': 4 / 5,
        '4:3': 4 / 3
      };
      const targetRatio = ratios[aspectRatio];
      let cropW = img.width;
      let cropH = img.height;

      if (img.width / img.height > targetRatio) {
        cropW = img.height * targetRatio;
      } else {
        cropH = img.width / targetRatio;
      }

      const cropX = (img.width - cropW) / 2;
      const cropY = (img.height - cropH) / 2;

      canvas.width = cropW;
      canvas.height = cropH;
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    }

    // 3. Watermark Overlay
    else if (tool.id === 'image-watermark-overlay') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const fontSize = Math.max(16, Math.round(img.width * 0.04));
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = `rgba(255, 255, 255, ${wmOpacity})`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 6;

      const metrics = ctx.measureText(wmText);
      let wx = img.width - metrics.width - 30;
      let wy = img.height - 30;

      if (wmPosition === 'center') {
        wx = (img.width - metrics.width) / 2;
        wy = img.height / 2;
      } else if (wmPosition === 'bottom-left') {
        wx = 30;
        wy = img.height - 30;
      } else if (wmPosition === 'top-right') {
        wx = img.width - metrics.width - 30;
        wy = fontSize + 30;
      }

      ctx.fillText(wmText, wx, wy);
      ctx.shadowBlur = 0;
    }

    // 4. Circular Avatar & Squircle
    else if (tool.id === 'image-round-corner-avatar') {
      const dim = Math.min(img.width, img.height);
      canvas.width = dim;
      canvas.height = dim;
      const srcX = (img.width - dim) / 2;
      const srcY = (img.height - dim) / 2;

      ctx.save();
      if (avatarShape === 'circle') {
        ctx.beginPath();
        ctx.arc(dim / 2, dim / 2, (dim / 2) - avatarBorderWidth, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
      } else if (avatarShape === 'squircle') {
        ctx.beginPath();
        ctx.roundRect(avatarBorderWidth, avatarBorderWidth, dim - (avatarBorderWidth * 2), dim - (avatarBorderWidth * 2), dim * 0.22);
        ctx.closePath();
        ctx.clip();
      }
      ctx.drawImage(img, srcX, srcY, dim, dim, 0, 0, dim, dim);
      ctx.restore();

      // Border ring
      if (avatarBorderWidth > 0) {
        ctx.lineWidth = avatarBorderWidth;
        ctx.strokeStyle = avatarBorderColor;
        if (avatarShape === 'circle') {
          ctx.beginPath();
          ctx.arc(dim / 2, dim / 2, (dim / 2) - (avatarBorderWidth / 2), 0, Math.PI * 2);
          ctx.stroke();
        } else if (avatarShape === 'squircle') {
          ctx.beginPath();
          ctx.roundRect(avatarBorderWidth / 2, avatarBorderWidth / 2, dim - avatarBorderWidth, dim - avatarBorderWidth, dim * 0.22);
          ctx.stroke();
        }
      }
    }

    // 5. Flip & Rotate
    else if (tool.id === 'image-flip-mirror-rotate') {
      const rads = (imgRotation * Math.PI) / 180;
      const is90or270 = imgRotation % 180 !== 0;
      canvas.width = is90or270 ? img.height : img.width;
      canvas.height = is90or270 ? img.width : img.height;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rads);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();
    }

    // 6. Duotone Map
    else if (tool.id === 'image-duotone-gradient-map') {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Parse duo colors
      const hexToRgb = (hex: string) => {
        const c = parseInt(hex.replace('#', ''), 16);
        return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
      };
      const [sr, sg, sb] = hexToRgb(duoShadow);
      const [hr, hg, hb] = hexToRgb(duoHighlight);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const lum = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
        d[i] = sr + lum * (hr - sr);
        d[i + 1] = sg + lum * (hg - sg);
        d[i + 2] = sb + lum * (hb - sb);
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // 7. Privacy Pixelator / Redactor
    else if (tool.id === 'image-pixelator-blur-redact') {
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw base
      ctx.drawImage(img, 0, 0);
      // Pixelate center 50% strip
      const pw = Math.round(img.width * 0.5);
      const ph = Math.round(img.height * 0.3);
      const px = Math.round((img.width - pw) / 2);
      const py = Math.round((img.height - ph) / 2);

      // low res pixel step
      const pixelSize = 14;
      for (let x = px; x < px + pw; x += pixelSize) {
        for (let y = py; y < py + ph; y += pixelSize) {
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          ctx.fillStyle = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
      // Redaction border
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.strokeRect(px, py, pw, ph);
    }

    // Default fallback
    else {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
  };

  useEffect(() => {
    if (originalImgRef.current) {
      renderToolCanvas(originalImgRef.current);
    }
  }, [
    brightness, contrast, saturation, grayscale, sepia, blur, hueRotate,
    aspectRatio, wmText, wmOpacity, wmPosition, avatarShape, avatarBorderWidth,
    avatarBorderColor, duoShadow, duoHighlight, flipH, flipV, imgRotation
  ]);

  // Download Output Canvas
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `processed-${fileName}`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    onSuccess(`Downloaded ${tool.name} output.`);
  };

  // Split Grid Slicer (3x1 Instagram Carousel)
  const handleSplitGrid = async () => {
    if (!originalImgRef.current) return;
    const img = originalImgRef.current;
    const zip = new JSZip();

    const tileWidth = Math.floor(img.width / 3);
    const tileHeight = img.height;

    for (let i = 0; i < 3; i++) {
      const tileCanvas = document.createElement('canvas');
      tileCanvas.width = tileWidth;
      tileCanvas.height = tileHeight;
      const ctx = tileCanvas.getContext('2d')!;
      ctx.drawImage(img, i * tileWidth, 0, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
      const dataUrl = tileCanvas.toDataURL('image/png');
      const b64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      zip.file(`tile-${i + 1}.png`, b64Data, { base64: true });
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `instagram-grid-tiles.zip`;
    link.click();
    onSuccess('Generated and downloaded 3-tile grid archive.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Upload Box */}
      <div className="p-8 bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl text-center space-y-4 hover:border-amber-500 transition-colors">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
          <ImageIcon className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {imageSrc ? fileName : 'Upload Target Image'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            JPG, PNG, WebP or SVG format. Real-time canvas processing with zero data uploads.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer transition-all shadow-md shadow-amber-200 dark:shadow-none">
          <Upload className="w-4 h-4" />
          <span>{imageSrc ? 'Change Image' : 'Browse Image'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {imageSrc && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tool Controls & Adjustments
            </h4>

            {/* 1. Filter Studio */}
            {tool.id === 'image-filter-studio' && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Brightness</span>
                    <span>{brightness}%</span>
                  </div>
                  <input type="range" min="30" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full accent-amber-600" />
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Contrast</span>
                    <span>{contrast}%</span>
                  </div>
                  <input type="range" min="30" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full accent-amber-600" />
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Saturation</span>
                    <span>{saturation}%</span>
                  </div>
                  <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="w-full accent-amber-600" />
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Grayscale</span>
                    <span>{grayscale}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(Number(e.target.value))} className="w-full accent-amber-600" />
                </div>
              </div>
            )}

            {/* 2. Aspect Ratio Cropper */}
            {tool.id === 'image-aspect-ratio-cropper' && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {(['1:1', '16:9', '9:16', '4:5', '4:3'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setAspectRatio(r)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      aspectRatio === r
                        ? 'border-amber-600 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* 3. Watermark Overlay */}
            {tool.id === 'image-watermark-overlay' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Copyright Text</label>
                  <input
                    type="text"
                    value={wmText}
                    onChange={(e) => setWmText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Placement Position</label>
                  <select
                    value={wmPosition}
                    onChange={(e) => setWmPosition(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="center">Center</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                  </select>
                </div>
              </div>
            )}

            {/* 4. Color Palette Extractor */}
            {tool.id === 'image-color-palette-extractor' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">Dominant Color Swatches:</p>
                <div className="grid grid-cols-3 gap-2">
                  {extractedColors.map((hex) => (
                    <div
                      key={hex}
                      onClick={() => {
                        navigator.clipboard.writeText(hex);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <div className="w-5 h-5 rounded-lg border" style={{ backgroundColor: hex }} />
                      <span className="font-mono text-[11px] font-bold">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Circular Avatar */}
            {tool.id === 'image-round-corner-avatar' && (
              <div className="space-y-3 text-xs">
                <div className="flex gap-2">
                  {(['circle', 'squircle'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setAvatarShape(s)}
                      className={`flex-1 py-2 rounded-xl border font-bold capitalize ${
                        avatarShape === s ? 'border-amber-600 bg-amber-50 dark:bg-amber-950 text-amber-600' : 'border-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="font-bold block mb-1">Border Ring Width ({avatarBorderWidth}px)</label>
                  <input type="range" min="0" max="12" value={avatarBorderWidth} onChange={(e) => setAvatarBorderWidth(Number(e.target.value))} className="w-full accent-amber-600" />
                </div>
              </div>
            )}

            {/* 6. Flip & Rotate */}
            {tool.id === 'image-flip-mirror-rotate' && (
              <div className="flex gap-2 text-xs font-bold">
                <button
                  onClick={() => setFlipH(!flipH)}
                  className={`flex-1 py-2 rounded-xl border ${flipH ? 'bg-amber-100 border-amber-500 text-amber-800' : 'border-slate-200'}`}
                >
                  Flip Horizontal
                </button>
                <button
                  onClick={() => setFlipV(!flipV)}
                  className={`flex-1 py-2 rounded-xl border ${flipV ? 'bg-amber-100 border-amber-500 text-amber-800' : 'border-slate-200'}`}
                >
                  Flip Vertical
                </button>
                <button
                  onClick={() => setImgRotation((prev) => (prev + 90) % 360)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
                >
                  Rotate 90°
                </button>
              </div>
            )}

            {/* 7. Duotone */}
            {tool.id === 'image-duotone-gradient-map' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Shadow Hue</label>
                  <input type="color" value={duoShadow} onChange={(e) => setDuoShadow(e.target.value)} className="w-full h-8 rounded-xl cursor-pointer" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Highlight Hue</label>
                  <input type="color" value={duoHighlight} onChange={(e) => setDuoHighlight(e.target.value)} className="w-full h-8 rounded-xl cursor-pointer" />
                </div>
              </div>
            )}

            {/* 8. Slicer */}
            {tool.id === 'image-split-grid-slicer' && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500">
                  Splits horizontal or panoramic photos into 3 seamless square carousel posts.
                </p>
                <button
                  onClick={handleSplitGrid}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Grid className="w-4 h-4" />
                  <span>Download 3-Tile Grid ZIP</span>
                </button>
              </div>
            )}

            {/* Download Main Output */}
            {tool.id !== 'image-split-grid-slicer' && (
              <button
                onClick={handleDownload}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-200 dark:shadow-none"
              >
                <Download className="w-4 h-4" />
                <span>Download Processed Image</span>
              </button>
            )}

            {/* Data URI copy */}
            {tool.id === 'image-svg-data-url-converter' && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Base64 Data URI:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(base64Output);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-amber-600 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <textarea
                  rows={4}
                  readOnly
                  value={base64Output.slice(0, 300) + '... [truncated]'}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
                />
              </div>
            )}
          </div>

          {/* Canvas Live Output */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col items-center space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-start">
              Live Canvas Render
            </span>
            <div className="max-w-full overflow-hidden rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 p-1 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
              <canvas ref={canvasRef} className="max-h-[360px] max-w-full object-contain rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
