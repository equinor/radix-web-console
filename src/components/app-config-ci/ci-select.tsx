import { Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import {
  components,
  GroupBase,
  IndicatorsContainerProps,
  PropsValue,
} from 'react-select';
import { MouseEvent, MutableRefObject } from 'react';

type InfoIconProps<Option> = {
  onInfoIconClick?: (
    event: MouseEvent<SVGSVGElement>,
    value: PropsValue<Option>
  ) => void;
  infoIconRef?: MutableRefObject<SVGSVGElement>;
};

const IndicatorsContainer: <Option>(
  props: IndicatorsContainerProps<Option, boolean> & {
    selectProps: InfoIconProps<Option>;
  }
) => JSX.Element = ({ children, ...props }) => (
  <components.IndicatorsContainer {...props}>
    {props.hasValue && props.selectProps.onInfoIconClick && (
      <Icon
        style={{ cursor: 'pointer' }}
        ref={props.selectProps.infoIconRef}
        data={info_circle}
        onClick={(event) =>
          props.selectProps.onInfoIconClick(event, props.selectProps.value)
        }
      />
    )}
    {children}
  </components.IndicatorsContainer>
);

export const ConfigurationItemSelect: <Option>(
  props: AsyncProps<Option, boolean, GroupBase<Option>> & InfoIconProps<Option>
) => JSX.Element = (props) => (
  <AsyncSelect components={{ IndicatorsContainer }} {...props} />
);
