import { Box, Button, Container, Grid } from '@mui/material';
import React from 'react';
import Login from './Login';

const Loader = () => {
    return (
        <Container>
            <Grid container>
                <Grid container
                    style={{ height: window.innerHeight - 50 }}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Grid
                        container
                        alignItems={"center"}
                        direction={"column"}
                    >
                        <span className="loader"></span>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Loader;