import { Icon, Typography } from '@equinor/eds-core-react';
import { time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { RadixJobConditionBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';
import {
  StepModel,
  StepModelValidationMap,
} from '../../models/radix-api/jobs/step';
import { routes } from '../../routes';
import { differenceInWords, formatDateTimePrecise } from '../../utils/datetime';
import { getPipelineStepDescription } from '../../utils/pipeline';
import { routeWithParams } from '../../utils/string';

function getComponents(name: string, components: Array<string>): string {
  if (components?.length > 1) {
    const maxEnumeratedComponents = 3;
    return components.length > maxEnumeratedComponents
      ? components.slice(0, maxEnumeratedComponents - 1).join(',') + '…'
      : components.slice(0, -1).join(',') + ' and ' + components.slice(-1);
  }

  return name;
}

const StepDuration: FunctionComponent<Pick<StepModel, 'started' | 'ended'>> = ({
  ended,
  started,
}) =>
  started ? (
    <>
      <RelativeToNow time={started} titlePrefix="Start time" capitalize />
      {ended && (
        <span title={`End time ${formatDateTimePrecise(ended)}`}>
          {differenceInWords(ended, started)}
        </span>
      )}
    </>
  ) : (
    <>Not yet started</>
  );

const StepDescription: FunctionComponent<
  Pick<StepModel, 'name' | 'components'>
> = ({ name, components }) => {
  const stepDescription = getPipelineStepDescription(name);
  if (stepDescription) {
    return <>{stepDescription}</>;
  }

  const buildComponent = name.match(/^build-(.+)$/);
  if (buildComponent) {
    return (
      <>
        Building <strong>{getComponents(buildComponent[1], components)}</strong>{' '}
        component
      </>
    );
  }

  const scanComponent = name.match(/^scan-(.+)$/);
  if (scanComponent) {
    return (
      <>
        Scanning <strong>{getComponents(scanComponent[1], components)}</strong>{' '}
        component
      </>
    );
  }

  return <>Unknown step</>;
};

export interface StepSummaryProps {
  appName: string;
  jobName: string;
  step: StepModel;
}

export const StepSummary: FunctionComponent<StepSummaryProps> = ({
  appName,
  jobName,
  step,
}) => (
  <div className="step-summary__content">
    <div className="step-summary__description">
      <Typography
        as={Link}
        to={routeWithParams(routes.appJobStep, {
          appName,
          jobName,
          stepName: step.name,
        })}
        link
        token={{ textDecoration: 'none', textTransform: 'capitalize' }}
      >
        <StepDescription name={step.name} components={step.components} />
      </Typography>

      <RadixJobConditionBadge status={step.status} />
    </div>

    <div className="step-summary__time">
      <Icon className="step__icon" data={time} />
      <div className="grid grid--gap-small">
        <StepDuration started={step.started} ended={step.ended} />
      </div>
    </div>
  </div>
);

StepSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  step: PropTypes.shape(StepModelValidationMap)
    .isRequired as PropTypes.Validator<StepModel>,
};
