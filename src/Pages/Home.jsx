import DataTable from '../Components/Table';
import { useState,useEffect ,useRef,useContext} from 'react';
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
import { stockInApi } from '../Services/DataServices';
import { particularUnitApi,accessAllUnitApi } from '../Services/DataServices';
import { AuthContext } from '../context/AuthContext';
const drawerWidth = 230;

const Home = () => {
  const getData = useRef(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [unitId, setUnitId] = useState("All");
  const navigate = useNavigate();
  // const  { uprodunit, user,role,} = location.state|| {};
  const { handleLogout  } = useContext(AuthContext);
  const [uprodunitUserRole,setUprodunitUserRole] = useState({})
  const { uprodunit, user } = uprodunitUserRole;
  const [selectedItem, setSelectedItem] = useState("Stock In");
  const [data, setData] = useState([]);
  useEffect(() => {
    getTableData()
  }, [unitId]);
  
  useEffect(()=>{
if(localStorage.getItem('userData')){
  setUprodunitUserRole(JSON.parse(localStorage.getItem('userData')))
}else{
  console.log("pppp")
  handleLogout()
  navigate('/')
  
}
  },[])
  const getTableData = ()=>{
    unitId==="All"?accessAllUnitApi().then((response) => {
      setData(response.data)
      console.log(response.data,"allunit");
    }) 
    .catch((error) => {
      console.log(error.message)
    }):particularUnitApi(unitId).then((response) => {
      setData(response.data)
      console.log(data,"alludfgdgnit");
    }) 
    .catch((error) => {
      console.log(error.message)
    })
  }
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutt = () => {
    localStorage.clear()
    handleLogout()
    navigate("/")
    handleCloseMenu();
  };
  
const UnitSelect =(unit)=>{
  setUnitId(unit)
}
const addDatasource =(formData)=>{
  stockInApi(formData).then((response) => {
    console.log(response)
    getTableData()
  }) 
  .catch((error) => {
    console.log(error.message)
  });
}



  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Box sx={{ display: 'flex', }}>
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
          <MenuItem onClick={handleLogoutt}>Logout</MenuItem>
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
             {uprodunit&& <SelectLabels uprodunit={uprodunit} UnitSelect={UnitSelect} />}
            </div>
            <div style={{ marginTop: "4rem" }}>
              <DataTable getTableData={getTableData} dataSource={data}  />
            </div>
            {open && (
              <SpringModal
                rowToPerform={{
                  "tsupplierMasterId": null,
                  "Paper_Group_Id": null,
                  "Paper_Mill_Id": null,
                  "Brand": null,
                  "Paper_size": null,
                  "Paper_Form": null,
                  "Paper_gsm": null,
                  "NoOfReels": null,
                  "NoOfReam": null,
                  "Weight": null,
                  "User_id":`${user[0].id}`,
                  "Unit_id": `${unitId}`
                }} title={"Make a new Entry"}
                setOpen={setOpen}
                open={open}
                addAndUpdate={addDatasource}
                ref={getData}
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
