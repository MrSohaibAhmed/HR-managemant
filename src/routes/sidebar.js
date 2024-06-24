/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import FaceFrownIcon from '@heroicons/react/24/solid/FaceFrownIcon'
import MoneyIcon from '../icons/money'
import CreditIcon from '../icons/credit'

import { useContext } from 'react'
import AppContext from '../app/context/appContext'
import ApplicationIcon from '../icons/applicationIcon'
const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [
  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
    role: ['admin', 'User'],
  },

  {
    path: '/app/employees', // url
    icon: <UserGroupIcon className={iconClasses} />,
    name: 'Employees', // name that appear in Sidebar
    role: ['admin',],

  },
  {
    path: '/app/attendance', // url
    icon: <InboxArrowDownIcon className={iconClasses} />,
    name: 'Attendance', // name that appear in Sidebar
    role: ['admin', 'User'],

  },
  {
    path: '/app/attendance-summary', // url
    icon: <InboxArrowDownIcon className={iconClasses} />,
    name: 'Attendance Summary', // name that appear in Sidebar
    role: ['admin', 'User'],

  },
  {
    path: '/app/leads', // url
    icon: <InboxArrowDownIcon className={iconClasses} />,
    name: 'Projects', // name that appear in Sidebar
    role: ['admin', 'User'],

  },
  {
    path: '/app/transactions', // url
    icon: <CurrencyDollarIcon className={`${iconClasses} inline`} />,
    name: 'Salary', // name that appear in Sidebar
    role: ['admin', 'User'],

    submenu: [
      {
        path: '/app/transactions',
        icon: <CreditIcon className={submenuIconClasses} />,
        name: 'View Summary',
        role: ['admin', 'User'],

      },
      {
        path: '/app/assign-salary',
        icon: <MoneyIcon className={submenuIconClasses} />,
        name: 'Assign Salary',
        role: ['admin'],

      },
    ]
  },
  {
    path: '/app/charts', // url
    icon: <ChartBarIcon className={iconClasses} />,
    name: 'Analytics', // name that appear in Sidebar
    role: ['admin'],

  },

  {
    path: '/app/calendar', // url
    icon: <FaceFrownIcon className={`${iconClasses} inline`} />,
    name: 'Leaves', // name that appear in Sidebar
    role: ['admin', 'User'],

    submenu: [
      {
        path: '/app/new-leaves',
        icon: <CreditIcon className={submenuIconClasses} />,
        name: 'New Leaves',
        role: ['admin'],

      },

      {
        path: '/app/leaves-summary',
        icon: <MoneyIcon className={submenuIconClasses} />,
        name: 'Leaves Summary',
        role: ['admin'],


      },
    ]
  },


  {
    path: '/app/application-summary', // url
    icon: <EnvelopeIcon className={`${iconClasses} inline`} />,
    name: 'Application', // name that appear in Sidebar
    role: ['admin', 'User'],
  },





  {
    path: '/app/calendar', // url
    icon: <CalendarDaysIcon className={iconClasses} />,
    name: 'Meeting Calendar', // name that appear in Sidebar
    role: ['admin', 'User'],

  },
  {
    path: '/app/integration', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />,
    name: 'Announcement', // name that appear in Sidebar
    role: ['admin'],


  },
  {
    path: '/app/chats', //no url needed as this has submenu
    icon: <EnvelopeIcon className={`${iconClasses} inline`} />,
    name: 'Chat', // name that appear in Sidebar
    role: ['admin', 'User'],


  },
  {
    path: '/app/noticeboard', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />,
    name: 'Noticeboard', // name that appear in Sidebar
    role: ['admin', 'User'],


  },
  {
    path: '/app/file-storage', // url
    icon: <CalendarDaysIcon className={iconClasses} />,
    name: 'File Storage', // name that appear in Sidebar
    role: ['admin', 'User'],

  },
]

export default routes







