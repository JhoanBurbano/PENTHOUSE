import { Traces } from '@/types/Property'
import { formatPrice, formatDate } from '@/utils/formatters'
import { Invoice01Icon } from 'hugeicons-react'
import React, { memo } from 'react'

interface TraceCardProps {
  trace: Traces
}

const TraceCard = memo(({ trace }: TraceCardProps) => {
  const formattedDate = formatDate(trace.dateSale)
  const formattedPrice = formatPrice(trace.value)

  return (
    <article className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Invoice01Icon size={24} className="text-primary" />
        </div>
        
        <div className="flex-1 grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-serif">Name</span>
            <span className="font-sans font-medium text-sm text-gray-900">
              {trace.name}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-serif">Date</span>
            <span className="font-sans font-medium text-sm text-gray-900">
              {formattedDate}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-serif">Price</span>
            <span className="font-sans font-semibold text-sm text-primary">
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
})

TraceCard.displayName = 'TraceCard'

export default TraceCard