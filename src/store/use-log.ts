import { useEffect } from 'react'

export function useReplicaLogStream(
  appName: string,
  envName: string,
  componentName: string,
  podName: string,
  lines: number,
  callback: (msg: string, isError: boolean) => void
) {
  useEffect(() => {
    const url = `/api/v1/applications/${appName}/environments/${envName}/components/${componentName}/replicas/${podName}/logs?follow=true&lines=${lines}`
    const eventSource = new EventSource(url)

    eventSource.onmessage = (event) => {
      callback(event.data, false)
    }

    eventSource.onerror = () => {
      callback('Connection error. Please refresh the page to restart the log stream.', true)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [appName, envName, componentName, podName, lines, callback])
}
