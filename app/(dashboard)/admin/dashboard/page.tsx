'use client'
import React, { useState } from 'react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface SummaryCardProps {
  title: string;
  value: string;
  helper: string;
  isNegative?: boolean;
}

interface SegmentedControlProps {
  options: string[];
  activeOpt: string;
  onChange: (opt: string) => void;
  disabledOpt?: string;
}

interface ManagerCardProps {
  name: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
}

interface RosterItem {
  name: string;
  amt: string;
}

interface Manager {
  id: string;
  value: string;
  roster: RosterItem[];
}

// ==========================================
// CONFIG & REUSABLE DATA
// ==========================================
const MONTHS: string[] = ['JAN 26', 'FEB 26', 'MAR 26', 'APR 26', 'MAY 26', 'JUN 26', 'JUL 26', 'AUG 26', 'SEP 26', 'OCT 26'];

const TABLE_DATA = {
  target: [75000.00, 79000.00, 91000.00, 109650.00, 135347.50, 143399.63, 174159.57, 188033.50, 207185.18, 216794.44],
  confirmedDeals: [112798, 109712, 143294, 222871, 266059, 156502, 36900, 25700, 0, 12750],
  totalVariation: [37778, 30712, 52294, 113221, 130712, 13102, -137260, -162334, -207185, -204044],
  cos: [90238, 87401, 114331, 178297, 212368, 124222, 29520, 20560, 0, 9817.50],
  overheads: [16670, 15622, 19516, 19464, 23201, 21964, 20454, 20454, 20634, 20634],
  netProfit: [5889.65, 6688.14, 9406.97, 25110, 30490, 10316, -13074, -15314, -20634, -17702]
};

const MANAGERS: Manager[] = [
  { id: 'Amelia', value: '£1,061,841', roster: [ { name: 'Layo', amt: '£456,170' }, { name: 'Issy', amt: '£43,000' }, { name: 'Mia Rae', amt: '£32,000' }, { name: 'Nell', amt: '£31,500' } ] },
  { id: 'Sam', value: '£509,651', roster: [] },
  { id: 'Holly', value: '£263,590', roster: [] },
  { id: 'Alex', value: '£60,850', roster: [] },
  { id: 'Kareem', value: '£52,400', roster: [] }
];

