import { useColorScheme as useColorSchemeCore } from 'react-native';

export const useColorScheme = () => {
  //React native checks the theme of phone
  const coreScheme = useColorSchemeCore();
  return coreScheme === 'unspecified' ? 'light' : coreScheme;
};
