import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 5,
  backgroundColor: '#f5f5f5',
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#ff5a23',
  },
}));

export default function CustomizedProgressBars({ value }) {
  return <BorderLinearProgress variant="determinate" value={value} />;
}
