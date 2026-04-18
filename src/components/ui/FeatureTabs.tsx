import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Briefcase, BarChart, CheckCircle2 } from 'lucide-react';

const tabsData = [
  {
    id: 0,
    title: 'Farmers',
    icon: <Sprout size={20} />,
    color: 'var(--primary)',
    bg: 'var(--bg-color)',
    description: 'On-time labour sourcing, cost visibility, and stronger market linkages.',
    image: '/media/img-3.jpeg',
    bullets: [
      'Affordable mechanization mapped specifically to your cluster.',
      'Reliable workforce mapping during critical sowing and harvest windows.',
      'Verifiable output logs to secure advance buyer placements.'
    ]
  },
  {
    id: 1,
    title: 'Workers',
    icon: <Briefcase size={20} />,
    color: 'var(--text-primary)',
    bg: 'var(--bg-color)',
    description: 'Consistent work discovery and formal financial integration. Step out of the informal economy entirely.',
    image: '/media/img-4.jpeg',
    bullets: [
      'Visibility into stable, geographically clustered work pipelines.',
      'Formal digital ledgers proving payouts and consistent labour.',
      'Direct integrations accessing farm worker insurance and credit.'
    ]
  },
  {
    id: 2,
    title: 'Agents & Retailers',
    icon: <BarChart size={20} />,
    color: 'var(--accent)',
    bg: 'var(--bg-color)',
    description: 'Deep pipeline visibility and instantly digitised ledgers. Simplify your operational overhead.',
    image: '/media/img-2.jpeg',
    bullets: [
      'Unified dashboard for payroll automation and fund advances.',
      'Maximize physical asset utilization across hyper-local clusters.',
      'Securely manage and digitize traditional input sales histories.'
    ]
  }
];

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const selectedData = tabsData[activeTab];

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* Sleek Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {tabsData.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                borderRadius: '999px',
                border: isActive ? `2px solid ${tab.color}` : '2px solid transparent',
                background: isActive ? '#ffffff' : 'rgba(241, 245, 249, 0.5)',
                color: isActive ? tab.color : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                fontFamily: 'var(--font-body)'
              }}
            >
              {tab.icon}
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* The Active Dashboard Window */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '32px', 
        border: '1px solid var(--surface-border)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        minHeight: '550px',
        position: 'relative'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', height: '100%' }}
          >
            {/* Left Content Area */}
            <div style={{ padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                {selectedData.title}
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                {selectedData.description}
              </p>
              
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: 0, padding: 0, listStyle: 'none' }}>
                {selectedData.bullets.map((bullet, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.5 }}>
                    <CheckCircle2 color={selectedData.color === 'var(--bg-color)' ? 'var(--primary)' : selectedData.color} size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image Area */}
            <div style={{ position: 'relative', minHeight: '350px' }}>
              <img 
                src={selectedData.image} 
                alt={selectedData.title} 
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
