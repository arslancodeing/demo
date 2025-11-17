
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation';
import { notFound } from 'next/navigation';

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
    if (!params.orderId) {
        notFound();
    }

    return <OrderConfirmation orderId={params.orderId} />;
}
