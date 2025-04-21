"use client"

import BreadCrumb from '@/components/BreadCrumb'
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutType, SignUpProps } from '@types/allTypes';
import { signUpForm } from '@utils/actions/auth';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/slices/authSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckoutSchema } from '@utils/validations/checkoutValidation';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { shippingOptions } from '../../../../datalist';
import { Textarea } from '@/components/ui/textarea';

const page = () => {

  const dispatch = useDispatch();
  const router = useRouter()

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

                <RadioGroup defaultValue="Free">
                  {shippingOptions.map((item, index) => (
                    <Label key={index} htmlFor={item.method} className="py-3 px-6 flex items-center justify-between space-x-2 transition-all duration-300 cursor-pointer hover:bg-slate-100">
                      <div>
                        <h3 className='text-lg'>{item.method}</h3>
                        <p className='text-slate-600 font-medium'>{item.description}</p>
                      </div>

                      <div className='flex items-center gap-4'>
                        <span className='text-lg'>${(item.price).toFixed(2)}</span>
                        <RadioGroupItem value={item.method} id={item.method} />
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              {/* Payment methods */}
              <div className='bg-white p-6 flex flex-col gap-6'>
                <h2 className='text-2xl'>Payment Methods</h2>

                <RadioGroup>
                  <Label key="creditCard" htmlFor="creditCard" className="flex items-center space-x-3">
                    <RadioGroupItem value="creditCard" id="creditCard" />
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
                  <h2 className='text-center text-2xl p-6'>Order Total (4)</h2>

                  
                </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page