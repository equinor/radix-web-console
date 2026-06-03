import type { ElementType, FunctionComponent } from 'react'
import { useParams } from 'react-router'

const WithParams = ({ Component }: { Component: FunctionComponent }) => {
  const params = useParams()
  return <Component {...params} />
}
export const withRouteParams = (Component: FunctionComponent | ElementType) => {
  // @ts-expect-error Component is not matching the type...
  return ({ ...props }) => <WithParams {...props} Component={Component} />
}
