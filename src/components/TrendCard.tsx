import React from 'react';
import { Heart, Eye, TrendingUp } from 'lucide-react';
import { Trend } from '../types';
import { motion } from 'motion/react';

interface TrendCardProps {
  key?: React.Key;
  trend: Trend;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onClick: () => void;
}

export default function TrendCard({ trend, isFavorite, onToggleFavorite, onClick }: TrendCardProps) {
  // Determine standard colors for status badges
  const getBadgeStyles = (tag: string) => {
    switch (tag.toUpperCase()) {
      case 'EMERGING':
        return 'bg-[#484bd6]/10 text-[#bdc2ff] border border-[#484bd6]/20';
      case 'GENERATIVE':
        return 'bg-[#6063ee]/10 text-[#e0dbff] border border-[#6063ee]/20';
      case 'STABLE':
        return 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20';
      case 'ARCHITECTURE':
        return 'bg-blue-500/10 text-blue-300 border border-blue-500/20';
      case 'AESTHETIC':
        return 'bg-purple-500/10 text-purple-300 border border-purple-500/20';
      default:
        return 'bg-[#565e74]/10 text-gray-300 border border-gray-500/15';
    }
  };

  return (
    <motion.article 
      onClick={onClick}
      className="group relative flex flex-col w-full bg-[#0d0c1b] rounded-3xl border border-[#232136] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#4648d4] hover:shadow-2xl hover:shadow-[#4648d4]/15 hover:-translate-y-1.5"
      placeholder="trend-card"
      id={`trend-card-${trend.id}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Dynamic Glow Ornament (Behind Image Border) */}
      <span className="absolute top-0 right-0 w-44 h-44 bg-[#4648d4]/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#4648d4]/20 transition-all duration-500"></span>
      
      {/* Image Area */}
      <div className="relative w-full aspect-[4/3] bg-[#07060f] overflow-hidden" id={`card-image-box-${trend.id}`}>
        <img
          src={trend.image}
          alt={trend.title}
          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          id={`trend-img-${trend.id}`}
        />
        
        {/* Soft Shadow Gradient Over Image */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0c1b] to-transparent pointer-events-none"></div>

        {/* Floating Heart Icon Button */}
        <button
          onClick={(e) => onToggleFavorite(e, trend.id)}
          className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/75 hover:bg-white backdrop-blur-md shadow-lg transition-all transform hover:scale-110 cursor-pointer active:scale-90"
          id={`fav-btn-${trend.id}`}
          title={isFavorite ? 'Remove from Saved' : 'Save Trend'}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-700 hover:text-red-500'
            }`}
          />
        </button>

        {/* Growth badge on image */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#4648d4]/90 backdrop-blur-sm text-white text-xs font-bold font-mono">
          <TrendingUp className="w-3.5 h-3.5" />
          +{trend.growth}%
        </div>
      </div>

      {/* Description Content Area */}
      <div className="flex flex-col flex-grow p-6 text-left" id={`card-body-${trend.id}`}>
        <h3 className="font-sans font-bold text-xl md:text-2xl text-white tracking-tight leading-snug group-hover:text-[#bdc2ff] transition-colors mb-2">
          {trend.title}
        </h3>
        
        <p className="font-sans text-sm md:text-base text-gray-400 font-normal leading-relaxed mb-6 line-clamp-3">
          {trend.description}
        </p>

        {/* Footer Category Badge and Tags */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 border-t border-[#1f1e29]" id={`card-tags-box-${trend.id}`}>
          {trend.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider font-mono uppercase ${getBadgeStyles(tag)}`}
            >
              {tag}
            </span>
          ))}

          {/* Simple Analytics Micro Data */}
          <span className="ml-auto flex items-center gap-1 text-[11px] text-gray-400 font-mono">
            <Eye className="w-3.5 h-3.5" />
            {trend.views.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
