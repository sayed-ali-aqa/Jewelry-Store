import React, { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="bg-slate-50 w-full h-[85vh] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl px-6 py-10">{children}</div>
        </div>
    );
};

export default AuthLayout;
