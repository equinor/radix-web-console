export function fallbackRequestConverter<R>(requestData: R): unknown {
  return requestData;
}

export function fallbackResponseConverter<T>(responseData: unknown): T {
  return responseData as T;
}
