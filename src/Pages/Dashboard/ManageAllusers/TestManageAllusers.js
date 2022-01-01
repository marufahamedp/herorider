import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useAllUsers from '../../../hooks/useAllUsers';

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },

  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  }
];



export default function TestManageAllusers() {
    const { users, spinner } = useAllUsers();
    const rows = users;
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}