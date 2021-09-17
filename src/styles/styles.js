import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    center: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mt_5: {
        marginTop: '50px'
    },
    mt_2: {
        marginTop: '20px'
    },
    text_justify: {
        textAlign: 'justify'
    },
    ml_3: {
        marginLeft: '30px'
    },
    btn: {
        marginTop: '50px',
        width: '200px',
        padding: '8px 12px',
        postition: 'relative',
        left: 'calc(50% - 100px)'
    },
    drawer: {
        width: '240px',
    },
    drawerPaper: {
        width: '240px'
    },
    content_body: {
        width: '100%',
        marginTop: '30px',
    },
    text_center: {
        textAlign: 'center'
    },
    app_bar: {
        width: 'calc(100% - 240px)'
    },
    active: {
        background: '#f4f4f4'
    }

})