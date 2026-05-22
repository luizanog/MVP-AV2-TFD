import React, { useState } from 'react';
import { X, Check, Eye, HelpCircle, Save } from 'lucide-react';
import { Trend } from '../types';
import { motion } from 'motion/react';

interface AddTrendModalProps {
  onClose: () => void;
  onAddTrend: (newTrend: Trend) => void;
  categories: string[];
}

export default function AddTrendModal({ onClose, onAddTrend, categories }: AddTrendModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [extended, setExtended] = useState('');
  const [category, setCategory] = useState('Visual Art');
  const [status, setStatus] = useState<'EMERGING' | 'STABLE' | 'AESTHETIC' | 'HYPED'>('EMERGING');
  const [selectedColors, setSelectedColors] = useState<string[]>(['#4648d4', '#bdc2ff', '#e0dbff', '#fcf8ff']);
  const [customTag, setCustomTag] = useState('');
  const [tags, setTags] = useState<string[]>(['DRAFT']);

  const COLOR_OPTIONS = [
    '#4648d4', '#bdc2ff', '#e0dbff', '#fcf8ff',
    '#2c2abc', '#565e74', '#cfd2ff', '#1b1b23',
    '#6063ee', '#efecf8', '#4651b9', '#dae2fc',
    '#bdc2ff', '#000766', '#2f3aa2', '#ba1a1a',
    '#10b981', '#06b6d4', '#ec4899', '#f59e0b'
  ];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customTag.trim()) {
      e.preventDefault();
      if (!tags.includes(customTag.toUpperCase().trim())) {
        setTags([...tags, customTag.toUpperCase().trim()]);
      }
      setCustomTag('');
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleToggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      if (selectedColors.length > 1) {
        setSelectedColors(selectedColors.filter((c) => c !== color));
      }
    } else {
      if (selectedColors.length < 4) {
        setSelectedColors([...selectedColors, color]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Build the newly generated trend card
    const randomSeed = Math.floor(Math.random() * 100000);
    const mockTrend: Trend = {
      id: `custom-trend-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      fullContent: extended.trim() || description.trim(),
      image: `https://picsum.photos/seed/trend-${randomSeed}/800/600`,
      tags: [status, ...tags],
      status: status,
      growth: Math.floor(Math.random() * 40) + 50, // 50% - 90%
      views: Math.floor(Math.random() * 500) + 50,
      category: category,
      colorPalette: selectedColors,
      growthStats: [
        { month: 'Mar', value: Math.floor(Math.random() * 20) + 10 },
        { month: 'Apr', value: Math.floor(Math.random() * 30) + 30 },
        { month: 'May', value: Math.floor(Math.random() * 40) + 50 },
      ]
    };

    onAddTrend(mockTrend);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4" id="add-trend-dimmer">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#0e0d1d] text-white rounded-3xl border border-[#23213c] shadow-2xl overflow-hidden flex flex-col"
        id="add-trend-dialog-card"
      >
        {/* Modal top header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#efecf8] text-[#1b1b23]" id="add-trend-header">
          <div className="flex items-center gap-2">
            <Save className="w-5 h-5 text-[#2c2abc]" />
            <span className="font-sans font-bold text-lg">Create Trend Specification</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black hover:bg-black/5 p-1 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal form items */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[80vh] flex flex-col gap-5 text-left no-scrollbar">
          {/* Title Area */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 font-mono tracking-wider uppercase">
              Trend Dimension Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Molecular Lattice UI"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2.5 bg-[#171629] border border-[#23213a] focus:border-[#4648d4] text-sm text-white rounded-xl outline-none transition-colors"
            />
          </div>

          {/* Core Categories and State Status grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 font-mono tracking-wider uppercase">
                Workgroup Index
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2.5 bg-[#171629] border border-[#23213a] text-sm text-white rounded-xl outline-none cursor-pointer"
              >
                {categories.filter(c => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 font-mono tracking-wider uppercase">
                Emergence Level
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-3 py-2.5 bg-[#171629] border border-[#23213a] text-sm text-white rounded-xl outline-none cursor-pointer"
              >
                <option value="EMERGING">EMERGING</option>
                <option value="STABLE">STABLE</option>
                <option value="AESTHETIC">AESTHETIC</option>
                <option value="HYPED">HYPED</option>
              </select>
            </div>
          </div>

          {/* Quick Caption */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 font-mono tracking-wider uppercase">
              Quick Overview Caption *
            </label>
            <textarea
              required
              rows={2}
              maxLength={150}
              placeholder="A brief, high-impact description of the aesthetic trajectory."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-2.5 bg-[#171629] border border-[#23213a] focus:border-[#4648d4] text-sm text-white rounded-xl outline-none transition-colors resize-none"
            />
            <span className="text-[10px] text-gray-500 text-right">
              {description.length}/150 characters
            </span>
          </div>

          {/* Synthesis Details */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 font-mono tracking-wider uppercase">
              Synthesis Research Specifications (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Describe research insights, technological catalysts, and cognitive reactions in full."
              value={extended}
              onChange={(e) => setExtended(e.target.value)}
              className="px-4 py-2.5 bg-[#171629] border border-[#23213a] focus:border-[#4648d4] text-sm text-white rounded-xl outline-none transition-colors resize-none"
            />
          </div>

          {/* Interactive Tags generator */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 font-mono tracking-wider uppercase">
              Research Tags (Press Enter)
            </label>
            <input
              type="text"
              placeholder="e.g. MOLECULAR"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={handleAddTag}
              className="px-4 py-2 bg-[#171629] border border-[#23213a] text-sm text-white rounded-xl outline-none transition-colors mb-2"
            />
            <div className="flex flex-wrap gap-1.5 max-h-[70px] overflow-y-auto no-scrollbar">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  onClick={() => handleRemoveTag(idx)}
                  className="px-2.5 py-1 bg-[#4648d4]/15 text-[#bdc2ff] border border-[#4648d4]/20 rounded-lg text-[10px] font-bold font-mono tracking-wider cursor-pointer hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/20"
                  title="Click to remove tag"
                >
                  {tag} &times;
                </span>
              ))}
            </div>
          </div>

          {/* Palette Colors Select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400 font-mono tracking-wider uppercase">
              Swatches Palette (Select up to 4)
            </label>
            <div className="grid grid-cols-10 gap-2 p-3 bg-[#131224] rounded-xl border border-[#23213a]">
              {COLOR_OPTIONS.map((color) => {
                const isSelected = selectedColors.includes(color);
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleToggleColor(color)}
                    className="aspect-square rounded-md relative flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: color }}
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-white stroke-[4] drop-shadow-md" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#23213c]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 border border-[#23213a] text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !description.trim()}
              className="px-6 py-2.5 bg-[#4648d4] text-white text-sm font-bold rounded-xl hover:bg-[#3234ab] cursor-pointer shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              Publish Specifications
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
