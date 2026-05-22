import React, { useState } from 'react';
import { BookOpen, AlertCircle, Sparkles, TrendingUp, Check, Play } from 'lucide-react';
import { DAILY_BRIEFINGS } from '../data';
import { motion } from 'motion/react';

export default function BriefingsView() {
  const [readBriefs, setReadBriefs] = useState<string[]>([]);
  const [briefs, setBriefs] = useState(DAILY_BRIEFINGS);
  const [newTopic, setNewTopic] = useState('');
  const [generating, setGenerating] = useState(false);

  const toggleRead = (id: string) => {
    if (readBriefs.includes(id)) {
      setReadBriefs(readBriefs.filter(bId => bId !== id));
    } else {
      setReadBriefs([...readBriefs, id]);
    }
  };

  const generateNewBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    setGenerating(true);
    setTimeout(() => {
      const parsedTopic = newTopic.trim();
      const mockBrief = {
        id: `brief-custom-${Date.now()}`,
        title: `${parsedTopic} Optimization Analysis`,
        insight: `Deploying tactile layouts and ${parsedTopic.toLowerCase()} overlays reduces decision latency. Primary research teams observe a high transition index on modern canvases.`,
        impact: `Efficacy increased by ${Math.floor(Math.random() * 20) + 15}%`
      };
      setBriefs([mockBrief, ...briefs]);
      setNewTopic('');
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6" id="briefings-studio-view">
      {/* Intro Glass banner */}
      <div className="relative p-6 bg-gradient-to-r from-[#201c40]/70 to-[#121124]/75 backdrop-blur-md rounded-2xl border border-[#484bd6]/30 overflow-hidden text-left shadow-lg">
        <span className="absolute -top-10 -right-10 w-36 h-36 bg-[#484bd6]/25 rounded-full blur-3xl pointer-events-none"></span>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-[#bdc2ff]" />
          <span className="text-xs font-bold text-[#bdc2ff] font-mono uppercase tracking-wider">
            Enterprise Synthesis
          </span>
        </div>
        <h2 className="text-2xl font-sans font-bold text-white tracking-tight">
          Quick Briefings & Studio Alerts
        </h2>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          Tactile intelligence feeds describing physical layouts, focus states, and atmospheric performance matrices curated in real-time.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        {[
          { label: 'System Read Readiness', val: '99.8%', trend: '+4.2%', desc: 'Workspace cognitive latency decrease' },
          { label: 'Trend Absorption Index', val: '86.4%', trend: '+12.1%', desc: 'Visitor interaction velocity' },
          { label: 'Interface Satisfaction', val: '4.92/5', trend: '+0.8%', desc: 'Fidelity rating on interactive swatches' },
        ].map((item, idx) => (
          <div key={idx} className="p-5 bg-[#0e0d1d] hover:border-[#4648d4] transition-all border border-[#23213c] rounded-2xl">
            <span className="text-xs text-gray-400 font-medium font-sans block">{item.label}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-sans font-bold text-white">{item.val}</span>
              <span className="text-xs text-emerald-400 font-bold font-mono">{item.trend}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Briefs + Create Brief */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Alerts listing (2 cols on large screen) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase font-mono tracking-wider">
            Daily Insights Feed ({briefs.length})
          </h3>

          <div className="flex flex-col gap-4">
            {briefs.map((brief) => {
              const isRead = readBriefs.includes(brief.id);
              return (
                <div
                  key={brief.id}
                  className={`p-5 bg-[#121123]/80 rounded-2xl border transition-all duration-300 ${
                    isRead 
                      ? 'border-[#1b1a2d]/40 opacity-60' 
                      : 'border-[#2e2b4d] shadow-sm hover:border-[#4648d4]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <h4 className={`font-sans font-bold text-base ${isRead ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {brief.title}
                    </h4>
                    <button
                      onClick={() => toggleRead(brief.id)}
                      className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors cursor-pointer ${
                        isRead 
                          ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
                          : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                      title={isRead ? 'Mark as Unread' : 'Mark as Verified'}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs md:text-sm text-gray-400 mt-2 leading-relaxed">
                    {brief.insight}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#1e1d32] text-xs">
                    <span className="text-[#bdc2ff] font-mono font-medium flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-[#8b8df8]" />
                      Metric Shift: {brief.impact}
                    </span>
                    <span className={isRead ? 'text-emerald-400 font-semibold' : 'text-gray-500 font-medium'}>
                      {isRead ? 'Checked' : 'Active'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generate Synthesis Panel on the right */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase font-mono tracking-wider">
            Generate Dynamic Alert
          </h3>

          <div className="p-6 bg-[#0e0d20] border border-[#23213c] rounded-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#8b8df8] animate-pulse" />
              <span className="text-xs font-semibold text-white">Insight Processor</span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Define a localized design interface or technical catalyst. TrendClarity’s engine will instantly generate high-fidelity corporate metrics reporting immediate business value.
            </p>

            <form onSubmit={generateNewBrief} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="e.g. Tactile Haptic Feed"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                disabled={generating}
                className="w-full px-3.5 py-2.5 bg-[#171629] border border-[#23213a] focus:border-[#4648d4] text-xs text-white rounded-xl outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={generating || !newTopic.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#4648d4] hover:bg-[#3436b5] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              >
                {generating ? (
                  <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></span>
                ) : (
                  <>
                    <Play className="w-3 h-3.5 fill-current" />
                    Simulate Briefing
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
