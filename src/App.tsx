import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  BarChart3, 
  Settings, 
  Lightbulb, 
  Compass, 
  PlusCircle, 
  TrendingUp, 
  Eye, 
  PieChart, 
  ShieldCheck, 
  RefreshCw,
  Cpu
} from 'lucide-react';
import Header from './components/Header';
import TrendCard from './components/TrendCard';
import TrendDetails from './components/TrendDetails';
import AddTrendModal from './components/AddTrendModal';
import BriefingsView from './components/BriefingsView';
import { INITIAL_TRENDS, CATEGORIES } from './data';
import { Trend, SidebarTab } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [trends, setTrends] = useState<Trend[]>(INITIAL_TRENDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>(['bio-digital-aesthetics']); // default favorited index
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<SidebarTab>('All');

  // Toggle saving trends
  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent card click drawer expansion
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Add customized drafted trend from form
  const handleAddTrend = (newTrend: Trend) => {
    setTrends([newTrend, ...trends]);
    setIsAddModalOpen(false);
  };

  // Match / Filter logical sets
  const filteredTrends = useMemo(() => {
    return trends.filter((trend) => {
      // Search matching logic (Check title, description, tags, and category)
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        trend.title.toLowerCase().includes(q) ||
        trend.description.toLowerCase().includes(q) ||
        trend.category.toLowerCase().includes(q) ||
        trend.tags.some(tag => tag.toLowerCase().includes(q));

      // Category matching
      const matchesCategory = selectedCategory === 'All' || trend.category === selectedCategory;

      // Current view switcher matching (If only 'Saved' Tab is active, filter only favorites)
      if (currentTab === 'Saved') {
        const isFav = favorites.includes(trend.id);
        return matchesSearch && isFav;
      }

      return matchesSearch && matchesCategory;
    });
  }, [trends, searchQuery, selectedCategory, currentTab, favorites]);

  // Total Views count
  const totalViews = useMemo(() => {
    return trends.reduce((acc, curr) => acc + curr.views, 0);
  }, [trends]);

  // Average Growth Factor
  const avgGrowth = useMemo(() => {
    if (trends.length === 0) return 0;
    const total = trends.reduce((acc, curr) => acc + curr.growth, 0);
    return Math.round(total / trends.length);
  }, [trends]);

  return (
    <div className="min-h-screen bg-[#07060f] flex flex-col md:flex-row relative overflow-x-hidden select-none text-white font-sans" id="tc-root-shell">
      
      {/* LEFT NAVIGATION DRAWER / RAIL (For large desktop viewports) */}
      <aside 
        className="hidden md:flex flex-col w-64 bg-[#11101e] border-r border-[#1f1e2f] shrink-0 h-screen sticky top-0 py-6 px-4 text-left justify-between"
        id="desktop-navigation-sidebar"
      >
        <div className="flex flex-col gap-8">
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-[#4648d4] rounded-xl text-white">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-sans font-extrabold text-xl tracking-tight text-white">
              TrendClarity
            </span>
          </div>

          {/* Nav list options */}
          <nav className="flex flex-col gap-1.5" id="sidebar-tabs-list">
            {[
              { id: 'All', label: 'Explore Studio', icon: Compass },
              { id: 'Saved', label: 'Saved Dimensions', icon: Bookmark, badge: favorites.length },
              { id: 'Analytics', label: 'Analytics Insights', icon: BarChart3 },
              { id: 'Briefings', label: 'Studio Briefings', icon: Lightbulb },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id as any);
                    if (item.id === 'All') setSelectedCategory('All');
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#4648d4] text-white shadow-lg shadow-[#4648d4]/15'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a192c]'
                  }`}
                  id={`sidebar-item-${item.id}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1e1d32] border border-[#4648d4]/40 text-[#bdc2ff] font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Technical/Workspace Telemetry widget */}
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#090815] border border-[#1d1c2d] text-xs">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#8b8df8]" />
            <span className="font-semibold text-gray-300">Workspace Status</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span>ACTIVE INDEX</span>
              <span className="text-emerald-400 font-bold">● ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span>SATELLITE CALIBRATION</span>
              <span className="text-indigo-300 font-bold">100% SECURE</span>
            </div>
          </div>
        </div>
      </aside>

      {/* CORE FRAME CONTAINER AREA (Holds everything, scrolls independently) */}
      <main className="flex-grow flex flex-col min-h-screen relative" id="tc-content-scroll-core">
        {/* Universal Top layout header */}
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={CATEGORIES}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          savedCount={favorites.length}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        {/* Interactive Workspace Grid Feed */}
        <div className="flex-grow px-6 py-6 md:py-8 md:px-12 flex flex-col gap-6 md:gap-8 pb-24 md:pb-8" id="tc-scrollable-canvas">
          
          {/* Renders Section Headers based on current picked Tab */}
          <div className="flex items-center justify-between text-left" id="tc-category-header">
            <div>
              <span className="text-xs font-bold text-[#8b8df8] font-mono uppercase tracking-widest block mb-1">
                {currentTab === 'All' ? `${selectedCategory} Trends` : `${currentTab} View`}
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight">
                {currentTab === 'All' && 'Quantum Architecture Grid'}
                {currentTab === 'Saved' && 'Saved Trend Specimen'}
                {currentTab === 'Analytics' && 'Analytics Studio'}
                {currentTab === 'Briefings' && 'Dynamic Knowledge Bases'}
              </h2>
            </div>

            {/* Simulated Sync Indicator to show workspace interactive richness */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141225] border border-[#23213a] text-xs text-indigo-300 hover:text-white font-mono cursor-pointer hover:border-[#4648d4] transition-colors">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Realtime Synced</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* EXPLORE & SAVED CARD GRID */}
            {(currentTab === 'All' || currentTab === 'Saved') && (
              <motion.div 
                key={`${currentTab}-${selectedCategory}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full"
                id="cards-feed-wrapper"
              >
                {filteredTrends.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-[#23213c] rounded-3xl bg-[#090815]" id="no-cards-fallback">
                    <Bookmark className="w-12 h-12 text-gray-600 animate-bounce" />
                    <p className="text-gray-400 font-semibold text-lg">No Trend dimensions found</p>
                    <p className="text-gray-600 text-sm max-w-xs -mt-1">
                      Try updating your filters, erasing the search index, or drafting a new layout pattern.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="trend-cards-grid">
                    {filteredTrends.map((trend) => (
                      <TrendCard
                        key={trend.id}
                        trend={trend}
                        isFavorite={favorites.includes(trend.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onClick={() => setSelectedTrend(trend)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ANALYTICS TAB */}
            {currentTab === 'Analytics' && (
              <motion.div
                key="analytics-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6 text-left"
                id="analytics-dashboard-content"
              >
                {/* Scorecards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 bg-[#0e0d1d] border border-[#23213c] rounded-2xl">
                    <span className="text-gray-400 text-xs font-mono font-semibold uppercase block">Aggregate Platform Gaze</span>
                    <span className="text-3xl font-extrabold text-white mt-1.5 block">{totalViews.toLocaleString()} views</span>
                    <p className="text-xs text-gray-500 mt-1">Sum of live trend observations globally</p>
                  </div>
                  <div className="p-6 bg-[#0e0d1d] border border-[#23213c] rounded-2xl">
                    <span className="text-gray-400 text-xs font-mono font-semibold uppercase block">Median Growth Index</span>
                    <span className="text-3xl font-extrabold text-emerald-400 mt-1.5 block">+{avgGrowth}% acceleration</span>
                    <p className="text-xs text-gray-500 mt-1">Average velocity factor across categories</p>
                  </div>
                  <div className="p-6 bg-[#0e0d1d] border border-[#23213c] rounded-2xl">
                    <span className="text-gray-400 text-xs font-mono font-semibold uppercase block">Categorization Health</span>
                    <span className="text-3xl font-extrabold text-indigo-300 mt-1.5 block">100% Calibrated</span>
                    <p className="text-xs text-gray-500 mt-1">Zero misallocated architectural trends</p>
                  </div>
                </div>

                {/* Main analytical breakdown row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Category allocations */}
                  <div className="lg:col-span-2 p-6 bg-[#0e0d1f] border border-[#23213c] rounded-2xl flex flex-col gap-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#23213c]">
                      <PieChart className="w-5 h-5 text-indigo-400" />
                      <span className="font-sans font-bold text-base text-white">Trend Volatility Allocation mapping</span>
                    </div>
                    {/* Inline CSS chart representing percentages of trends per category */}
                    <div className="flex flex-col gap-3.5 py-2">
                      {['Visual Art', 'AI/ML', 'Biotech', 'Web3'].map((cat) => {
                        const count = trends.filter(t => t.category === cat).length;
                        const pct = Math.round((count / trends.length) * 100);
                        return (
                          <div key={cat} className="flex flex-col gap-1 text-sm">
                            <div className="flex justify-between items-center text-gray-400 text-xs">
                              <span className="font-semibold text-gray-300">{cat} Dimensions</span>
                              <span className="font-mono">{count} items ({pct}%)</span>
                            </div>
                            <div className="w-full h-2.5 bg-[#17162b] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#6063ee] to-[#4648d4] rounded-full"
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operational Status summaries */}
                  <div className="p-6 bg-[#0e0d1f] border border-[#23213c] rounded-2xl flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#23213c]">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <span className="font-sans font-bold text-base text-white">Consensus Stability</span>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        {[
                          { status: 'EMERGING', color: 'text-indigo-300', count: trends.filter(t => t.tags.includes('EMERGING')).length },
                          { status: 'STABLE', color: 'text-emerald-400', count: trends.filter(t => t.tags.includes('STABLE')).length },
                          { status: 'AESTHETIC', color: 'text-purple-400', count: trends.filter(t => t.tags.includes('AESTHETIC')).length },
                          { status: 'HYPED', color: 'text-red-400', count: trends.filter(t => t.tags.includes('HYPED')).length },
                        ].map((stat) => (
                          <div key={stat.status} className="flex items-center justify-between text-xs font-mono">
                            <span className="text-gray-400">{stat.status} Metrics</span>
                            <span className={`${stat.color} font-bold`}>{stat.count} dimensions active</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/25 rounded-xl text-center text-xs text-[#bdc2ff] leading-relaxed mt-4">
                      Consensus index indicates consistent enterprise translation rate across channels.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BRIEFINGS TAB */}
            {currentTab === 'Briefings' && (
              <motion.div
                key="briefings-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <BriefingsView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION TRACK BAR (Hidden on desktop viewports) */}
      <footer 
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#11101e] border-t border-[#1f1e2f] z-40 flex items-center justify-around px-2"
        id="mobile-navigation-footer"
      >
        {[
          { id: 'All', label: 'Explore', icon: Compass },
          { id: 'Saved', label: 'Saved', icon: Bookmark, badge: favorites.length },
          { id: 'Briefings', label: 'Briefs', icon: Lightbulb },
          { id: 'Analytics', label: 'Metrics', icon: BarChart3 },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id as any);
                if (item.id === 'All') setSelectedCategory('All');
              }}
              className={`relative flex flex-col items-center justify-center p-2 text-xs font-medium cursor-pointer ${
                isActive ? 'text-[#8b8df8]' : 'text-gray-400'
              }`}
              id={`mobile-tab-${item.id}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-sans">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute top-1.5 right-1.5 text-[8.5px] font-bold px-1.5 py-0.2 rounded-full bg-[#4648d4] text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Floating Mobile Create Trigger button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex flex-col items-center justify-center p-2 text-[#4648d4] hover:text-[#8b8df8] cursor-pointer"
          id="mobile-create-trigger"
          title="Create Trend"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-[10px] mt-1">Create</span>
        </button>
      </footer>

      {/* SLIDING PANEL: TREND DETAIL SUMMARY DRAWER */}
      <AnimatePresence>
        {selectedTrend && (
          <TrendDetails
            trend={selectedTrend}
            onClose={() => setSelectedTrend(null)}
            isFavorite={favorites.includes(selectedTrend.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </AnimatePresence>

      {/* DIALOG MODAL: ADD TREND DRAFT CONFIGURATOR */}
      <AnimatePresence>
        {isAddModalOpen && (
          <AddTrendModal
            onClose={() => setIsAddModalOpen(false)}
            onAddTrend={handleAddTrend}
            categories={CATEGORIES}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
