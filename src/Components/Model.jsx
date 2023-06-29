import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { supplierApi, paperGroupApi, brandApi, millApi, gsmApi, paperReelSizeApi, paperSheetSizeApi } from '../Services/DataServices';
import { Autocomplete } from '@mui/material';
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



export default function SpringModal({ setOpen, open, rowToPerform, title, addAndUpdate }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [suppliers, setSupplier] = useState([])
  const [paperGroup, setPaperGroup] = useState([])
  const [brands, setBrands] = useState([])
  const [mills, setMills] = useState([])
  const [gsms, setGsms] = useState([])
  const [paperSizeOfReel, setPaperSizeOfReel] = useState([])
  const [paperSizeOfSheet, setPaperSizeOfSheet] = useState([])
  const [formData, setFormData] = useState(rowToPerform);


  useEffect(() => {
    paperGroupApi().then((response) => {
      setPaperGroup(response.data)
    })
    supplierApi().then((response) => {
      setSupplier(response.data)
    })
    brandApi().then((response) => {
      setBrands(response.data)
    })
    millApi().then((response) => {
      setMills(response.data)
    })
    gsmApi().then((response) => {
      setGsms(response.data)
    })
  }, [])

  const handleCancel = () => setOpen(false);
  const handleAdd = () => {
    addAndUpdate(formData)
    handleCancel()
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
                  <Autocomplete
                    options={suppliers}
                    getOptionLabel={(option) => option.SupplierName}
                    value={formData.tsupplierMasterId === null ? null : suppliers.find((option) => option.tsupplierMasterId === formData.tsupplierMasterId)}
                    onChange={(event, newValue) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        tsupplierMasterId: newValue ? newValue.tsupplierMasterId : null,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Supplier" variant="outlined" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={paperGroup}
                    getOptionLabel={(option) => option.Paper_Group}
                    value={formData.Paper_Group_Id === null ? null : paperGroup.find((option) => option.Paper_Group_Id === formData.Paper_Group_Id)}
                    onChange={(event, newValue) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        Paper_Group_Id: newValue ? newValue.Paper_Group_Id : null,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Paper Group" variant="outlined" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={["Reels", "Sheets"]}
                    getOptionLabel={(option) => option}
                    value={formData.Paper_Form === null ? null : ["Reels", "Sheets"].find((option) => option === formData.Paper_Form)}
                    onChange={(event, newValue) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        Paper_Form: newValue ? newValue : null,
                      }));
                      if (newValue === 'Reels') {
                        paperReelSizeApi().then((response) => {
                          setPaperSizeOfReel(response.data)
                          setPaperSizeOfSheet([])
                        })
                      } else if (newValue === 'Sheets') {
                        paperSheetSizeApi().then((response) => {
                          setPaperSizeOfSheet(response.data)
                          setPaperSizeOfReel([])
                        })
                      }
                    }
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Paper Form" variant="outlined" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={[...paperSizeOfReel, ...paperSizeOfSheet]}
                    getOptionLabel={(option) => option.Paper_Reel_Size || option.Paper_Sheet_Size}
                    value={
                      formData.Paper_size === null
                        ? null
                        : [...paperSizeOfReel, ...paperSizeOfSheet].find(
                          (option) =>
                            option.Paper_Reel_Size === formData.Paper_size ||
                            option.Paper_Sheet_Size === formData.Paper_size
                        )
                    }
                    onChange={(event, newValue) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        Paper_size: newValue ? newValue.Paper_Reel_Size || newValue.Paper_Sheet_Size
                          : null,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Paper Size" variant="outlined" />
                    )}
                  />
                </Grid>



                <Grid item xs={6}>
                  <Autocomplete
                    options={brands}
                    getOptionLabel={(option) => option.Paper_Quantity}
                    value={formData.Brand === null ? null : brands.find((option) => option.Paper_Quantity === formData.Brand)}
                    onChange={(event, newValue) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        Brand: newValue ? newValue.Paper_Quantity : null,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Paper Brand" variant="outlined" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={mills}
                    getOptionLabel={(option) => option.Paper_Mill}
                    value={
                      formData.Paper_Mill_Id === null
                        ? null
                        : mills.find((option) => option.Paper_Mill_Id === formData.Paper_Mill_Id)
                    }
                    onChange={(event, newValue) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        Paper_Mill_Id: newValue ? newValue.Paper_Mill_Id : null,
                      }));
                    }}
                    renderInput={(params) => <TextField {...params} label="Paper Mill" variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={gsms}
                    getOptionLabel={(option) => option.GSM}
                    value={formData.Paper_gsm === null ? null : gsms.find((option) => option.GSM === formData.Paper_gsm)}
                    onChange={(event, newValue) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        Paper_gsm: newValue ? newValue.GSM : null,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="GSM" variant="outlined" />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField value={formData.Weight} name='Weight' onChange={handleInputChange} label="Total Weight" variant="outlined" fullWidth sx={{ mb: '1rem' }} type="number" />
                </Grid>

                <Grid item xs={6}>
                  <TextField value={formData.NoOfReam} name='NoOfReam' onChange={handleInputChange} label="No Of Ream" variant="outlined" fullWidth sx={{ mb: '1rem' }} type="number" />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="NoOfReels" value={formData.NoOfReels} onChange={handleInputChange} label="No Of Reels" variant="outlined" fullWidth sx={{ mb: '1rem' }} type="number" />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button disabled={false} variant="contained" color="primary" onClick={handleAdd}>
                Add
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>

  );

}



