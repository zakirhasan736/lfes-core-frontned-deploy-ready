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
  Shield,
  Wallet,
  Repeat,
  History,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Gamepad2,
  Trophy,
  Heart,
  Globe,
  PieChart,
  Users,
  Settings,
  Lock,
  LayoutDashboard,
  Zap,
  CreditCard,
  HelpCircle,
  Info,
  Landmark,
  Megaphone,
  Radio,
  Tv,
  Gift,
  Handshake,
  Map,
  FileText,
  Scale,
  Car,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { TabID, User } from '@/types';
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
  // activeTab: 'dashboard' | 'exchange';
  // setActiveTab: (tab: 'dashboard' | 'exchange') => void;
  activeTab: TabID;
  setActiveTab: (tab: TabID) => void;
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
  // activeTab,
  // setActiveTab,
  // onLogout,
  // toggleCollapse,
  // closeMobile,
  // user,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-full cursor-pointer flex items-center gap-5 px-6 py-4 sm:py-5 transition-all duration-300 group ${
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
  const NavItem = ({
    label,
    id,
    icon: Icon,
    active,
    badge,
    comingSoon,
  }: any) => (
    <button
      onClick={() => {
        setActiveTab(id);
        closeMobile();
      }}
      className={`relative w-full flex items-center gap-4 px-6 py-2.5 transition-all duration-300 group ${
        active
          ? 'text-[var(--gold)] bg-[var(--gold)]/5'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5'
      } ${isCollapsed && !isMobileOpen ? 'justify-center' : ''}`}
    >
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--gold)] shadow-[0_0_15px_var(--gold)]"></div>
      )}
      <div
        className={`shrink-0 transition-transform ${active ? 'scale-110 drop-shadow-[0_0_5px_var(--gold-glow)]' : 'group-hover:scale-110'}`}
      >
        <Icon size={18} />
      </div>
      {(!isCollapsed || isMobileOpen) && (
        <div className="flex-1 flex items-center justify-between overflow-hidden">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
            {label}
          </span>
          {comingSoon ? (
            <span className="px-1.5 py-0.5 rounded-md bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] text-[6px] font-black tracking-tighter">
              SOON
            </span>
          ) : (
            badge && (
              <span className="px-1.5 py-0.5 rounded-md bg-[var(--gold)]/10 text-[var(--gold)] text-[7px] font-black">
                {badge}
              </span>
            )
          )}
        </div>
      )}
    </button>
  );

  const SectionTitle = ({ title }: { title: string }) => {
    if (isCollapsed && !isMobileOpen)
      return (
        <div className="h-px bg-[var(--border)] mx-4 my-3 opacity-20"></div>
      );
    return (
      <div className="px-6 py-2 mt-4">
        <span className="text-[7px] font-black text-[var(--text-secondary)] opacity-40 uppercase tracking-[0.5em]">
          {title}
        </span>
      </div>
    );
  };

  if (!Users) return null;
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
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-2">
        {/* <NavItem
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
        /> */}

        <SectionTitle title="Core Exchange" />
        <NavItem
          label="Home / Vision"
          id="dashboard"
          active={activeTab === 'dashboard'}
          icon={LayoutDashboard}
        />
        <NavItem
          label="Spot Terminal"
          id="exchange"
          active={activeTab === 'exchange'}
          icon={Zap}
        />
        <NavItem
          label="Futures"
          id="futures"
          active={activeTab === 'futures'}
          icon={Activity}
          comingSoon
        />
        <NavItem
          label="P2P Escrow"
          id="p2p"
          active={activeTab === 'p2p'}
          icon={Repeat}
          comingSoon
        />
         <NavItem
          label="Live Stream"
          id="live-stream"
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

        <SectionTitle title="Finance & Assets" />
        <NavItem
          label="Wallet Vault"
          id="wallet"
          active={activeTab === 'wallet'}
          icon={Wallet}
        />
        <NavItem
          label="Fleet Assets"
          id="vehicles"
          active={activeTab === 'vehicles'}
          icon={Car}
          badge="NEW"
        />
        <NavItem
          label="Exec History"
          id="orders"
          active={activeTab === 'orders'}
          icon={History}
        />
        <NavItem
          label="VIP & Fees"
          id="fees"
          active={activeTab === 'fees'}
          icon={Landmark}
          comingSoon
        />

        <SectionTitle title="Intelligence" />
        <NavItem
          label="Lion AI Core"
          id="ai-assistant"
          active={activeTab === 'ai-assistant'}
          icon={Shield}
        />
        <NavItem
          label="AI Academy"
          id="academy"
          active={activeTab === 'academy'}
          icon={GraduationCap}
        />

        <SectionTitle title="Social & Enterprise" />
        <NavItem
          label="Business Lab"
          id="business-lab"
          active={activeTab === 'business-lab'}
          icon={Briefcase}
        />
        <NavItem
          label="Marketplace"
          id="marketplace"
          active={activeTab === 'marketplace'}
          icon={Megaphone}
        />
        <NavItem
          label="Community"
          id="chat"
          active={activeTab === 'chat'}
          icon={MessageSquare}
        />
        <NavItem
          label="Voice Lounge"
          id="social-lounge"
          active={activeTab === 'social-lounge'}
          icon={Radio}
        />

        <SectionTitle title="Entertainment & Viral" />
        <NavItem
          label="Lion Entertainment"
          id="entertainment"
          active={activeTab === 'entertainment'}
          icon={Gamepad2}
        />
        <NavItem
          label="Rewards Hub"
          id="rewards"
          active={activeTab === 'rewards'}
          icon={Gift}
          badge="VIP"
        />
        <NavItem
          label="Sports League"
          id="sport"
          active={activeTab === 'sport'}
          icon={Trophy}
        />

        <SectionTitle title="Economy & Trust" />
        <NavItem
          label="FAMILY Token"
          id="token-economy"
          active={activeTab === 'token-economy'}
          icon={PieChart}
          badge="NEW"
        />
        <NavItem
          label="Partnerships"
          id="partnerships"
          active={activeTab === 'partnerships'}
          icon={Handshake}
        />
        <NavItem
          label="Heart Fund"
          id="charity"
          active={activeTab === 'charity'}
          icon={Heart}
        />
        <NavItem
          label="Investors"
          id="investors"
          active={activeTab === 'investors'}
          icon={Users}
        />
        <NavItem
          label="Vision / About"
          id="about"
          active={activeTab === 'about'}
          icon={Info}
        />

        <SectionTitle title="System" />
        <NavItem
          label="Security"
          id="security"
          active={activeTab === 'security'}
          icon={Lock}
        />
        <NavItem
          label="Legal / Compliance"
          id="legal"
          active={activeTab === 'legal'}
          icon={Scale}
        />
        <NavItem
          label="Support"
          id="support"
          active={activeTab === 'support'}
          icon={HelpCircle}
        />
        <NavItem
          label="Status"
          id="status"
          active={activeTab === 'status'}
          icon={Activity}
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
