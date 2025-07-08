import { useState } from 'react';
import sequence from '../data/base_cDNA_amp.json';
import compatibilityData from '../data/CompatiblePrimers_basecDNAAmp.json';
import PrimerTable from './shared/PrimerTable';

// Import other kits for secondary table
import omicsOneSeq from '../data/OmicsOne-DualIndex.json';
import omicsOneCompat from '../data/CompatiblePrimers.json';
import omicsXT_A_Seq from '../data/OmicsOne-DualIndexXT-A.json';
import omicsXT_A_Compat from '../data/CompatiblePrimersXT-A.json';
import omicsXT_B_Seq from '../data/OmicsOne-DualIndexXT-B.json';
import omicsXT_B_Compat from '../data/CompatiblePrimersXT-B.json';

const secondaryOptions = [
    { label: 'None', value: '' },
    { label: 'BD® OMICS-One Dual Index Kit', value: 'omicsOne' },
    { label: 'BD® OMICS-One Dual Index XT Kit A', value: 'omicsXTA' },
    { label: 'BD® OMICS-One Dual Index XT Kit B', value: 'omicsXTB' }
];

const secondaryData = {
    omicsOne: { seq: omicsOneSeq, compat: omicsOneCompat },
    omicsXTA: { seq: omicsXT_A_Seq, compat: omicsXT_A_Compat },
    omicsXTB: { seq: omicsXT_B_Seq, compat: omicsXT_B_Compat }
};

export default function BaseCDNAAmp() {
    const [secondary, setSecondary] = useState('');
    const [selectedI5, setSelectedI5] = useState([]);
    const [selectedI7, setSelectedI7] = useState([]);
    const [secondaryI5, setSecondaryI5] = useState([]);
    const [secondaryI7, setSecondaryI7] = useState([]);

    // Combine all selected primers from both kits for analysis using the spread operator ...
    const allI5 = [
        ...selectedI5,
        ...secondaryI5
    ];
    console.log('All I5 primers:', allI5);
    const allI7 = [
        ...selectedI7,
        ...secondaryI7
    ];
    console.log('All I7 primers:', allI7);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontWeight: 500, color: '#007bff', marginBottom: 0 }}>
                    This is a placeholderfor information about the Base Amplification kit.
                </p>
                <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <PrimerTable primers={sequence.i5} label="i5" compatibilityMap={compatibilityData.i5} onSelectionChange={setSelectedI5} selected={selectedI5}
  showAnalysis={!secondary} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <PrimerTable primers={sequence.i7} label="i7" compatibilityMap={compatibilityData.i7} onSelectionChange={setSelectedI7} selected={selectedI7}
  showAnalysis={!secondary} />
                    </div>
                </div>
                {/* Secondary kit dropdown below the table */}
                <div style={{ marginTop: 24 }}>
                    <label htmlFor="secondary-kit">Analyse combination with another kit: </label>
                    <select
                        id="secondary-kit"
                        value={secondary}
                        onChange={e => {
                            setSecondary(e.target.value);
                            setSecondaryI5([]);
                            setSecondaryI7([]);
                        }}
                        style={{ marginLeft: 8, padding: 4 }}
                    >
                        {secondaryOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                {/* If secondary kit is selected */}
                {secondary && (
                    <div style={{ marginTop: 24 }}>
                        <h4>{secondaryOptions.find(opt => opt.value === secondary)?.label}</h4>
                        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                            <div style={{ flex: 1 }}>
                                <PrimerTable
                                    primers={secondaryData[secondary].seq.i5}
                                    label="i5"
                                    compatibilityMap={secondaryData[secondary].compat.i5}
                                    onSelectionChange={setSecondaryI5}
                                    selected={secondaryI5}
                                    showAnalysis={false} // Secondary primers don't show analysis
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <PrimerTable
                                    primers={secondaryData[secondary].seq.i7}
                                    label="i7"
                                    compatibilityMap={secondaryData[secondary].compat.i7}
                                    onSelectionChange={setSecondaryI7}
                                    selected={secondaryI7}
                                    showAnalysis={false}
                                />
                            </div>
                        </div>
                    </div>
                )}

                 {secondary && (
                    <div style={{ marginTop: 24 }}>
                    <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                        <div style={{ flex: 1 }}>
                            <PrimerTable
                                primers={[...selectedI5, ...secondaryI5]}
                                label={false}
                                showTable={false}
                                selected={[...selectedI5, ...secondaryI5]}
                                showAnalysis={true} // Show analysis for combined primers
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <PrimerTable
                                primers={[...selectedI7, ...secondaryI7]}
                                label={false}
                                showTable={false}
                                selected={[...selectedI7, ...secondaryI7]}
                                showAnalysis={true} // Show analysis for combined primers
                            />
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}