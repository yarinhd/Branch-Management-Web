import React from 'react';
import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table';
import IUser from '../../../models/IUser';

type Props = {
    getTableBodyProps: (propGetter?: TableBodyPropGetter<IUser> | undefined) => TableBodyProps;
    page: Array<Row<any>>;
    prepareRow: (row: Row<IUser>) => void;
};

const TableBody: React.FC<Props> = ({ getTableBodyProps, page, prepareRow }) => (
    <tbody {...getTableBodyProps()}>
        {page.map((row) => {
            prepareRow(row);
            return (
                <tr
                    {...row.getRowProps()}
                    onClick={() => {
                        console.log('row click', row);
                        //  TODO: add request for seeing the users thath clicked by id
                    }}
                >
                    {row.cells.map((cell) => {
                        return (
                            <td className="block" {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                        );
                    })}
                </tr>
            );
        })}
    </tbody>
);
export default TableBody;
