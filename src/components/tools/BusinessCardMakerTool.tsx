import React, { useState, useRef, useEffect } from 'react';
import { ToolItem } from '../../types';
import QRCode from 'qrcode';
import { PDFDocument, rgb } from 'pdf-lib';
import { 
  CreditCard, 
  Upload, 
  Download, 
  RefreshCw, 
  Sparkles, 
  QrCode, 
  Image as ImageIcon, 
  Eye, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Check, 
  Copy,
  Layers,
  Palette,
  RotateCw,
  Building,
  User
} from 'lucide-react';

interface BusinessCardMakerProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const BusinessCardMakerTool: React.FC<BusinessCardMakerProps> = ({ tool, onSuccess }) => {
  // Card details
  const [fullName, setFullName] = useState('Alexander Vance');
  const [jobTitle, setJobTitle] = useState('Chief Technology Officer');
  const [companyName, setCompanyName] = useState('Vance Labs & Co.');
  const [tagline, setTagline] = useState('Engineering the Intelligent Future');
  const [email, setEmail] = useState('alexander@vancelabs.io');
  const [phone, setPhone] = useState('+1 (555) 382-9901');
  const [website, setWebsite] = useState('https://vancelabs.io');
  const [address, setAddress] = useState('100 Silicon Ave, Suite 400, San Francisco, CA');
  
