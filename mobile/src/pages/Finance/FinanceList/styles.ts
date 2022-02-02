import styled from 'styled-components/native';
import colors from '@/styles/colors';

export const CustomerListHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-left: 16px;
  border-radius: 8px;
  background: ${colors.primary};
  width: 100%;

  margin-bottom: 8px;
`;

export const CustomerCreateButton = styled.View`
  position: absolute;
  flex-direction: row;
  right: 24px;
  bottom: 32px;

  background: ${colors.primary};
  border-radius: 16px;
`;
