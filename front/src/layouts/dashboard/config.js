import { SvgIcon } from '@mui/material';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import AssignmentIcon from '@mui/icons-material/Dashboard';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <SvgIcon fontSize="small"><AssignmentIcon /></SvgIcon>,
    roles: ['user', 'admin']
  },
  {
    title: 'ajouter client',
    path: '/contrats/ajouter',
    icon: <SvgIcon fontSize="small"><CreateNewFolderIcon /></SvgIcon>,
    roles: ['user', 'admin']
  },
  
  {
    title: 'liste des clients',
    path: '/contrats/list_contrats',
    icon: <SvgIcon fontSize="small"><ChecklistIcon /></SvgIcon>,
    roles: ['user', 'admin']
  },
  
  
  {
    title: 'ajouter Agent',
    path: '/register',
    icon: <SvgIcon fontSize="small"><UserPlusIcon /></SvgIcon>,
    roles: ['user', 'admin']
  },
  {
    title: 'se déconnecter ',
    path: '/auth/login',
    icon: <SvgIcon fontSize="small"><LogoutIcon /></SvgIcon>,
    roles: ['user', 'admin']
  }
];

export const filterItemsByRole = (items, userRole) => {
  return items.filter(item => item.roles.includes(userRole));
};