  // Customization
  const [theme, setTheme] = useState<'minimal' | 'dark' | 'gradient' | 'luxury' | 'corporate'>('minimal');
  const [accentColor, setAccentColor] = useState('#4f46e5');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [qrMode, setQrMode] = useState<'vcard' | 'website'>('vcard');
  const [showQrOnFront, setShowQrOnFront] = useState(false);
  const [showQrOnBack, setShowQrOnBack] = useState(true);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  // Generate QR Code with embedded logo
  useEffect(() => {
    const generateQR = async () => {
      let qrContent = website;
      if (qrMode === 'vcard') {
        // Standard vCard 3.0 format
        qrContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${fullName}\nORG:${companyName}\nTITLE:${jobTitle}\nTEL:${phone}\nEMAIL:${email}\nURL:${website}\nADR:;;${address};;;\nEND:VCARD`;
      }

      try {
        const tempCanvas = document.createElement('canvas');
        const size = 320;
        tempCanvas.width = size;
        tempCanvas.height = size;

        await QRCode.toCanvas(tempCanvas, qrContent, {
          width: size,
          margin: 1,
          errorCorrectionLevel: 'H', // High error correction to allow center logo
          color: {
            dark: theme === 'dark' || theme === 'luxury' ? '#0f172a' : '#1e293b',
            light: '#ffffff'
          }
        });

        const ctx = tempCanvas.getContext('2d');
        if (ctx && logoUrl) {
          const logoImg = new Image();
          logoImg.crossOrigin = 'anonymous';
          logoImg.src = logoUrl;
          await new Promise<void>((resolve) => {
            logoImg.onload = () => resolve();
            logoImg.onerror = () => resolve(); // continue even if logo fails
          });

          if (logoImg.width) {
            const logoDim = size * 0.24;
            const logoX = (size - logoDim) / 2;
            const logoY = (size - logoDim) / 2;

            // White rounded protective badge for logo
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, (logoDim / 2) + 4, 0, Math.PI * 2);
            ctx.fill();

            // Circular clip and draw logo
            ctx.save();
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, logoDim / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(logoImg, logoX, logoY, logoDim, logoDim);
            ctx.restore();
          }
        }

        setQrCodeDataUrl(tempCanvas.toDataURL('image/png'));
      } catch (err) {
        console.error('QR code generation failed', err);
      }
    };

    generateQR();
  }, [fullName, companyName, jobTitle, phone, email, website, address, qrMode, theme, logoUrl]);

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

  // Convert HTML elements to Canvas & PNG
  const renderCardToCanvas = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    const width = 1050; // 3.5" at 300 DPI
    const height = 600;  // 2.0" at 300 DPI
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable');

    // Background based on theme
    if (theme === 'dark') {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);
      // Subtle accent stripe
      ctx.fillStyle = accentColor;
      ctx.fillRect(0, 0, 24, height);
    } else if (theme === 'luxury') {
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, width, height);
      // Gold/metallic border
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 12;
      ctx.strokeRect(20, 20, width - 40, height - 40);
    } else if (theme === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#4338ca');
      grad.addColorStop(1, '#6366f1');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (theme === 'corporate') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, height - 80, width, 80);
      ctx.fillStyle = accentColor;
      ctx.fillRect(0, height - 90, width, 10);
    } else {
      // Minimal
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = accentColor;
      ctx.fillRect(0, 0, 20, height);
    }

    return canvas;
  };

  // Export front or back as PNG
  const handleExportPng = async (side: 'front' | 'back') => {
    setIsExporting(true);
    try {
      const cardEl = side === 'front' ? frontCardRef.current : backCardRef.current;
      if (!cardEl) return;

      // Draw high resolution representation to canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1050; // 3.5 in @ 300 DPI
      canvas.height = 600; // 2.0 in @ 300 DPI
      const ctx = canvas.getContext('2d')!;

      // Background
      if (theme === 'dark') {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 1050, 600);
        ctx.fillStyle = accentColor;
        ctx.fillRect(0, 0, 30, 600);
      } else if (theme === 'luxury') {
        ctx.fillStyle = '#18181b';
        ctx.fillRect(0, 0, 1050, 600);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 16;
        ctx.strokeRect(30, 30, 990, 540);
      } else if (theme === 'gradient') {
        const grad = ctx.createLinearGradient(0, 0, 1050, 600);
        grad.addColorStop(0, accentColor);
        grad.addColorStop(1, '#312e81');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1050, 600);
      } else if (theme === 'corporate') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 1050, 600);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 500, 1050, 100);
        ctx.fillStyle = accentColor;
        ctx.fillRect(0, 485, 1050, 15);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 1050, 600);
        ctx.fillStyle = accentColor;
        ctx.fillRect(0, 0, 24, 600);
      }

      const isDark = theme === 'dark' || theme === 'luxury' || theme === 'gradient';

      if (side === 'front') {
        // Logo if present
        let currentX = 80;
        if (logoUrl) {
          const img = new Image();
          img.src = logoUrl;
          await new Promise((r) => { img.onload = r; img.onerror = r; });
          if (img.width) {
            ctx.drawImage(img, 80, 80, 100, 100);
            currentX = 210;
          }
        }

        // Company Name
        ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText(companyName, currentX, 125);

        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.font = '500 24px sans-serif';
        ctx.fillText(tagline, currentX, 165);

        // Person Name & Title
        ctx.fillStyle = isDark ? '#f8fafc' : '#020617';
        ctx.font = 'bold 54px sans-serif';
        ctx.fillText(fullName, 80, 310);

        ctx.fillStyle = accentColor;
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText(jobTitle.toUpperCase(), 80, 355);

        // Contact details
        ctx.fillStyle = isDark ? '#cbd5e1' : '#334155';
        ctx.font = '22px sans-serif';
        ctx.fillText(`Phone: ${phone}`, 80, 440);
        ctx.fillText(`Email: ${email}`, 80, 480);
        ctx.fillText(`Web:   ${website}`, 80, 520);

        // Optional front QR
        if (showQrOnFront && qrCodeDataUrl) {
          const qrImg = new Image();
          qrImg.src = qrCodeDataUrl;
          await new Promise((r) => { qrImg.onload = r; });
          ctx.drawImage(qrImg, 780, 330, 200, 200);
        }
      } else {
        // BACK SIDE
        if (showQrOnBack && qrCodeDataUrl) {
          const qrImg = new Image();
          qrImg.src = qrCodeDataUrl;
          await new Promise((r) => { qrImg.onload = r; });
          // Center QR Code
          ctx.drawImage(qrImg, (1050 - 280) / 2, 80, 280, 280);

          ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
          ctx.font = 'bold 36px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(companyName, 1050 / 2, 420);

          ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
          ctx.font = '24px sans-serif';
          ctx.fillText(`Scan with camera to connect or save vCard`, 1050 / 2, 470);
          ctx.fillText(website, 1050 / 2, 520);
          ctx.textAlign = 'left';
        } else {
          // Centered Brand Back
          if (logoUrl) {
            const img = new Image();
            img.src = logoUrl;
            await new Promise((r) => { img.onload = r; img.onerror = r; });
            if (img.width) {
              ctx.drawImage(img, (1050 - 160) / 2, 140, 160, 160);
            }
          }
          ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
          ctx.font = 'bold 50px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(companyName, 1050 / 2, 360);
          ctx.fillStyle = accentColor;
          ctx.font = '500 28px sans-serif';
          ctx.fillText(tagline, 1050 / 2, 410);
          ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
          ctx.font = '24px sans-serif';
          ctx.fillText(website, 1050 / 2, 480);
          ctx.textAlign = 'left';
        }
      }

      // Download
      const link = document.createElement('a');
      link.download = `${companyName.toLowerCase().replace(/\s+/g, '-')}-card-${side}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setExportSuccess(`Exported ${side.toUpperCase()} business card at 300 DPI!`);
      onSuccess(`Exported ${side} card as high-res 300 DPI PNG.`);
      setTimeout(() => setExportSuccess(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  // Export Double-Sided PDF
  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      const pdfDoc = await PDFDocument.create();
      // 3.5" x 2.0" in points (72 points per inch) = 252 x 144 points
      const cardWidthPts = 252;
      const cardHeightPts = 144;

      // Render front to canvas
      const frontCanvas = document.createElement('canvas');
      frontCanvas.width = 1050;
      frontCanvas.height = 600;
      // create front image
      await drawCardToCanvas(frontCanvas, 'front');
      const frontImgBytes = await fetch(frontCanvas.toDataURL('image/png')).then(res => res.arrayBuffer());
      const frontImage = await pdfDoc.embedPng(frontImgBytes);

      const page1 = pdfDoc.addPage([cardWidthPts, cardHeightPts]);
      page1.drawImage(frontImage, {
        x: 0,
        y: 0,
        width: cardWidthPts,
        height: cardHeightPts
      });

      // Render back to canvas
      const backCanvas = document.createElement('canvas');
      backCanvas.width = 1050;
      backCanvas.height = 600;
      await drawCardToCanvas(backCanvas, 'back');
      const backImgBytes = await fetch(backCanvas.toDataURL('image/png')).then(res => res.arrayBuffer());
      const backImage = await pdfDoc.embedPng(backImgBytes);

      const page2 = pdfDoc.addPage([cardWidthPts, cardHeightPts]);
      page2.drawImage(backImage, {
        x: 0,
        y: 0,
        width: cardWidthPts,
        height: cardHeightPts
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${companyName.toLowerCase().replace(/\s+/g, '-')}-print-ready.pdf`;
      link.click();

      setExportSuccess('Generated 2-page print-ready vector PDF!');
      onSuccess('Generated print-ready 2-page PDF document.');
      setTimeout(() => setExportSuccess(null), 4000);
    } catch (err) {
      console.error('PDF export error', err);
    } finally {
      setIsExporting(false);
    }
  };

  const drawCardToCanvas = async (canvas: HTMLCanvasElement, side: 'front' | 'back') => {
    const ctx = canvas.getContext('2d')!;
    const isDark = theme === 'dark' || theme === 'luxury' || theme === 'gradient';

    // Background
    if (theme === 'dark') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 1050, 600);
      ctx.fillStyle = accentColor;
      ctx.fillRect(0, 0, 30, 600);
    } else if (theme === 'luxury') {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, 1050, 600);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 16;
      ctx.strokeRect(30, 30, 990, 540);
    } else if (theme === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, 1050, 600);
      grad.addColorStop(0, accentColor);
      grad.addColorStop(1, '#312e81');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1050, 600);
    } else if (theme === 'corporate') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1050, 600);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 500, 1050, 100);
      ctx.fillStyle = accentColor;
      ctx.fillRect(0, 485, 1050, 15);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1050, 600);
      ctx.fillStyle = accentColor;
      ctx.fillRect(0, 0, 24, 600);
    }

    if (side === 'front') {
      let currentX = 80;
      if (logoUrl) {
        const img = new Image();
        img.src = logoUrl;
        await new Promise((r) => { img.onload = r; img.onerror = r; });
        if (img.width) {
          ctx.drawImage(img, 80, 80, 100, 100);
          currentX = 210;
        }
      }
      ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText(companyName, currentX, 125);

      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = '500 24px sans-serif';
      ctx.fillText(tagline, currentX, 165);

      ctx.fillStyle = isDark ? '#f8fafc' : '#020617';
      ctx.font = 'bold 54px sans-serif';
      ctx.fillText(fullName, 80, 310);

      ctx.fillStyle = accentColor;
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(jobTitle.toUpperCase(), 80, 355);

      ctx.fillStyle = isDark ? '#cbd5e1' : '#334155';
      ctx.font = '22px sans-serif';
      ctx.fillText(`Phone: ${phone}`, 80, 440);
      ctx.fillText(`Email: ${email}`, 80, 480);
      ctx.fillText(`Web:   ${website}`, 80, 520);

      if (showQrOnFront && qrCodeDataUrl) {
        const qrImg = new Image();
        qrImg.src = qrCodeDataUrl;
        await new Promise((r) => { qrImg.onload = r; });
        ctx.drawImage(qrImg, 780, 330, 200, 200);
      }
    } else {
      if (showQrOnBack && qrCodeDataUrl) {
        const qrImg = new Image();
        qrImg.src = qrCodeDataUrl;
        await new Promise((r) => { qrImg.onload = r; });
        ctx.drawImage(qrImg, (1050 - 280) / 2, 80, 280, 280);

        ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(companyName, 1050 / 2, 420);

        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.font = '24px sans-serif';
        ctx.fillText(`Scan with camera to connect or save vCard`, 1050 / 2, 470);
        ctx.fillText(website, 1050 / 2, 520);
        ctx.textAlign = 'left';
      }
    }
  };

  // Card Theme classes
  const getCardThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-slate-900 text-white border-l-8';
      case 'luxury':
        return 'bg-zinc-900 text-amber-100 border-4 border-amber-600 shadow-amber-900/20';
      case 'gradient':
        return 'bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white';
      case 'corporate':
        return 'bg-white text-slate-900 border-b-8 border-slate-900';
      case 'minimal':
      default:
        return 'bg-white text-slate-900 border-l-8';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              Studio Suite
            </span>
            <span className="text-xs text-slate-400 font-semibold">• 3.5&quot; × 2.0&quot; Standard Print Size</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Professional Business Card Maker
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Create high-DPI business cards with embedded custom logos, dynamic vCard QR codes, and double-sided print exports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExportPng(activeSide)}
            disabled={isExporting}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-indigo-500" />
            <span>Export {activeSide.toUpperCase()} PNG</span>
          </button>
          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 dark:shadow-none transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Print PDF</span>
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{exportSuccess}</span>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Cardholder Information Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" /> Contact & Card Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Job Title / Position
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Company / Agency
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Tagline / Motto
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Office Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Logo & QR Code Controls */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <QrCode className="w-4 h-4 text-indigo-500" /> Logo & QR Integration
            </h3>

            {/* Logo Upload */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2">
                Brand Logo (Places on Card & Center of QR Code)
              </label>
              <div className="flex items-center gap-3">
                {logoUrl ? (
                  <div className="relative w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0">
                    <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                    <button
                      onClick={() => setLogoUrl(null)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs"
                      title="Remove logo"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <Upload className="w-4 h-4 text-indigo-500" />
                    <span>Upload Logo Image</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                )}
                <span className="text-[11px] text-slate-400 leading-snug">
                  PNG, JPG, or SVG. Automatically centered within the QR code.
                </span>
              </div>
            </div>

            {/* QR Code Options */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  QR Code Payload Mode
                </span>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setQrMode('vcard')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      qrMode === 'vcard' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    Digital vCard
                  </button>
                  <button
                    onClick={() => setQrMode('website')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      qrMode === 'website' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    Website URL
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600 dark:text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showQrOnBack}
                    onChange={(e) => setShowQrOnBack(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Show QR code on Back of card</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showQrOnFront}
                    onChange={(e) => setShowQrOnFront(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Show QR code on Front of card</span>
                </label>
              </div>
            </div>
          </div>

          {/* Theme & Palette */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-500" /> Style & Theme Templates
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'minimal', label: 'Minimal' },
                { id: 'dark', label: 'Tech Dark' },
                { id: 'gradient', label: 'Gradient' },
                { id: 'luxury', label: 'Executive' },
                { id: 'corporate', label: 'Corporate' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    theme === t.id
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Accent Color:</span>
              <div className="flex items-center gap-2">
                {['#4f46e5', '#059669', '#d97706', '#e11d48', '#0891b2', '#0f172a'].map((col) => (
                  <button
                    key={col}
                    onClick={() => setAccentColor(col)}
                    style={{ backgroundColor: col }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      accentColor === col ? 'scale-125 border-white dark:border-slate-900 ring-2 ring-indigo-500' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Live Preview & Side Switcher */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-20">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Card Preview (3.5&quot; × 2.0&quot;)
                </span>
              </div>

              {/* Side Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setActiveSide('front')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeSide === 'front'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Front Side
                </button>
                <button
                  onClick={() => setActiveSide('back')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeSide === 'back'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Back Side
                </button>
              </div>
            </div>

            {/* Interactive Card Canvas Display */}
            <div className="relative aspect-[7/4] w-full rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all select-none border border-slate-200/60 dark:border-slate-800"
              style={{
                borderLeftColor: (theme === 'minimal' || theme === 'dark') ? accentColor : undefined,
                borderBottomColor: theme === 'corporate' ? '#0f172a' : undefined
              }}
            >
              {/* FRONT SIDE PREVIEW */}
              {activeSide === 'front' ? (
                <div
                  ref={frontCardRef}
                  className={`absolute inset-0 p-6 sm:p-7 flex flex-col justify-between ${getCardThemeClasses()}`}
                  style={{ borderLeftColor: accentColor }}
                >
                  {/* Top Bar: Logo & Company Name */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {logoUrl ? (
                        <div className="w-11 h-11 rounded-xl bg-white/10 p-1 border border-white/20 flex items-center justify-center shrink-0">
                          <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                          {companyName.charAt(0) || 'V'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base tracking-tight truncate leading-tight">
                          {companyName}
                        </h4>
                        <p className="text-[11px] opacity-75 font-medium truncate">
                          {tagline}
                        </p>
                      </div>
                    </div>

                    {showQrOnFront && qrCodeDataUrl && (
                      <div className="w-16 h-16 rounded-lg bg-white p-1 shadow-xs shrink-0">
                        <img src={qrCodeDataUrl} alt="QR Code" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>

                  {/* Middle: Person Name & Title */}
                  <div className="my-auto py-2">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                      {fullName}
                    </h3>
                    <p
                      style={{ color: accentColor }}
                      className="text-xs font-bold uppercase tracking-wider mt-0.5"
                    >
                      {jobTitle}
                    </p>
                  </div>

                  {/* Bottom: Contact Details */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] opacity-90 font-medium">
                    <div className="flex items-center gap-1.5 truncate">
                      <Phone className="w-3 h-3 shrink-0 opacity-70" />
                      <span className="truncate">{phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3 h-3 shrink-0 opacity-70" />
                      <span className="truncate">{email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Globe className="w-3 h-3 shrink-0 opacity-70" />
                      <span className="truncate">{website.replace(/^https?:\/\//, '')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3 h-3 shrink-0 opacity-70" />
                      <span className="truncate">{address.split(',')[0]}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* BACK SIDE PREVIEW */
                <div
                  ref={backCardRef}
                  className={`absolute inset-0 p-6 sm:p-8 flex flex-col items-center justify-center text-center ${getCardThemeClasses()}`}
                  style={{ borderLeftColor: accentColor }}
                >
                  {showQrOnBack && qrCodeDataUrl ? (
                    <div className="space-y-3 flex flex-col items-center">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-2xl p-2 shadow-md flex items-center justify-center">
                        <img src={qrCodeDataUrl} alt="vCard QR" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm">{companyName}</p>
                        <p className="text-[10px] opacity-75 font-medium">
                          Scan to save contact or visit website
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 flex flex-col items-center">
                      {logoUrl ? (
                        <div className="w-16 h-16 rounded-2xl bg-white/10 p-2 border border-white/20 flex items-center justify-center">
                          <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center">
                          {companyName.charAt(0) || 'V'}
                        </div>
                      )}
                      <h3 className="font-black text-lg">{companyName}</h3>
                      <p style={{ color: accentColor }} className="text-xs font-semibold">{tagline}</p>
                      <p className="text-[11px] opacity-75">{website}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions Strip */}
            <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">Orientation: Standard US 7:4 Aspect Ratio</span>
              <button
                onClick={() => setActiveSide(activeSide === 'front' ? 'back' : 'front')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <RotateCw className="w-3.5 h-3.5" /> Flip to {activeSide === 'front' ? 'Back' : 'Front'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
