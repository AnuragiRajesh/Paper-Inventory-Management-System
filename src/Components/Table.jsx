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
import { useNavigate } from 'react-router-dom';
import { updateStockInApiUrlApi ,deleteStockApi} from '../Services/DataServices';

const DataTable = ({deleteRow,dataSource,getTableData})=>{
const [open, setOpen] = React.useState(false);
const [openComfirm, setOpenComfirm] = React.useState(false);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(3);
const [rowToPerform, setRowToPerform] = useState();
const [deleteInward_Id, setDeleteInward_Id] = useState();


 const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const startIndex = page * rowsPerPage;
const endIndex = startIndex + rowsPerPage;
const paginatedData = dataSource.slice(startIndex, endIndex);
const handleEditClick = (row) => {
  setRowToPerform(row)
  console.log(row,"hjgajgsdgashgdagsj")
  setOpen(true);
};
// const handleDeleteClick = (row) => {
//   setRowToPerform(row)
// };

const Cancel = () => {
  setOpenComfirm(false);
};
const Yes = () => {
  deleteStockApi(deleteInward_Id).then((response) => {
    console.log(response)
    getTableData()
  }) 
  .catch((error) => {
    console.log(error.message)
  });
  setOpenComfirm(false);
};
const updateDataSource =(formData)=>{
  console.log(formData,"formData")
  updateStockInApiUrlApi(formData.Inward_id,formData).then((response) => {
    console.log(response)
    getTableData()
  }) 
  .catch((error) => {
    console.log(error.message)
  });
} 
const deleteDataSource =(Inward_Id)=>{
  setDeleteInward_Id(Inward_Id)
  setOpenComfirm(true)
} 

return (
  <>
  <TableContainer  >
  <Table>
    <TableHead>
      <TableRow className='headCell'>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }} >Inward Id</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Supplier</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Paper Mill</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Brand</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Paper Form</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Paper Size</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>GSM</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>No Of Ream</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>No Of Reels</TableCell>
        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Total Weight</TableCell>

        <TableCell  style={{ backgroundColor: '#F4F4F4' }}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    
      {paginatedData.map((row) => (
        <TableRow key={row.Inward_id}>
          <TableCell>{row.Inward_id}</TableCell>
          <TableCell>{row.SupplierName}</TableCell>
          <TableCell>{row.Paper_Mill}</TableCell>
          <TableCell>{row.Brand}</TableCell>
          <TableCell>{row.Paper_stock_type}</TableCell>
          <TableCell>{row.Paper_size}</TableCell>
          <TableCell>{row.Paper_gsm}</TableCell>
          <TableCell>{row.NoOfReam}</TableCell>
          <TableCell>{row.NoOfReels}</TableCell>
          <TableCell>{row.Weight}</TableCell>
          <TableCell><button onClick={()=>{handleEditClick(row) }}><CreateRoundedIcon/></button><button onClick={()=>{
            deleteDataSource(row.Inward_id)
          }}  ><DeleteIcon/></button></TableCell>
          {/* Add more table cells here */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
  <TablePagination
    rowsPerPageOptions={[3, 5, 10]}
    component="div"
    count={dataSource.length}
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
                addAndUpdate={ updateDataSource}
                title={"Edit the Entry"}
              />
            )}
<Dialog
        open={openComfirm}
        keepMounted
        onClose={Cancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
        <DialogTitle>{"     Are You Sure you want to delete this?"}</DialogTitle>
        </DialogContent>
        <DialogActions style={{display:"flex", flexDirection:"row"}} >
          <Button onClick={Yes}>Yes</Button>
          <Button onClick={Cancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
  </>
);

}
export default DataTable;