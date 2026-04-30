import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Bell, Mail, Users, 
  Database, ShieldCheck, Save, CheckCircle2, Globe, Clock, Calendar,
  Volume2, Smartphone, Shield, Download, Trash2, Key, RefreshCw
} from 'lucide-react';
import { adminService } from '../services/api';

const SettingTab = ({ id, label, icon: Icon, isActive, onClick }) => (
  <div 
    onClick={() => onClick(id)}
    style={{ 
      display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 1.5rem', borderRadius: '12px', cursor: 'pointer',
      backgroundColor: isActive ? '#f5f3ff' : 'transparent', color: isActive ? '#4c1d95' : '#64748b', fontWeight: '700',
      transition: 'all 0.2s ease'
    }}
  >
    <Icon size={20} />
    <span style={{ fontSize: '0.95rem' }}>{label}</span>
  </div>
);

const FormField = ({ label, children }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '8px', display: 'block' }}>{label}</label>
    {children}
  </div>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    hospital_name: '',
    address: '',
    timezone: '',
    date_format: '',
    time_format: '',
    language: '',
    email_alerts: true,
    sms_alerts: false,
    sound_alerts: true,
    smtp_host: 'smtp.hospital.com',
    sms_api_key: '************',
    password_policy: 'Strong',
    two_factor: false,
    backup_frequency: 'Daily'
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await adminService.getSettings();
      if (data) setFormData({ ...formData, ...data });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminService.updateSettings(formData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'general':
        return (
          <div>
            <h2 style={{ margin: '0 0 2rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>General Settings</h2>
            <FormField label="Hospital Name">
              <input type="text" value={formData.hospital_name} onChange={e => setFormData({...formData, hospital_name: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} placeholder="City Care Hospital" />
            </FormField>
            <FormField label="Address">
              <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} placeholder="Facility Address..." />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <FormField label="Time Zone">
                <select value={formData.timezone} onChange={e => setFormData({...formData, timezone: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}>
                  <option>(GMT+05:30) Asia/Kolkata</option>
                  <option>(GMT+00:00) UTC</option>
                </select>
              </FormField>
              <FormField label="Date Format">
                <select value={formData.date_format} onChange={e => setFormData({...formData, date_format: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}>
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                </select>
              </FormField>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h2 style={{ margin: '0 0 2rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>Notification Settings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { id: 'email_alerts', label: 'Email Alerts', icon: Mail, desc: 'Send emergency alerts via email' },
                { id: 'sms_alerts', label: 'SMS Alerts', icon: Smartphone, desc: 'Send emergency alerts via SMS' },
                { id: 'sound_alerts', label: 'System Sounds', icon: Volume2, desc: 'Play audible alarms on the dashboard' }
              ].map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', backgroundColor: '#f5f3ff', color: '#7c3aed', borderRadius: '10px' }}><item.icon size={20} /></div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={formData[item.id]} onChange={e => setFormData({...formData, [item.id]: e.target.checked})} style={{ width: '40px', height: '20px', cursor: 'pointer' }} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'security':
        return (
          <div>
            <h2 style={{ margin: '0 0 2rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>Security Settings</h2>
            <FormField label="Password Policy">
              <select value={formData.password_policy} onChange={e => setFormData({...formData, password_policy: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}>
                <option>Strong (8+ chars, special char)</option>
                <option>Medium (6+ chars)</option>
              </select>
            </FormField>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: '#ecfdf5', color: '#10b981', borderRadius: '10px' }}><Shield size={20} /></div>
                <div>
                  <div style={{ fontWeight: '700', color: '#1e293b' }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Require OTP for admin logins</div>
                </div>
              </div>
              <input type="checkbox" checked={formData.two_factor} onChange={e => setFormData({...formData, two_factor: e.target.checked})} style={{ width: '40px', height: '20px' }} />
            </div>
          </div>
        );
      case 'email':
        return (
          <div>
            <h2 style={{ margin: '0 0 2rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>Email / SMS Settings</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h4 style={{ margin: '0 0 1rem 0', color: '#4c1d95', fontSize: '0.9rem' }}>Email Gateway (SMTP)</h4>
                <FormField label="SMTP Host">
                  <input type="text" value={formData.smtp_host} onChange={e => setFormData({...formData, smtp_host: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                </FormField>
                <FormField label="Port">
                  <input type="text" defaultValue="587" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                </FormField>
              </div>
              <div>
                <h4 style={{ margin: '0 0 1rem 0', color: '#4c1d95', fontSize: '0.9rem' }}>SMS Gateway</h4>
                <FormField label="API Provider">
                  <select style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}>
                    <option>Twilio</option>
                    <option>Msg91</option>
                  </select>
                </FormField>
                <FormField label="API Key">
                  <input type="password" value={formData.sms_api_key} onChange={e => setFormData({...formData, sms_api_key: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                </FormField>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div>
            <h2 style={{ margin: '0 0 2rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>Users & Permissions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { role: 'Admin', desc: 'Full system access, manage all settings', count: 1 },
                { role: 'Doctor', desc: 'Can resolve alerts and view history', count: 0 },
                { role: 'Nurse', desc: 'Can trigger alerts and view dashboard', count: 0 }
              ].map(item => (
                <div key={item.role} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', border: '1px solid #f1f5f9', borderRadius: '16px' }}>
                  <div>
                    <div style={{ fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.role} 
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#f5f3ff', color: '#7c3aed', padding: '2px 8px', borderRadius: '10px' }}>{item.count} Users</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{item.desc}</div>
                  </div>
                  <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#475569', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}>Manage Permissions</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'backup':
        return (
          <div>
            <h2 style={{ margin: '0 0 2rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>Backup & Restore</h2>
            <div style={{ padding: '2rem', border: '2px dashed #e2e8f0', borderRadius: '16px', textAlign: 'center' }}>
              <Database size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#475569' }}>Manual Database Backup</h4>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Last backup generated: 20 May 2025</p>
              <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '10px', color: '#475569', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
                <Download size={18} /> Download SQL Backup
              </button>
            </div>
          </div>
        );
      default:
        return <div style={{ color: '#94a3b8' }}>Configuration for this module is ready. Use the General tab for primary settings.</div>;
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' }}>System Settings</h1>
        {showToast && (
          <div style={{ backgroundColor: '#10b981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} /> Settings Saved Successfully
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '24px', border: '1px solid #f1f5f9', height: 'fit-content' }}>
          <SettingTab id="general" label="General Settings" icon={SettingsIcon} isActive={activeTab === 'general'} onClick={setActiveTab} />
          <SettingTab id="notifications" label="Notification Settings" icon={Bell} isActive={activeTab === 'notifications'} onClick={setActiveTab} />
          <SettingTab id="email" label="Email / SMS Settings" icon={Mail} isActive={activeTab === 'email'} onClick={setActiveTab} />
          <SettingTab id="users" label="Users & Permissions" icon={Users} isActive={activeTab === 'users'} onClick={setActiveTab} />
          <SettingTab id="backup" label="Backup & Restore" icon={Database} isActive={activeTab === 'backup'} onClick={setActiveTab} />
          <SettingTab id="security" label="Security Settings" icon={ShieldCheck} isActive={activeTab === 'security'} onClick={setActiveTab} />
        </div>

        <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          {renderContent()}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
            <button 
              onClick={handleSave}
              disabled={saving}
              style={{ 
                padding: '1rem 2.5rem', backgroundColor: '#4c1d95', color: 'white', border: 'none', borderRadius: '12px', 
                fontWeight: '800', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(76, 29, 149, 0.2)',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}
            >
              {saving ? <RefreshCw size={20} className="spin" /> : <Save size={20} />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
