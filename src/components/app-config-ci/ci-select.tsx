import { Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import React, { MouseEvent, MutableRefObject } from 'react';
import {
  components,
  GroupBase,
  IndicatorsContainerProps,
  PropsValue,
} from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';

type InfoIconProps<Option> = {
  onInfoIconClick?: (
    event: MouseEvent<SVGSVGElement>,
    value: PropsValue<Option>
  ) => void;
  containerRef?: MutableRefObject<HTMLDivElement>;
};

const IndicatorsContainer: <Option>(
  props: IndicatorsContainerProps<Option, boolean> & {
    selectProps: InfoIconProps<Option>;
  }
) => React.JSX.Element = ({ children, ...props }) => (
  <components.IndicatorsContainer {...props}>
    {props.hasValue && props.selectProps.onInfoIconClick && (
      <div ref={props.selectProps.containerRef}>
        <Icon
          style={{ cursor: 'pointer' }}
          data={info_circle}
          onClick={(event) =>
            props.selectProps.onInfoIconClick(event, props.selectProps.value)
          }
        />
      </div>
    )}
    {children}
  </components.IndicatorsContainer>
);

export const ConfigurationItemSelect: <Option>(
  props: AsyncProps<Option, boolean, GroupBase<Option>> & InfoIconProps<Option>
) => React.JSX.Element = (props) => (
  <AsyncSelect components={{ IndicatorsContainer }} {...props} />
);
