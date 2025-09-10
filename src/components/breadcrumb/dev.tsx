import { Breadcrumb, type BreadcrumbProps } from './index'

const data: Array<BreadcrumbProps> = [
  {
    links: [
      { label: 'Applications', to: '/applications' },
      { label: 'radix-api', to: '/applications/radix-api' },
      { label: 'prod', to: '/applications/radix-api/env/prod' },
      { label: 'server-8fd44cc58-6zmjt' },
    ],
  },
  {
    links: [
      { label: 'Applications', to: '/applications' },
      { label: 'radix-api', to: '/applications/radix-api' },
      { label: 'prod' },
    ],
  },
  {
    links: [{ label: 'Applications', to: '/applications' }, { label: 'radix-api' }],
  },
]

export default (
  <div
    style={{
      width: 999,
      margin: 'auto',
      marginTop: 50,
      gridGap: 10,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {data.map((x, i) => (
      <Breadcrumb links={x.links} key={i} />
    ))}
  </div>
)
