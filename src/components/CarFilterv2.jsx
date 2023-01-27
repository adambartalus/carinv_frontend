import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { getMakes } from "../fetch/fetchMakes";
import AsynchronousAutocomplete from "./AsyncAutocomplete";

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CarFilter = ({ filterOptions, setFilterOptions, ...props }) => {

  const handleMakeChange = (_, options, action, make) => {
    switch (action) {
      case 'clear':
        setFilterOptions(prev => ({ ...prev, makes: [] }));
        break;
      case 'removeOption':
        setFilterOptions(
          prev => ({
            ...prev,
            makes: prev.makes.filter(m => m.id != make.option.id)
          })
        );
        break;
      case 'selectOption':
        if (filterOptions.makes?.map(m => m.id).includes(make.option.id)) {
          setFilterOptions(
            prev => ({
              ...prev,
              makes: prev.makes.filter(m => m.id != make.option.id)
            })
          );
        } else {
          setFilterOptions(
            prev => ({
              ...prev,
              makes: [ ...prev.makes, { id: make.option.id, name: make.option.name } ]
            })
          );
        }
        break;
      default:
        break;
    }
  }

  return (
    <Stack spacing={2} >
      <AsynchronousAutocomplete
        limitTags={3}
        multiple
        onChange={handleMakeChange}
        value={filterOptions.makes || []}
        fetchOptions={getMakes}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name ?? option}
        sortOptions={(a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={filterOptions.makes?.map(m => m.id).includes(option.id)}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Makes" />
        )}
      />
      <TextField
        label='Model'
        fullWidth
        value={filterOptions.model || ''}
        onChange={e => setFilterOptions(prev => ({ ...prev, model: e.target.value }))}
      />
      <Box>
        <Typography id="input-slider" gutterBottom>
          Model year
        </Typography>
        <div style={{ padding: '0 1rem' }} >
          <Slider
            disableSwap
            getAriaLabel={() => "Model year"}
            value={[filterOptions.minModelYear, filterOptions.maxModelYear]}
            onChange={(e, value, thumb) => setFilterOptions(prev => ({ ...prev, minModelYear: value[0], maxModelYear: value[1] }))}
            min={1913}
            max={2023}
            valueLabelDisplay='auto'
          />
        </div>
      </Box>
      <TextField
        label='Min model year'
        fullWidth
        value={filterOptions.minModelYear || ''}
        onChange={e => setFilterOptions(prev => ({ ...prev, minModelYear: e.target.value }))}
      />
      <TextField
        label='Max model year'
        fullWidth
        value={filterOptions.maxModelYear || ''}
        onChange={e => setFilterOptions(prev => ({ ...prev, maxModelYear: e.target.value }))}
      />
    </Stack>
  );
}

export default CarFilter;
