import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <h3>
      Search by any thing:{' '}
      <TextField 
      id="standard-basic" 
      sx={{width:'100%', my:3}}
      label="Filter Users" 
      variant="standard"
      value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }} 
      />
    </h3>
  )
}