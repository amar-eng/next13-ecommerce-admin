'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

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
      See Sales History
    </Button>
  );
};
export default SalesButton;
