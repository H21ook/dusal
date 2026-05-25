import React from 'react'
import BottomNavigation from '@/components/custom/bottom-navigation'

const ProtectedLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-dvh bg-muted/30">
            <div className="mx-auto min-h-dvh max-w-lg bg-background pb-32 backdrop-blur">
                {children}
            </div>
            <BottomNavigation />
        </div >
    )
}

export default ProtectedLayout
