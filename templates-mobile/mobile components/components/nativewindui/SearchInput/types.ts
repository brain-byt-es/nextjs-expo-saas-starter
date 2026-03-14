import type { TextInput, TextInputProps } from 'react-native';

type SearchInputRef = React.Ref<TextInput>;

type SearchInputProps = TextInputProps & {
  ref?: SearchInputRef;
  containerClassName?: string;
  iconContainerClassName?: string;
  cancelText?: string;
  iconColor?: string;
};

export type { SearchInputProps, SearchInputRef };
