import { Icon, Typography } from '@equinor/eds-core-react'
import { type IconData, link, memory } from '@equinor/eds-icons'
import { Link } from 'react-router-dom'
import type { Component } from '../../store/radix-api'
import { getActiveComponentUrl, getActiveJobComponentUrl } from '../../utils/routing'
import { ExternalLink } from '../link/external-link'

export const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME'
const MAX_DISPLAY_COMPONENTS = 2

export interface EnvironmentIngressProps {
  appName: string
  envName: string
  components?: Component[]
}
export const EnvironmentIngress = ({ components, appName, envName }: EnvironmentIngressProps) => {
  const comps = components?.reduce<{
    public: Array<Component>
    passive: Array<Component>
  }>(
    (obj, x) => {
      obj[!x.variables?.[URL_VAR_NAME] ? 'passive' : 'public'].push(x)
      return obj
    },
    { public: [], passive: [] }
  ) ?? { public: [], passive: [] }

  const tooManyPublic = comps.public.length > MAX_DISPLAY_COMPONENTS
  const tooManyPassive = comps.passive.length > MAX_DISPLAY_COMPONENTS

  if (tooManyPublic) {
    comps.public = comps.public.slice(0, MAX_DISPLAY_COMPONENTS)
  }
  if (tooManyPassive) {
    comps.passive = comps.passive.slice(0, MAX_DISPLAY_COMPONENTS)
  }

  return (
    <>
      {comps.public.length > 0 ? (
        comps.public.map((component) => (
          <ExternalLink key={component.name} href={`https://${component.variables?.[URL_VAR_NAME] ?? ''}`} className="">
            <ComponentDetails icon={link} component={component} />
          </ExternalLink>
        ))
      ) : (
        <Typography color="disabled">
          <Icon data={link} style={{ marginRight: 'var(--eds_spacing_small)' }} />
          No link available
        </Typography>
      )}
      {comps.passive
        .filter(({ status }) => status === 'Outdated')
        .map((component) => (
          <Typography
            key={component.name}
            as={Link}
            to={getComponentUrl(appName, envName, component)}
            link
            token={{ textDecoration: 'none' }}
          >
            <ComponentDetails icon={memory} component={component} />
          </Typography>
        ))}
      {tooManyPublic && tooManyPassive && <div>…</div>}
    </>
  )
}

type ComponentDetailsProps = {
  icon: IconData
  component: Readonly<Component>
}
const ComponentDetails = ({ icon, component }: ComponentDetailsProps) => (
  <>
    <Icon data={icon} style={{ marginRight: 'var(--eds_spacing_small)' }} />
    <Typography
      as="span"
      token={{
        color: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
      }}
    >
      {component.name}
    </Typography>
  </>
)

function getComponentUrl(appName: string, environmentName: string, component: Readonly<Component>): string {
  return component.type === 'job'
    ? getActiveJobComponentUrl(appName, environmentName, component.name)
    : getActiveComponentUrl(appName, environmentName, component.name)
}
