import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'material-ui-snackbar-provider';
import MetricWidget from '../components/MetricWidget';
import { getCountries, getStats } from './StatsApi';
import CountrySelect from '../components/CountrySelect';
import Divider from '@material-ui/core/Divider';

const globalSelection = {
    Country: 'Global',
    Slug: 'global',
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        backgroundColor: theme.palette.background.default,
    },
    titleContainer: {
        margin: '20px',
        display: 'flex',
    },
    titleLeft: {
        fontSize: '46px',
        fontWeight: 500,
        color: theme.palette.primary.main,
    },
    titleRight: {
        fontSize: '46px',
        fontWeight: 300,
        color: theme.palette.text.primary,
    },
    titleDivider: {
        margin: '0 5px',
    },
    widgets: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
    },
}));

export default function Stats() {
    const [stats, setStats] = useState({});
    const [countries, setCountries] = useState([globalSelection]);
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
                snackbar.showMessage(t('Failed to load Stats'));
            } finally {
                setLoading(false);
            }
        }
        fetchStats(selectedCountry.Slug);
    }, [selectedCountry, snackbar, t]);

    useEffect(() => {
        async function fetchCountries() {
            try {
                const res = await getCountries();
                setCountries([globalSelection, ...res]);
            } catch (err) {
                snackbar.showMessage(t('Failed to load Countries'));
            }
        }
        fetchCountries();
    }, [snackbar, t]);

    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <Typography className={`${classes.titleLeft} animate__animated animate__fadeInLeft`}>{t('COV19')}</Typography>
                <Divider className={classes.titleDivider} flexItem orientation="vertical" />
                <Typography className={`${classes.titleRight} animate__animated animate__fadeInRight`}>{t('Stats')}</Typography>
            </Box>
            <CountrySelect
                countries={countries}
                selected={selectedCountry}
                onSelect={setSelectedCountry}
            />
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
