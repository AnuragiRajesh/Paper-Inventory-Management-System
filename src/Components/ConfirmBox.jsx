import * as React from 'react';
import Button from '@mui/material/Button';


export default function AlertDialogSlide() {

  const handleClickOpen = () => {
    setOpen(true);
  };

  

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
     
    </div>
  );
}