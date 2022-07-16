/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import { useTable, usePagination, useFilters, useSortBy, HeaderGroup } from 'react-table';
import USERSMOCK from './UsersMock.json';
import COLUMNS from './tableComp/columns';
import './table.css';
import ColumnFilter from './tableComp/ColumnFilterComponent';
import IUser from '../../models/IUser';
import TableFooter from './tableComp/TableFooter';
import TableBody from './tableComp/TableBody';
import TableHead from './tableComp/TableHead';
import TablePagination from './tableComp/TablePagination';
import TableShowHideCol from './tableComp/TableShowHideCol';

const UsersTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data: IUser[] = useMemo(() => USERSMOCK, []);

    const defaultColumn = useMemo<{ Filter: React.FC }>(() => {
        return {
            Filter: ColumnFilter,
        };
    }, []);

    const initialState = {
        pageSize: 6,
    };

    const {
        getTableProps,
        getTableBodyProps,
        footerGroups,
        headerGroups,
        page,
        allColumns,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
    } = useTable<IUser>(
        {
            columns,
            data,
            defaultColumn,
            initialState,
        },
        useFilters,
        useSortBy,
        usePagination
    );
    // TODO: fix the default page size
    const { pageIndex, pageSize } = state;

    const sortColumn = (columnToSort: HeaderGroup<IUser>) => {
        if (columnToSort.isSorted) {
            if (columnToSort.isSortedDesc) {
                return '🔽';
            }
            return '🔼';
        }
        return '';
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1%',
                alignItems: 'flex-start',
                gap: '2px',
                width: '75vw',
                height: 'max-content',
            }}
        >
            <TableShowHideCol allColumns={allColumns} />

            <table {...getTableProps()} style={{ width: '100%', tableLayout: 'fixed' }}>
                <TableHead headerGroups={headerGroups} sortColumn={sortColumn} />

                <TableBody getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow} />

                <TableFooter footerGroups={footerGroups} />
            </table>
            <TablePagination
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageCount={pageCount}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                setPageSize={setPageSize}
                pageSize={pageSize}
                data={data}
            />
        </div>
    );
};

export default UsersTable;
