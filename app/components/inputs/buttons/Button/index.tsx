import { ButtonContent } from '../ButtonContent/ButtonContent';
import { createLocalTheme } from '../../../../styling/GlobalTheme';
import styled from 'styled-components';
import { PropsWithChildren, ReactElement } from 'react';

interface CommonButtonProps<TAdditionalProps> {
  label: string;
  ContentComponent?: ButtonContent<TAdditionalProps>;
  contentProps?: TAdditionalProps;
}

interface SubmitButtonProps<TAdditionalProps> extends CommonButtonProps<TAdditionalProps> {
  type: 'submit';
}

interface ResetButtonProps<TAdditionalProps> extends CommonButtonProps<TAdditionalProps> {
  type: 'reset';
}

interface ScriptButtonProps<TAdditionalProps> extends CommonButtonProps<TAdditionalProps> {
  type: 'button';
  onClick: () => void;
}

type ButtonProps<TAdditionalProps> =
  | SubmitButtonProps<TAdditionalProps>
  | ResetButtonProps<TAdditionalProps>
  | ScriptButtonProps<TAdditionalProps>;

const { from } = createLocalTheme(({ globalTheme }) => ({
  border: {
    color: globalTheme.brandColor,
    size: globalTheme.borderSize,
    radius: globalTheme.borderRadius
  },
  backgroundColor: {
    highlighted: globalTheme.brandColor,
    default: globalTheme.backgroundColor
  },
  text: {
    size: globalTheme.textSizes.content,
    color: {
      highlighted: globalTheme.backgroundColor,
      default: globalTheme.textColor
    }
  },
  padding: {
    horizontal: globalTheme.size(1),
    vertical: globalTheme.size(1)
  }
}));

const StyledButton = styled.button`
  padding: ${from(theme => theme.padding.vertical)} ${from(theme => theme.padding.horizontal)};
  border-style: solid;
  border-width: ${from(theme => theme.border.size)};
  border-color: ${from(theme => theme.border.color)};
  border-radius: ${from(theme => theme.border.radius)};
  font-size: ${from(theme => theme.text.size)};
  color: ${from(theme => theme.text.color.default)};
  background-color: ${from(theme => theme.backgroundColor.default)};
  
  &:hover {
    color: ${from(theme => theme.text.color.highlighted)};
    background-color: ${from(theme => theme.backgroundColor.highlighted)};
  }
`;

const Button = function <TAdditionalProps = undefined> (props: PropsWithChildren<ButtonProps<TAdditionalProps>>): ReactElement {
  const onClick = props.type === 'button' ? props.onClick : () => {};
  
  if (!props.ContentComponent) {
    return (
      <StyledButton
        type={ props.type }  
        aria-label={ props.label }
        onClick={ onClick }
      >
        { props.label }
      </StyledButton>
    );
  }

  return (
    <StyledButton
      type={ props.type }
      aria-label={ props.label }
      onClick={ onClick }
    >
      <props.ContentComponent label={ props.label } { ...props.contentProps! } />
    </StyledButton>
  );
};

export {
  Button
};
