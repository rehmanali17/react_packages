import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField  from "@material-ui/core/TextField";
import  Container  from "@material-ui/core/Container";
import  Alert  from "@material-ui/lab/Alert";
import  AlertTitle  from "@material-ui/lab/AlertTitle";
import { useStyles } from "../styles/styles";
import { getSinglePost, editPost } from "../actions/actions";
import Snackbar from '@material-ui/core/Snackbar'
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import  CircularProgress  from "@material-ui/core/CircularProgress";
// import { useQuery } from "react-query";
// import { getPosts } from "../actions/actions";

const EditPost = () => {
    const { id } = useParams()
    const { data, isLoading, isError, error } = useQuery(['singlePost' , id], getSinglePost)
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient();
  const mutation = useMutation(editPost, {
    onSuccess: (newData, variables, context) => {
      queryClient.invalidateQueries()
      localStorage.setItem('message','Post edited successfully')
      history.push('/')
    },
    onError: (error, variables, context) => {
      setOpen(true)
    }
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const classes = useStyles()
  const { register, handleSubmit, formState : {errors} } = useForm();
  const onSubmit = (data) => {
    data.id = id
    mutation.mutate(data)
  };
  return (
    <Fragment>
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
            {(isLoading === false && isError === false) && 
            <form onSubmit={handleSubmit(onSubmit)}>
            <Container className={classes.mt_5}>
              <TextField defaultValue={data.data.title} label="Post Title" fullWidth {...register("title", {
                required: true,
                pattern: /^[\w- .]+$/
              })} variant="outlined" />
            </Container>
            {errors.title && 
              <Container>
                  <Alert severity="error" className={classes.mt_2}>
                    <AlertTitle>Error</AlertTitle>
                    <strong>Write valid text for the post title</strong>
                </Alert>
              </Container>
            }
            <Container className={classes.mt_5}>
              <TextField defaultValue={data.data.body} label="Post Body" {...register("body", {
                required: true,
                pattern: /^[\w- .]+$/
              })} multiline rows={4} fullWidth variant="outlined"/>
            </Container>
            {errors.body && 
              <Container>
                  <Alert severity="error" className={classes.mt_2}>
                    <AlertTitle>Error</AlertTitle>
                    <strong>Write valid text for the post body</strong>
                </Alert>
              </Container>
            }
            <Button size="large" className={classes.btn} variant="contained" color="primary" type="submit">
                Edit
            </Button>
      </form>
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
    </Fragment>
  );
};

export default EditPost;
