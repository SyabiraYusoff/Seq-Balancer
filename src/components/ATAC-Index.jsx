import sequence from '../data/ATAC-Index.json';
import compatibilityData from '../data/CompatiblePrimers-ATAC.json';
import PrimerTable from './shared/PrimerTable';

export default function dualIndex() {
    return (
        <div >
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
        <div>
            <PrimerTable primers={sequence.i7} label="i7" compatibilityMap={compatibilityData.i7} />
            </div>
            </div>
            </div>
            );
        }