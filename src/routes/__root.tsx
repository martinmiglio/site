import PageBackground from '@/components/PageBackground'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <PageBackground />
      <Outlet />
      <TanstackDevtools
        config={{
          position: 'bottom-left'
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />
          }
        ]}
      />
    </>
  )
})
