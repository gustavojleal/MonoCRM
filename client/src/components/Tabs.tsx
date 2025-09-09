import React, { useState, ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  position?: 'top' | 'left' | 'right';
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab,
  variant = 'default',
  position = 'top',
  onTabChange,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    if (tabs.find(tab => tab.id === tabId)?.disabled) return;
    
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  if (tabs.length === 0) {
    return <div>No tabs provided</div>;
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content || null;

  return (
    <div className={`tabs-container tabs-${variant} tabs-${position} ${className}`}>
      <div className="tabs-header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            disabled={tab.disabled}
            type="button"
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs;