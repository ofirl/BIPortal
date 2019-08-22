import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    maxWidth100: {
      maxWidth: '100%'
    },
    filterChip: {
      margin: '1px',
    //   width: '50%',
      direction: 'ltr'
    }
  }));

  /**
   * This function will infer the filter value from the data
   * @param {*[]} data 
   */
const inferFilters = function(data) {
    if (data.length === 0)
        return {};

    let filters = {};
    Object.keys(data[0]).forEach( (value) => filters[value] = new Set() );
    Object.keys(filters).forEach( (value) => {
        let allVals = data.reduce( (prev, curr) => prev.add(curr), new Set());
        filters[value] = allVals;
    } );
}


export default (props) => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Grid container direction="column" style={{ height: '100%', width: '10em', direction: 'rtl' }}>
                <div style={{ height: '5em' }}></div>
                <Grid id="filterGrid" item xs={1} style={{ flexGrow: '1' }} container direction="column" className={classes.maxWidth100}>
                    <Grid item xs={1} style={{ flexGrow: '1' }} className={classes.maxWidth100} direction="column">
                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                            מסננים זמינים
                        </Typography>
                        <Draggable bounds="#filterGrid">
                            <Chip variant="outlined" color="primary" size="small" label="test" className={classes.filterChip} onClick={() => alert('click')} onDelete={() => alert('delete')} />
                        </Draggable>
                        <br />
                        <Chip variant="outlined" color="primary" size="small" label="test" className={classes.filterChip} />
                        <br />
                        <Chip variant="outlined" color="primary" size="small" label="test" className={classes.filterChip} />
                    </Grid>
                    <Divider className={classes.maxWidth100} />
                    <Grid item xs={1} style={{ flexGrow: '1' }} className={classes.maxWidth100}>
                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                            מסננים אקטיבים
                        </Typography>
                    </Grid>
                </Grid>
                <div style={{ height: '5em' }}></div>
            </Grid>
        </Drawer>
    );
}