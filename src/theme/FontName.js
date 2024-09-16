import {PixelRatio} from 'react-native';

const fontScale = PixelRatio.getFontScale();
export const FontSize = size => size / fontScale;

export const FontName = {
  Gorditas_Bold: 'Gordita Bold',
  Gordita_Medium: 'Gordita Medium',
  Gordita_Regular: 'Gordita Regular',
};
