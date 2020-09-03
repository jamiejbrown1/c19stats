import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import abbreviate from 'number-abbreviate';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    metricText: {
        margin: '8px 0'
    }
}));

export default function SingleMetric(props) {
    const { name, value } = props;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography className={classes.metricText} data-testid="metric-name" variant="h4">{name}</Typography>
            <Typography className={classes.metricText} data-testid="metric-value" variant="h5">{abbreviate(value)}</Typography>
        </Box>
    );
}
SingleMetric.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};
