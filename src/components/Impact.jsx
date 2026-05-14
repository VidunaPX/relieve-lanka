import React from 'react';
import '../styleCompants/Impact.css';
import "../styles/global.css"

const Impact = () => {
  const impactStats = [
    {
      value: '89%',
      label: 'Schools Reopened',
      progress: 89,
      color: '#5EAA5E'
    },
    {
      value: '142K',
      label: 'Students Back in Class',
      progress: 79,
      color: 'var(--accent-bright)'
    },
    {
      value: '2,400',
      label: 'Families Rehoused',
      progress: 65,
      color: 'var(--gold)'
    },
    {
      value: '45',
      label: 'Water Systems Active',
      progress: 100,
      color: 'rgba(255,255,255,0.6)'
    }
  ];

  return (
    <section id="impact" className="flex items-center relative" style={{ minHeight: '100vh' }}>
      <div className="section-content max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
        <div>
          {/* <span className="inline-block text-xs uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ color: '#5EAA5E', border: '1px solid rgba(94,170,94,0.25)', background: 'rgba(94,170,94,0.04)' }}>
            <i className="fa-solid fa-seedling mr-1"></i> Impact
          </span> */}
          <h2 className="font-display text-3xl md:text-5xl text-white mb-6 leading-tight">
            Our promise.<br />to the community. {/* Add scrolling test which fades in and out - */}
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(214,207,194,0.45)' }}>
            It is a way to jumpstart a community and accelerate its own growth. We are committed to ensuring that for students in the most vulnerable areas, merit becomes the only determinant in post-secondary education. By removing the financial barriers of transport, rent, and tuition, we promise to level the playing field between rural scholars and their urban peer </p>
          <div className="grid grid-cols-2 gap-4">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="font-display text-3xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>{stat.label}</div>
                <div className="w-full h-1 rounded-full mt-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ 
                      width: `${stat.progress}%`, 
                      background: stat.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/lankagrowth55/600/450.jpg" 
            alt="Students returning to school"
            className="rounded-2xl w-full object-cover" 
            style={{ filter: 'brightness(0.75) saturate(0.8)', border: '1px solid rgba(94,170,94,0.12)' }}
          />
          <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(to top, rgba(15,26,13,0.6), transparent 50%)' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
