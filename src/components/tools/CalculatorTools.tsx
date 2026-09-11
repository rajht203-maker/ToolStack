import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Calendar, 
  Activity, 
  PieChart, 
  TrendingUp, 
  Users, 
  Maximize 
} from 'lucide-react';
import { ToolItem } from '../../types';

interface CalculatorToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const CalculatorTools: React.FC<CalculatorToolsProps> = ({ tool, onSuccess }) => {
  // EMI Calculator states
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);

  // GST Calculator states
  const [gstAmount, setGstAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'exclusive' | 'inclusive'>('exclusive');

  // Percentage Calculator states
  const [percX, setPercX] = useState<number>(20);
  const [percY, setPercY] = useState<number>(150);
  const [percMode, setPercMode] = useState<'whatIs' | 'isWhat' | 'increase'>('whatIs');

  // Age Calculator states
  const [birthDate, setBirthDate] = useState<string>('2000-01-15');

  // BMI Calculator states
  const [bmiUnit, setBmiUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmiWeightKg, setBmiWeightKg] = useState<number>(70);
  const [bmiHeightCm, setBmiHeightCm] = useState<number>(175);
  const [bmiWeightLbs, setBmiWeightLbs] = useState<number>(154);
  const [bmiHeightFt, setBmiHeightFt] = useState<number>(5);
  const [bmiHeightIn, setBmiHeightIn] = useState<number>(9);

  // Discount Calculator states
  const [origPrice, setOrigPrice] = useState<number>(120);
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [extraDiscount, setExtraDiscount] = useState<number>(5);
  const [taxRate, setTaxRate] = useState<number>(8);

  // Compound Interest states
  const [ciPrincipal, setCiPrincipal] = useState<number>(10000);
  const [ciRate, setCiRate] = useState<number>(7);
  const [ciYears, setCiYears] = useState<number>(10);
  const [ciMonthlyAdd, setCiMonthlyAdd] = useState<number>(200);

  // Tip Calculator states
  const [tipBill, setTipBill] = useState<number>(85);
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [tipPeople, setTipPeople] = useState<number>(2);

  // Aspect Ratio states
  const [aspectW, setAspectW] = useState<number>(1920);
  const [aspectH, setAspectH] = useState<number>(1080);
  const [newAspectW, setNewAspectW] = useState<number>(1280);

  // --- 1. EMI CALCULATOR CALCULATION ---
  const emiData = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenureYears * 12;

    if (r === 0) {
      const emi = P / n;
      return { emi, totalInterest: 0, totalPayment: P };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    const principalPct = Math.round((P / totalPayment) * 100);
    const interestPct = 100 - principalPct;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPct,
      interestPct
    };
  }, [loanAmount, interestRate, loanTenureYears]);

  // --- 2. GST CALCULATOR CALCULATION ---
  const gstData = useMemo(() => {
    const net = gstAmount;
    const rate = gstRate / 100;
    let actualGst = 0;
    let finalTotal = 0;
    let basePrice = 0;

    if (gstType === 'exclusive') {
      basePrice = net;
      actualGst = net * rate;
      finalTotal = net + actualGst;
    } else {
      basePrice = net / (1 + rate);
      actualGst = net - basePrice;
      finalTotal = net;
    }

    const cgst = actualGst / 2;
    const sgst = actualGst / 2;

    return {
      basePrice: basePrice.toFixed(2),
      actualGst: actualGst.toFixed(2),
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      finalTotal: finalTotal.toFixed(2)
    };
  }, [gstAmount, gstRate, gstType]);

  // --- 3. PERCENTAGE CALCULATOR ---
  const percResult = useMemo(() => {
    if (percMode === 'whatIs') {
      // What is X% of Y?
      return ((percX / 100) * percY).toFixed(2);
    } else if (percMode === 'isWhat') {
      // X is what % of Y?
      if (percY === 0) return '0%';
      return `${((percX / percY) * 100).toFixed(2)}%`;
    } else {
      // % change from X to Y
      if (percX === 0) return '0%';
      const diff = percY - percX;
      const pct = (diff / percX) * 100;
      return `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`;
    }
  }, [percX, percY, percMode]);

  // --- 4. AGE CALCULATOR ---
  const ageData = useMemo(() => {
    const bday = new Date(birthDate);
    const today = new Date();
    if (isNaN(bday.getTime())) return null;

    let years = today.getFullYear() - bday.getFullYear();
    let months = today.getMonth() - bday.getMonth();
    let days = today.getDate() - bday.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = today.getTime() - bday.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    // Next birthday calculation
    let nextBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
    if (nextBday < today) {
      nextBday = new Date(today.getFullYear() + 1, bday.getMonth(), bday.getDate());
    }
    const daysToNext = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      daysToNext
    };
  }, [birthDate]);

  // --- 5. BMI CALCULATOR ---
  const bmiData = useMemo(() => {
    let score = 0;
    if (bmiUnit === 'metric') {
      const heightM = bmiHeightCm / 100;
      if (heightM > 0) score = bmiWeightKg / (heightM * heightM);
    } else {
      const totalInches = bmiHeightFt * 12 + bmiHeightIn;
      if (totalInches > 0) score = (bmiWeightLbs / (totalInches * totalInches)) * 703;
    }

    score = Number(score.toFixed(1));
    let category = 'Normal weight';
    let color = 'text-emerald-600 dark:text-emerald-400';

    if (score < 18.5) {
      category = 'Underweight';
      color = 'text-sky-600 dark:text-sky-400';
    } else if (score >= 18.5 && score < 25) {
      category = 'Healthy / Normal';
      color = 'text-emerald-600 dark:text-emerald-400';
    } else if (score >= 25 && score < 30) {
      category = 'Overweight';
      color = 'text-amber-600 dark:text-amber-400';
    } else {
      category = 'Obese';
      color = 'text-rose-600 dark:text-rose-400';
    }

    return { score, category, color };
  }, [bmiUnit, bmiWeightKg, bmiHeightCm, bmiWeightLbs, bmiHeightFt, bmiHeightIn]);

  // --- 6. DISCOUNT CALCULATOR ---
  const discountData = useMemo(() => {
    const p1 = origPrice * (1 - discountPercent / 100);
    const p2 = p1 * (1 - extraDiscount / 100);
    const tax = p2 * (taxRate / 100);
    const final = p2 + tax;
    const totalSaved = origPrice - p2;

    return {
      finalPrice: final.toFixed(2),
      savings: totalSaved.toFixed(2),
      taxAmount: tax.toFixed(2)
    };
  }, [origPrice, discountPercent, extraDiscount, taxRate]);

  // --- 7. COMPOUND INTEREST ---
  const ciData = useMemo(() => {
    let balance = ciPrincipal;
    let totalInvested = ciPrincipal;
    const monthlyRate = ciRate / 100 / 12;
    const totalMonths = ciYears * 12;

    for (let m = 0; m < totalMonths; m++) {
      balance = (balance + ciMonthlyAdd) * (1 + monthlyRate);
      totalInvested += ciMonthlyAdd;
    }

    const totalInterest = Math.max(0, balance - totalInvested);

    return {
      finalBalance: Math.round(balance),
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest)
    };
  }, [ciPrincipal, ciRate, ciYears, ciMonthlyAdd]);

  // --- 8. TIP CALCULATOR ---
  const tipData = useMemo(() => {
    const tipAmount = tipBill * (tipPercent / 100);
    const total = tipBill + tipAmount;
    const count = Math.max(1, tipPeople);

    return {
      totalTip: tipAmount.toFixed(2),
      totalBill: total.toFixed(2),
      tipPerPerson: (tipAmount / count).toFixed(2),
      totalPerPerson: (total / count).toFixed(2)
    };
  }, [tipBill, tipPercent, tipPeople]);

  // --- 9. ASPECT RATIO CALCULATOR ---
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const aspectData = useMemo(() => {
    if (aspectW <= 0 || aspectH <= 0) return { ratio: '16:9', newH: 720 };
    const divisor = gcd(aspectW, aspectH);
    const ratioW = aspectW / divisor;
    const ratioH = aspectH / divisor;
    const newH = Math.round((newAspectW / aspectW) * aspectH);
    return {
      ratio: `${ratioW}:${ratioH}`,
      newH
    };
  }, [aspectW, aspectH, newAspectW]);

  return (
    <div className="space-y-6">
      {/* 1. EMI CALCULATOR */}
      {tool.id === 'emi-calculator' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                <span>Loan Amount</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">
                  ${loanAmount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                <span>Interest Rate (p.a)</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                <span>Tenure Duration</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">
                  {loanTenureYears} Years ({loanTenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={loanTenureYears}
                onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Monthly Loan EMI
              </span>
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                ${emiData.emi.toLocaleString()}
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-200 dark:divide-slate-700">
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Principal Amount</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${loanAmount.toLocaleString()} ({emiData.principalPct}%)
                </span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Total Interest Payable</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  ${emiData.totalInterest.toLocaleString()} ({emiData.interestPct}%)
                </span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-800 dark:text-slate-200 font-bold">
                <span>Total Payment</span>
                <span>${emiData.totalPayment.toLocaleString()}</span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="h-3 w-full bg-amber-500 rounded-full overflow-hidden flex">
              <div style={{ width: `${emiData.principalPct}%` }} className="bg-indigo-600 h-full" />
            </div>
          </div>
        </div>
      )}

      {/* 2. GST CALCULATOR */}
      {tool.id === 'gst-calculator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                value={gstAmount}
                onChange={(e) => setGstAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                GST Tax Slab
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setGstRate(rate)}
                    className={`py-2 text-xs font-semibold rounded-lg border ${
                      gstRate === rate
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-600'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setGstType('exclusive')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                  gstType === 'exclusive'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-600'
                }`}
              >
                GST Exclusive (Add GST)
              </button>
              <button
                type="button"
                onClick={() => setGstType('inclusive')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                  gstType === 'inclusive'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-600'
                }`}
              >
                GST Inclusive (Remove GST)
              </button>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Total Price (Post GST)
              </span>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                ${gstData.finalTotal}
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-200 dark:divide-slate-700">
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Net / Base Amount</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">${gstData.basePrice}</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Total GST ({gstRate}%)</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">${gstData.actualGst}</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>CGST ({gstRate / 2}%) + SGST ({gstRate / 2}%)</span>
                <span>${gstData.cgst} + ${gstData.sgst}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PERCENTAGE CALCULATOR */}
      {tool.id === 'percentage-calculator' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            {[
              { id: 'whatIs', label: 'What is X% of Y?' },
              { id: 'isWhat', label: 'X is what % of Y?' },
              { id: 'increase', label: '% Increase / Decrease' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setPercMode(m.id as any)}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                  percMode === m.id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-600'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Value X
              </label>
              <input
                type="number"
                value={percX}
                onChange={(e) => setPercX(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Value Y
              </label>
              <input
                type="number"
                value={percY}
                onChange={(e) => setPercY(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
              />
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Calculated Result
            </span>
            <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mt-2">
              {percResult}
            </div>
          </div>
        </div>
      )}

      {/* 4. AGE CALCULATOR */}
      {tool.id === 'age-calculator' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Select Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
            />
          </div>

          {ageData && (
            <div className="space-y-4">
              <div className="p-6 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-900 text-center">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                  Current Exact Age
                </span>
                <div className="text-3xl font-extrabold text-indigo-950 dark:text-indigo-100 mt-1">
                  {ageData.years} Years, {ageData.months} Months, {ageData.days} Days
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs text-slate-500 block">Total Days Lived</span>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {ageData.totalDays.toLocaleString()} Days
                  </span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs text-slate-500 block">Total Hours Lived</span>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {ageData.totalHours.toLocaleString()} Hours
                  </span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs text-slate-500 block">Next Birthday In</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {ageData.daysToNext} Days
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. BMI CALCULATOR */}
      {tool.id === 'bmi-calculator' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            <button
              onClick={() => setBmiUnit('metric')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                bmiUnit === 'metric' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200'
              }`}
            >
              Metric (kg / cm)
            </button>
            <button
              onClick={() => setBmiUnit('imperial')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                bmiUnit === 'imperial' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-200'
              }`}
            >
              Imperial (lbs / feet / inches)
            </button>
          </div>

          {bmiUnit === 'metric' ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={bmiWeightKg}
                  onChange={(e) => setBmiWeightKg(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={bmiHeightCm}
                  onChange={(e) => setBmiHeightCm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  value={bmiWeightLbs}
                  onChange={(e) => setBmiWeightLbs(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Feet
                </label>
                <input
                  type="number"
                  value={bmiHeightFt}
                  onChange={(e) => setBmiHeightFt(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Inches
                </label>
                <input
                  type="number"
                  value={bmiHeightIn}
                  onChange={(e) => setBmiHeightIn(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>
          )}

          <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Your BMI Score
            </span>
            <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
              {bmiData.score}
            </div>
            <div className={`text-sm font-bold ${bmiData.color}`}>
              {bmiData.category}
            </div>
          </div>
        </div>
      )}

      {/* 6. DISCOUNT CALCULATOR */}
      {tool.id === 'discount-calculator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Original Price ($)
              </label>
              <input
                type="number"
                value={origPrice}
                onChange={(e) => setOrigPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Primary Discount (%)
                </label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Extra Discount (%)
                </label>
                <input
                  type="number"
                  value={extraDiscount}
                  onChange={(e) => setExtraDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Sales Tax Rate (%)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Final Discounted Price
              </span>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                ${discountData.finalPrice}
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-200 dark:divide-slate-700">
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Total Savings</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ${discountData.savings}
                </span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Estimated Sales Tax</span>
                <span>${discountData.taxAmount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. COMPOUND INTEREST CALCULATOR */}
      {tool.id === 'compound-interest' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Initial Principal ($)
              </label>
              <input
                type="number"
                value={ciPrincipal}
                onChange={(e) => setCiPrincipal(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Monthly Contribution ($)
              </label>
              <input
                type="number"
                value={ciMonthlyAdd}
                onChange={(e) => setCiMonthlyAdd(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Annual Interest (%)
                </label>
                <input
                  type="number"
                  value={ciRate}
                  onChange={(e) => setCiRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Duration (Years)
                </label>
                <input
                  type="number"
                  value={ciYears}
                  onChange={(e) => setCiYears(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Estimated Future Balance
              </span>
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                ${ciData.finalBalance.toLocaleString()}
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-200 dark:divide-slate-700">
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Total Principal Contributed</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${ciData.totalInvested.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Total Compound Interest</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ${ciData.totalInterest.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. TIP CALCULATOR */}
      {tool.id === 'tip-calculator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Bill Amount ($)
              </label>
              <input
                type="number"
                value={tipBill}
                onChange={(e) => setTipBill(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Tip Percentage
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 15, 18, 20].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipPercent(t)}
                    className={`py-2 text-xs font-semibold rounded-lg border ${
                      tipPercent === t ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200'
                    }`}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Split Between (People)
              </label>
              <input
                type="number"
                min="1"
                value={tipPeople}
                onChange={(e) => setTipPeople(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Total Per Person
              </span>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                ${tipData.totalPerPerson}
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-200 dark:divide-slate-700">
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Tip Per Person</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">${tipData.tipPerPerson}</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 dark:text-slate-400">
                <span>Total Tip Amount</span>
                <span>${tipData.totalTip}</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-800 dark:text-slate-200 font-bold">
                <span>Total Combined Bill</span>
                <span>${tipData.totalBill}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. ASPECT RATIO CALCULATOR */}
      {tool.id === 'aspect-ratio' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Original Width
              </label>
              <input
                type="number"
                value={aspectW}
                onChange={(e) => setAspectW(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Original Height
              </label>
              <input
                type="number"
                value={aspectH}
                onChange={(e) => setAspectH(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs text-slate-500 uppercase">Simplified Aspect Ratio</span>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
              {aspectData.ratio}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Resize: Target New Width (px)
            </label>
            <input
              type="number"
              value={newAspectW}
              onChange={(e) => setNewAspectW(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Calculated New Height:{' '}
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                {aspectData.newH}px
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
