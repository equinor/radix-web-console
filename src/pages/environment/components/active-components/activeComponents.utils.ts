import type { Component, OAuth2AuxiliaryResource } from '../../../../store/radix-api'

export const hasComponentOAuth2Service = (
  component: Component
): component is Component & { oauth2: OAuth2AuxiliaryResource } => !!component.oauth2
