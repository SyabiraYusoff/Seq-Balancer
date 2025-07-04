import { useState } from 'react';
import DualIndex from './components/OmicsOne-DualIndex';
import DualIndexXTB from './components/OmicsOne-DualIndexXT-B';
import DualIndexXTA from './components/OmicsOne-DualIndexXT-A';
import BaseCDNA from './components/Base-cDNA';
import ATACindex from './components/ATAC-Index';

function App() {
  const [activeTab, setActiveTab] = useState('BD® OMICS-One Dual Index Kit');

  const tabs = ['Base Amplification kit',
    'BD® OMICS-One Dual Index Kit', 
    'BD® OMICS-One Dual Index XT Kit A', 
    'BD® OMICS-One Dual Index XT Kit B',
    'ATAC-Index'];

  const renderTabs = () => {
    switch (activeTab) {
      case 'Base Amplification kit': return <BaseCDNA />;
      case 'BD® OMICS-One Dual Index Kit': return <DualIndex />;
      case 'BD® OMICS-One Dual Index XT Kit A': return <DualIndexXTA />;
      case 'BD® OMICS-One Dual Index XT Kit B': return <DualIndexXTB />;
      case 'ATAC-Index': return <ATACindex />;
      default: return <div>Unknown Sequencer</div>;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#fff',
      fontFamily: 'Arial',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        borderRadius: 16,
        background: '#fff',
        minWidth: 350
      }}>
        <h1>BD Rhapsody&trade; Dual Index Check </h1>
        <div style={{ marginBottom: '20px' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                marginRight: '10px',
                padding: '10px 20px',
                backgroundColor: activeTab === tab ? '#007bff' : '#eee',
                color: activeTab === tab ? '#fff' : '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        {renderTabs()}
      </div>
    </div>
  );
}

export default App;