import React from 'react';
import { HeaderGroup } from 'react-table';
import IUser from '../../../models/IUser';

const TableFooter: React.FC<{ footerGroups: HeaderGroup<IUser>[] }> = ({ footerGroups }) => (
    <tfoot>
        {footerGroups.map((footerGroup: HeaderGroup<IUser>) => (
            <tr
                {...footerGroup.getFooterGroupProps()}
                style={{ background: 'linear-gradient(19deg, #08AEEA 0%, #2AF598 100%)' }}
            >
                {footerGroup.headers.map((column) => (
                    <td {...column.getFooterProps} key={column.id}>
                        {column.render('Footer')}
                    </td>
                ))}
            </tr>
        ))}
    </tfoot>
);
export default TableFooter;
