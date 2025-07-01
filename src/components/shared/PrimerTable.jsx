import { useState } from 'react';

function getRowColor(balance) {
  switch (balance) {
    case 'Green Dominant': return '#d4edda';   // light green
    case 'Balanced':       return '#a8f0a5';   // bright green
    case 'Blue Dominant':  return '#cce5ff';   // light blue
    case 'No signal':      return '#f8d7da';   // light red
    default:               return 'white';
  }
}

function PrimerTable({ primers, label }) {
    const [selected, setSelected] = useState([]);

    const analyze = (seqs) => {
        const stats = [];
        // Loop through each position in the sequences
        // All sequences are of the same length (8 bases)
        for (let pos = 0; pos < 8; pos++) {
            const bases = seqs.map(seq => seq[pos]);
            // initialize counts for each base
            // A = blue, T = green, C = green, G = blue
            // T and C are considered green, A is blue
            // G is not counted in the color balance
            const counts = { A: 0, T: 0, C: 0, G: 0 };
            bases.forEach(b => { if (counts[b] !== undefined) counts[b]++; });
            const green = counts.T + counts.C;
            const blue = counts.A;
            const unique = Object.values(counts).filter(c => c > 0).length;

            // Add the logic of the color balance
            let colourBalance;
            if (counts.T === 0 && counts.C === 0 && (counts.A > 0 || counts.G > 0)) {
                colourBalance = 'No signal';
            } else if (green === blue) {
                colourBalance = 'Balanced';
            } else if (green > blue) {
                colourBalance = 'Green Dominant';
            } else {
                colourBalance = 'Blue Dominant';
            }

            stats.push({
                position: pos + 1,
                counts, green, blue,
                colourBalance,
                uniqueBaseCount: unique
            });
        }
        return stats;
    };

    return (
        <div>
            {/* Header + Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{label}</h3>
                {selected.length > 0 && (
                    <button
                        onClick={() => setSelected([])}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear {label}
                    </button>
                )}
            </div>

            {/* Table */}
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '600px', tableLayout: 'fixed' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th>Select</th>
                        <th>Sample ID</th>
                        <th>{label} Sequence</th>
                    </tr>
                </thead>
                <tbody>
                    {primers.map((primer) => {
                        const seq = primer.sequence; // Assuming each primer has a 'sequence' property
                        const isChecked = selected.includes(seq);
                        return (
                            <tr key={primer.id + '-' + label}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelected([...selected, seq]);
                                            } else {
                                                setSelected(selected.filter(s => s !== seq));
                                            }
                                        }}
                                    />
                                </td>
                                <td>{primer.id}</td>
                                <td>{seq}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Analysis */}
            {selected.length > 0 && (() => {
                const analysis = analyze(selected);
                const hasNoSignal = analysis.some(pos => pos.colourBalance === 'No signal');
                const allGreenOrBalanced = analysis.every(pos =>
                    pos.colourBalance === 'Green Dominant' || pos.colourBalance === 'Balanced'
                );
                return (
                    <div style={{ marginTop: '20px' }}>
                        <h4>{label} Colour Balance Analysis</h4>
                        {hasNoSignal && (
                            <div style={{
                                backgroundColor: '#f8d7da',
                                color: '#721c24',
                                padding: '10px',
                                borderRadius: '4px',
                                marginBottom: '10px',
                                border: '1px solid #f5c6cb'
                            }}>
                                ⚠️ Please select different primers: at least one position has <b>No signal</b>.
                            </div>
                        )}
                        {allGreenOrBalanced && !hasNoSignal && (
                            <div style={{
                                backgroundColor: '#d4edda',
                                color: '#155724',
                                padding: '10px',
                                borderRadius: '4px',
                                marginBottom: '10px',
                                border: '1px solid #c3e6cb'
                            }}>
                                ✅ All positions are Green Dominant or Balanced. You can proceed.
                            </div>
                        )}
                        <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: 'auto', minWidth: '600px', tableLayout: 'auto' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f0f0f0' }}>
                                    <th>Bp</th><th>A</th><th>T</th><th>C</th><th>G</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.map((pos) => (
                                    <tr key={pos.position} style={{ backgroundColor: getRowColor(pos.colourBalance) }}>
                                        <td>{pos.position}</td>
                                        <td>{pos.counts.A}</td>
                                        <td>{pos.counts.T}</td>
                                        <td>{pos.counts.C}</td>
                                        <td>{pos.counts.G}</td>
                                        <td>{pos.colourBalance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })()}
        </div>
    );
}

export default PrimerTable;