import React, { useState, useEffect, useCallback } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, collection, addDoc, Timestamp, query, onSnapshot, orderBy } from 'firebase/firestore';
import { Container, Grid, Avatar, Button, TextField } from '@mui/material';
import Loader from './Loader';

const Chat = () => {
    const auth = getAuth();
    const db = getFirestore();
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const [messagesData, setMessagesData] = useState([]);

    const sendMessage = async () => {
        if (value.trim() === '') return;

        try {
            await addDoc(collection(db, 'messages'), {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: Timestamp.fromDate(new Date()),
            });
            setValue('');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const getMessages = useCallback(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                const messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push(doc.data());
                });
                setMessagesData(messages);
            },
            (error) => {
                console.error('Error fetching messages: ', error);
            }
        );

        return () => unsubscribe();
    }, [db]);

    useEffect(() => {
        if (user) {
            return getMessages();
        }
    }, [getMessages, user]);

    if (!user) {
        return <Loader />;
    }

    return (
        <Container>
            <Grid
                container
                style={{ height: window.innerHeight - 100 }}
                alignItems="center"
                justifyContent="center"
            >
                <div
                    style={{
                        width: '80%',
                        height: '60vh',
                        border: '1px solid gray',
                        borderRadius: '10px',
                        overflowY: 'auto',
                        padding: '10px',
                    }}
                >
                    {messagesData.map((message, index) => (
                        <div
                            key={index}
                            style={{
                                margin: '10px 0',
                                border: user.uid === message.uid ? '2px solid rgb(169, 247, 252)' : '2px dashed red',
                                borderRadius: '10px',
                                backgroundColor: 'rgb(224, 253, 255)',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: '10px',
                            }}
                        >
                            <Grid container alignItems="center">
                                <Avatar src={message.photoURL} alt={message.displayName} />
                                <div style={{ marginLeft: '10px', fontWeight: 'bold' }}>{message.displayName}</div>
                            </Grid>
                            <div style={{ marginTop: '5px' }}>{message.text}</div>
                        </div>
                    ))}
                </div>
                <Grid container direction="column" style={{ width: '80%', marginTop: '10px' }}>
                    <TextField
                        rows={2}
                        fullWidth
                        maxRows={2}
                        variant="outlined"
                        style={{ height: '50px' }}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button
                        onClick={sendMessage}
                        style={{
                            width: 100,
                            border: '1px solid gray',
                            marginTop: '10px',
                            alignSelf: 'flex-end',
                        }}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
