import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MetricWidget from '../components/MetricWidget';
import { getStats } from './StatsApi';
import CountrySelect, { globalSelection } from './CountrySelect';
import { useSnackbar } from 'material-ui-snackbar-provider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        backgroundColor: theme.palette.background.default,
    },
    title: {
        margin: '20px',
        color: theme.palette.text.primary,
    },
    widgets: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
    },
}));

export default function Stats() {
    const [stats, setStats] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(globalSelection);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const snackbar = useSnackbar();
    const classes = useStyles();

    useEffect(() => {
        async function fetchStats(country) {
            try {
                setLoading(true);
                const res = await getStats(country);
                setStats(res);
            } catch (err) {
                snackbar.showMessage(t('Failed to load data'))
            } finally {
                setLoading(false);
            }
        }
        fetchStats(selectedCountry.Slug);
    }, [selectedCountry, snackbar, t]);

    return (
        <Box className={classes.root}>
            <Typography variant="h3" className={classes.title}>{t('Coronavirus Statistics')}</Typography>
            <CountrySelect selected={selectedCountry} onSelect={setSelectedCountry} />
            <Grid container justify="space-evenly" spacing={2}>
                <Grid item>
                    <MetricWidget
                        title={t('Cases')}
                        total={stats.TotalConfirmed}
                        today={stats.NewConfirmed}
                        loading={loading}
                    />
                </Grid>
                <Grid item>
                    <MetricWidget
                        title={t('Deaths')}
                        total={stats.TotalDeaths}
                        today={stats.NewDeaths}
                        loading={loading}
                    />
                </Grid>
                <Grid item>
                    <MetricWidget
                        title={t('Recovered')}
                        total={stats.TotalRecovered}
                        today={stats.NewRecovered}
                        loading={loading}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
