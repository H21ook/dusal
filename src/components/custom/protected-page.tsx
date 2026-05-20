import React from 'react'
import Header from './header'

const ProtectedPage = ({
    actions,
    children,
    header,
    showBack,
    title
}: {
    actions?: React.ReactNode,
    children: React.ReactNode,
    header?: React.ReactNode,
    showBack?: boolean,
    title?: string
}) => {
    return (
        <div className="min-h-dvh">
            {header ? header : <Header title={title} actions={actions} showBack={showBack} />}
            {children}
        </div>
    )
}

export default ProtectedPage
