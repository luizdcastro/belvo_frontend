import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function DenseTable({ selectedAccount }) {
    let moment = require('moment')

    return (
        <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.8rem', marginBottom: 10 }}>TRANSACTIONS: 30 DAYS</p>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedAccount?.transaction?.map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell component="th" scope="row">{moment(row.value_date).format('DD/MM/YYYY')}</TableCell>
                                <TableCell align="left">{row.description.toUpperCase()}</TableCell>
                                <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}