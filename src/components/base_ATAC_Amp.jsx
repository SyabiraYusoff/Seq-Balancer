import { useState } from 'react';
import PrimerTable from './shared/PrimerTable';
import sequence from '../data/ATAC-Index.json';
import compatibilityData from '../data/CompatiblePrimers-ATAC.json';
import ATACimg from '../assets/images/ATAC_library_Strucutre.png';

// Import other kits for secondary table
import baseCDNA from '../data/base_cDNA_amp.json';
import baseCDNACompt from '../data/CompatiblePrimers_basecDNAAmp.json';
import omicsOneSeq from '../data/OmicsOne-DualIndex.json';
import omicsOneCompat from '../data/CompatiblePrimers.json';
import omicsXT_A_Seq from '../data/OmicsOne-DualIndexXT-A.json';
import omicsXT_A_Compat from '../data/CompatiblePrimersXT-A.json';
import omicsXT_B_Seq from '../data/OmicsOne-DualIndexXT-B.json';
import omicsXT_B_Compat from '../data/CompatiblePrimersXT-B.json';

const secondaryOptions = [
    { label: 'None', value: '' },
    { label: 'Base Amplification Kit', value: 'baseCDNA'},
    { label: 'BD® OMICS-One Dual Index Kit', value: 'omicsOne' },
    { label: 'BD® OMICS-One Dual Index XT Kit A', value: 'omicsXTA' },
    { label: 'BD® OMICS-One Dual Index XT Kit B', value: 'omicsXTB' },
    
];

const secondaryData = {
    baseCDNA: { seq: baseCDNA, compat: baseCDNACompt },
    omicsOne: { seq: omicsOneSeq, compat: omicsOneCompat },
    omicsXTA: { seq: omicsXT_A_Seq, compat: omicsXT_A_Compat },
    omicsXTB: { seq: omicsXT_B_Seq, compat: omicsXT_B_Compat }
};

export default function BaseATAC() {
    const [secondary, setSecondary] = useState('');
    const [selectedI7, setSelectedI7] = useState([]);
    const [secondaryI5, setSecondaryI5] = useState([]);
    const [secondaryI7, setSecondaryI7] = useState([]);

    // Combine all selected primers from both kits for analysis using the spread operator ...
    const allI5 = [
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
                <h2 style={{ color: '#007bff', marginBottom: 0 }}>
                    Base ATAC Amplification Kit
                    </h2>
                    <p style={{ marginBottom:0 }}>The indexes can be used for ATAC library amplifications applications when purchased ATAC assay: BD Rhapsody™ ATAC-Seq Amplification Kit (Cat No 571356).</p>
                    <p style={{ marginBottom:0 }}> For <strong>2-plexy indexing, </strong> Please first select one of the i7 Reverse Index Primer: RP4, RP5, RP6, the next compatible primer will be <span style={{color: 'green'}}>highlighted</span>.</p>
                    <p style={{ marginBottom:0}}><strong>Pooling Multiomics libraries together?</strong> You can enhance your workflow by integrating indexing with Omics One (available separately) or Base Amplification Kit..<br /> This option allows you to seamlessly select and analyze your desired kit alongside your base kit amplification.</p>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <h3>i5 forward primer is not on ATAC read structure</h3>
                        <p>Instead of i5, we are amplifying the cell label and UMI for ATAC I2 read using ATAC Forward Adapter Primer.</p>
                        <img src={ATACimg} alt="ATAC Index" style={{ width: '100%', marginBottom: 16 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <PrimerTable 
                        primers={sequence.i7} 
                        label="i7" 
                        compatibilityMap={compatibilityData.i7}
                        onSelectionChange={setSelectedI7} 
                        selected={selectedI7}
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
                                primers={[...secondaryI5]}
                                label={false}
                                showTable={false}
                                selected={[...secondaryI5]}
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