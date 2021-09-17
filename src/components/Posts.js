import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { getPosts, deletePost } from '../actions/actions'
import {useStyles} from '../styles/styles' 
import CircularProgress from '@material-ui/core/CircularProgress'
import  Container  from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import DeleteIconOutlined from '@material-ui/icons/DeleteOutlined';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import { useMutation, useQueryClient } from 'react-query'
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router'
const Posts = (props) => {
    const history = useHistory();
    let status = localStorage.getItem('message') !== null ? true : false
    const [open, setOpen] = useState(status);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

   let message = localStorage.getItem('message')
    setTimeout(() => {
        localStorage.removeItem('message')
    }, 10000); 
    const queryClient = useQueryClient()
    const mutation = useMutation(deletePost, {
        onSuccess: (newData, variables, context) =>{
            setOpen(true)
            queryClient.setQueryData("post", oldData => ({
                ...oldData,
                data: oldData.data.filter(element => element.id !== variables)
            })
            )
            
        },
        onError: (error, variables, context) => {
            setOpen(true)
        }
    })
    const classes = useStyles();
    const {  data, isLoading, isError, error } = useQuery('post', getPosts)
    return (
        <Fragment>
            <Container>
            {isLoading === true &&
                <Container className={classes.center}>
                    <CircularProgress className={classes.center} color="primary" />
                </Container>
            }
            {isError === true &&
                <Alert severity="error" className={classes.mt_5}>
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error.message}</strong>
                </Alert>
            }            
            {
                <Grid className={classes.mt_5} container spacing={3}>
                    {(isLoading === false && isError === false) && 
                        data.data.map(element => {
                            return (
                                <Grid key={element.id} item xs={12} md={4} sm={6}>
                                    <Card>
                                        <CardHeader
                                        className={classes.text_justify}
                                        action={
                                            <Container>
                                                <IconButton onClick={() => {
                                                    mutation.mutate(element.id)
                                                }}  className={classes.ml_3}>
                                                    <DeleteIconOutlined color="action" />
                                                </IconButton>
                                                <IconButton onClick={() => {
                                                    history.push(`/edit/${element.id}`)
                                                }} >
                                                    <EditIcon color="action" />
                                                </IconButton>
                                            </Container>
                                        }
                                        title={element.title}
                                        />
                                        <CardContent>
                                            <Typography className={classes.text_justify} variant="body1">
                                                {element.body}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
              
            }
            {(mutation.isError === true && mutation.isLoading === false) && 
                <Container>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                        {mutation.error.message}
                        </Alert>
                    </Snackbar>
                </Container>
            }
            {(mutation.isError === false && mutation.isLoading === false) && 
                <Container>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                        Post deleted successfully!
                        </Alert>
                    </Snackbar>
                </Container>
            }
            {message !== null  && 
                <Container>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                        {message}
                        </Alert>
                    </Snackbar>
                </Container>
            }
            </Container>         
        </Fragment>
    )
}

export default Posts
