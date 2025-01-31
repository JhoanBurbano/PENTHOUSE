import React from 'react'
import PropertiesPage from '@/pages/PropertiesPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Properties | Penthouse',
  description: 'Browse our exclusive collection of luxury properties',
}

const Properties = () => {
  return (
    <>
      <PropertiesPage />
    </>
  )
}

export default Properties