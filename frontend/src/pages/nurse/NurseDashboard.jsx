import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import AlertForm from '../../components/AlertForm';
import AlertCard from '../../components/AlertCard';
import RecentAlertsTable from '../../components/RecentAlertsTable';
import { useAlerts } from '../../context/AlertContext';

const NurseDashboard = () => {
  const { activeAlerts, recentAlerts } = useAlerts();

  return (
    <div style={{ display: 'flex', backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Header user={{ name: 'Anjali', staffId: 'NUR12345' }} />

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Left Column */}
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <AlertForm />
            <RecentAlertsTable alerts={recentAlerts} />
          </div>

          {/* Right Column (Active Alerts) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800' }}>ACTIVE ALERTS</h3>
            {activeAlerts.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#718096' }}>No active alerts</div>
            ) : (
              activeAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NurseDashboard;
