import DataTable from '../Components/Table';
import { useState } from 'react';
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
const drawerWidth = 230;

const Home = () => {
  console.log("Home");
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
localStorage.clear()
    navigate("/")
    // Logout logic
    handleCloseMenu();
  };
  const [dataSource, setDataSource] = useState([
    {
      Inward_id: "id23",
 
 unit:"Peru",     supplier: 'Oracel',
      paperType: 'Smooth',
      paperSize: '3.5',
      stockStatus: 890,
      weight: 46,
      paperStockType: 'Sheets',
      noOfReam: 345,
      noOfReels: 44,
      gsm:"1.2mm"
    },
    {
      Inward_id: "iddd23",
      unit:"Chennai",
      supplier: 'Microsoft',
      paperType: 'Hard',
      paperSize: '3.55',
      stockStatus: 85490,
      weight: 4346,
      paperStockType: 'Sheets',
      noOfReam: 34345,
      noOfReels: 4544,
      gsm:"1.2mm"
    },
    {
      Inward_id: "9dd23",

unit:"Delhi",      supplier: 'Amazon',
      paperType: 'Medium',
      paperSize: '3.0',
      stockStatus: 890,
      weight: 4346,
      paperStockType: 'Reels',
      noOfReam: 3400345,
      noOfReels: 458844,
      gsm:"1.2mm"
    },
    {
      Inward_id: "90d23",

unit:"Mumbai",      supplier: 'Amazon',
      paperType: 'Medium',
      paperSize: '3.0j',
      stockStatus: 8970,
      weight: 43466,
      paperStockType: 'Reels',
      noOfReam: 345,
      noOfReels: 84,
      gsm:"1.2mm"
    },
    {
      Inward_id: "90d283",
      unit:"Benglore",
      supplier: 'Flipcart',
      paperType: 'Hard',
      paperSize: '3.y0j',
      stockStatus: 870,
      weight: 434996,
      paperStockType: 'Reels',
      noOfReam: 345,
      noOfReels: 864,
      gsm:"1.2mm"
    },
  ]);
  const [filteredDataSource, setFilteredDataSourcee] = useState(dataSource)
  const [selectedItem, setSelectedItem] = useState("Stock In");
  
const UnitSelect =(unit)=>{
  if(unit==="All"){
    return setFilteredDataSourcee(dataSource)
  }
  const newData = dataSource.filter((item) => item.unit === unit)
  setFilteredDataSourcee(newData)
console.log( newData
,"jiiij")
}
const addAndUpdate =(formData)=>{
  // filteredDataSource.push(formData)
  dataSource.unshift(formData)
  console.log(formData,"99999")
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
      Paper Inventory Management System
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
              <Button variant="outlined" onClick={handleOpen}>New Inventry</Button>
              <SelectLabels UnitSelect={UnitSelect} />
            </div>
            <div style={{ marginTop: "4rem" }}>
              <DataTable dataSource={filteredDataSource} deleteRow={deleteRow} />
            </div>
            {open && (
              <SpringModal
                rowToPerform={{
                  Inward_id: Math.random(100),
                  unit:String,
                  supplier: String,
                  paperType: String,
                  paperSize: String,
                  stockStatus: Number,
                  weight: Number,
                  paperStockType: String,
                  noOfReam: Number,
                  noOfReels: Number,
                  gsm:String
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
