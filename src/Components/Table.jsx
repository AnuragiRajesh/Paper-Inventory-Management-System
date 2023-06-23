import * as React from 'react';
import '../App.css'
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
import { particularUnitApi,accessAllUnitApi } from '../Services/DataServices';
import { useNavigate } from 'react-router-dom';


const DataTable = ({deleteRow,unitId})=>{
const navigate = useNavigate();
const [open, setOpen] = React.useState(false);
const [openComfirm, setOpenComfirm] = React.useState(false);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(3);
const [data, setData] = useState([
  // {
  //   Inward_id: 1,
  //   Inward_date: "2023-06-22T00:00:00",
  //   SupplierName: "ACME PRINT O PAC PVT. LTD.",
  //   Paper_type_id: 2,
  //   Brand: "ART PAPER GLOSS (FSC)",
  //   Paper_size: "25.4",
  //   Paper_stock_type: "Reels",
  //   Paper_gsm: "54",
  //   NoOfReels: 3,
  //   NoOfReam: 4,
  //   Weight: 77,
  //   User_id: "0074ebd4-679e-45d5-968a-8e3fc42c0efb",
  //   Unit_id: "11",
  //   Modified_on: "2023-06-22T00:00:00",
  //   Stock_Status: 10
  // }
]);
const [rowToPerform, setRowToPerform] = useState();
useEffect(() => {
  unitId>0?particularUnitApi(unitId).then((response) => {
    setData(response.data)
    console.log(response.data,"allunit");
  }) 
  .catch((error) => {
    console.log(error.message)
  }):accessAllUnitApi().then((response) => {
    setData(response.data)
    console.log(response.data,"allunit");
  }) 
  .catch((error) => {
    debugger
    // navigate('login')
    console.log(error.message)
  })
}, [unitId]);
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
  // setData(dataSource)
};


return (
 
  <>
  
  
  
  <TableContainer  >
  <Table>
    <TableHead>
      <TableRow className='headCell'>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }} >Inward Id</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Supplier</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Paper Size</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Total Weight</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>GSM</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Paper Form</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>No Of Ream</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>No Of Reels</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Paper Mill</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Brand</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    
      {paginatedData.map((row) => (
        <TableRow key={row.Inward_id}>
          <TableCell>{row.Inward_id}</TableCell>
          <TableCell>{row.SupplierName}</TableCell>
          <TableCell>{row.Paper_size}</TableCell>
          <TableCell>{row.Weight}</TableCell>
          <TableCell>{row.Paper_gsm}</TableCell>
          <TableCell>{row.Paper_stock_type}</TableCell>
          <TableCell>{row.NoOfReam}</TableCell>
          <TableCell>{row.NoOfReels}</TableCell>
          <TableCell>{row.Unit_id}</TableCell>
          <TableCell>{row.Brand}</TableCell>

          <TableCell><button onClick={()=>{handleEditClick(row) }}><CreateRoundedIcon/></button><button onClick={()=>{
            handleDeleteClick(row)
          }}  ><DeleteIcon/></button></TableCell>
          {/* Add more table cells here */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
  <TablePagination
    rowsPerPageOptions={[3, 5, 10]}
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