// ==========================================
// SUB-COMPONENTS
// ==========================================

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, helper, isNegative = false }) => (
  <div className="bg-white  rounded-[12px] border border-[#D9DEE3] shadow-sm flex flex-col justify-between min-h-[140px]">
    <div>
      <span className="text-[14px] font-semibold text-[#1F2937] block mb-2">{title}</span>
      <span className={`text-[28px] font-bold tracking-tight block ${isNegative ? 'text-[#B42318]' : 'text-[#1F2937]'}`}>
        {value}
      </span>
    </div>
    <span className="text-[12px] text-[#6B7280] block mt-2">{helper}</span>
  </div>
);

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, activeOpt, onChange, disabledOpt }) => (
  <div className="flex items-center gap-2 bg-[#F2F4F7] p-1 rounded-lg border border-[#D9DEE3]">
    {disabledOpt && (
      <button disabled className="px-3 py-1.5 text-[13px] font-medium text-gray-400 cursor-not-allowed">
        {disabledOpt}
      </button>
    )}
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`px-4 py-1.5 text-[13px] font-semibold rounded-md transition-all duration-200 ${
          activeOpt === opt 
            ? 'bg-white text-[#1F2937] shadow-sm' 
            : 'text-[#6B7280] hover:text-[#1F2937]'
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

const PLTable: React.FC = () => {
  const formatCurrency = (val: number): string => {
    if (val === 0) return '£0.00';
    const formatted = Math.abs(val).toLocaleString(undefined, { 
      minimumFractionDigits: val % 1 !== 0 ? 2 : 0, 
      maximumFractionDigits: 2 
    });
    return val < 0 ? `-£${formatted}` : `£${formatted}`;
  };

  return (
    <div className="overflow-x-auto border border-[#D9DEE3] rounded-lg">
      <table className="w-full text-left border-collapse min-w-[1100px]">
        <thead>
          <tr className="bg-[#F9FAFB] border-b border-[#D9DEE3]">
            <th className="p-4 text-[13px] font-semibold text-[#6B7280] uppercase tracking-wider w-[180px]">Line Item</th>
            {MONTHS.map((m) => (
              <th key={m} className="p-4 text-[13px] font-semibold text-[#6B7280] uppercase tracking-wider text-right">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[15px] text-[#1F2937] bg-white">
          {/* Target Input Row */}
          <tr className="border-b border-[#E5E7EB]">
            <td className="p-3 font-medium text-[#6B7280]">Target</td>
            {TABLE_DATA.target.map((val, idx) => (
              <td key={idx} className="p-2 text-right">
                <input 
                  type="text" 
                  readOnly
                  value={`£${val.toLocaleString(undefined, {minimumFractionDigits: 2})}`} 
                  className="w-28 text-right bg-white border border-[#D9DEE3] rounded px-2 py-1 text-[14px] font-medium text-[#1F2937] focus:outline-none"
                />
              </td>
            ))}
          </tr>
          
          {/* Confirmed Deals */}
          <tr className="border-b border-[#E5E7EB]">
            <td className="p-4 font-medium text-[#6B7280]">Confirmed Deals</td>
            {TABLE_DATA.confirmedDeals.map((val, idx) => (
              <td key={idx} className="p-4 text-right font-medium">{formatCurrency(val)}</td>
            ))}
          </tr>

          {/* Total Variation */}
          <tr className="bg-[#F9FAFB] font-bold border-b border-[#E5E7EB]">
            <td className="p-4 text-[#1F2937]">Total Variation</td>
            {TABLE_DATA.totalVariation.map((val, idx) => (
              <td key={idx} className={`p-4 text-right ${val >= 0 ? 'text-[#0F766E]' : 'text-[#B42318]'}`}>
                {formatCurrency(val)}
              </td>
            ))}
          </tr>

          {/* Dark Cost of Sale Section Divider */}
          <tr className="bg-[#111827] text-white font-bold text-[14px]">
            <td colSpan={11} className="p-2 pl-4 uppercase tracking-wider">Cost of Sale</td>
          </tr>

          {/* COS */}
          <tr className="border-b border-[#E5E7EB]">
            <td className="p-4 font-medium text-[#6B7280]">COS</td>
            {TABLE_DATA.cos.map((val, idx) => (
              <td key={idx} className="p-4 text-right font-medium">{formatCurrency(val)}</td>
            ))}
          </tr>

          {/* Overheads */}
          <tr className="border-b border-[#D9DEE3]">
            <td className="p-4 font-medium text-[#6B7280]">Overheads</td>
            {TABLE_DATA.overheads.map((val, idx) => (
              <td key={idx} className="p-4 text-right font-medium">{formatCurrency(val)}</td>
            ))}
          </tr>

          {/* Net Profit Summary Row */}
          <tr className="bg-[#EAF7F1] font-bold">
            <td className="p-4 text-[#0F766E]">Net Profit</td>
            {TABLE_DATA.netProfit.map((val, idx) => (
              <td key={idx} className={`p-4 text-right ${val >= 0 ? 'text-[#0F766E]' : 'text-[#B42318]'}`}>
                {formatCurrency(val)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ManagerCard: React.FC<ManagerCardProps> = ({ name, value, isSelected, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-6 rounded-[12px] border text-left flex flex-col justify-between min-h-[110px] w-full transition-all duration-200 ${
      isSelected 
        ? 'bg-[#EAF7F1] border-[#0F766E]' 
        : 'bg-white border-[#D9DEE3] hover:border-gray-400'
    }`}
  >
    <span className="text-[14px] font-semibold text-[#6B7280] block">{name}</span>
    <span className="text-[24px] font-bold text-[#1F2937] block mt-2">{value}</span>
  </button>
);

