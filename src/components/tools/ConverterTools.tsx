import React, { useState, useMemo } from 'react';
import { Copy, Check, ArrowRightLeft, Palette, Thermometer, Layers } from 'lucide-react';
import { ToolItem } from '../../types';

interface ConverterToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const ConverterTools: React.FC<ConverterToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState(false);

  // Unit Converter states
  const [unitCategory, setUnitCategory] = useState<'length' | 'weight' | 'data' | 'speed'>('length');
  const [unitValue, setUnitValue] = useState<number>(1);
  const [unitFrom, setUnitFrom] = useState<string>('meter');
  const [unitTo, setUnitTo] = useState<string>('feet');

  // Temperature states
  const [tempCelsius, setTempCelsius] = useState<number>(25);

  // Color Converter states
  const [hexColor, setHexColor] = useState<string>('#4f46e5');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 1. UNIT CONVERTER ---
  const CONVERSION_RATES: Record<string, Record<string, number>> = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      mile: 0.000621371,
      yard: 1.09361,
      feet: 3.28084,
      inch: 39.3701
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274
    },
    data: {
      byte: 1,
      kilobyte: 1 / 1024,
      megabyte: 1 / (1024 * 1024),
      gigabyte: 1 / (1024 * 1024 * 1024),
      terabyte: 1 / (1024 * 1024 * 1024 * 1024)
    },
    speed: {
      'm/s': 1,
      'km/h': 3.6,
      'mph': 2.23694,
      'knot': 1.94384
    }
  };

  const convertedUnit = useMemo(() => {
    const table = CONVERSION_RATES[unitCategory] || {};
    const fromFactor = table[unitFrom] || 1;
    const toFactor = table[unitTo] || 1;
    // convert to base unit, then to target
    const base = unitValue / fromFactor;
    const result = base * toFactor;
    return Number(result.toFixed(6));
  }, [unitCategory, unitValue, unitFrom, unitTo]);

  // Update default units when category shifts
  const handleCategoryChange = (cat: 'length' | 'weight' | 'data' | 'speed') => {
    setUnitCategory(cat);
    const keys = Object.keys(CONVERSION_RATES[cat]);
    setUnitFrom(keys[0]);
    setUnitTo(keys[1] || keys[0]);
  };

  // --- 2. TEMPERATURE CONVERTER ---
  const temperatures = useMemo(() => {
    const c = tempCelsius;
    const f = (c * 9) / 5 + 32;
    const k = c + 273.15;
    return {
      c: c.toFixed(1),
      f: f.toFixed(1),
      k: k.toFixed(1)
    };
  }, [tempCelsius]);

  // --- 3. COLOR CONVERTER ---
  const colorData = useMemo(() => {
    let cleanHex = hexColor.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) return null;

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / d + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / d + 4;
          break;
      }
      h /= 6;
    }

    // CMYK
    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k);

    return {
      hex: `#${cleanHex.toUpperCase()}`,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
      cmyk: `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`
    };
  }, [hexColor]);

  return (
    <div className="space-y-6">
      {/* 1. UNIT CONVERTER */}
      {tool.id === 'unit-converter' && (
        <div className="space-y-5">
          <div className="flex gap-2">
            {(['length', 'weight', 'data', 'speed'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl uppercase tracking-wider border transition-all ${
                  unitCategory === cat
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300'
                    : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                From
              </label>
              <input
                type="number"
                value={unitValue}
                onChange={(e) => setUnitValue(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm mb-2"
              />
              <select
                value={unitFrom}
                onChange={(e) => setUnitFrom(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs capitalize"
              >
                {Object.keys(CONVERSION_RATES[unitCategory] || {}).map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                To (Result)
              </label>
              <div className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-2 truncate">
                {convertedUnit}
              </div>
              <select
                value={unitTo}
                onChange={(e) => setUnitTo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs capitalize"
              >
                {Object.keys(CONVERSION_RATES[unitCategory] || {}).map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 2. TEMPERATURE CONVERTER */}
      {tool.id === 'temperature-converter' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Enter Celsius (°C)
            </label>
            <input
              type="number"
              value={tempCelsius}
              onChange={(e) => setTempCelsius(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-900 text-center">
              <span className="text-xs text-sky-600 font-semibold uppercase block">Celsius</span>
              <div className="text-3xl font-extrabold text-sky-950 dark:text-sky-100 mt-1">
                {temperatures.c}°C
              </div>
            </div>
            <div className="p-5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900 text-center">
              <span className="text-xs text-amber-600 font-semibold uppercase block">Fahrenheit</span>
              <div className="text-3xl font-extrabold text-amber-950 dark:text-amber-100 mt-1">
                {temperatures.f}°F
              </div>
            </div>
            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 text-center">
              <span className="text-xs text-emerald-600 font-semibold uppercase block">Kelvin</span>
              <div className="text-3xl font-extrabold text-emerald-950 dark:text-emerald-100 mt-1">
                {temperatures.k} K
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. COLOR CONVERTER */}
      {tool.id === 'color-converter' && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={hexColor}
              onChange={(e) => setHexColor(e.target.value)}
              className="w-14 h-14 rounded-2xl border-2 border-slate-300 dark:border-slate-600 cursor-pointer p-0.5"
            />
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                HEX Color Code
              </label>
              <input
                type="text"
                value={hexColor}
                onChange={(e) => setHexColor(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl font-mono text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          {colorData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'HEX Code', val: colorData.hex },
                { label: 'RGB Values', val: colorData.rgb },
                { label: 'HSL Values', val: colorData.hsl },
                { label: 'CMYK Print Code', val: colorData.cmyk }
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs text-slate-400 block">{item.label}</span>
                    <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {item.val}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      copyToClipboard(item.val);
                      onSuccess(`Copied ${item.label}.`);
                    }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
