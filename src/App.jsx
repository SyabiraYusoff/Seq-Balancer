import { useState } from 'react';
import DualIndex from './components/OmicsOne-DualIndex';
import DualIndexXTB from './components/OmicsOne-DualIndexXT-B';
import DualIndexXTA from './components/OmicsOne-DualIndexXT-A';
import BaseCDNAAmp from './components/base_cDNA_Amp';
import BaseATAC from './components/base_ATAC_Amp';

export default function App() {
  const [activeTab, setActiveTab] = useState('BD® OMICS-One Dual Index Kit');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const tabs = [
    {
      label: 'BD® OMICS-One Dual Index Kit',
      catalog: '571899 - Available to Purchase Separately',
      notes: 'This kit provides 8x i5 and 8x i7 primers from the TruSeq series. Not suitable for ATAC library.',
      volume: '50 µL',
      usage: 'The indexes can be used to multiplex up to 64 samples in a single run.',
    },
    {
      label: 'BD® OMICS-One Dual Index XT Kit A',
      catalog: '571973 - Available to Purchase Separately',
      notes: 'This kit provides 8x i5 and 8x i7 primers from the Nextera series. Not suitable for ATAC library.',
      volume: '300 µL',
      usage: 'The indexes can be used to multiplex up to 64 samples in a single run. In combination with BD® OMICS-One Dual Index XT Kit B, it can multiplex up to 128 samples in a single run.',
    },
    {
      label: 'BD® OMICS-One Dual Index XT Kit B',
      catalog: '572304 - Available to Purchase Separately',
      notes: 'This kit provides 8x i5 and 8x i7 primers from the Nextera series. Not suitable for ATAC library.',
      volume: '300 µL',
      usage: 'The indexes can be used to multiplex up to 64 samples in a single run. In combination with BD® OMICS-One Dual Index XT Kit A, it can multiplex up to 128 samples in a single run.',

    },
    {
      label: 'Base Amplification Kit',
      catalog: 'Included with BD Rhapsody&trade; assay kits',
      notes: 'This kit provides 1x i5 and 4x i7 primers for cDNA applications. Not suitable for ATAC library.',
      volume: '40 µL Forward i5, 20 µL Reverse i7',
      usage: 'The indexes can be used for cDNA applications',
    },
    {
      label: 'Base ATAC Amplification Kit',
      catalog: 'Included with BD Rhapsody&trade; ATAC-seq assay kits',
      notes: 'This kit provides 1x Forward Adapter primer and 8x i7 primers for ATAC-seq applications. Suitable for ATAC library only.',
      volume: '65 µL Forward Adapter Primer, 35 µL Reverse i7',
      usage: 'The indexes can be used for ATAC-seq applications. '
    }
  ];

  const onTabSelect = (label) => {
    let message = '';
    if (label === 'Base Amplification Kit') {
      message = 'Base Amplification Kit is selected. Please select i7 primers from the displayed table. ';
    } else if (label === 'Base ATAC Amplification Kit') {
      message = 'Base ATAC-Index Kit is selected. Please select i7 primers from the displayed table.';
    } else if (label === 'BD® OMICS-One Dual Index XT Kit A') {
      message = 'BD® OMICS-One Dual Index XT Kit A is selected. Please select i5 and i7 primers from the displayed table.';
    } else if (label === 'BD® OMICS-One Dual Index XT Kit B') {
      message = 'BD® OMICS-One Dual Index XT Kit B is selected. Please select i5 and i7 primers from the displayed table.';
    } else if (label === 'BD® OMICS-One Dual Index Kit') {
      message = 'BD® OMICS-One Dual Index Kit is selected. Please select i5 and i7 primers from the displayed table.';
    }

    setActiveTab(label);

    if (message) {
      setPopupMessage(message);
      setShowPopup(true);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setShowPopup(false);
        setTimeout(() => setPopupMessage(''), 300); // clear message after slide-out
      }, 3000);
    }
  };

  const renderTabs = () => {
    switch (activeTab) {
      case 'BD® OMICS-One Dual Index Kit': return <DualIndex />;
      case 'BD® OMICS-One Dual Index XT Kit A': return <DualIndexXTA />;
      case 'BD® OMICS-One Dual Index XT Kit B': return <DualIndexXTB />;
      case 'Base Amplification Kit': return <BaseCDNAAmp />;
      case 'Base ATAC Amplification Kit': return <BaseATAC />;
      default: return <div>Unknown Sequencer</div>;
    }
  };

  return (
    <>
      {popupMessage && (
        <div style={{
          position: 'fixed',
          bottom: showPopup ? '30px' : '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transition: 'bottom 0.3s ease',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          {popupMessage}
        </div>
      )}

      <div style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
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
          minWidth: 350,
          maxWidth: '90%',
          marginBottom:150,
          marginTop: 30
        }}>
          <h1 style={{marginBottom:0}}> XLEAP Colour Balance Checker </h1>
          <h3> For BD Rhapsody&trade; Index Kits </h3>

          <div style={{ display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            padding: 20 
            }}>
          <h2 style={{marginBottom:0}}> Purpose </h2>
          <h3 style={{ marginTop: '10px', fontWeight: 'normal' }}> This tool assists researchers in maintaining proper color balance when selecting index primers for sequencing on the NovaSeqX system. </h3>
          
          <h2 style={{marginBottom:0}}> Functionality </h2>
          <h3 style={{ marginTop: '10px', fontWeight: 'normal' }}> The tool enables evaluation and validation of sequencing readiness. It specifically checks for compatibility with the color balance requirements of the NovaSeq XLEAP SBS chemistry, helping ensure optimal sequencing performance. </h3>

          <h2 style={{marginBottom:0}}> Disclaimer </h2>
          <h3 style={{ marginTop: '10px', fontWeight: 'normal' }}> Our recommendation is based on Illumina public website:<a href="https://knowledge.illumina.com/instrumentation/novaseq-x-x-plus/instrumentation-novaseq-x-x-plus-reference_material-list/000008422" target="_blank" rel="noopener noreferrer">XLEAP Index Colour Balance from Illumina</a>  </h3>

          <h2 style={{ marginBottom:0 }}>Instructions</h2>
          <div style={{ marginBottom: '20px' }}>
            <p>Table below describe available kits within BD Rhapsody products with their catalog numbers, volumes, usage, and notes. <br />
              To use the tool: <br />
            </p>
            <ol>
              <li><strong>Select the desired index kit</strong> from the table below (Default selected kit: BD® OMICS-One Dual Index Kit) </li>
              <li>An i5 and i7 <strong>primer table will be displayed</strong> under the table based on selected index kits.</li>
              <li><strong>Select individual primers</strong> intended to use for your experiment.</li>
              <li><strong>Review the color balance information</strong> provided for the selected primers.</li>
              <li><strong>Use the information</strong> to ensure optimal primer selection for your sequencing needs.</li>
              <li>If you have any questions or need further assistance, please contact your local FAS.</li>
            </ol>
            </div>
            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px', fontSize: '14px'}}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '', color: '#044ED7' }}>Select Your Index Kits</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Catalog Number</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Volume Per Tube (µL)</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {tabs.map((tab) => (
                  <tr key={tab.label}>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                      <button
                        onClick={() => onTabSelect(tab.label)}
                        style={{
                          padding: '15px 20px',
                          textAlign: 'center',      /* Horizontal alignment */
                          verticalAlign: 'middle',  /* Vertical alignment */
                          backgroundColor: activeTab === tab.label ? '#007bff' :'#eee',
                          color: activeTab === tab.label ? '#fff' : '#000',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          width: '250px',
                        }}
                      >
                        {tab.label}
                      </button>
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{tab.catalog}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{tab.volume}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{tab.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
          {renderTabs()}
        </div>
      </div>
    </>
  );
}