import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

import { OrderColumn } from './components/columns';
import { OrderClient } from './components/client';

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = [];

  orders.forEach((order) => {
    order.orderItems.forEach((orderItem) => {
      const price = Number(orderItem.product.price);

      formattedOrders.push({
        id: order.id,
        phone: order.phone,
        address: order.address,
        products: orderItem.product.name, // Just the name of the single product
        quantity: orderItem.orderQuantity, // The quantity for this product
        totalPrice: orderItem.orderQuantity * price, // Total price for this product
        isPaid: order.isPaid,
        createdAt: format(order.createdAt, 'MMMM do, yyyy'),
        email: order.userEmail,
        name: order.userName,
      });
    });
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
