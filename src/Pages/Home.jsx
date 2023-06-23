import DataTable from '../Components/Table';
import { useState,useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SelectLabels from '../Components/Select';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import SpringModal from '../Components/Model';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { stockInApi } from '../Services/DataServices';
const drawerWidth = 230;

const Home = ({handleLogin}) => {

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [unitId, setUnitId] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const  { uprodunit, user,role,} = location.state|| {};
  const [dataSource, setDataSource] = useState();
  const [filteredDataSource, setFilteredDataSourcee] = useState(dataSource)
  const [selectedItem, setSelectedItem] = useState("Stock In");


  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear()
    handleLogin()
    navigate("/")
    // Logout logic
    handleCloseMenu();
  };
  
const UnitSelect =(unit)=>{
  setUnitId(unit)
}
const addAndUpdate =(formData)=>{
  console.log(formData,"9999uiuiuiu9")
  stockInApi(formData).then((response) => {
    console.log(response)
  }) 
  .catch((error) => {
    console.log(error.message)
  });
//  dataSource.push(formData)
}
  const deleteRow = (rowToPerform) => {
   const newData =filteredDataSource.filter((item) => item.Inward_id !== rowToPerform.Inward_id)
    setFilteredDataSourcee(newData);
    console.log(newData, "hgsdfhjsj");
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
  position="fixed"
  sx={{
    width: `calc(100% - ${drawerWidth}px)`,
    ml: `${drawerWidth}px`,
    backgroundColor: "orange",
    textAlign: "center"
  }}
>
  <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography variant="h6" noWrap component="div">
   Inventory Management System
    </Typography>
    <Button
          color="inherit"
          onClick={handleOpenMenu}
          sx={{ marginLeft: "auto" }}
        >
          Logout
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
  </Toolbar>
</AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Typography
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
            }}
            component="div"
          >
            <img style={{ height: "50px" }} src={require("../Assets/SESHASAI-LOGO-OCT-2020.png")} alt="" />
          </Typography>
          <Divider />
          <List>
            {["Stock In", "Stock Out"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton selected={selectedItem === text} onClick={() => {
                  setSelectedItem(text);
                  console.log("handleItemClick(text)");
                }}>
                  <ListItemIcon>
                    {text === "Stock In" ? <AddBusinessRoundedIcon /> : <OutputRoundedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        {selectedItem === "Stock In" ? (
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, zIndex: 0 }}>
            <Toolbar />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "2rem" }}>
              <Button variant="outlined"  disabled={unitId>0?false:true} onClick={handleOpen}>New Inventory</Button>
              <SelectLabels uprodunit={uprodunit} UnitSelect={UnitSelect} />
            </div>
            <div style={{ marginTop: "4rem" }}>
              <DataTable unitId={unitId} deleteRow={deleteRow} />
            </div>
            {open && (
              <SpringModal
                rowToPerform={{
                  "tsupplierMasterId": null,
                  "paper_Group_Id": null,
                  "paper_Mill_Id": null,
                  "brand": null,
                  "paper_size": null,
                  "paper_Form": null,
                  "paper_gsm": null,
                  "noOfReels": null,
                  "noOfReam": null,
                  "weight": null,
                  "user_id":`${user[0].id}`,
                  "unit_id": `${unitId}`
                }} title={"Make a new Entry"}
                setOpen={setOpen}
                open={open}
                addAndUpdate={addAndUpdate}
              />
            )}
          </Box>
        ) : (
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, zIndex: 0 }}
          >
            <Toolbar />
            <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
              <h1> This is for Stock out component</h1>
            </div>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Home;
