import React from 'react';
import { HeaderGroup } from 'react-table';
import IUser from '../../../models/IUser';

type Props = {
    sortColumn: (columnToSort: HeaderGroup<IUser>) => '🔽' | '🔼' | '';
    headerGroups: HeaderGroup<IUser>[];
};

const TableHead: React.FC<Props> = ({ headerGroups, sortColumn }) => (
    <thead>
        {headerGroups.map((headerGroup) => (
            <tr
                {...headerGroup.getHeaderGroupProps()}
                style={{ background: 'linear-gradient(19deg, #08AEEA 0%, #2AF598 100%)' }}
            >
                {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>{sortColumn(column)}</span>
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                ))}
            </tr>
        ))}
    </thead>
);
export default TableHead;
