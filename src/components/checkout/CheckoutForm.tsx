'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2, CreditCard, SquareParking, CircleDollarSign, ShieldCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';

const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;

const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postcode: z.string().regex(ukPostcodeRegex, 'Please enter a valid UK postcode'),
  orderNotes: z.string().optional(),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
}).refine(data => {
    if (data.cardNumber) {
        return data.cardName && data.cardName.length > 0 && 
               data.cardNumber.length === 16 &&
               data.expiryDate && /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(data.expiryDate) &&
               data.cvc && data.cvc.length >= 3;
    }
    return true;
}, {
    message: "Please fill all card details correctly",
    path: ['cardName'] // you can specify which field to show the error on
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isGiftWrapping, setIsGiftWrapping] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });
  
  const shippingCost = 15;
  const giftWrapCost = isGiftWrapping ? 5 : 0;
  
  const bulkDiscountThreshold = 2000;
  const bulkDiscountPercentage = 0.10; // 10%
  const bulkDiscount = total > bulkDiscountThreshold ? total * bulkDiscountPercentage : 0;

  const grandTotal = total - bulkDiscount + shippingCost + giftWrapCost;
  
  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 5);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 7);
  const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });


  const onSubmit = (data: CheckoutFormValues) => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
        setIsProcessing(false);
        const orderId = `AH-${Math.floor(Math.random() * 90000) + 10000}`;
        toast({
            title: "Order Placed!",
            description: `Your order ${orderId} has been successfully placed.`,
        });
        clearCart();
        router.push(`/orders/${orderId}`);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register('firstName')} />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register('lastName')} />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register('address')} placeholder="123 Example Street" />
              {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register('city')} placeholder="London"/>
                {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode</Label>
                <Input id="postcode" {...register('postcode')} placeholder="SW1A 0AA" />
                {errors.postcode && <p className="text-sm text-destructive">{errors.postcode.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="orderNotes">Order Notes (optional)</Label>
                <Textarea id="orderNotes" {...register('orderNotes')} placeholder="Any special instructions for your order?" />
             </div>
             <div className="flex items-center space-x-2">
                <Checkbox id="gift-wrapping" onCheckedChange={(checked) => setIsGiftWrapping(checked as boolean)} />
                <label
                    htmlFor="gift-wrapping"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Add gift wrapping for {formatPrice(5)}
                </label>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4" /> Card</TabsTrigger>
                        <TabsTrigger value="paypal"><SquareParking className="mr-2 h-4 w-4" /> PayPal</TabsTrigger>
                        <TabsTrigger value="klarna"><CircleDollarSign className="mr-2 h-4 w-4" /> Klarna</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="pt-4 space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input id="cardName" {...register('cardName')} />
                            {errors.cardName && <p className="text-sm text-destructive">{errors.cardName.message}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="0000 0000 0000 0000" {...register('cardNumber')} />
                            {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" placeholder="MM/YY" {...register('expiryDate')} />
                                {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" {...register('cvc')} />
                                {errors.cvc && <p className="text-sm text-destructive">{errors.cvc.message}</p>}
                            </div>
                        </div>
                         <div className="flex items-center justify-center p-2 rounded-md bg-muted text-muted-foreground mt-4 text-xs">
                           <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                           Your payment information is processed securely.
                        </div>
                    </TabsContent>
                    <TabsContent value="paypal" className="pt-4">
                        <div className="text-center p-8 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground mb-4">You will be redirected to PayPal to complete your purchase.</p>
                            <Button type="button" className="bg-[#0070BA] hover:bg-[#005ea6] w-full">Pay with PayPal</Button>
                        </div>
                    </TabsContent>
                     <TabsContent value="klarna" className="pt-4">
                        <div className="text-center p-8 border-2 border-dashed rounded-lg">
                           <p className="text-muted-foreground mb-4">Pay in 3 interest-free payments. You will be redirected to Klarna.</p>
                           <Button type="button" className="bg-[#FFB3C7] text-black hover:bg-[#ff94b2] w-full">Pay with Klarna</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => {
              const image = PlaceHolderImages.find(img => img.id === item.product.images[0]);
              return (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                    {image && <Image src={image.imageUrl} alt={item.product.name} fill className="object-cover" data-ai-hint={image.imageHint} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              );
            })}
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{formatPrice(total)}</p>
              </div>
              {bulkDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <p>Bulk Order Discount (10%)</p>
                  <p>-{formatPrice(bulkDiscount)}</p>
                </div>
              )}
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>{formatPrice(shippingCost)}</p>
              </div>
              {isGiftWrapping && (
                <div className="flex justify-between">
                    <p>Gift Wrapping</p>
                    <p>{formatPrice(giftWrapCost)}</p>
                </div>
              )}
              <div className="flex justify-between text-sm text-muted-foreground">
                <p>Estimated Delivery</p>
                <p>{formatDate(deliveryStart)} - {formatDate(deliveryEnd)}</p>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>{formatPrice(grandTotal)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(grandTotal)}`}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
