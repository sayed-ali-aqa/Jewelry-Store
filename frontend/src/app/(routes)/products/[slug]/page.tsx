import React from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, Star, StarHalf } from 'lucide-react';
import ProductImages from '../_components/ProductImages';
import BreadCrumb from '@/components/BreadCrumb';

const getProductBySlug = async (slug: string) => {
    const response = await axios.get(`http://localhost:3000/api/products/${slug}`);
    return response.data;
};

const Page = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params; // Awaiting params here
    const product = await getProductBySlug(slug);

    return (
        <div className='p-4 w-full max-w-7xl mx-auto'>
            <BreadCrumb
                current={product[0]?.name}
                visitedLinks={[{ title: "Home", link: "/" }, { title: "Products", link: "/products" }]}
            />

            <div className='flex gap-10 mt-8 flex-col md:flex-row'>
                <ProductImages images={product[0].images} alt={product[0]?.name} labelText={product[0]?.label} />

                <div className='w-full md:w-1/2'>
                    <div className='w-full flex items-center justify-between gap-4'>
                        <span className='text-slate-500'>{product[0]?.category?.category}</span>

                        <div className="flex gap-1 text-golden">
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <StarHalf size={20} />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <h1 className='font-semibold text-3xl'>{product[0]?.name}</h1>

                        <div className='flex gap-2 items-end mt-4'>
                            <span className='text-slate-400 text-lg font-semibold line-through'>
                                ${(product[0].price).toFixed(2)}
                            </span>

                            <span className='text-slate-500 text-2xl font-semibold'>
                                ${(product[0]?.price - ((product[0]?.price / 100) * product[0]?.discount)).toFixed(2)}
                            </span>
                            <span className='text-slate-500'>({product[0]?.quantity > 0 ? 'In Stock' : 'Out of Stock'})</span>
                        </div>
                    </div>

                    <div className='mt-6 flex flex-col gap-1'>
                        <div className='text-slate-500'>Category: <span className='text-black'>{product[0]?.category?.category}</span></div>
                        <div className='text-slate-500'>Quantity: <span className='text-black'>{product[0]?.quantity}</span></div>
                        <div className='text-slate-500'>Material:
                            {
                                product[0]?.material.map((item: { material: string }, index: number) => (
                                    <span key={index} className='text-black px-2'>
                                        {item.material}{index < product[0]?.material.length - 1 && ','}
                                    </span>
                                ))
                            }
                        </div>
                        <div className='text-slate-500'>Total Weight: <span className='text-black'>{product[0]?.weight}gs</span></div>
                        <div className='text-slate-500'>Style:
                            {
                                product[0]?.style.map((item: { style: string }, index: number) => (
                                    <span key={index} className='text-black px-2'>
                                        {item.style}{index < product[0]?.style.length - 1 && ','}
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                    <div className='flex items-center gap-4 mt-10'>
                        <Button size="lg" className='text-lg px-5 py-6'><ShoppingBag /> Add to Cart</Button>
                        <Button variant="outline" size="lg" className='text-lg px-5 py-6'><Heart /> Add to Wishlist</Button>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                <h2 className='font-semibold text-2xl mb-3'>Descritption</h2>
                <p className='text-slate-500'>{product[0]?.description[0]?.children[0]?.text}</p>
            </div>

            <div className='py-10'>
                <h2 className='text-2xl font-semibold text-center mb-6'>You Might Also Like</h2>

                {/* <div className='flex gap-4 flex-wrap justify-center'>
                    <ProductCard className="max-w-[300px]" />
                    <ProductCard className="max-w-[300px]" />
                    <ProductCard className="max-w-[300px]" />
                    <ProductCard className="max-w-[300px]" />
                </div> */}
            </div>
        </div>
    );
};

export default Page;
