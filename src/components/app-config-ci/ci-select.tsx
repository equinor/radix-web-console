import { Icon } from '@equinor/eds-core-react';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import { GroupBase, components, IndicatorsContainerProps } from 'react-select';
import { info_circle } from '@equinor/eds-icons';
import { MutableRefObject } from 'react';

type InfoIconProps<Option> = {
  onInfoIconClick?: (ev: MouseEvent, v: Option) => void;
  infoIconRef?: MutableRefObject<HTMLElement>;
};

const IndicatorsContainer: <Option>(
  props: IndicatorsContainerProps<Option, boolean> & InfoIconProps<Option>
) => JSX.Element = ({ children, ...props }) => {
  // @ts-ignore react-select selectProps is not a generic type
  const { onInfoIconClick, value, infoIconRef } = props.selectProps;

  return (
    <components.IndicatorsContainer {...props}>
      {props.hasValue && onInfoIconClick && (
        <Icon
          style={{ cursor: 'pointer' }}
          ref={infoIconRef}
          onClick={(ev) => onInfoIconClick?.(ev, value)}
          data={info_circle}
        />
      )}
      {children}
    </components.IndicatorsContainer>
  );
};

export const ConfigurationItemSelect: <Option>(
  props: AsyncProps<Option, boolean, GroupBase<Option>> & InfoIconProps<Option>
) => JSX.Element = (props) => (
  <AsyncSelect components={{ IndicatorsContainer }} {...props} />
);
