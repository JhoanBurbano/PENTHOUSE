import { Coins01Icon, Dollar01Icon } from 'hugeicons-react';
import React, { memo } from 'react';

interface PriceProps {
  amount: number;
  className?: string;
}

const formatToMillions = (amount: number): string => {
  const millions = (amount / 1000000).toFixed(1).replace('.', ',');
  return `${millions}M`;
};

const Price = memo(({ amount, className = '' }: PriceProps) => {
  const formattedPrice = formatToMillions(amount);

  return (
    <article className={`flex items-center gap-1 font-bold text-black ${className}`} data-testid="price-component">
      <Dollar01Icon size={25} strokeWidth={2} className='text-green-800'/>
      <p className="text-2xl font-bold">{formattedPrice}</p>
      <Coins01Icon size={20} strokeWidth={2} className="text-amber-500" />
    </article>
  );
});

Price.displayName = 'Price';

export default Price;