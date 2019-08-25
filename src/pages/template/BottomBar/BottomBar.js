import React from './node_modules/react'
import { makeStyles } from './node_modules/@material-ui/core/styles';
import AppBar from './node_modules/@material-ui/core/AppBar';
import Toolbar from './node_modules/@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    bottomaAppBar: {
        top: 'auto',
        bottom: 0,
        height: '5em',
        position: 'sticky',
        zIndex: '1201'
    },
}));

export default (props) => {
    const classes = useStyles();

    return (
        <AppBar className={classes.bottomaAppBar}>
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
                    <MenuIcon />
                </IconButton> */}
                {/* <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
          </Fab> */}
                {/* <div className={classes.grow} /> */}
                {/* <IconButton color="inherit">
                    <SearchIcon />
                </IconButton> */}
                {/* <IconButton edge="end" color="inherit">
                    <MoreIcon />
                </IconButton> */}
            </Toolbar>
        </AppBar>
    );
}