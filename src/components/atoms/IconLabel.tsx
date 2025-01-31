import React from 'react'

interface Props {
    icon: React.ReactNode
    label: string
    message?: string
}   

const IconLabel = ( { icon, label, message }: Props) => {
  return (
    <div className='flex items-center gap-2'>
        {icon}
        <p className='text-sm font-black text-gray-700'>{label} {message && <span className='text-xs font-normal text-gray-500'>{message}</span>}</p>
    </div>
  )
}

export default IconLabel