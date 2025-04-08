"use client"

import { LayoutProps } from "@types/allTypes";
import React from "react";
import Link from "next/link";
import { ChevronRight, Heart, Package, User } from "lucide-react";
import { usePathname } from 'next/navigation'
import { accountNavLinks } from "../../../../datalist";
import SignOutButton from "./_components/SignOutButton";

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
    const pathName = usePathname()

    const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
        Package: Package,
        Heart: Heart,
        User: User,
    };

    return (
        <div className="bg-slate-50 w-full min-h-[85vh] flex gap-6 p-[5%]">
            <div className="bg-white min-w-[350px] p-6">
                <h2 className="uppercase text-slate-500 text-xl">User Account</h2>

                <ul className="mt-4">
                    {accountNavLinks.map((item, index) => (
                        <li key={index} className={`border-b last:border-b-0 group ${pathName === item.url ? "bg-slate-100 text-primary" : "text-slate-500"}`}>
                            <Link href={item.url} className="px-3 py-8 flex items-center gap-3 w-full transition-all duration-300 group-hover:text-primary">
                                {React.createElement(iconMap[item.icon], { size: 20 })} {item.title} <ChevronRight className="ml-auto" size={20} />
                            </Link>
                        </li>
                    ))}

                    <li className="border-b last:border-b-0 group text-slate-500">
                        <SignOutButton />
                    </li>
                </ul>
            </div>
            <div className="bg-white w-full p-6">{children}</div>
        </div>
    );
};

export default AuthLayout;
