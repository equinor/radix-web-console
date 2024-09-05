import jsonConfig from '../../config.json'

function arrayTransformer(
  delimiter = ','
): (value: string | Array<string>) => Array<string> {
  return (v) => (Array.isArray(v) ? v : v?.split(delimiter) ?? [])
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
}

const injectEnvKey = 'injectEnv'

export const configVariables: Readonly<typeof jsonConfig> = Object.freeze(
  Object.keys(jsonConfig).reduce<typeof jsonConfig>(
    (config, key: keyof typeof jsonConfig) => {
      const value =
        !window[injectEnvKey] ||
        !window[injectEnvKey][key] ||
        window[injectEnvKey][key].startsWith('${')
          ? jsonConfig[key]
          : window[injectEnvKey][key]

      config[key] = transformers[key] ? transformers[key](value) : value
      return config
    },
    Object.create({})
  )
)
