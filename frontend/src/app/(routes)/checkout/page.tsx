"use client"

import BreadCrumb from '@/components/BreadCrumb'
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountItemType, CheckoutType } from '@types/allTypes';
import { checkoutForm } from '@utils/actions/checkout';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { CheckoutSchema } from '@utils/validations/checkoutValidation';
import { getCart, getUserInfoById } from '../../../lib/api';
import { toast } from 'sonner';
import { RootState } from '../../../store/store';
import { calculateCartTotalAfterDiscount, calculateNumOfCartItems, calculateTotalTax } from '@utils/functions/calculate';
import DeliveryAddress from './_components/DeliveryAddress';
import ShippingMethod from './_components/ShippingMethod';
import PaymentMethod from './_components/PaymentMethod';
import CheckoutDetails from './_components/CheckoutDetails';

const page = () => {
  const [cartData, setCartData] = useState<AccountItemType[]>([])
  const [cartCount, setCartCount] = useState<number>(0)
  const [cartSubTotal, setCartSubTotal] = useState<number>(0)
  const cartStatus = useSelector((state: RootState) => state.cartStatus.cartStatus);
  const [totalTax, setTotalTax] = useState<number>(0)
  const [totalShippingCost, setTotalShippingCost] = useState<number>(0)
  const [selectedShippingMethodValue, setSelectedShippingMethodValue] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutType>({
    resolver: zodResolver(CheckoutSchema),  // Use Zod resolver for validation
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = async (data: CheckoutType) => {
    await checkoutForm(data);  // Call the checkout Form
  };

  const fetchCart = async () => {
    setIsLoading(true)

    try {
      const data = await getCart()

      // If the obeject data is empty then let it be an empty array
      setCartData(Object.keys(data).length > 0 ? data.data : [])
    } catch (error) {
      toast.error("Failed to fetch cart")
    }
    finally {
      setIsLoading(false)
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


  useEffect(() => {
    setTotalShippingCost(selectedShippingMethodValue * cartCount)
  }, [selectedShippingMethodValue, cartCount])

  useEffect(() => {
    const totalTax = calculateTotalTax(cartSubTotal, totalShippingCost);
    setTotalTax(totalTax)
  }, [totalShippingCost, cartSubTotal])


  const fetchUserInfoById = async () => {
    try {
      const response = await getUserInfoById();
      const userInfo = response?.data[0];

      if (userInfo) {
        reset({
          firstName: userInfo.firstName || '',
          lastName: userInfo.lastName || '',
          phone: userInfo.phone || '',
          email: userInfo.users_permissions_user?.email || '',
        });
      }
    } catch (error) {
      toast.error("Failed to fetch account info");
    }
  };

  useEffect(() => {
    fetchUserInfoById();
  }, []);

  return (
    <div className='bg-slate-50 w-full px-4 pt-6 pb-10'>
      <div className="max-w-[1300px] mx-auto">
        <BreadCrumb
          current="Checkout"
          visitedLinks={[{ title: "Home", link: "/" }, { title: "Shopping Cart", link: "/account/shopping-cart" }]}
        />

        <h1 className='text-5xl font-semibold mt-10 text-center mb-10'>Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-10 flex-col md:flex-row'>
            <div className='w-full md:w-2/3 flex flex-col gap-6'>
              {/* Delivery details */}
              <DeliveryAddress register={register} errors={errors} />

              {/* Shipping methods */}
              <ShippingMethod
                errors={errors}
                control={control}
                setSelectedShippingMethodValue={setSelectedShippingMethodValue}
              />

              {/* Payment methods */}
              <PaymentMethod
                errors={errors}
                control={control} />
            </div>

            <div className= 'w-full md:w-1/3 min-w-[350px]'>
              <CheckoutDetails
                cartData={cartData}
                cartCount={cartCount}
                cartSubTotal={cartSubTotal}
                totalTax={totalTax}
                totalShippingCost={totalShippingCost}
                isSubmitting={isSubmitting}
                isLoading={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page