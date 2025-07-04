export default function BaseCDNA() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ flex: 1 }}>
                <h3>Recommendation</h3>
                The recommendation of the indexing is changes due to the chemistry changes in NovaSeqX Leap chemistry. For users that do not have the dual index kit, you might need to purchase extra primers prior to library construction.
                <table style={{ width: '60%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <caption style={{ captionSide: 'top', fontWeight: 'bold', padding: '8px', textAlign: 'left' }}>
                        Table 1. List of indexes included in the BD Rhapsody&trade; Library Amplifications Kits. 
                    </caption>
                    <thead>
                        <tr>
                            <th colSpan="2" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', background: '#f0f0f0' }}>
                                Index Primer Information
                            </th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Sequence (5'–3')</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Forward Primer</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>TruSeq D501</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>TATAGCCT</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Reverse Primer 1</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Nextera N709</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>AGCGTAGC</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Reverse Primer 2</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Nextera N710</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>CAGCCTCG</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Reverse Primer 3</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Nextera N711</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>TGCCTCTT</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Reverse Primer 4</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Nextera N712</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>TCCTCTAC</td>
                        </tr>
                    </tbody>
                </table>

                For NovaSeqX sequencer, the two-channel chemistry would have an impact on the indexing strategy. 
                    Below is our recommendation on index combinations. 
                    Please note that our kit indexes that come with the BD library prep kit are <span style={{color:'blue'}}>N709-N712</span>, so the only indexes that need to be ordered from IDT are N707 and N705.
                <ul>
                    <li><strong>2 plex:</strong> <span style={{color:'blue'}}>N710</span>, N707</li>
                    <li><strong>3 plex:</strong> <span style={{color:'blue'}}>N709, N710</span>, N707</li>
                    <li><strong>4 plex:</strong> <span style={{color:'blue'}}>N709, N710</span>, N707, N705</li>
                </ul>

                <h5>How to order the extra indexes</h5>
                For ordering the extra indexes, you can use the following link to order from IDT:
                <a href="https://eu.idtdna.com/pages/products/custom-dna-rna/dna-oligos/trugrade-dna-oligos" target="_blank" rel="noopener noreferrer">IDT Index Primer Design</a>
                <p>In the design page, you can select the following options:</p>
                <ul>
                    <li>Index Type: <strong>Dual Index</strong></li>
                </ul>
                After selecting the options, you can click on the <strong>Design Primers</strong> button to generate the primers. 
                    You can then select the primers you need and add them to your cart for purchase.
               For more information on the BD Rhapsody&trade; Library Amplifications Kits, you can refer to the 
                    <a href="https://www.bdbiosciences.com/en-us/products/instruments/bd-rhapsody" target="_blank" rel="noopener noreferrer">BD Biosciences website</a>.
          
            </div>
            </div>
    );
}