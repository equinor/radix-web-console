export interface adGroupModel {
  '@odata.context'?: string;
  '@odata.nextLink'?: string;
  color?: string;
  displayName: string;
  id: string;
}

export interface adGroupsModel {
  '@odata.context'?: string;
  '@odata.nextLink'?: string;
  value: adGroupModel[];
}
