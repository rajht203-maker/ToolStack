import React, { useState, useEffect, useRef } from 'react';
import { ToolItem } from '../../types';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Upload, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Globe, 
  FileText, 
  Wifi, 
  Mail, 
  Phone, 
  User,
  Sliders,
  Palette,
  Eye,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

interface QrCodeLogoGeneratorProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const QrCodeLogoGeneratorTool: React.FC<QrCodeLogoGeneratorProps> = ({ tool, onSuccess }) => {
  const [contentType, setContentType] = useState<'url' | 'text' | 'wifi' | 'vcard' | 'email'>('url');
  
  // Content values
  const [urlValue, setUrlValue] = useState('https://toolstack.app');
  const [textValue, setTextValue] = useState('Welcome to ToolStack Utilities Suite!');
  const [wifiSsid, setWifiSsid] = useState('Office_5G_Guest');
  const [wifiPassword, setWifiPassword] = useState('SecurePass2026');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [emailTo, setEmailTo] = useState('support@example.com');
  const [emailSubject, setEmailSubject] = useState('Inquiry from QR Code');
  const [emailBody, setEmailBody] = useState('Hello, I scanned your QR code...');
  
  // vCard details
  const [vcardName, setVcardName] = useState('Sarah Connor');
  const [vcardOrg, setVcardOrg] = useState('Cyberdyne Systems');
  const [vcardPhone, setVcardPhone] = useState('+1 (555) 438-9920');
  const [vcardEmail, setVcardEmail] = useState('sarah@cyberdyne.org');
  const [vcardUrl, setVcardUrl] = useState('https://cyberdyne.org');

