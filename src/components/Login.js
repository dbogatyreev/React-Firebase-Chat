import { Container, Grid } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const auth = getAuth();


    const login = async () => {
        const provider = new GoogleAuthProvider()
        const { user } = await signInWithPopup(auth, provider)
    }


    return (
        <Container>
            <Grid container>
                <Grid container
                    style={{ height: window.innerHeight - 50 }}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Grid>
                        <Box p={5}>
                            <Button onClick={login} >Login from Google</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;