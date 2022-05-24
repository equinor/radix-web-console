export enum PipelineStep {
  CloneConfig = 'clone-config',
  CloneRepository = 'clone',
  CloneConfigToMap = 'config-2-map',
  OrchestratePipeline = 'radix-pipeline',
  PreparePipelines = 'prepare-pipelines',
  RunPipelines = 'run-pipelines',
}

export const getPipelineStepDescription = (stepName: string): string => {
  switch (stepName) {
    case PipelineStep.CloneConfig:
      return 'Cloning Radix config from config branch';
    case PipelineStep.CloneRepository:
      return 'Cloning repository';
    case PipelineStep.CloneConfigToMap:
      return 'Copying radixconfig.yaml from config branch'; //outdated, needed for old jobs
    case PipelineStep.OrchestratePipeline:
      return 'Orchestrating pipeline';
    case PipelineStep.PreparePipelines:
      return 'Prepare pipelines';
    case PipelineStep.RunPipelines:
      return 'Run pipelines';
    default:
      return null;
  }
};

export const getPipelineStepTitle = (stepName: string): string => {
  switch (stepName) {
    case PipelineStep.CloneConfig:
      return 'Cloning Radix config';
    case PipelineStep.CloneRepository:
      return 'Cloning repository';
    case PipelineStep.CloneConfigToMap:
      return 'Copying Radix config'; //outdated, needed for old jobs
    case PipelineStep.OrchestratePipeline:
      return 'Orchestrating pipeline';
    case PipelineStep.PreparePipelines:
      return 'Prepare pipelines';
    case PipelineStep.RunPipelines:
      return 'Run pipelines';
    default:
      return stepName;
  }
};
