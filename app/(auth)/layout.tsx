export default function AuthLayout({
    children
}:{children :React.ReactNode}){
    return (
        <div className="flex items-center justify-center align-middle h-screen">
            {children}
        </div>
    )
}