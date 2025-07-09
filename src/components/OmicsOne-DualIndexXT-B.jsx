import sequence from '../data/OmicsOne-DualIndexXT-B.json';
import compatibilityData from '../data/CompatiblePrimersXT-B.json';
import PrimerTable from './shared/PrimerTable';

export default function dualIndexXTB() {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
         <h2 style={{ color: '#007bff', marginBottom: 0 }}>
          BD® OMICS-One Dual Index XT Kit B
      </h2>
      <p>The indexes can be used to multiplex up to 64 samples in a single run. <br />In combination with BD® OMICS-One Dual Index XT Kit A, it can multiplex up to 128 samples in a single run.

        For <strong>Dual plexity indexing, </strong> Please first select one of the: 
      <ul>
        <li>i5 Forward Index Primer: Any primer</li>
        <li>i7 Reverse Index Primer: RP2, RP3, RP5, RP8</li>
      </ul>
      Once selected, the next compatible primer will be <span style={{color: 'green'}}>highlighted</span>.</p>
      
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <PrimerTable primers={sequence.i5} label="i5" compatibilityMap={compatibilityData.i5} />
        </div>
        <div style={{ flex: 1 }}>
          <PrimerTable primers={sequence.i7} label="i7" compatibilityMap={compatibilityData.i7} />
        </div>
      </div>
    </div>
    </div>
  );
}