import * as jsonConfig from '../../config.json';

function arrayTransformer(delimiter = ','): (value: string) => Array<string> {
  return (value: string | Array<string>): Array<string> =>
    Array.isArray(value) ? value : value?.split(delimiter) ?? [];
}

const transformers: Partial<
  Record<
    keyof typeof jsonConfig,
    (...values: Array<unknown>) => string | Array<string>
  >
> = {
  CLUSTER_EGRESS_IPS: arrayTransformer(),
  CLUSTER_INGRESS_IPS: arrayTransformer(),
  SERVICENOW_PROXY_SCOPES: arrayTransformer(' '),
};

export const configVariables: Readonly<typeof jsonConfig> = Object.freeze(
  Object.keys(jsonConfig)
    .filter((key) => key !== 'default')
    .reduce<typeof jsonConfig>((config, key: keyof typeof jsonConfig) => {
      const value =
        !window[key] || window[key].startsWith('${')
          ? jsonConfig[key]
          : window[key];

      config[key] = transformers[key] ? transformers[key](value) : value;
      return config;
    }, Object.create({}))
);
