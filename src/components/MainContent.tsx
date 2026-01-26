'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { SharedToolsHeader } from '@/components/SharedToolsHeader'
import { VerticalAd } from './ads/VerticalAd'

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const isHomePage = pathname === '/'
  const isCategoryPage = isHomePage && !!categoryParam
  const isToolPage = pathname.startsWith('/tools/')

  const showSharedHeader = isToolPage || isCategoryPage

  return (
    <div className="container mx-auto flex-1 px-4 py-8 md:px-6">
      <div className="flex flex-col gap-8 lg:flex-row">
        <main className="flex-1 lg:w-3/4">
          {showSharedHeader && <SharedToolsHeader />}
          {children}
        </main>
        <aside className="w-full lg:w-1/4">
          <div className="sticky top-24 space-y-6">
            <h3 className="font-semibold text-center text-muted-foreground">
              Advertisement
            </h3>
            <VerticalAd />
          </div>
        </aside>
      </div>
    </div>
  )
}
