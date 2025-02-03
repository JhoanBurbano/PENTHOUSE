import Image from "next/image";
import { useState } from "react";

interface CardImageProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

const CardImage = ({ 
  title = "John Doe", 
  subtitle = "joans.burbano@gmail.com", 
  image="https://i.pravatar.cc/300" 
}: CardImageProps) => {
  const [imgSrc, setImgSrc] = useState(image);
  
  const handleError = () => {
    const sanitizedTitle = encodeURIComponent(title.replace(/[^a-zA-Z0-9]/g, ''));
    setImgSrc(`https://i.pravatar.cc/150?u=${sanitizedTitle}-profile`);
  };

  return (
    <div className="flex gap-2 items-center">
      <figure className="w-[50px] h-[50px] object-cover bg-gray-300 flex items-center justify-center overflow-hidden rounded-full">
        <Image
          src={imgSrc}
          alt={title}
          width={300}
          height={200}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      </figure>
      <span className="flex flex-col flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </span>
    </div>
  );
};

export default CardImage;