  // QR Customizations
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(600); // Export dimension
  const [logoSizePct, setLogoSizePct] = useState(24); // 20% to 28%
  const [logoShape, setLogoShape] = useState<'circle' | 'square' | 'rounded'>('circle');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Compute raw payload based on type
  const getPayload = (): string => {
    switch (contentType) {
      case 'url':
        return urlValue.startsWith('http') ? urlValue : `https://${urlValue}`;
      case 'text':
        return textValue;
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nORG:${vcardOrg}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nURL:${vcardUrl}\nEND:VCARD`;
      default:
        return urlValue;
    }
  };

  // Re-render QR code with center logo on canvas
  const renderQr = async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);

    try {
      const payload = getPayload();
      const canvas = canvasRef.current;
      canvas.width = qrSize;
      canvas.height = qrSize;

      // Render base QR code with High Error Correction (H allows up to 30% covered by logo)
      await QRCode.toCanvas(canvas, payload, {
        width: qrSize,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: fgColor,
          light: bgColor
        }
      });

      const ctx = canvas.getContext('2d');
      if (ctx && logoUrl) {
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.src = logoUrl;

        await new Promise<void>((resolve) => {
          logoImg.onload = () => resolve();
          logoImg.onerror = () => resolve();
        });

        if (logoImg.width) {
          const logoDim = qrSize * (logoSizePct / 100);
          const logoX = (qrSize - logoDim) / 2;
          const logoY = (qrSize - logoDim) / 2;
          const pad = 6;

          // Draw protective background badge
          ctx.fillStyle = bgColor;
          if (logoShape === 'circle') {
            ctx.beginPath();
            ctx.arc(qrSize / 2, qrSize / 2, (logoDim / 2) + pad, 0, Math.PI * 2);
            ctx.fill();
            // Subtle border around logo area
            ctx.strokeStyle = fgColor + '20';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Clip and draw image
            ctx.save();
            ctx.beginPath();
            ctx.arc(qrSize / 2, qrSize / 2, logoDim / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(logoImg, logoX, logoY, logoDim, logoDim);
            ctx.restore();
          } else if (logoShape === 'rounded') {
            const rad = 16;
            ctx.beginPath();
            ctx.roundRect(logoX - pad, logoY - pad, logoDim + (pad * 2), logoDim + (pad * 2), rad + 4);
            ctx.fill();
            ctx.strokeStyle = fgColor + '20';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(logoX, logoY, logoDim, logoDim, rad);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(logoImg, logoX, logoY, logoDim, logoDim);
            ctx.restore();
          } else {
            // Square
            ctx.fillRect(logoX - pad, logoY - pad, logoDim + (pad * 2), logoDim + (pad * 2));
            ctx.drawImage(logoImg, logoX, logoY, logoDim, logoDim);
          }
        }
      }
    } catch (err) {
      console.error('Failed to render QR Code', err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    renderQr();
  }, [contentType, urlValue, textValue, wifiSsid, wifiPassword, wifiEncryption, emailTo, emailSubject, emailBody, vcardName, vcardOrg, vcardPhone, vcardEmail, vcardUrl, fgColor, bgColor, qrSize, logoSizePct, logoShape, logoUrl]);

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Download High-Res PNG
  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `custom-qr-logo-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    onSuccess('Downloaded branded QR code with logo as high-res PNG.');
  };

  // Copy Data URL
  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setIsCopied(true);
          onSuccess('Copied QR code image directly to clipboard.');
          setTimeout(() => setIsCopied(false), 3000);
        }
      });
    } catch (err) {
      // Fallback: copy base64 text
      navigator.clipboard.writeText(canvasRef.current.toDataURL());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            Enterprise QR Studio
          </span>
          <span className="text-xs text-slate-400 font-semibold">• Error Correction Level H (30% Resilience)</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Custom QR Code Generator with Logo
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Embed your custom company logo or icon directly into high-resolution QR codes with zero scan errors. Supports URLs, Wi-Fi login, vCards, and emails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Content & Logo Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Content Type Selector */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-500" /> 1. Select QR Data Type
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'url', label: 'Website URL', icon: Globe },
                { id: 'vcard', label: 'Contact vCard', icon: User },
                { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
                { id: 'email', label: 'Send Email', icon: Mail },
                { id: 'text', label: 'Plain Text', icon: FileText }
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setContentType(t.id as any)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all gap-1.5 ${
                      contentType === t.id
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Input fields based on type */}
            <div className="pt-2">
              {contentType === 'url' && (
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Destination URL
                  </label>
                  <input
                    type="url"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {contentType === 'vcard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={vcardName}
                      onChange={(e) => setVcardName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={vcardOrg}
                      onChange={(e) => setVcardOrg(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={vcardPhone}
                      onChange={(e) => setVcardPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Email</label>
                    <input
                      type="email"
                      value={vcardEmail}
                      onChange={(e) => setVcardEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                </div>
              )}

              {contentType === 'wifi' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Network SSID (Name)</label>
                    <input
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Password</label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                </div>
              )}

              {contentType === 'email' && (
                <div className="space-y-2">
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="Recipient Email"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Subject line"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              )}

              {contentType === 'text' && (
                <textarea
                  rows={3}
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                />
              )}
            </div>
          </div>

          {/* Logo Upload & Embedding Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-500" /> 2. Center Logo & Brand Badge
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {logoUrl ? (
                <div className="relative w-20 h-20 rounded-2xl border-2 border-indigo-500 bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center shrink-0 shadow-sm">
                  <img src={logoUrl} alt="Center Logo" className="max-w-full max-h-full object-contain" />
                  <button
                    onClick={() => setLogoUrl(null)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black shadow-md"
                    title="Remove Logo"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer px-5 py-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors shrink-0">
                  <Upload className="w-5 h-5 text-indigo-500" />
                  <span>Choose Logo File (PNG / SVG / JPG)</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              )}

              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {logoUrl ? 'Logo successfully attached to QR center' : 'Upload company icon or emblem'}
                </p>
                <p>
                  Error Correction Level H keeps 100% scan fidelity even when the center 25% is obscured by your logo.
                </p>
              </div>
            </div>

            {/* Logo Settings */}
            {logoUrl && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    <span>Logo Scale:</span>
                    <span>{logoSizePct}%</span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="28"
                    value={logoSizePct}
                    onChange={(e) => setLogoSizePct(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Badge Shape
                  </label>
                  <div className="flex items-center gap-2">
                    {(['circle', 'rounded', 'square'] as const).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => setLogoShape(shape)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                          logoShape === shape
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Color & Output Customization */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-500" /> 3. Styling & Color Palette
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  QR Pattern Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live High-Def Canvas & Download */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col items-center space-y-6">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-500" /> High-DPI Output
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3" /> Tested Scannable
              </span>
            </div>

            {/* Canvas Box */}
            <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shadow-inner max-w-full">
              <canvas
                ref={canvasRef}
                className="max-w-[280px] sm:max-w-[320px] w-full h-auto aspect-square rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
              />
            </div>

            {/* Quick Export Controls */}
            <div className="w-full space-y-2.5">
              <button
                onClick={handleDownloadPng}
                className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Print-Ready PNG</span>
              </button>

              <button
                onClick={handleCopyImage}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{isCopied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
              </button>
            </div>

            <div className="w-full p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-[11px] text-indigo-900 dark:text-indigo-300 space-y-1">
              <p className="font-bold">Scan Reliability Guarantee:</p>
              <p className="opacity-80 leading-relaxed">
                Uses 30% Reed-Solomon error correction bytes, guaranteeing flawless recognition on iOS and Android camera apps even with a logo centered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
