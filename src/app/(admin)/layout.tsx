import { AdminSidebar } from "@/components/layout/AdminSidebar";
export default function Layout({children}:{children:React.ReactNode}){return <div className="flex"><AdminSidebar/><div className="min-w-0 flex-1">{children}</div></div>;}
