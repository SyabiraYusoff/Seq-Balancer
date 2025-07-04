import { useState } from 'react';

// Checks if a primer id is compatible with the first/only selected primer using the compatibility map
export function isCompatible(id, selected, compatibilityMap) {
    if (selected.length !== 1) return false; // Only apply for first/only selected
    const selectedId = selected[0];
    return compatibilityMap[selectedId]?.includes(id);
}

// Returns a color for the row based on the color balance result
function getRowColor(balance) {
    switch (balance) {
        case 'Green Dominant': return '#d4edda';   // light green
        case 'Balanced': return '#a8f0a5';   // bright green
        case 'Blue Dominant': return '#cce5ff';   // light blue
        case 'No signal': return '#f8d7da';   // light red
        default: return 'white';
    }
}

// Main component for displaying and analyzing primers
function PrimerTable({ primers, label, compatibilityMap }) {
    // State to track selected primer sequences
    const [selected, setSelected] = useState([]);

    // Analyze the color balance for the selected sequences
    const analyze = (seqs) => {
        const stats = [];
        // Loop through each position in the sequences (assume 8 bases)
        for (let pos = 0; pos < 8; pos++) {
            const bases = seqs.map(seq => seq[pos]);
            // Count each base at this position
            const counts = { A: 0, T: 0, C: 0, G: 0 };
            bases.forEach(b => { if (counts[b] !== undefined) counts[b]++; });
            const green = counts.T + counts.C; // T and C are green
            const blue = counts.A; // A is blue
            const unique = Object.values(counts).filter(c => c > 0).length;

            // Determine color balance for this position
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

            // Store stats for this position
            stats.push({
                position: pos + 1,
                counts, green, blue,
                colourBalance,
                uniqueBaseCount: unique
            });
        }
        return stats;
    };

    function getRowColorForTable(primer, selected, compatibilityMap) {
        // Selected: blue
        if (selected.includes(primer.sequence)) return '#b3e5fc';
        // Compatible: green
        if (isCompatible(primer.id, selected.map(seq => {
            // Find the primer object for this sequence
            const found = primers.find(p => p.sequence === seq);
            return found ? found.id : null;
        }).filter(Boolean), compatibilityMap)) return '#d4edda';
        // Default: white
        return 'white';
    }

    return (
        <div>
            {/* Header and clear button */}
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

            {/* Primer table with selection and compatibility highlighting */}
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '600px', tableLayout: 'fixed' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th>Select</th>
                        <th>{label} BD Primer</th>
                        <th>{label} Series Index</th>
                        <th>{label} Sequence</th>
                    </tr>
                </thead>
                <tbody>
                    {primers.map((primer) => {
                        const seq = primer.sequence;
                        const isChecked = selected.includes(seq);
                        return (
                            <tr
                                key={primer.id + '-' + label}
                                style={{
                                    backgroundColor: getRowColorForTable(primer, selected, compatibilityMap)
                                }}
                            >
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
                                <td>{primer.name}</td>
                                <td>{seq}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Color balance analysis for selected primers */}
            {selected.length > 1 && (() => {
                const analysis = analyze(selected);
                const hasNoSignal = analysis.some(pos => pos.colourBalance === 'No signal');
                const allGreenOrBalanced = analysis.every(pos =>
                    pos.colourBalance === 'Green Dominant' || pos.colourBalance === 'Balanced' || pos.colourBalance === 'Blue Dominant'
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
                                ✅ All positions are Green/Blue Dominant or Balanced. You can proceed.
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