import sequence from '../data/OmicsOne-DualIndexXT-A.json';
import compatibilityData from '../data/CompatiblePrimersXT-A.json';
import PrimerTable from './shared/PrimerTable';

export default function dualIndexXTA() {
  return (
    <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <PrimerTable primers={sequence.i5} label="i5" compatibilityMap={compatibilityData.i5} />
      </div>
      <div style={{ flex: 1 }}>
        <PrimerTable primers={sequence.i7} label="i7" compatibilityMap={compatibilityData.i7} />
      </div>
    </div>
  );
}