import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import SingleMetric from './SingleMetric';

const useStyles = makeStyles(() => ({
    root: {
        width: '350px',
        height: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        height: '30%',
        fontWeight: 300,
    },
    metrics: {
        height: '40%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function MetricWidget(props) {
    const {
        title, total, today, loading,
    } = props;
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Paper elevation={4} className={classes.root}>

            <Typography color="primary" data-testid="title" variant="h3" className={classes.title}>
                {title}
            </Typography>

            <Box className={classes.metrics}>
                { loading ? <CircularProgress /> : (
                    <>
                        <SingleMetric data-testid="total-metric" name={t('Total')} value={total} />
                        <Divider flexItem orientation="vertical" />
                        <SingleMetric data-testid="daily-metric" name={t('Today')} value={today} />
                    </>
                )}
            </Box>
        </Paper>
    );
}

MetricWidget.propTypes = {
    title: PropTypes.string,
    total: PropTypes.number,
    today: PropTypes.number,
    loading: PropTypes.bool,
};

MetricWidget.defaultProps = {
    title: null,
    total: null,
    today: null,
    loading: false,
};
