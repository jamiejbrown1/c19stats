import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
    root: {
        width: '300px',
        height: '100px',
    },
}));

export default function CountrySelect(props) {
    const { countries, selected, onSelect } = props;
    const classes = useStyles();
    const { t } = useTranslation();

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
            renderInput={(params) => (
                <TextField
                    {...params}
                    inputProps={{ ...params.inputProps, style: { fontSize: '30px' } }}
                    InputLabelProps={{ ...params.InputLabelProps, style: { fontSize: '28px' } }}
                    label={t('Country')}
                />
            )}
        />
    );
}

CountrySelect.propTypes = {
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    selected: PropTypes.shape({
        Country: PropTypes.string,
        Slug: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
};
