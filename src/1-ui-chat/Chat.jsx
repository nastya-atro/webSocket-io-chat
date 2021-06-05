import React from 'react';
import s from './Chat.module.css'
import { Avatar, CardHeader, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@material-ui/core';
import AvatarImg from './../img_back.jpg'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChatMessage from './ChatMessage';


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '30ch',
            backgroundColor: 'theme.palette.background.paper',
        }
    }),
);



const Chat = ({ users, messages, userName, roomId, }) => {
    const classes = useStyles();


    return (
        <Container maxWidth="md" >
            <Paper elevation={3} className={s.chat_dialog_container}>
                <Grid container direction="row" justify="space-around" className={s.chat_grid}>
                    <Grid item xs={5}>

                        <CardHeader avatar={
                            <Avatar aria-label="recipe" src={AvatarImg} />}
                            title={roomId}
                            subheader={`Now onlain: ${users.length}`} />

                        <List className={classes.root}>
                            {users.map((name, index) =>
                                <React.Fragment>

                                    <ListItem key={index} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar aria-label="recipe" className={s.avatar}>
                                                {name.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText className={s.list_name}
                                            primary={name} />
                                        <Divider variant="inset" component="li" />
                                    </ListItem>
                                    
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            )}
                        </List>
                    </Grid>
                    <Grid item xs>

                        <ChatMessage messages={messages} userName={userName} roomId={roomId} />

                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Chat