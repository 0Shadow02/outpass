"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <div
            className={`relative flex items-center p-2 pl-8 transition-colors duration-200 ease-in-out ${selected ? "text-indigo-400 bg-black" : "text-slate-500 hover:bg-gray-700 hover:text-white"} cursor-pointer`}
            onClick={() => {
                router.push(href);
            }}
        >
            <div className="pr-2">
                {icon}
            </div>
            <div className={`font-bold text-lg ${selected ? "text-indigo-400" : "text-slate-500"}`}>
                {title}
            </div>
            {selected && (
                <div className="absolute left-0 top-0 h-full w-1 bg-indigo-400 shadow-lg transition-shadow duration-300 glow-effect"></div>
            )}
        </div>
    );
};
