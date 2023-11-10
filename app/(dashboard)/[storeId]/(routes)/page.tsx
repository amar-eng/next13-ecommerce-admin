import { BarChart, CreditCard, DollarSign, Package, Users } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Overview } from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { getTotalRevenue } from '@/actions/get-total-revenue';
import { getSalesCount } from '@/actions/get-sales-count';
import { getGraphRevenue } from '@/actions/get-graph-revenue';
import { getStockCount } from '@/actions/get-stock-count';
import { formatter } from '@/lib/utils';
import {
  getMonthlySalesCount,
  getRecentSales,
} from '@/actions/get-recent-sales';
import { Button } from '@/components/ui/button';
import SalesItem from '@/components/sales-items';
import SalesButton from '@/components/sales-button';
import { ArrowRightIcon } from '@radix-ui/react-icons';

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const recentSales = await getRecentSales(params.storeId);
  const monthlySales = await getMonthlySalesCount(params.storeId);

  const lastFewSales = recentSales.reverse().slice(-4) || [];
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex">
                Overview{' '}
                <BarChart className="mx-2 h-6 w-6 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex">
                Recent Sales{' '}
                <Users className="mx-2 h-6 w-6 text-muted-foreground" />
              </CardTitle>
              <p className="text-sm font-light text-muted-foreground">
                You made {monthlySales} sales this month 
              </p>
              <SalesButton storeId={params.storeId} />
            </CardHeader>
            <CardContent className="pl-2">
              {lastFewSales.map((sale, index) => (
                <SalesItem data={sale} key={index} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
