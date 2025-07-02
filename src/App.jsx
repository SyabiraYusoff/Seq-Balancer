import { useState } from 'react';
import DualIndex from './components/OmicsOne-DualIndex';
import DualIndexXT from './components/OmicsOne-DualIndexXT';


function App() {
  const [activeTab, setActiveTab] = useState('BD OMICS-One Dual Index Kit');

  const tabs = ['BD OMICS-One Dual Index Kit', 'BD OMICS-One Dual Index XT Kit'];

  const renderSequencer = () => {
    switch (activeTab) {
      case 'BD OMICS-One Dual Index Kit': return <DualIndex />;
      case 'BD OMICS-One Dual Index XT Kit': return <DualIndexXT />;
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
        <ol>
          <li>Select your Indexing Kit.</li>
          <li>Select more than one indexing primer to analyse the colour balance.</li>
          <li>Repeat the process for each lane on NovaSeqX sequencer.</li>
        </ol>
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
        {renderSequencer()}
      </div>
    </div>
  );
}

export default App;