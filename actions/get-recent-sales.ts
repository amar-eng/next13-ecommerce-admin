import prismadb from '@/lib/prismadb';
import { subMonths } from 'date-fns';

export const getRecentSales = async (storeId: string) => {
  // Get the date for one month ago
  const oneMonthAgo = subMonths(new Date(), 1);

  // Query the database for orders in the past month including order items and the product price
  const recentOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: oneMonthAgo,
      },
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

  // Extract the relevant information from the orders
  const recentSalesData = recentOrders.map((order) => {
    const amount = order.totalPaid;
    const userEmail = order.userEmail;
    const userName = order.userName;

    return {
      name: userName,
      email: userEmail,
      amount,
    };
  });

  return recentSalesData;
};

export const getMonthlySalesCount = async (storeId: string) => {
  // Get the date for one month ago
  const oneMonthAgo = subMonths(new Date(), 1);

  // Query the database for orders in the past month
  const monthlyOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: oneMonthAgo,
      },
    },
  });

  // The length of the monthlyOrders array is the number of sales in the past month
  const salesCount = monthlyOrders.length;

  return salesCount;
};
