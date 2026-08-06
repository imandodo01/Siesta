import React from 'react';

// 1. Define the type for your props
interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="mx-auto max-w-7xl px-6">
            {children}
        </div>
    );
}
