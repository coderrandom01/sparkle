import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
export default function SideBar(props: any) {


    return (
        <div>
            <Button sx={{
                display: { sm: 'none' }
            }} onClick={props.toggleDrawer(true)}><MenuIcon sx={{ color: 'orange' }} /></Button>
            <Drawer open={props.open} onClose={props.toggleDrawer(false)}>
                {props.DrawerList}
            </Drawer>
        </div>
    );
}
