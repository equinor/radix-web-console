/** OnChange event type for PipelineForm */
export type PipelineFormChangeEvent<T> = { value: T; isValid: boolean }

/** Change Event handler for PipelineForm */
export type PipelineFormChangeEventHandler<T> = (ev: PipelineFormChangeEvent<T>) => void
