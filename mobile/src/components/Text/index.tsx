import React from 'react';
import { TextInputProps, TextStyle } from 'react-native';

import { TextComponentText } from './styles';

export type TextType = 'heading' | 'title' | 'subtitle' | 'base' | 'complement';
interface ITextComponentProps extends TextInputProps {
  type: TextType;
  style?: TextStyle | TextStyle[];
  children: React.ReactElement | string;
}
const Text: React.FC<ITextComponentProps> = ({ children, ...r }) => {
  return <TextComponentText {...r}>{children}</TextComponentText>;
};

export default Text;
