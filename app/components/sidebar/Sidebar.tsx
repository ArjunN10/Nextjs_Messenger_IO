import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

export default async function UsersLayout({
    children
}:{
    children:React.ReactNode;
}) {
    return(

        <div className="h-full">
            <DesktopSidebar/>
            <MobileFooter/>
            <main className="lg:pl-20 h-full">
            {children}
            </main>
        </div>
    )
    
}