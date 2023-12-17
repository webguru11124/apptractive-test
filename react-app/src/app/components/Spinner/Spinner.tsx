import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
`;
export const Spinner = ({ size }: { size?: string | number }) => (
  <CenteredBox>
    <CircularProgress size={size} />
  </CenteredBox>
);
