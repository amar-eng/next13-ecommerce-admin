'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';

interface SalesButtonProps {
  storeId: string;
}

const SalesButton: React.FC<SalesButtonProps> = ({ storeId }) => {
  const router = useRouter();

  const goToCartClick = () => {
    router.push(`${storeId}/orders`);
    console.log('pushed');
  };
  return (
    <Button variant="ghost" onClick={goToCartClick}>
      See Sales History <ArrowRightIcon style={{ marginLeft: '0.5rem' }} />
    </Button>
  );
};
export default SalesButton;
