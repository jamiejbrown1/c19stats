import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'material-ui-snackbar-provider';
import Divider from '@material-ui/core/Divider';
import MetricWidget from '../components/MetricWidget';
import { getCountries, getStats } from './StatsApi';
import CountrySelect from '../components/CountrySelect';
import logo from '../resources/logo.svg';
import SvgIcon from '@material-ui/core/SvgIcon';

const globalSelection = {
    Country: 'Global',
    Slug: 'global',
};

const emptyStats = {
    TotalConfirmed: 0,
    NewConfirmed: 0,
    TotalDeaths: 0,
    NewDeaths: 0,
    TotalRecovered: 0,
    NewRecovered: 0,
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100%',
        backgroundColor: theme.palette.background.default,
    },
    titleContainer: {
        margin: theme.spacing(3),
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
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    metrics: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
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
                if (err.response.status === 404) {
                    snackbar.showMessage(t('No stats found for', { country: selectedCountry.Country }));
                    setStats(emptyStats);
                } else {
                    snackbar.showMessage(t('Failed to load Stats'));
                }
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
                <Typography className={`${classes.titleLeft} animate__animated animate__fadeInLeft`}>
                    <img src={logo} height={35} width={50} alt="" />
                    {t('COV19')}
                </Typography>
                <Divider className={classes.titleDivider} flexItem orientation="vertical" />
                <Typography className={`${classes.titleRight} animate__animated animate__fadeInRight`}>{t('Stats')}</Typography>
            </Box>
            <CountrySelect
                countries={countries}
                selected={selectedCountry}
                onSelect={setSelectedCountry}
            />
            <Grid container justify="space-evenly" spacing={2} className={classes.metrics}>
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
