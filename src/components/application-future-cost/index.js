import { ApplicationCost } from "../application-cost";
import useGetApplicationCostEstimate from "./use-get-application-cost-estimate"
import PropTypes from 'prop-types';
import applicationCost from "../../models/application-cost";


export const FutureApplicationCost = (props) => {
  const {appName} = props;
  const [applicationCost] = useGetApplicationCostEstimate(appName);

  return (
    <div className="app-overview_info-tile">
      <h3 className="app-overview_info-tile-head">Future estimate</h3>
      <FontAwesomeIcon
        className="app-overview_info-tile-head"
        icon={faChartArea}
        size="6x"
        />
        <React.Fragment>
          <div className="app-overview_info-tile-body">
            <AsyncResource asyncState={applicationCost}>
              <CostContent applicationCostEstimate={applicationCost.data}></CostContent>
            </AsyncResource>
          </div>
        </React.Fragment>
    </div>
  );
};

ApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
  applicationCostEstimate: PropTypes.shape(applicationCost)
}

export default connect(mapStateToProps)(ApplicationCost)
