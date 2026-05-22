import React, { useState } from 'react';
import { X, Calendar, Eye, Heart, Flame, ShieldAlert, Sparkles, Send, CheckCircle } from 'lucide-react';
import { Trend } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface TrendDetailsProps {
  trend: Trend | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

const PRESET_QUESTIONS = [
  'What are the immediate business use cases?',
  'What is the 5-year outlook for this trend?',
  'How do we implement this inside existing designs?'
];

export default function TrendDetails({ trend, onClose, isFavorite, onToggleFavorite }: TrendDetailsProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [aiAnswers, setAiAnswers] = useState<{ q: string; a: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  if (!trend) return null;

  // Handle color copying
  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => {
      setCopiedColor(null);
    }, 2000);
  };

  // Simulated professional research answers
  const handleAskQuestion = (qText: string) => {
    if (!qText.trim()) return;
    
    setQuestion('');
    setIsTyping(true);
    
    let answer = '';
    const name = trend.title;

    if (qText.toLowerCase().includes('business') || qText.toLowerCase().includes('immediate')) {
      answer = `For ${name}, primary immediate business values include decreasing visual load time during data density, establishing competitive branding differentiators, and driving user retention up by roughly 22%. Integrating these visual layers can modernise legacy apps without complete functional rewrites.`;
    } else if (qText.toLowerCase().includes('5-year') || qText.toLowerCase().includes('outlook') || qText.toLowerCase().includes('future')) {
      answer = `Over the next five years, ${name} is predicted to stabilize into a primary UI standard. As display hardware moves higher in refresh rate and sub-pixel density, physical refractivity models and organic flows will shift from edge-cases into core system specifications.`;
    } else if (qText.toLowerCase().includes('implement') || qText.toLowerCase().includes('existing') || qText.toLowerCase().includes('how')) {
      answer = `To implement ${name} today, configure subtle CSS backdrops, use CSS custom properties for radial gradient offsets relative to pointer events, and avoid rigid, hard-bordered UI panels. Instead, adopt fine off-white outline dividers with values between 10% and 15% opacity.`;
    } else {
      answer = `Analyzing "${qText}" under the lens of ${name}: This development bridges visual research with human-centered feedback indicators. We anticipate early adopters to achieve substantial organic reach by establishing aesthetic leadership in this arena.`;
    }

    const newQA = { q: qText, a: '' };
    setAiAnswers((prev) => [...prev, newQA]);

    // Simulate typewriter effect
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < answer.length) {
        setAiAnswers((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].a = answer.slice(0, currentIdx + 2);
          return updated;
        });
        currentIdx += 3;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);
  };

  // Custom SVG graph points calculation
  const stats = trend.growthStats;
  const padding = 30;
  const svgWidth = 400;
  const svgHeight = 160;
  const chartWidth = svgWidth - padding * 2;
  const chartHeight = svgHeight - padding * 2;
  
  const minVal = 0;
  const maxVal = 100;
  
  const points = stats.map((stat, i) => {
    const x = padding + (i / (stats.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((stat.value - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, label: stat.month, val: stat.value };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" id="trend-details-dimmer">
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-2xl h-full bg-[#0a0914] text-white p-0 flex flex-col shadow-2xl border-l border-[#24223d]"
        id="trend-details-panel"
      >
        {/* Detail Header area */}
        <div className="absolute top-4 left-4 z-40 flex gap-2">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1b192e] text-gray-400 hover:text-white hover:bg-[#2c2b48] border border-[#2b2a47] cursor-pointer transition-colors"
            id="trend-detail-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-4 right-4 z-40">
          <button
            onClick={(e) => onToggleFavorite(e, trend.id)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1b192e] hover:bg-[#2c2b48] text-white cursor-pointer transition-colors border border-[#2b2a47]"
            id="trend-detail-fav"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Scrollable Workspace Container */}
        <div className="flex-grow overflow-y-auto no-scrollbar" id="detail-scroll-container">
          {/* Header Image Cover */}
          <div className="relative w-full h-[280px] bg-[#07060f] overflow-hidden">
            <img
              src={trend.image}
              alt={trend.title}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0914] via-[#0a0914]/40 to-transparent"></div>
            
            {/* Overlay Category badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3.5 py-1.5 bg-[#4648d4] text-white text-xs font-bold font-mono tracking-widest rounded-full uppercase">
                {trend.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight mt-3">
                {trend.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-8 text-left">
            {/* Technical description */}
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-gray-400 font-mono tracking-wider uppercase">
                Trend Synopsis
              </h2>
              <p className="font-sans text-base text-gray-300 leading-relaxed font-normal">
                {trend.fullContent || trend.description}
              </p>
            </div>

            {/* Growth stats Custom Chart widget */}
            <div className="bg-[#111020] rounded-2xl border border-[#24233c] p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#24233c]">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                  <span className="text-sm font-bold text-white">Metabolic Growth Forecast</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#4648d4]/10 border border-[#4648d4]/25 px-2.5 py-1 rounded-lg text-[#bdc2ff] text-xs font-bold">
                  <span>Emerging Factor: +{trend.growth}%</span>
                </div>
              </div>

              {/* Custom SVG Line Graph */}
              <div className="w-full flex justify-center py-2" id="glowing-svg-chart">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-sm h-auto overflow-visible">
                  {/* Background Gradients */}
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4648d4" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#4648d4" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6063ee" />
                      <stop offset="100%" stopColor="#4648d4" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  {[0, 0.5, 1].map((ratio, idx) => {
                    const y = padding + ratio * chartHeight;
                    return (
                      <line
                        key={idx}
                        x1={padding}
                        y1={y}
                        x2={svgWidth - padding}
                        y2={y}
                        stroke="#24233c"
                        strokeDasharray="4 4"
                      />
                    );
                  })}

                  {/* Filled Area beneath curve */}
                  <path d={areaD} fill="url(#chartGlow)" />

                  {/* Line Curve */}
                  <path d={pathD} fill="none" stroke="url(#lineGlow)" strokeWidth="3" strokeLinecap="round" />

                  {/* Data Point Circles and value labels */}
                  {points.map((p, idx) => (
                    <g key={idx} className="group/dot cursor-pointer">
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#0a0914"
                        stroke="#6063ee"
                        strokeWidth="2.5"
                        className="transition-all duration-300 hover:r-6"
                      />
                      <text
                        x={p.x}
                        y={p.y - 10}
                        textAnchor="middle"
                        fill="#bdc2ff"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="opacity-0 group-hover/dot:opacity-100 transition-opacity bg-black duration-200"
                      >
                        {p.val}%
                      </text>
                      {/* Months bottom scale */}
                      <text
                        x={p.x}
                        y={svgHeight - 10}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="10.5"
                        fontFamily="monospace"
                      >
                        {p.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Data parameters bottom bar */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#24233c] text-center text-xs">
                <div>
                  <span className="text-gray-400 font-medium block">Global Mentions</span>
                  <span className="text-base text-white font-bold leading-6">{(trend.views * 1.5).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Verification Index</span>
                  <span className="text-base text-emerald-400 font-bold leading-6">99.4% Stable</span>
                </div>
              </div>
            </div>

            {/* Design Color Palette copying module */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-400 font-mono tracking-wider uppercase">
                  Studio Palette Swatches
                </h2>
                <span className="text-xs text-indigo-300 font-medium font-mono">
                  Click swatch to copy hex
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {trend.colorPalette.map((color) => {
                  const isCopied = copiedColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => handleCopyColor(color)}
                      className="flex flex-col gap-2 p-2 bg-[#141225] border border-[#23213a] hover:border-[#4648d4] transition-all rounded-xl text-left cursor-pointer group"
                    >
                      <div
                        className="w-full aspect-square rounded-lg shadow-inner group-hover:scale-95 transition-transform"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div className="flex items-center justify-between px-1">
                        <span className="font-mono text-[11px] text-gray-400">
                          {color.toUpperCase()}
                        </span>
                        {isCopied && (
                          <span className="text-[10px] text-emerald-400 font-bold animate-pulse">Copied</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Prompting companion */}
            <div className="bg-gradient-to-r from-[#121124] to-[#1a1936] rounded-2xl border border-[#3e419b]/30 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8b8df8] animate-pulse" />
                <span className="font-sans font-bold text-white text-base">Discovery Studio Companion</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm -mt-1">
                Query deep biological inputs or tactical placement details directly from TrendClarity’s generative processor.
              </p>

              {/* QA Logs */}
              {aiAnswers.length > 0 && (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#23213d] max-h-[180px] overflow-y-auto no-scrollbar">
                  {aiAnswers.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 text-xs text-left">
                      <div className="font-semibold text-indigo-300 font-sans">Q: {item.q}</div>
                      <div className="text-gray-300 font-sans leading-relaxed bg-[#0a0914]/40 p-2.5 rounded-lg border border-[#201e33]">
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                {PRESET_QUESTIONS.map((qText, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskQuestion(qText)}
                    disabled={isTyping}
                    className="px-3 py-1.5 bg-[#1b1932] border border-[#2e2d4d] hover:border-[#6063ee] hover:bg-[#201f3e] rounded-lg text-[11.5px] font-medium text-[#bdc2ff] leading-relaxed cursor-pointer transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {qText}
                  </button>
                ))}
              </div>

              {/* Form Input bar */}
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Ask customized questions..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAskQuestion(question);
                  }}
                  className="w-full pl-4 pr-12 py-3 bg-[#0a0815] text-white rounded-xl placeholder-gray-400 border border-[#2f2e4b] outline-none text-xs focus:border-[#4648d4]"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleAskQuestion(question)}
                  disabled={isTyping || !question.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bdc2ff] hover:text-white transition-colors cursor-pointer disabled:opacity-35"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
