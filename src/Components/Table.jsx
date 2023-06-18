import * as React from 'react';
import { useState,useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import SpringModal from './Model';
const DataTable = ({dataSource,deleteRow})=>{
  console.log(dataSource,"last")
const [open, setOpen] = React.useState(false);
const [openComfirm, setOpenComfirm] = React.useState(false);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [data, setData] = useState(dataSource);
const [rowToPerform, setRowToPerform] = useState();
useEffect(() => {
  setData(dataSource);
}, [dataSource]);
 const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const startIndex = page * rowsPerPage;
const endIndex = startIndex + rowsPerPage;
const paginatedData = data.slice(startIndex, endIndex);
const handleEditClick = (row) => {
  setRowToPerform(row)
  console.log(row)
  setOpen(true);
};
const handleDeleteClick = (row) => {
  setRowToPerform(row)
  setOpenComfirm(true)
};

const Cancel = () => {



  openComfirm(false);
};
const Yes = () => {
  deleteRow(rowToPerform)
  setOpenComfirm(false);
  setData(dataSource)
};


return (
 
  <>
  
  
  
  <TableContainer  >
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Inward Id</TableCell>
        <TableCell>Supplier</TableCell>
        <TableCell>Paper Size</TableCell>
        <TableCell>Stock Status</TableCell>
        <TableCell>Weight</TableCell>
        <TableCell>GSM</TableCell>
        <TableCell>Paper Stock Type</TableCell>
        <TableCell>No Of Ream</TableCell>
        <TableCell>No Of Reels</TableCell>
        {/* <TableCell>Modified On</TableCell> */}
        <TableCell>Action</TableCell>
        {/* Add more table headers here */}
      </TableRow>
    </TableHead>
    <TableBody>
    
      {paginatedData.map((row) => (
        <TableRow key={row.Inward_id}>
          <TableCell>{row.Inward_id}</TableCell>
          <TableCell>{row.supplier}</TableCell>
          <TableCell>{row.paperSize}</TableCell>
          <TableCell>{row.stockStatus}</TableCell>
          <TableCell>{row.weight}</TableCell>
          <TableCell>{row.gsm}</TableCell>
          <TableCell>{row.paperStockType}</TableCell>
          <TableCell>{row.noOfReam}</TableCell>
          <TableCell>{row.noOfReels}</TableCell>
          {/* <TableCell>{row.Modified_on}</TableCell> */}
          {/* <TableCell>{row.Weight}</TableCell> */}

          <TableCell><button onClick={()=>{handleEditClick(row) }}><CreateRoundedIcon/></button><button onClick={()=>{
            handleDeleteClick(row)
          }}  ><DeleteIcon/></button></TableCell>
          {/* Add more table cells here */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
  <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={data.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
</TableContainer>
 {open && (
              <SpringModal
                rowToPerform={rowToPerform}
                setOpen={setOpen}
                open={open}
                title={"Edit the Entry"}
              />
            )}
<Dialog
        open={openComfirm}
        // TransitionComponent={Transition}
        keepMounted
        onClose={Cancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
        <DialogTitle>{"     Are You Sure you want to delete this?"}</DialogTitle>
        </DialogContent>
        <DialogActions >
          <Button onClick={Yes}>Yes</Button>
          <Button onClick={Cancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* <SpringModal rowToPerform={rowToPerform} setOpen={setOpen}  open={open}/> */}
  </>
);




}
export default DataTable;