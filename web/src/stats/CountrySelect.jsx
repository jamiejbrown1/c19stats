import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getCountries } from './StatsApi';
import { useSnackbar } from 'material-ui-snackbar-provider';

const useStyles = makeStyles(() => ({
    root: {
        width: '300px',
        height: '60px',
    },
}));

export const globalSelection = {
    Country: 'Global',
    Slug: 'global',
};

export default function CountrySelect(props) {
    const { selected, onSelect } = props;
    const [countries, setCountries] = useState([globalSelection]);
    const classes = useStyles();
    const { t } = useTranslation();
    const snackbar = useSnackbar();

    useEffect(async () => {
        try {
            const res = await getCountries();
            setCountries([globalSelection, ...res]);
        } catch (err) {
            snackbar.showMessage(t('Failed to load data'))
        }
    }, []);

    return (
        <Autocomplete
            disableClearable
            value={selected}
            onChange={(_, newValue) => {
                onSelect(newValue);
            }}
            options={countries}
            getOptionLabel={(option) => option.Country}
            className={classes.root}
            renderInput={(params) => <TextField {...params} label={t('Country')} />}
        />
    );
}

CountrySelect.propTypes = {
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};
