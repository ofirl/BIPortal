import React from 'react'
// import Button from './node_modules/@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    topBar: {
        height: '100%',
        position: 'sticky',
        zIndex: '1201',
        direction: 'rtl'
    },
}));

function ElevationScroll(props) {
    const { children } = props;
    // const trigger = useScrollTrigger({
    //     disableHysteresis: true,
    //     threshold: 0,
    // });

    let trigger = true;

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export default ({ title = "default title", toggleFilterOpen }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar className={classes.topBar}>
                    <Toolbar>
                        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}
                        <img src={process.env.PUBLIC_URL + "/ocean.png"} className="App-logo2" alt="..." style={{width:"3em", height:"3em", marginLeft: '1em'}}/>
                        <Typography variant="h6" className={classes.title}>
                            {title}
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                        <IconButton color="inherit" onClick={toggleFilterOpen}>
                            <FilterListIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}