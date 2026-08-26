// Extracts the region inside parentheses (e.g. "West Europe" from "Platform 2 (West Europe)").
export const getClusterTabLabel = (clusterName: string): string => {
  const region = /\(([^()]+)\)/.exec(clusterName)?.[1]
  return region ?? clusterName
}
