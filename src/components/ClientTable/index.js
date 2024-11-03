import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, Box } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

function ClientTable({ clients }) {
    const [openRows, setOpenRows] = React.useState({});

    const handleToggleRow = (id) => {
        setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Client Name</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clients.map((client) => (
                        <React.Fragment key={client.id}>
                            <TableRow>
                                <TableCell>
                                    <IconButton onClick={() => handleToggleRow(client.id)}>
                                        {openRows[client.id] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                    {client.name}
                                </TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                                    <Collapse in={openRows[client.id]} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Order ID</TableCell>
                                                        <TableCell>Order Name</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {client.orders? client.orders.map((order) => (
                                                        <TableRow key={order.id}>
                                                            <TableCell>{order.id}</TableCell>
                                                            <TableCell>{order.name}</TableCell>
                                                        </TableRow>
                                                    )) : (<></>)}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ClientTable;
