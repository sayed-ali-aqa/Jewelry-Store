"use client"

import { ChevronRight, LogOut } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import { logout } from '../../../../store/slices/authSlice';
import { useDispatch } from 'react-redux';

const SignOutButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/auth/signout', {
                method: 'POST',
            });

            if (res.ok) {
                dispatch(logout()); // Clear Redux state
                router.push('/auth/sign-in'); // Redirect after logout
            } else {
                toast.error("Failed to sign out");
            }
        } catch (error) {
            console.error("Error during sign out", error);
        }
    };

    return (
        <span
            role="button"
            onClick={handleSignOut}
            className="px-3 py-8 flex items-center gap-3 w-full transition-all duration-300 group-hover:text-destructive"
        >
            <LogOut size={20} /> Sign Out <ChevronRight className="ml-auto" size={20} />
        </span>
    );
};

export default SignOutButton;