const RosterTable: React.FC<{ managerName: string; rosterData: RosterItem[] }> = ({ managerName, rosterData }) => (
  <div className="mt-4 bg-white border border-[#D9DEE3] rounded-lg overflow-hidden">
    <div className="bg-[#F9FAFB] px-6 py-3 border-b border-[#D9DEE3] flex justify-between items-center">
      <span className="text-[14px] font-bold text-[#1F2937]">{managerName} roster</span>
      <span className="text-[12px] text-[#6B7280] font-medium">Confirmed + pipeline</span>
    </div>
    <div className="divide-y divide-[#E5E7EB]">
      {rosterData.map((row, idx) => (
        <div key={idx} className="px-6 py-4 flex justify-between items-center text-[15px]">
          <span className="font-medium text-[#1F2937]">{row.name}</span>
          <span className="font-bold text-[#1F2937]">{row.amt}</span>
        </div>
      ))}
    </div>
  </div>
);

// ==========================================
// MAIN DASHBOARD LAYOUT
// ==========================================
export default function Dashboard(): React.JSX.Element {
  const [liveToggle, setLiveToggle] = useState<string>('Live');
  const [earningToggle, setEarningToggle] = useState<string>('Confirmed + pipeline');
  const [selectedManager, setSelectedManager] = useState<string>('Amelia');

  const currentManagerData = MANAGERS.find(m => m.id === selectedManager) || MANAGERS[0];

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#1F2937] font-sans antialiased p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <header className="flex justify-between items-end mb-4">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">Cowshed Creators Portal</p>
            <h1 className="text-[42px] font-extrabold tracking-tight text-[#1F2937] mt-0.5 leading-none">P&L 2026</h1>
          </div>
          <span className="text-[13px] text-[#6B7280] font-medium mb-1">Confirmed deals only</span>
        </header>

        {/* SUMMARY CARDS METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard 
            title="Live revenue" 
            value="£1,086,586" 
            helper="-£787,346 vs target" 
          />
          <SummaryCard 
            title="Cost of sale" 
            value="£866,795" 
            helper="COS defaults to 80%, adjustable per deal" 
          />
          <SummaryCard 
            title="Overheads" 
            value="£239,884" 
            helper="Admin maintained" 
          />
          <SummaryCard 
            title="Net profit" 
            value="-£20,093" 
            helper="Confirmed only" 
            isNegative={true}
          />
        </div>

        {/* MAIN LIVE P&L CONTENT BLOCK */}
        <div className="bg-white p-6 rounded-[12px] border border-[#D9DEE3] shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-bold text-[#1F2937]">Live P&L</h2>
            <SegmentedControl 
              disabledOpt="Undo manual edit"
              options={['Live', 'Pipeline']} 
              activeOpt={liveToggle} 
              onChange={setLiveToggle} 
            />
          </div>
          
          {/* MATRIX DATA WORKBOOK */}
          <PLTable />
        </div>

        {/* MANAGER PERFORMANCE BLOCK */}
        <div className="bg-white p-6 rounded-[12px] border border-[#D9DEE3] shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-bold text-[#1F2937]">Manager earnings at a glance</h2>
            <SegmentedControl 
              options={['Confirmed', 'Confirmed + pipeline']} 
              activeOpt={earningToggle} 
              onChange={setEarningToggle} 
            />
          </div>

          {/* MANAGER CARD GRID SELECTION ROW */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {MANAGERS.map((m) => (
              <ManagerCard 
                key={m.id}
                name={m.id}
                value={m.value}
                isSelected={selectedManager === m.id}
                onClick={() => setSelectedManager(m.id)}
              />
            ))}
          </div>

          {/* ROSTER ASSIGNED DETAILS NESTED DISPLAY */}
          {currentManagerData.roster.length > 0 && (
            <RosterTable 
              managerName={currentManagerData.id} 
              rosterData={currentManagerData.roster} 
            />
          )}
        </div>

      </div>
    </div>
  );
}