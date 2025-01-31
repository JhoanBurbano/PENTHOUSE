import Image from 'next/image'
import React from 'react'

interface CardImageProps {
    title: string
    subtitle: string
    image: string
}

const CardImage = ({ title = "John Doe", subtitle = "joans.burbano@gmail.com", image="https://i.pravatar.cc/300" }: CardImageProps) => {
  return (
    <div className="flex gap-2 items-center">
        <figure className="w-[50px] h-[50px] object-cover bg-gray-300 flex items-center justify-center overflow-hidden rounded-full">
        <Image
        src={image}
        alt={title}
        width={300}
        height={200}
        className="w-full h-full object-cover"
      />
        </figure>
      <span className="flex flex-col flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </span>
    </div>
  )
}

export default CardImage