/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import { useTable, usePagination, useFilters, useSortBy, HeaderGroup } from 'react-table';
import USERSMOCK from './UsersMock.json';
import COLUMNS from './tableComp/columns';
import './table.css';
import ColumnFilter from './tableComp/ColumnFilterComponent';
import IUser from '../../models/IUser';
import Checkbox from './tableComp/CheckBoxComp';
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
        rows,
        allColumns,
        getToggleHideAllColumnsProps,
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
                height: '75vh',
            }}
        >
            <TableShowHideCol allColumns={allColumns} />

            {/* <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    tableLayout: 'fixed',
                    justifyContent: 'center',
                }}
            > */}
            {/* <div>
                    <Checkbox {...getToggleHideAllColumnsProps()} />
                    <span>Toggle All</span>
                </div> */}
            {/* {allColumns.map((column) => (
                    <div key={column.id} className="cat action">
                        <label htmlFor={column.id}>
                            <input id={column.id} type="checkbox" {...column.getToggleHiddenProps()} />
                            <span>{column.Header}</span>
                        </label>
                    </div>
                ))}
            </div> */}
            <table {...getTableProps()} style={{ width: '100%', tableLayout: 'fixed' }}>
                <TableHead headerGroups={headerGroups} sortColumn={sortColumn} />

                <TableBody getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow} />
                {/* <tbody {...getTableBodyProps()}>
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
                </tbody> */}
                <TableFooter footerGroups={footerGroups} />
                {/* <tfoot>
                    {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map((column) => (
                                <td {...column.getFooterProps} key={column.id}>
                                    {column.render('Footer')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tfoot> */}
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
            {/* <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    gap: '1%',
                }}
            >
                <button className="buttonStl" type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button className="buttonStl" type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    הקודם
                </button>
                <button className="buttonStl" type="button" onClick={() => nextPage()} disabled={!canNextPage}>
                    הבא
                </button>
                <button
                    className="buttonStl"
                    type="button"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {'>>'}
                </button>
            </div>
            <div style={{ float: 'right' }}>
                <span>
                    עמוד
                    <strong>
                        {pageIndex + 1} מתוך {pageOptions.length}
                    </strong>
                </span>
                <span>
                    | לך לעמוד {'->'}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(pageNumber);
                        }}
                        style={{ width: '50px' }}
                    />
                </span>
                <span>
                    <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                        {[6, 10, 20, data.length].map((pageSizee) => (
                            <option key={pageSizee} value={pageSizee}>
                                הצג {pageSizee} רשומות
                            </option>
                        ))}
                    </select>
                </span>
            </div> */}
        </div>
    );
};

export default UsersTable;
