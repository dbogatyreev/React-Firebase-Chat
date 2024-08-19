import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';

const Navbar = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    return (
        <AppBar style={{ backgroundColor: 'coral' }} position="static">
            <Toolbar variant={"dense"}>
                <Grid container justifyContent="flex-end">
                    {user ?
                        <Button onClick={() => auth.signOut()} variant="outlined" color="inherit">Выйти</Button>
                        :
                        <NavLink to={LOGIN_ROUTE}>
                            <Button variant="outlined" color="inherit">Логин</Button>
                        </NavLink>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
