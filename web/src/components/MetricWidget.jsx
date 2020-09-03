import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SingleMetric from './SingleMetric';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    },
    metrics: {
        height: '40%',
        width: '100%',
        display: 'flex',
    },
}));

export default function MetricWidget(props) {
    const {
        title, total, today, loading,
    } = props;
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Paper className={classes.root}>

            <Typography data-testid="title" variant="h3" className={classes.title}>
                {title}
            </Typography>
            { loading ? <CircularProgress /> : (
                <>
                    <Box className={classes.metrics}>
                        <SingleMetric data-testid="total-metric" name={t('Total')} value={total} />
                        <Divider flexItem orientation="vertical" />
                        <SingleMetric data-testid="daily-metric" name={t('Today')} value={today} />
                    </Box>
                </>
            )}
        </Paper>
    );
}

MetricWidget.propTypes = {
    title: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    today: PropTypes.number.isRequired,
    loading: PropTypes.bool,
};

MetricWidget.defaultProps = {
    loading: false,
};
