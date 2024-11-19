export enum PipelineStep {
  CloneConfig = 'clone-config',
  CloneRepository = 'clone',
  CloneConfigToMap = 'config-2-map', // deprecated, here for backward compatibility
  OrchestratePipeline = 'radix-pipeline',
  PreparePipelines = 'prepare-pipelines',
  RunSubPipeline = 'run-pipelines',
  BuildComponent = 'build',
}

export function getPipelineStepDescription(stepName: string): string | null {
  switch (stepName) {
    case PipelineStep.CloneConfig:
      return 'Cloning Radix config from config branch';
    case PipelineStep.CloneConfigToMap:
      return 'Copying radixconfig.yaml from config branch';
    case PipelineStep.OrchestratePipeline:
      return 'Orchestrating pipeline';
    case PipelineStep.PreparePipelines:
      return 'Prepare pipeline';
    case PipelineStep.RunSubPipeline:
      return 'Run sub-pipeline';
    case PipelineStep.BuildComponent:
      return 'Building component';
    default:
      return null;
  }
}

export function getPipelineStepTitle(stepName: string): string | null {
  switch (stepName) {
    case PipelineStep.CloneConfig:
      return 'Cloning Radix config';
    case PipelineStep.CloneRepository:
      return 'Cloning repository';
    case PipelineStep.CloneConfigToMap:
      return 'Copying Radix config';
    case PipelineStep.OrchestratePipeline:
      return 'Orchestrating pipeline';
    case PipelineStep.PreparePipelines:
      return 'Prepare pipeline';
    case PipelineStep.RunSubPipeline:
      return 'Run sub-pipeline';
    default:
      return null;
  }
}
