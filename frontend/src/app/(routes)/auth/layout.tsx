import { LayoutProps } from "@types/allTypes";
import React from "react";

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-slate-50 w-full h-[85vh] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl px-6 py-10">{children}</div>
        </div>
    );
};

export default AuthLayout;
