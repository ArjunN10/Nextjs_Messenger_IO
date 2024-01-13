
import Sidebar from '../components/sidebar/Sidebar'
import UserList from './components/UserList';
import getUsers from '../actions/getUsers';

export default async function UsersLayout({
    children
}:{
    children:React.ReactNode;
}) {
    const users=await getUsers()
    return(
        <Sidebar>
        <div className="h-full">
        <UserList items={users}/>
            {children}
        </div>
        </Sidebar>
    )
    
}