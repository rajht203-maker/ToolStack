import React from 'react';
import { CATEGORIES, PLATFORM_STATS } from '../../data/toolsData';
import { Wrench, Shield, Lock, Zap, Heart } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (catId: string | null) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAdmin }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
                T
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Tool<span className="text-indigo-600 dark:text-indigo-400">Stack</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              50+ professional-grade online tools for developers, designers, and admins. All processed client-side for maximum speed and privacy.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Client-Side Encryption</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Document & Media
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onSelectCategory('pdf')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  PDF Merge & Split
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('image')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Image Compression & Resizing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('image')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Favicon & QR Code Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('text')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Word Counter & Case Converter
                </button>
              </li>
            </ul>
          </div>

          {/* Developer & Calculators */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Developers & Finance
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onSelectCategory('developer')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  JSON Formatter & Validator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('developer')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Base64 & URL Encoder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('calculator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Loan EMI & Compound Interest
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('calculator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  GST & Sales Tax Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Security & SEO */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Security & SEO
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onSelectCategory('security')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Cryptographic Password Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('security')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  SHA-256 Hash Digest
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('seo')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Robots.txt & Sitemap Generator
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                >
                  Admin Management Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} TOOLSTACK INTERACTIVE. ALL 52 ONLINE TOOLS ARE FREE.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Vercel Edge Ready</span>
            <button onClick={onOpenAdmin} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Admin Access
            </button>
            <span className="text-emerald-500 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
