'use client';

import React from 'react';
import {
  Activity,
  Cpu,
  Video,
  Power,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import Image from 'next/image';

/* =======================
   Types
======================= */

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
  extra?: React.ReactNode;
  isCollapsed: boolean;
  isMobileOpen: boolean;
}

interface SidebarProps {
  activeTab: 'dashboard' | 'exchange';
  setActiveTab: (tab: 'dashboard' | 'exchange') => void;
  onLogout: () => void;
  userName: string;
  showLiveStream: boolean;
  toggleLiveStream: () => void;
  showAI: boolean;
  toggleAI: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileOpen: boolean;
  closeMobile: () => void;
}

/* =======================
   Static NavItem Component
======================= */

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon: Icon,
  active,
  onClick,
  extra,
  isCollapsed,
  isMobileOpen,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-full flex items-center gap-5 px-6 py-4 sm:py-5 transition-all duration-300 group ${
        active
          ? 'text-(--gold) bg-(--gold)/5'
          : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--text-primary)/5'
      } ${isCollapsed && !isMobileOpen ? 'justify-center' : ''}`}
    >
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-(--gold) shadow-[0_0_20px_var(--gold)" />
      )}

      <div
        className={`shrink-0 transition-all duration-300 ${
          active
            ? 'scale-110 drop-shadow-[0_0_8px_var(--gold-glow)'
            : 'group-hover:scale-110'
        }`}
      >
        <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
      </div>

      {(!isCollapsed || isMobileOpen) && (
        <div className="flex-1 flex items-center justify-between animate-fade-in overflow-hidden">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
            {label}
          </span>
          {extra}
        </div>
      )}
    </button>
  );
};

/* =======================
   Sidebar
======================= */

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
  showLiveStream,
  toggleLiveStream,
  isCollapsed,
  toggleCollapse,
  isMobileOpen,
  closeMobile,
}) => {
  return (
    <aside
      className={`fixed lg:relative inset-y-0 left-0 bg-(--bg-panel) border-r border-(--border) flex flex-col z-110 transition-all duration-500 ${
        isMobileOpen
          ? 'w-64 sm:w-72 translate-x-0'
          : isCollapsed
          ? 'w-20 -translate-x-full lg:translate-x-0'
          : 'w-64 sm:w-72 -translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand */}
      <div
        className={`h-16 sm:h-20 border-b border-(--border) flex items-center gap-4 sm:gap-5 ${
          isCollapsed && !isMobileOpen ? 'justify-center' : 'px-6 sm:px-8'
        }`}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shrink-0 flex items-center justify-center shadow-xl">
          <Image
            src="/LFES_logo_fully_transparent.png"
            alt="LFES Logo"
            width={80}
            height={80}
            className="w-12 h-12 sm:w-18 sm:h-18 object-cover"
          />
        </div>

        {(!isCollapsed || isMobileOpen) && (
          <div className="flex flex-col animate-fade-in">
            <span className="brand-font font-black text-lg sm:text-xl gold-text leading-none">
              LFES CORE
            </span>
            <span className="text-[7px] sm:text-[8px] font-black text-(--text-secondary) uppercase tracking-[0.4em] mt-1">
              Lion Family Eco System
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 sm:py-10 space-y-2">
        <NavItem
          label="Protocol Hub"
          icon={Activity}
          active={activeTab === 'dashboard'}
          onClick={() => {
            setActiveTab('dashboard');
            closeMobile();
          }}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
        />

        <NavItem
          label="Exchange Matrix"
          icon={Cpu}
          active={activeTab === 'exchange'}
          onClick={() => {
            setActiveTab('exchange');
            closeMobile();
          }}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
        />

        <div
          className={`my-6 border-t border-(--border) ${
            isCollapsed && !isMobileOpen ? 'mx-4' : 'mx-6 sm:mx-8'
          }`}
        />

        <NavItem
          label="Live Stream"
          icon={Video}
          active={showLiveStream}
          onClick={() => {
            toggleLiveStream();
            if (isMobileOpen) closeMobile();
          }}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          extra={
            showLiveStream && (
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] animate-pulse" />
            )
          }
        />
      </nav>

      {/* Utilities */}
      <div className="border-t border-(--border) bg-(--text-primary)/2">
        <button
          onClick={toggleCollapse}
          className={`hidden cursor-pointer lg:flex w-full items-center gap-5 px-8 py-6 text-(--text-secondary) hover:text-(--gold) transition-all ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          {isCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <>
              <ChevronLeft size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Compact UI
              </span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            onLogout();
            closeMobile();
          }}
          className={`w-full flex cursor-pointer items-center gap-5 px-6 sm:px-8 py-5 sm:py-6 text-red-500/40 hover:text-red-500 hover:bg-red-500/5 transition-all ${
            isCollapsed && !isMobileOpen ? 'justify-center' : ''
          }`}
        >
          <Power size={20} />
          {(!isCollapsed || isMobileOpen) && (
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em]">
              System Exit
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
