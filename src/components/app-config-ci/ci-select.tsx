import { Icon } from '@equinor/eds-core-react';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import { GroupBase, components, IndicatorsContainerProps } from 'react-select';
import { info_circle } from '@equinor/eds-icons';

const IndicatorsContainer = ({
  children,
  ...props
}: IndicatorsContainerProps<any, boolean>) => {
  // @ts-ignore
  const { onInfoClick, value, infoRef } = props.selectProps;
  const style = { cursor: 'pointer' };

  return (
    <components.IndicatorsContainer {...props}>
      {props.hasValue && onInfoClick && (
        <Icon
          style={style}
          ref={infoRef}
          onClick={(ev) => onInfoClick?.(ev, value)}
          data={info_circle}
        />
      )}
      {children}
    </components.IndicatorsContainer>
  );
};

export const ConfigurationItemSelect = (
  props: AsyncProps<any, boolean, GroupBase<any>>
) => {
  return <AsyncSelect {...props} components={{ IndicatorsContainer }} />;
};
