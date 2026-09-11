import React, { useState, useEffect, useMemo } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Briefcase, 
  Calendar, 
  Percent,
  Download,
  Check,
  Copy
} from 'lucide-react';
import { ToolItem } from '../../types';

interface ModernBusinessToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const ModernBusinessTools: React.FC<ModernBusinessToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState(false);

  // --- Inflation Calculator State ---
  const [inflationAmount, setInflationAmount] = useState<number>(10000);
  const [inflationRate, setInflationRate] = useState<number>(3.5);
  const [inflationYears, setInflationYears] = useState<number>(10);

  // --- Freelance Rate State ---
  const [targetAnnualIncome, setTargetAnnualIncome] = useState<number>(100000);
  const [annualExpenses, setAnnualExpenses] = useState<number>(12000);
  const [taxRatePct, setTaxRatePct] = useState<number>(25);
  const [weeksOff, setWeeksOff] = useState<number>(4);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);

  // --- Meeting Cost Clock State ---
  const [attendeesCount, setAttendeesCount] = useState<number>(6);
  const [avgSalary, setAvgSalary] = useState<number>(115000);
  const [meetingTimerRunning, setMeetingTimerRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Meeting timer interval
  useEffect(() => {
    let interval: any = null;
    if (meetingTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meetingTimerRunning]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onSuccess(`Copied ${label}`);
  };

  // --- Inflation Results ---
  const inflationResults = useMemo(() => {
    const futureValue = inflationAmount * Math.pow(1 + inflationRate / 100, inflationYears);
    const lostPurchasingPower = ((futureValue - inflationAmount) / futureValue) * 100;
    return {
      futureValue: Math.round(futureValue),
      purchasingPowerLostPct: Math.round(lostPurchasingPower),
      totalInflationAdded: Math.round(futureValue - inflationAmount)
    };
  }, [inflationAmount, inflationRate, inflationYears]);

  // --- Freelance Rate Results ---
  const freelanceResults = useMemo(() => {
    // Total gross needed before taxes:
    const grossNeeded = (targetAnnualIncome + annualExpenses) / (1 - taxRatePct / 100);
    const workingWeeks = Math.max(1, 52 - weeksOff);
    const totalBillableHoursPerYear = workingWeeks * billableHoursPerWeek;
    const hourlyRate = Math.ceil(grossNeeded / Math.max(1, totalBillableHoursPerYear));
    const dayRate = hourlyRate * 8;
    const monthlyTarget = Math.round(grossNeeded / 12);

    return {
      hourlyRate,
      dayRate,
      monthlyTarget,
      grossNeeded: Math.round(grossNeeded),
      billableHoursPerYear: totalBillableHoursPerYear
    };
  }, [targetAnnualIncome, annualExpenses, taxRatePct, weeksOff, billableHoursPerWeek]);

  // --- Meeting Cost Results ---
  const meetingCostStats = useMemo(() => {
    // Assume 2080 working hours per year
    const hourlyRatePerAttendee = avgSalary / 2080;
    const totalHourlyBurn = hourlyRatePerAttendee * attendeesCount;
    const totalBurnPerSecond = totalHourlyBurn / 3600;
    const currentCost = elapsedSeconds * totalBurnPerSecond;
    const costPerMinute = totalHourlyBurn / 60;

    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    return {
      totalHourlyBurn: Math.round(totalHourlyBurn),
      costPerMinute: costPerMinute.toFixed(2),
      currentCost: currentCost.toFixed(2),
      timeFormatted
    };
  }, [attendeesCount, avgSalary, elapsedSeconds]);

  return (
    <div className="space-y-6">
      {/* 1. Inflation Calculator */}
      {(tool.id === 'inflation-calculator' || tool.slug === 'inflation-calculator') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Current Amount ($)</label>
              <input
                type="number"
                value={inflationAmount}
                onChange={(e) => setInflationAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Annual Inflation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Time Horizon (Years)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={inflationYears}
                onChange={(e) => setInflationYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center">
              <span className="text-[10px] text-indigo-900 dark:text-indigo-300 font-bold uppercase">Required Future Amount</span>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                ${inflationResults.futureValue.toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-500 mt-1">To maintain today's purchasing power</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Purchasing Power Lost</span>
              <div className="text-2xl font-black text-rose-500 mt-1">
                -{inflationResults.purchasingPowerLostPct}%
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Due to compounding inflation</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Cost Increase</span>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">
                +${inflationResults.totalInflationAdded.toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Cumulative nominal growth</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Freelance Rate Calculator */}
      {(tool.id === 'freelance-rate-calculator' || tool.slug === 'freelance-rate-calculator') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Target Net Income ($/yr)</label>
              <input
                type="number"
                value={targetAnnualIncome}
                onChange={(e) => setTargetAnnualIncome(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Annual Expenses ($/yr)</label>
              <input
                type="number"
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Estimated Tax Rate (%)</label>
              <input
                type="number"
                value={taxRatePct}
                onChange={(e) => setTaxRatePct(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Vacation Weeks (Off)</label>
              <input
                type="number"
                value={weeksOff}
                onChange={(e) => setWeeksOff(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Billable Hours / Week</label>
              <input
                type="number"
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center">
              <span className="text-[10px] text-indigo-900 dark:text-indigo-300 font-bold uppercase">Min Hourly Rate</span>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                ${freelanceResults.hourlyRate}/hr
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Standard Day Rate</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                ${freelanceResults.dayRate}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Monthly Target</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                ${freelanceResults.monthlyTarget.toLocaleString()}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Gross Target</span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                ${freelanceResults.grossNeeded.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Realtime Meeting Cost Clock */}
      {(tool.id === 'meeting-cost-calculator' || tool.slug === 'meeting-cost-calculator') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Number of Attendees</label>
              <input
                type="number"
                min="1"
                max="500"
                value={attendeesCount}
                onChange={(e) => setAttendeesCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Avg. Annual Salary ($)</label>
              <input
                type="number"
                value={avgSalary}
                onChange={(e) => setAvgSalary(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>
          </div>

          {/* Big Live Cost Display */}
          <div className="p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 text-center space-y-4 shadow-xl">
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Real-Time Meeting Burn Cost
            </div>

            <div className="text-5xl sm:text-6xl font-black text-emerald-400 font-mono tracking-tight">
              ${meetingCostStats.currentCost}
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-slate-300 font-medium">
              <div>Time: <strong className="font-mono text-white text-base">{meetingCostStats.timeFormatted}</strong></div>
              <div>Rate: <strong className="font-mono text-white text-base">${meetingCostStats.costPerMinute}/min</strong></div>
              <div>Hourly: <strong className="font-mono text-white text-base">${meetingCostStats.totalHourlyBurn}/hr</strong></div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setMeetingTimerRunning(!meetingTimerRunning)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 ${
                  meetingTimerRunning ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {meetingTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {meetingTimerRunning ? 'Pause Meeting' : 'Start Meeting Clock'}
              </button>

              <button
                onClick={() => {
                  setMeetingTimerRunning(false);
                  setElapsedSeconds(0);
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
