import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    topBar: {
        height: '5em',
        position: 'sticky',
        zIndex: '1201',
        direction: 'rtl'
    },
}));

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export default (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar className={classes.topBar}>
                    <Toolbar>
                        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}
                        <img src="./ocean.png" className="App-logo" alt="..." style={{width:"50px", height:"50px"}}/>
                        <Typography variant="h6" className={classes.title}>
                            כותרת לדוח
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                        <IconButton color="inherit" onClick={props.toggleFilterOpen}>
                            <FilterListIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}