"use client"

import BreadCrumb from '@/components/BreadCrumb'
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountItemType, CheckoutType, SignUpProps } from '@types/allTypes';
import { signUpForm } from '@utils/actions/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../store/slices/authSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckoutSchema } from '@utils/validations/checkoutValidation';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { shippingOptions, taxRate } from '../../../../datalist';
import { Textarea } from '@/components/ui/textarea';
import CartItemCard from '@/components/CartItemCard';
import { getCart } from '../../../lib/api';
import { toast } from 'sonner';
import EmptyPlaceholder from '../account/_components/EmptyPlaceholder';
import { RootState } from '../../../store/store';
import { calculateCartTotalAfterDiscount, calculateNumOfCartItems } from '@utils/calulations/calculate';
const CartIcon = '/images/icons/empty-cart.png'

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const [cartData, setCartData] = useState<AccountItemType[]>([])
  const [cartCount, setCartCount] = useState<number>(0)
  const [cartSubTotal, setCartSubTotal] = useState<number>(0)
  const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);
  const [totalTax, setTotalTax] = useState<number>(0)
  const [totalShippingCost, setTotalShippingCost] = useState<number>(0)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutType>({
    resolver: zodResolver(CheckoutSchema),  // Use Zod resolver for validation
  });

  const onSubmit = async (data: CheckoutType) => {
    const response = await signUpForm(data);  // Call the signup API with validated data

    if (response.user && response.status === 200) {
      dispatch(setUser(response.user));

      setTimeout(() => {
        router.push("/account/orders")
      }, 1000)
    }
  };

  const fetchCart = async () => {
    try {
      const data = await getCart()

      // If the obeject data is empty then let it be an empty array
      setCartData(Object.keys(data).length > 0 ? data.data : [])
    } catch (error) {
      toast.error("Failed to fetch cart")
    }
  }

  useEffect(() => {
    fetchCart()
  }, [cartStatus])

  useEffect(() => {
    if (cartData.length > 0) {
      const subtotal = calculateCartTotalAfterDiscount(cartData)
      setCartSubTotal(subtotal);

      const totalCartCount = calculateNumOfCartItems(cartData)
      setCartCount(totalCartCount)
    } else {
      setCartSubTotal(0);
      setCartCount(0)
    }
  }, [cartData]);

  const [selectedShippingMethod, setSelectedShippingMethod] = useState("0"); // Default value

  useEffect(()=>{
    setTotalShippingCost(Number(selectedShippingMethod) * cartCount)
  }, [selectedShippingMethod, cartCount])


  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // Default value

  const handlePaymentMethodChange = (value: any) => {
    setSelectedPaymentMethod(value);
  };

  useEffect(()=>{
    const totalTax = Number(((cartSubTotal + totalShippingCost) / 100) * taxRate)
    setTotalTax(totalTax)
  }, [totalShippingCost, cartSubTotal])

  return (
    <div className='bg-slate-50 w-full px-4 pt-6 pb-10'>
      <div className="max-w-[1300px] mx-auto">
        <BreadCrumb
          current="Checkout"
          visitedLinks={[{ title: "Home", link: "/" }, { title: "Shopping Cart", link: "/account/shopping-cart" }]}
        />

        <h1 className='text-5xl font-semibold mt-10 text-center mb-10'>Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-10'>
            <div className='w-2/3 flex flex-col gap-6'>
              {/* Delivery details */}
              <div className='bg-white p-6 flex flex-col gap-6'>
                <h2 className='text-2xl'>Delivery Address</h2>

                <div className='flex gap-6'>
                  {/* First name Input */}
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                    <Input
                      type="text"
                      placeholder="First Name"
                      className={`h-12 ${errors.firstName ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                      {...register("firstName")}
                    />

                    {errors.firstName && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.firstName?.message}</span>}
                  </div>

                  {/* Last name Input */}
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      className={`h-12 ${errors.lastName ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                      {...register("lastName")}
                    />

                    {errors.lastName && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.lastName?.message}</span>}
                  </div>
                </div>

                <div className='flex gap-6'>
                  {/* Phone Input */}
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      type="tel"
                      placeholder="Phone"
                      className={`h-12 ${errors.phone ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                      {...register("phone")}
                    />

                    {errors.phone && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.phone?.message}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                    <Input
                      type="email"
                      placeholder="Email"
                      className={`h-12 ${errors.email ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                      {...register("email")}
                    />
                    {errors.email && <span className="text-destructive text-sm">{errors.email?.message}</span>}
                  </div>
                </div>

                {/* Country Input */}
                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="country">Country <span className="text-destructive">*</span></Label>

                  <Input
                    type="text"
                    placeholder="Country"
                    className={`h-12 ${errors.country ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                    {...register("country")}
                  />

                  {errors.country && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.country?.message}</span>}
                </div>

                {/* Address Input */}
                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="address">Address <span className="text-destructive">*</span></Label>
                  <Input
                    type="text"
                    placeholder="Address"
                    className={`h-12 ${errors.address ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                    {...register("address")}
                  />
                  {errors.address && <span className="text-destructive text-sm">{errors.address?.message}</span>}
                </div>

                <div className='flex gap-6'>
                  {/* City Input */}
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                    <Input
                      type="text"
                      placeholder="City"
                      className={`h-12 ${errors.city ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                      {...register("city")}
                    />

                    {errors.city && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.city?.message}</span>}
                  </div>

                  {/* Zip Code Input */}
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="zipCode">Zip Code <span className="text-destructive">*</span></Label>
                    <Input
                      type="text"
                      placeholder="Zip Code"
                      className={`h-12 ${errors.zipCode ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                      {...register("zipCode")}
                    />
                    {errors.zipCode && <span className="text-destructive text-sm">{errors.zipCode?.message}</span>}
                  </div>
                </div>

                {/* Note Input */}
                <div className="w-full flex flex-col gap-1">
                  <Textarea
                    rows={6}
                    placeholder="Note"
                    className={`${errors.note ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                    {...register("note")}
                  ></Textarea>

                  {errors.note && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.note?.message}</span>}
                </div>
              </div>

              {/* Shipping methods */}
              <div className='bg-white py-6 flex flex-col gap-6'>
                <h2 className='text-2xl mx-6'>Shipping Methods</h2>

                <RadioGroup value={selectedShippingMethod} onValueChange={(value)=> setSelectedShippingMethod(value)}>
                  {shippingOptions.map((item, index) => (
                    <Label
                      key={index}
                      htmlFor={item.method}
                      className="py-3 px-6 flex items-center justify-between space-x-2 transition-all duration-300 cursor-pointer hover:bg-slate-100"
                    >
                      <div>
                        <h3 className="text-lg">{item.method}</h3>
                        <p className="text-slate-600 font-medium">{item.description}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-lg">${item.price.toFixed(2)}</span>
                        <RadioGroupItem value={`${item.price}`} id={item.method} />
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              {/* Payment methods */}
              <div className='bg-white p-6 flex flex-col gap-6'>
                <h2 className='text-2xl'>Payment Methods</h2>

                <RadioGroup value={selectedPaymentMethod} onValueChange={handlePaymentMethodChange}>
                  <Label key="Credit" htmlFor="Credit" className="flex items-center space-x-3">
                    <RadioGroupItem value="Credit" id="Credit" />
                    <h3 className='text-lg'>Credit Card</h3>
                  </Label>

                  <Label key="Paypal" htmlFor="Paypal" className="flex items-center space-x-3">
                    <RadioGroupItem value="Paypal" id="Paypal" />
                    <h3 className='text-lg'>Paypal</h3>
                  </Label>
                </RadioGroup>

                <div className='flex flex-col gap-2'>
                  <h3 className='font-semibold'>We Accept:</h3>
                  <div className='flex gap-4'>
                    <img src="/images/cards/paypal.svg" height={20} className='max-h-[32px]' alt="" />
                    <img src="/images/cards/visa.svg" height={20} className='max-h-[32px]' alt="" />
                    <img src="/images/cards/mastercard.svg" height={20} className='max-h-[32px]' alt="" />
                    <img src="/images/cards/amex.svg" height={20} className='max-h-[32px]' alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className='w-1/3 min-w-[350px]'>
              <div className='bg-white'>
                <h2 className='text-center text-2xl p-6'>Order Total ({cartCount})</h2>

                <div className='flex flex-col gap-4'>
                  {!cartData || cartData.length === 0 ? (
                    <EmptyPlaceholder
                      image={CartIcon}
                      text="You haven't added anything to your shopping cart yet."
                      actionText="Add To Cart Now"
                      imageSize={130}
                      clasName="max-h-[60vh] w-[300px] flex mx-auto"
                      isAction={false}
                    />
                  ) : (
                    <div className="w-full flex flex-wrap">
                      {
                        cartData.map((cart: AccountItemType, index: number) => (
                          <CartItemCard key={index} cart={cart} />
                        ))
                      }
                    </div>
                  )}

                  <div className='p-6 flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                      <span>Subtotal</span>
                      <span>${(cartSubTotal).toFixed(2)}</span>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span>Tax</span>
                      <span>${(totalTax).toFixed(2)}</span>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span>Shipping</span>
                      <span>${totalShippingCost}</span>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='font-semibold text-lg'>Total</span>
                      <span className='font-semibold text-lg'>${(totalShippingCost + totalTax + cartSubTotal).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className='border-t border-black p-6'>
                    <p className='text-slate-500 mb-6 text-sm'>We use your personal information to complete your order, enhance your experience on our website, and for other purposes outlined in our privacy policy.</p>

                    <Button variant="dark" className='w-full text-lg h-14 '>Place Order</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page