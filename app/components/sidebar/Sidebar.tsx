import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

import getCurrentUser from '@/app/actions/getCurrentUser'

export default async function UsersLayout({
    children
}:{
    children:React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return(

        <div className="h-full">
            <DesktopSidebar currentUser={currentUser!}/>
            <MobileFooter/>
            <main className="lg:pl-20 h-full">
            {children}
            </main>
        </div>
    )
    
}