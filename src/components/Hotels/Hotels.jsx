import React, { useState } from "react";
import { Button, CardMedia, CardContent, Card, Box, Typography, MenuItem, Select, InputLabel, Pagination} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Dialog from "../Dialog/Dialog";
import useStyles from './styles';
import usePagination from "./usePagination";

const Hotels = ({ hotels, handleSave, handleClose, handleDelete, open, showModal, handleIncrement, handleDecrement, handleSort }) => {
    const classes = useStyles();
    const [valueSelect, setValueSelect] = useState('');
    const [page, setPage] = useState(1);
    
    const PER_PAGE = 5;
    const count = Math.ceil(hotels.length / PER_PAGE);
    const _DATA = usePagination(hotels, PER_PAGE);
  
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };

    return <>
       <div style={{marginRight: 'auto', marginLeft: '0', padding: 30, cursor: "pointer"}} onClick={showModal}>
            <AddBoxOutlinedIcon color="primary" style={{float: "left", display: 'inline-block', margin: 10}} />
            <Typography style={{float: "left", display: 'inline-block', margin: 7, fontSize: 20, fontWeight: 600, opacity: 1}}>OTEL EKLE</Typography>
        </div>
       <div style={{marginRight: 'auto', marginLeft: '15px', padding: 30}}>
        <InputLabel id="demo-simple-select-helper-label" style={{fontSize: 20, color: 'black', fontWeight: 500, margin: 5}}>Sıralama</InputLabel>
            <Select 
            style={{width: 200}}
            id="demo-simple-select-helper"
            value={valueSelect}
            onChange={(e) => handleSort(e.target.value) && setValueSelect(e.target.value)}
            >
            <MenuItem value={0}>Puan(Artan)</MenuItem>
            <MenuItem value={1}>Puan(Azalan)</MenuItem>
            </Select>
        </div>
        {hotels.length && (
            _DATA.currentData().map((hotel) => (
            <Card sx={{ display: 'flex', margin: '20px 20px', padding: '30px 30px' , width: '100vh'}}>
            <CardMedia
            component="img"
            style={{ width: '20rem', marginLeft: 10 }}
            image={hotel.image}
            alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography className={classes.delete} style={{display: 'flex', float: 'right', marginLeft: '20rem'}} onClick={() => handleDelete(hotel.id)}>    
                <div>     
                    <CloseOutlinedIcon />
                </div>
            </Typography>
            <CardContent sx={{ flex: '1 0 auto', marginLeft: '40px' }}>
                <Typography variant="h4">{hotel.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary" style={{ backgroundColor: '#f3f3f3', color: 'rgb(37 223 184)', fontWeight: '500', marginTop: 10, textAlign: 'left', fontSize: '18px' }}>
                <span style={{marginLeft: 10}}>{hotel.point} Puan </span>
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, marginLeft: '50px' }}>
                <Button variant="outlined" onClick={() => handleIncrement(hotel)}>PUANI ARTTIR</Button>
                <Button style={{marginLeft: 20}} variant="outlined" onClick={() => handleDecrement(hotel)}>PUANI AZALT</Button>
            </Box>
            </Box>
        </Card> 
        )))}
        <Pagination
            style={{display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', margin: 10}}
            count={count}
            color="primary"
            size="large"
            page={page}
            onChange={handleChange}
        />
        {showModal && (
            <Dialog open={open} handleClose={handleClose} handleSave={handleSave} /> 
        )}
    </>
}

export default Hotels;