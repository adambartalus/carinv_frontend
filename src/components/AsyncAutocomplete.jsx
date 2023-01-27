import { useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

const AsynchronousAutocomplete = ({fetchOptions, sortOptions, TextFieldProps, ...props}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);

  const loadOptions = async () => {
    try {
      setOptions(await fetchOptions());
    } catch(error) {
      setFailedToLoad(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return setOptions([]);
    setLoading(true);
    setFailedToLoad(false);
    loadOptions();
  }, [open]);

  return (
    <Autocomplete
      noOptionsText={failedToLoad ? 'There was an error' : 'No options'}
      openOnFocus
      fullWidth
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={sortOptions ? options.sort(sortOptions) : options}
      loading={loading}
      renderInput={(params) =>  (
        <TextField
          {...params}
          {...TextFieldProps}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
            ...TextFieldProps.InputProps
          }}
          
        />
      )}
      {...props}
    />
  );
}
export default AsynchronousAutocomplete;
