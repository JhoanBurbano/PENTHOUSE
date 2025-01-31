import React from 'react'
import HeroBanner from '@/components/organisms/HeroBanner'
import StatsSection from '@/components/organisms/StatsSection'
import FeaturedProperty from '@/components/organisms/FeaturedProperty'

const HomePage = () => {
  return (
    <div>
        <HeroBanner />
        <main>
          <StatsSection />
          <FeaturedProperty />
        </main>
    </div>
  )
}

export default HomePage