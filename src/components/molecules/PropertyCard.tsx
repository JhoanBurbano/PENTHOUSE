import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fadeIn, fadeInUp, cardHover } from "@/utils/animations";
import { propertyCardClasses as styles } from "@/constants/styles";
import Badge from "../atoms/Badge";
import CardImage from "../atoms/CardImage";
import {
  Bathtub01Icon,
  BedSingle02Icon,
  Coins01Icon,
  Dollar01Icon,
  Location01Icon,
  RulerIcon,
} from "hugeicons-react";
import IconLabel from "../atoms/IconLabel";
import { formatPrice } from "@/utils/formatters";

interface PropertyCardProps {
  title: string;
  address: string;
  price: number;
  imageUrl: string;
  badgeText?: string;
  onViewDetails: () => void;
  beds: number;
  baths: number;
  lenght: number;
  cardOwner?: {
    id: string;
    name: string;
    address: string;
    photo: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  address,
  price,
  imageUrl,
  badgeText,
  onViewDetails,
  cardOwner = defaultOwner,
  lenght = defaultAmenities.lenght,
  beds = defaultAmenities.beds,
  baths = defaultAmenities.baths,
}) => {
  const priceFormatted = useMemo(() => formatPrice(price), [price]);

  return (
    <motion.article
      {...fadeInUp}
      {...cardHover}
      className={styles.container}
      onClick={onViewDetails}
    >
      <div className={styles.imageContainer}>
        <motion.div {...fadeIn}>
          <PropertyImage src={imageUrl} alt={title} />
        </motion.div>
      </div>

      <motion.div 
        className={styles.contentContainer}
        {...fadeIn}
        transition={{ delay: 0.2 }}
      >
        <PropertyBadge text={badgeText} />
        <PropertyPrice price={priceFormatted} />
        <PropertyLocation address={address} />
        <PropertyTitle title={title} badgeText={badgeText} />
        <motion.hr {...fadeIn} transition={{ delay: 0.4 }} />
        <PropertyAmenities beds={beds} baths={baths} length={lenght} />
        <motion.hr {...fadeIn} transition={{ delay: 0.6 }} />
        <PropertyOwner owner={cardOwner} />
      </motion.div>
    </motion.article>
  );
};

// Sub-components
const PropertyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  src ? (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      className="w-full h-48 object-cover"
    />
  ) : (
    <figure className="w-full h-48 object-cover bg-gray-300 flex items-center justify-center">
      <h1>No Image</h1>
    </figure>
  )
);

const PropertyBadge: React.FC<{ text?: string }> = ({ text }) => (
  <AnimatePresence>
    {text && (
      <motion.div
        {...fadeInUp}
        className="absolute top-4 md:top-6 right-4 md:right-6 flex flex-col items-end md:gap-2"
      >
        <Badge text="For Sale" color="accent" />
        <motion.p 
          {...fadeIn}
          transition={{ delay: 0.3 }}
          className="text-[10px] text-gray-500"
        >
          40 minutes ago
        </motion.p>
      </motion.div>
    )}
  </AnimatePresence>
);

const PropertyPrice: React.FC<{ price: string }> = ({ price }) => (
  <motion.span 
    className={styles.priceContainer}
    {...fadeInUp}
    transition={{ delay: 0.1 }}
  >
    <Dollar01Icon size={24} strokeWidth={2} />
    <h2 className="text-2xl text-black font-sans font-semibold">
      {price}
    </h2>
    <Coins01Icon size={18} />
  </motion.span>
);

const PropertyLocation: React.FC<{ address: string }> = ({ address }) => (
  <motion.span 
    className={styles.locationContainer}
    {...fadeInUp}
    transition={{ delay: 0.2 }}
  >
    <Location01Icon size={16} />
    <h1 className="text-sm font-light uppercase text-gray-900">
      {address}
    </h1>
  </motion.span>
);

const PropertyTitle: React.FC<{ title: string; badgeText?: string }> = ({ title, badgeText }) => (
  <motion.p 
    className="text-sm text-gray-600"
    {...fadeInUp}
    transition={{ delay: 0.3 }}
  >
    {title} | {badgeText}
  </motion.p>
);

const PropertyAmenities: React.FC<{ beds: number; baths: number; length: number }> = ({ 
  beds, 
  baths, 
  length 
}) => (
  <motion.div 
    className={styles.amenitiesContainer}
    {...fadeInUp}
    transition={{ delay: 0.5 }}
  >
    <IconLabel
      icon={<BedSingle02Icon size={20} />}
      message="bed."
      label={beds.toString()}
    />
    <IconLabel
      icon={<Bathtub01Icon size={20} />}
      message="bath."
      label={baths.toString()}
    />
    <IconLabel
      icon={<RulerIcon size={20} />}
      message="sqft."
      label={length.toString()}
    />
  </motion.div>
);

const PropertyOwner: React.FC<{ owner: PropertyCardProps["cardOwner"] }> = ({ owner }) => (
  <motion.div
    {...fadeInUp}
    transition={{ delay: 0.7 }}
  >
    <CardImage
      title={owner?.name || ""}
      subtitle={owner?.address || ""}
      image={owner?.photo || ""}
    />
  </motion.div>
);

// Default values
const defaultAmenities = {
  beds: 6,
  baths: 3,
  lenght: 2000,
};

const defaultOwner = {
  id: "1",
  name: "John Doe",
  address: "john@example.com",
  photo: "https://i.pravatar.cc/300",
};

export default PropertyCard;
