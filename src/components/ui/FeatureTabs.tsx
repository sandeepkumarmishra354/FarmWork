import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Briefcase, Handshake, CheckCircle2, Forklift } from 'lucide-react';
import { getPath } from '../../utils/paths';

const tabsData = [
  {
    id: 0,
    title: 'Farmers',
    icon: <Sprout size={20} />,
    color: 'var(--primary)',
    bg: 'var(--bg-color)',
    description: 'Get access to available agricultural workers for different farm activities, right when you need them. Find and book right mechanisation services like tractors, harvesters, sprayers, and other equipment based on your farm requirements.',
    image: getPath('/media/farmers.jpeg'),
    bullets: [
      'Check product availability from local retailers without visiting multiple shops.',
      'Get visibility of worker, inputs, and machinery to make timely and informed decisions.',
      'Rate every service you use and get access to more skilled, trusted partners over time.',
      'Receive updates from retailers and service providers about availability, pricing, and offers.',
      'From inputs to worker to machinery—view all your farm costs in one place recorded by your engaged partners.'
    ]
  },
  {
    id: 1,
    title: 'Worker Agent',
    icon: <Briefcase size={20} />,
    color: 'var(--primary)',
    bg: 'var(--bg-color)',
    description: 'Get access to nearby farm work based on demand—reduce idle time and uncertainty.',
    image: getPath('/media/img-7.jpeg'),
    bullets: [
      'Organise and manage workers, assign jobs, and track work easily.',
      'Connect with more farmers and increase chances of regular employment.',
      'Maintain digital records of jobs completed and payments received.',
      'Monitor outstanding balances and send reminders easily.',
      'Creat a track record of your work and reliability on the platform.',
      'Stay connected with farmers for work updates, availability, and coordination.'
    ]
  },
  {
    id: 2,
    title: 'Input Partner',
    icon: <Handshake size={20} />,
    color: 'var(--primary)',
    bg: 'var(--bg-color)',
    description: 'Digitise the store and manage your business efficiently.',
    image: getPath('/media/input-partner.png'),
    bullets: [
      'Record all sales digitally—no more manual maintainance in multiple registers.',
      'Monitor outstanding balances and send reminders easily.',
      'Share product updates, offers, and notifications directly.',
      'Get visibility and connect with a wider network of farmers through the platform.'
    ]
  },
  {
    id: 3,
    title: 'Mechanization Partner',
    icon: <Forklift size={20} />,
    color: 'var(--primary)',
    bg: 'var(--bg-color)',
    description: 'List your machines, reach more farmers, and manage bookings with ease.',
    image: getPath('/media/mechanization.jpeg'),
    bullets: [
      'Get visibility and connect with a wider network of farmers who need machinery services.',
      'Track all service requests and bookings in one place.',
      'Avoid missed calls and manual coordination.',
      'Maintain digital records of jobs completed and payments received.',
      'Share availability, pricing, and updates directly with farmers.'
    ]
  },
];

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const selectedData = tabsData[activeTab];

  return (
    <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* Sleek Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tabsData.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '999px',
                border: isActive ? `2px solid ${tab.color}` : '2px solid transparent',
                background: isActive ? '#ffffff' : 'rgba(241, 245, 249, 0.5)',
                color: isActive ? tab.color : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.95rem',
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

      <div style={{
        width: '100%',
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid var(--surface-border)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="feature-tab-panel"
          >
            {/* Left Content Area */}
            <div className="feature-tab-content">
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                {selectedData.title}
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                {selectedData.description}
              </p>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: 0, padding: 0, listStyle: 'none' }}>
                {selectedData.bullets.map((bullet, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.5 }}>
                    <CheckCircle2 color={selectedData.color === 'var(--bg-color)' ? 'var(--primary)' : selectedData.color} size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image Area */}
            <div className="feature-tab-image">
              <img
                src={selectedData.image}
                alt={selectedData.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Blur & Gradient Veil */}
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.4) 30%, transparent 100%)',
                }} 
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .feature-tab-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
        }
        .feature-tab-content {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .feature-tab-image {
          position: relative;
          min-height: 300px;
        }
        @media (max-width: 768px) {
          .feature-tab-panel {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
          }
          .feature-tab-content {
            padding: 1.75rem 1.5rem !important;
            order: 1;
          }
          .feature-tab-content h2 {
            font-size: 1.75rem !important;
            margin-bottom: 0.75rem !important;
          }
          .feature-tab-content p {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          .feature-tab-content li {
            font-size: 0.95rem !important;
            gap: 0.75rem !important;
          }
          .feature-tab-image {
            height: 200px !important;
            min-height: unset !important;
            order: 0;
          }
        }
        @media (max-width: 480px) {
          .feature-tab-content {
            padding: 1.25rem 1rem !important;
          }
          .feature-tab-content h2 {
            font-size: 1.5rem !important;
          }
          .feature-tab-image {
            height: 175px !important;
          }
        }
      `}</style>

    </div>
  );
}
