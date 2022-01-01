import React, { useMemo, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useTable, usePagination, useFilters, useGlobalFilter, useSortBy, useRowSelect } from 'react-table';
import useAllUsers from '../../../hooks/useAllUsers'
import { UserColumns } from '../UserColumns/UserColumns';
import { GlobalFilter } from '../UserColumns/GlobalFilter';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Checkbox } from '@mui/material';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 10;
function ManageAllusers() {
    const { users, spinner } = useAllUsers();
    const [value2, setValue2] = useState([0, 100]);

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue2([clamped - minDistance, clamped]);
            }
        } else {
            setValue2(newValue);
        }
    };
    console.log(value2[1]);



    let agefilteruser =  users.filter(user=> user.age>=value2[0] && user.age<=value2[1]);
    // const [agelimit, setAgelimit] = useState('');

    // const handleChange = (e) => {
    //     setAgelimit(e.target.value);
    // };
   
console.log(agefilteruser);

    const columns = useMemo(() => UserColumns, []);
    const data = useMemo(() => agefilteruser, [users]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        rows,
        selectedFlatRows,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useGlobalFilter,
        useSortBy,

        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
                },
                ...columns
            ])
        }
    )

    const { pageIndex, pageSize, globalFilter } = state
    console.log(selectedFlatRows.length);
    return (
        <div style={{ width: '100%', verflow: 'hiden' }}>
            {
                spinner && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
            <>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <h4>Age Range {value2[0]} to {value2[1]}</h4>

                {/* <pre>
                    <code>
                        {JSON.stringify(
                            {
                                selectedFlatRows: selectedFlatRows.map(row => row.original)
                            },
                            null,
                            50
                        )}
                    </code>
                </pre> */}
                {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={agelimit}
                        onChange={handleChange}
                        autoWidth
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>18-25</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                    </Select>
                </FormControl> */}
                <Box sx={{ width: 300 }}>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={value2}
                        onChange={handleChange2}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                    />
                </Box>
                <h4>Total Selected Users : {selectedFlatRows.length}</h4>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {


                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {

                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input
                            type='number'
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }}
                            style={{ width: '50px' }}
                        />
                    </span>{' '}
                    <select
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}>
                        {[10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </>
        </div>
    )
}

export default ManageAllusers
