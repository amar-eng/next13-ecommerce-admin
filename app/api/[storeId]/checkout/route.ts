import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { cartItems } = await req.json();

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: cartItems.map((product: any) => product.id),
      },
    },
    include: {
      images: {
        take: 1,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    const orderItem = cartItems.find((item: any) => item.id === product.id);
    const imageUrl = product.images.length > 0 ? product.images[0].url : null;

    line_items.push({
      quantity: orderItem.orderQuantity,
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.name,
          images: imageUrl ? [imageUrl] : [],
        },
        unit_amount: product.price.toNumber() * 100,
      },
    });
  });

  const order = await prismadb.order.create({
    data: {
      store: {
        connect: {
          id: params.storeId,
        },
      },

      orderItems: {
        create: cartItems.map((item: any) => ({
          product: {
            connect: {
              id: item.id,
            },
          },
          orderQuantity: item.orderQuantity,
        })),
      },

      isPaid: false,
      totalPaid: 0,
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/post-checkout`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
