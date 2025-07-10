import sequence from '../data/ATAC-Index.json';
import compatibilityData from '../data/CompatiblePrimers-ATAC.json';
import PrimerTable from './shared/PrimerTable';
import ATACimg from '../assets/images/ATAC_library_Strucutre.png';

export default function dualIndex() {
    return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ color: '#007bff', marginBottom: 0 }}>
          Base ATAC Amplification Kit
      </h2>
      <p style={{ marginBottom:0 }}>The indexes can be used for ATAC library amplifications applications when purchased ATAC assay: BD Rhapsody™ ATAC-Seq Amplification Kit (Cat No 571356). <br />
      For <strong>2-plexy indexing, </strong> Please first select one of the i7 Reverse Index Primer: RP4, RP5, RP6, the next compatible primer will be <span style={{color: 'green'}}>highlighted</span>.</p>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <h3>i5 forward primer is not on ATAC read structure</h3>
          <p>Instead of i5, we are amplifying the cell label and UMI for ATAC I2 read using ATAC Forward Adapter Primer.</p>
          <img src={ATACimg} alt="ATAC Index" style={{ width: '100%', marginBottom: 16 }} />
        </div>
        <div style={{ flex: 1 }}>
          <PrimerTable primers={sequence.i7} label="i7" compatibilityMap={compatibilityData.i7} />
        </div>
      </div>
    </div>
    </div>
  );
        }