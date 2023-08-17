import { gridClasses, DataGrid } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';

// Setup the alternating rows opacity amount
const ODD_OPACITY = 0.2;

/**
 * StripedDataGrid.js - This function will style the data grid to have alternating row colors.
 *
 */
export const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
          '@media (hover: none)': {
              backgroundColor: 'transparent',
          },
      },
      '&.Mui-selected': {
          backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
          '&:hover, &.Mui-hovered': {
              backgroundColor: alpha(
                  theme.palette.primary.main,
                  ODD_OPACITY +
                  theme.palette.action.selectedOpacity +
                  theme.palette.action.hoverOpacity,
              ),
              '@media (hover: none)': {
                  backgroundColor: alpha(
                      theme.palette.primary.main,
                      ODD_OPACITY + theme.palette.action.selectedOpacity,
                  ),
              },
          },
      },
  },
}));
