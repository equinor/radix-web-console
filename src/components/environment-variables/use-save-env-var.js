import { usePatchJson } from '../../effects';
import ChangeOwnerForm from '../page-configuration/change-owner-form';

const useSaveEnvVar = (appName) => {
  const path = `/applications/${appName}`;

  return usePatchJson(path, (newEnvVar) => {
    return { owner: newEnvVar ? newEnvVar.toString() : null };
  });
};

export default useSaveEnvVar;
