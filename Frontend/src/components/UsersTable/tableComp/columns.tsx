/* eslint-disable react/react-in-jsx-scope */
import { Avatar } from '@material-ui/core';
import { CellProps, Column } from 'react-table';
import IUser from '../../../models/IUser';

// TODO: ask almog if that is ok!
const avatarJSX = (tableProps: React.PropsWithChildren<CellProps<IUser, string>>): React.ReactNode => (
    <Avatar
        alt="Remy Sharp"
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    />
);

const genderJSX = (tableProps: React.PropsWithChildren<CellProps<IUser, string>>): React.ReactNode => {
    const cellValue: string = tableProps.cell.value;
    if (cellValue === 'male') return <strong style={{ fontSize: '32px' }}> 馃毠</strong>;
    if (cellValue === 'female') return <strong style={{ fontSize: '32px' }}> 馃毢 </strong>;
    return <span> null</span>;
};

const COLUMNS: readonly Column<IUser>[] = [
    {
        Header: '转诪讜谞转 驻专讜驻讬诇',
        Footer: '转诪讜谞转 驻专讜驻讬诇',
        accessor: 'avatar',
        Cell: (tableProps) => avatarJSX(tableProps),
        disableFilters: true,
    },
    // {
    //     Header: 'Id',
    //     Footer: 'Id',
    //     accessor: '_id',
    //     disableFilters: true,
    // },
    {
        Header: '砖诐 诪砖转诪砖',
        Footer: '砖诐 诪砖转诪砖',
        accessor: 'username',
    },
    {
        Header: '砖诐 诪诇讗',
        Footer: '砖诐 诪诇讗',
        accessor: 'fullName',
    },
    {
        Header: '转讗专讬讱 砖讞专讜专',
        Footer: '转讗专讬讱 砖讞专讜专',
        accessor: 'serviceEndDate',
    },
    {
        Header: '爪讜讜转',
        Footer: '爪讜讜转',
        accessor: 'inGroup',
    },
    {
        Header: '转驻拽讬讚',
        Footer: '转驻拽讬讚',
        accessor: 'job',
    },
    {
        Header: '讚专讙讛',
        Footer: '讚专讙讛',
        accessor: 'rank',
    },
    {
        Header: '诪讬谉',
        Footer: '诪讬谉',
        accessor: 'gender',
        Cell: (tableProps) => genderJSX(tableProps),
    },
];

export default COLUMNS;
