import React from 'react'
import  AppBar  from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { useStyles } from '../styles/styles'
import  SubjectOutlined  from '@material-ui/icons/SubjectOutlined'
import  AddCircleOutlined  from '@material-ui/icons/AddCircleOutlined'
import { Divider, Typography } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router'


const Layout = ({ children }) => {
    const history = useHistory()
    const location = useLocation()
    const classes = useStyles()
    const links = [
        {
            path: '/',
            text: 'My Posts',
            icon: <SubjectOutlined color="primary"/>
        },
        {
            path: '/add',
            text: 'Add Post',
            icon: <AddCircleOutlined color="primary"/>
        }
    ]
    return (
        <div style={{display: 'flex'}}>
                <AppBar className={classes.app_bar} color="primary">
                    <Toolbar>
                        <Typography variant="h6">
                            Welcome
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
            <Drawer className={classes.drawer} classes={{paper: classes.drawerPaper}} variant="permanent" anchor="left">
                <Toolbar>
                    <Typography className={classes.text_center} variant="h5" color="primary">
                        Posts
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {links.map((link)=>{
                        return (
                            <ListItem className={location.pathname === link.path ? classes.active : null } button onClick={() => {
                                history.push(link.path)
                                }}>
                                <ListItemIcon>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
            <div className={classes.content_body}>
                { children }
            </div>
        </div>
    )
}

export default Layout
