import React from 'react';
import { Sparkles, Mic, Search, PlusCircle, Bookmark, BarChart3, Settings, Lightbulb } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  onOpenAddModal: () => void;
  savedCount: number;
  currentTab: string;
  setCurrentTab: (tab: any) => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  onOpenAddModal,
  savedCount,
  currentTab,
  setCurrentTab,
}: HeaderProps) {
  return (
    <header className="w-full flex flex-col bg-[#07060f]" id="tc-header-container">
      {/* Brand & Profile Bar */}
      <div 
        className="w-full flex items-center justify-between px-6 py-4 bg-[#dbd8e4] md:bg-[#efecf8]" 
        id="tc-brand-bar"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#4648d4] rounded-lg text-white" id="brand-logo-icon">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <span className="font-sans font-bold text-2xl tracking-tight text-[#2c2abc]" id="tc-logo-text">
            TrendClarity
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenAddModal}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#4648d4] text-white rounded-xl text-sm font-semibold shadow-md hover:bg-[#3436b5] transition-all cursor-pointer hover:-translate-y-0.5"
            id="add-trend-btn-desktop"
          >
            <PlusCircle className="w-4 h-4" />
            Create Trend
          </button>

          <div className="relative group cursor-pointer" id="tc-avatar-wrapper">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop"
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#484bd6]/40 group-hover:border-[#484bd6] transition-all"
              referrerPolicy="no-referrer"
              id="tc-avatar-img"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#dbd8e4] rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Navigation & Search Area */}
      <div className="w-full px-6 py-5 flex flex-col gap-4 bg-[#07060f] border-b border-[#1f1e29]" id="tc-search-nav-bar">
        {/* Desktop View Tab Switcher */}
        <div className="hidden md:flex items-center gap-4 text-sm" id="tc-desktop-tabs">
          {[
            { id: 'All', label: 'Explore Feed', icon: Lightbulb },
            { id: 'Saved', label: `Saved Trends (${savedCount})`, icon: Bookmark },
            { id: 'Analytics', label: 'Analytics Studio', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4648d4] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-[#12111f]'
                }`}
                id={`tab-${tab.id}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full" id="tc-search-box">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <Sparkles className="w-5 h-5 text-[#8b8df8]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Discover the next trend..."
            className="w-full pl-12 pr-12 py-3.5 bg-[#1a1924] text-white placeholder-gray-400 font-medium rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#4648d4] transition-all text-sm shadow-inner"
            id="tc-search-input"
          />
          <div className="absolute inset-y-0 right-4 flex items-center gap-3">
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-white text-xs cursor-pointer font-semibold"
                id="search-clear-btn"
              >
                Clear
              </button>
            )}
            <Mic className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Category Chips Container */}
        <div className="w-full overflow-x-auto no-scrollbar py-1" id="tc-category-container">
          <div className="flex items-center gap-3 whitespace-nowrap min-w-max">
            {categories.map((category) => {
              const isActive = selectedCategory === category && currentTab === 'All';
              return (
                <button
                  key={category}
                  onClick={() => {
                    setCurrentTab('All');
                    setSelectedCategory(category);
                  }}
                  className={`px-6 py-2 rounded-full font-semibold text-[13px] tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#484bd6] text-white shadow-lg shadow-[#484bd6]/30 px-8'
                      : 'bg-[#efecf8] text-[#1b1b23] hover:bg-[#e4e1ec]'
                  }`}
                  id={`chip-${category.toLowerCase().replace('/', '-')}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
