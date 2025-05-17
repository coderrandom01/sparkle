import { Category, Person, List, AddBusiness } from "@mui/icons-material"

export const sidebarMenu = [
    { name: 'Manage Categories', navigate: '/admin/manageCategory', icon: Category },
    { name: 'User Management', navigate: '/admin/userManagement', icon: Person },
    { name: 'Listing Management', navigate: '/admin/manageListings', icon: List },
    { name: 'AD Management', navigate: '/admin/adManagement', icon: AddBusiness }
]