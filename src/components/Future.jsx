import React from 'react';
import '../styleCompants/Future.css';

const Future = () => {
  const futureInitiatives = [
    {
      icon: 'fa-shield-halved',
      title: 'Solar-Powered Classrooms',
      description: 'Equipping schools with solar panels to ensure learning never stops, providing clean and consistent electricity regardless of fuel shortages or grid failures.'
    },
    {
      icon: 'fa-people-group',
      title: 'High-Tech Learning Labs',
      description: 'Closing the digital divide by providing computers and modern tools, giving rural students the same science and tech resources as their urban peers.'
    },
    {
      icon: 'fa-graduation-cap',
      title: '24/7 Learning Support',
      description: 'Upgrading school infrastructure into community hubs that support learning at all hours, eliminating the locational barriers for students traveling long distances.'
    }
  ];

  return (
    <section id="future" className="flex items-center relative" style={{ minHeight: '100vh' }}>
      <div className="section-content max-w-4xl mx-auto px-6 py-24 text-center w-full">
        {/* <span className="inline-block text-xs uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.04)' }}>
          <i className="fa-solid fa-sun mr-1"></i> The Future
        </span> */}
        <h2 className="font-display text-3xl md:text-5xl text-white mb-6 leading-tight">
          Sustainable Recovery <br />
          <span style={{ color: 'var(--gold)' }}> A Future Without Barriers. </span>
        </h2>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: 'rgba(214,207,194,0.45)' }}>
          Beyond immediate grants, we are building the foundation for a permanent educational ecosystem in Yahangala. We don't just want students to return to school; we want them to return to a superior learning environment that is resilient to future crises. By investing in resilient infrastructure and modern technology, we ensure that the next generation of rural talent has the tools to break the cycle of poverty for good.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {futureInitiatives.map((initiative, index) => (
            <div key={index} className="stat-card text-center">
              <i className={`fa-solid ${initiative.icon} text-2xl mb-3`} style={{ color: 'var(--gold)' }}></i>
              <div className="text-sm font-medium text-white mb-1">{initiative.title}</div>
              <div className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>{initiative.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Future;
