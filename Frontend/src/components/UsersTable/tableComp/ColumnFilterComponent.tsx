import React from 'react';

// TODO: Add debounding for searching in this componnent
const ColumnFilter = ({ column }: any) => {
    const { filterValue, setFilter } = column;
    return (
        <span>
            <input
                style={{ maxWidth: '95%', textAlign: 'center' }}
                value={filterValue || ''}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="חפש לסינון / לחץ לסיווג"
            />
        </span>
    );
};

export default ColumnFilter;
