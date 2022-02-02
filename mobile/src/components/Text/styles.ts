import styled, { css } from 'styled-components/native';
import { Text } from 'react-native';

import colors from '@/styles/colors';
import fonts from '@/styles/fonts';
import { TextType } from '.';

interface ITextComponentTextProps {
  type: TextType;
}

export const TextComponentText = styled(Text)<ITextComponentTextProps>`
  ${props =>
    props.type === 'heading' &&
    css`
      color: ${colors.accent_0};
      font-family: ${fonts.bold};
      font-size: 36px;
    `}

  ${props =>
    props.type === 'title' &&
    css`
      color: ${colors.accent_0};
      font-family: ${fonts.medium};
      font-size: 24px;
    `}

  ${props =>
    props.type === 'subtitle' &&
    css`
      color: ${colors.accent_0};
      font-family: ${fonts.medium};
      font-size: 16px;
    `}

  ${props =>
    props.type === 'base' &&
    css`
      color: ${colors.accent_2};
      font-family: ${fonts.regular};
      font-size: 16px;
    `}

  ${props =>
    props.type === 'complement' &&
    css`
      color: ${colors.accent_2};
      font-family: ${fonts.regular};
      font-size: 12px;
    `}
`;
