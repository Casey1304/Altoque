import React from 'react';
import TopNavBar from '../TopNavBar/TopNavBar';
import SideNavBar from '../SideNavBar/SideNavBar';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import './MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen pt-16 pb-16 lg:pb-0 lg:pl-64 bg-background text-on-surface font-sans">
      <TopNavBar />
      <SideNavBar />
      <main className="max-w-container-max mx-auto p-margin-mobile lg:p-margin-desktop">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
}

