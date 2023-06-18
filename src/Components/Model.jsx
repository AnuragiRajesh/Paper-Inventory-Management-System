import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal({setOpen,open,rowToPerform,title,addAndUpdate}) {
  const [formData, setFormData] = useState(rowToPerform);

  const handleCancel = () => setOpen(false);
  const handleAdd = () => {
    
    addAndUpdate(formData)
  
    handleCancel()
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.name,event.target.value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
     
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleCancel}
        closeAfterTransition
      >
    <Fade in={open}>
  <Box sx={style}>

    <Typography id="spring-modal-description" sx={{ mt: 2 }}>
    {title}
    </Typography>

    <Box sx={{ mt: 2 }}>
    <Grid container spacing={2}>
    <Grid item xs={6}>
    <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="select-label">Supplier</InputLabel>
        <Select  onChange={handleInputChange}
          labelId="select-label"
          label="Select"
          name="supplier"
          value={formData.supplier}
        >
          <MenuItem value={'Microsoft'}>Microsoft</MenuItem>
          <MenuItem value={'Amazon'}>Amazon</MenuItem>
          <MenuItem value={'Supplier 3'}>Supplier 3</MenuItem>
          <MenuItem value={'Flipcart'}>Flipcart</MenuItem>
          <MenuItem value={'Supplier 5'}>Supplier 5</MenuItem>
          <MenuItem value={'Supplier 6'}>Supplier 6</MenuItem>
        </Select>
      </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="select-label">Paper Type</InputLabel>
        <Select  onChange={handleInputChange}
          labelId="select-label"
          label="Select"
          name="paperType"
          value={formData.paperType}
          // Add the necessary props for select component
        >
          <MenuItem  value={'Medium'}>Medium</MenuItem>
          <MenuItem  value={'Hard'}>Hard</MenuItem>
          <MenuItem  value={'Paper Type 3'}>Paper Type 3</MenuItem>
          <MenuItem  value={'Smooth'}>Smooth</MenuItem>
          <MenuItem  value={'Paper Type 5'}>Paper Type 5</MenuItem>
          <MenuItem  value={'Paper Type 6'}>Paper Type 6</MenuItem>
        </Select>
      </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth sx={{}}>
        <InputLabel id="select-label">Paper Stock Type</InputLabel>
        <Select  onChange={handleInputChange}
          labelId="select-label"
          label="Select"
          name="paperStockType"
          value={formData.paperStockType}
          // Add the necessary props for select component
        >
          <MenuItem  value={'Reels'}>Reels </MenuItem>
          <MenuItem  value={'Sheets'}>Sheets</MenuItem>
        </Select>
      </FormControl>
                </Grid>



                <Grid item xs={6}>
                  <TextField value={formData.paperSize} name='paperSize' onChange={handleInputChange} label="Paper Size" variant="outlined" fullWidth sx={{ mb: '1rem' }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField value={formData.stockStatus} name='stockStatus'   onChange={handleInputChange} label="Stock Status" variant="outlined" fullWidth sx={{ mb: '1rem' }} type="number" />
                </Grid>
                <Grid item xs={6}>
                  <TextField value={formData.weight} name='weight'  onChange={handleInputChange} label="Weight" variant="outlined" fullWidth sx={{ mb: '1rem' }} type="number" />
                </Grid>
                  <Grid item xs={6}>
                    <TextField value={formData.gsm} name='gsm'  onChange={handleInputChange} label="Paper Stock Type" variant="outlined" fullWidth sx={{ mb: '1rem' }} />
                  </Grid>
                <Grid item xs={6}>
                <TextField value={formData.noOfReam} name='noOfReam'   onChange={handleInputChange} label="No Of Ream" variant="outlined" fullWidth sx={{ mb: '1rem' }}  type="number" />
                </Grid>
                <Grid item xs={6}>
                <TextField name="noOfReels" value={formData.noOfReels}  onChange={handleInputChange} label="No Of Reels" variant="outlined" fullWidth sx={{ mb: '1rem' }}   type="number" />
                </Grid>








    </Grid>
     
      
    
     
     
      {/* <Grid container spacing={2}>
               
              </Grid> */}
    </Box>
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add
      </Button>
    </Box>
  </Box>
</Fade>
      </Modal>
    </div>
    
  );
  
}



