import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput() {
  return (
    <Paper
      className="search-input"
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 50,
        maxWidth: 285,
      }}
    >
      <InputBase
        sx={{
          ml: 2,
          flex: 1,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 18,
        }}
        inputProps={{ 'aria-label': 'pesquisar trilha' }}
      />
      <IconButton
        type="button"
        sx={{ p: '10px', mr: 1 }}
        aria-label="perquisar"
      >
        <SearchIcon sx={{ fontSize: 24 }} />
      </IconButton>
    </Paper>
  );
}
