import { smallReplicaName } from '../../utils/string';

const Replicas = ({ replicaList }) => (
  <>
    {replicaList &&
      replicaList
        .map((replica) => (
          <span key={replica.name}>{smallReplicaName(replica.name)}</span>
        ))
        .reduce((prev, curr) => [prev, ', ', curr])}
    {!replicaList && <span key="none">No active replicas</span>}
  </>
);

export default Replicas;
