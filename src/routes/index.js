// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Employees = lazy(() => import('../pages/protected/Employees'))
const Attendance = lazy(() => import('../pages/protected/Attendance'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const AssignSalary = lazy(() => import('../pages/protected/AssignSalary'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const EmployeesForm = lazy(() => import('../pages/protected/EmployeesForm'))
const AnnouncementForm = lazy(() => import('../pages/protected/AnnouncementForm'))
const ProjectForm = lazy(() => import('../pages/protected/ProjectForm'))
const AssignSalaryForm = lazy(() => import('../pages/protected/AssignSalaryForm'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
const NewLeaves = lazy(() => import('../pages/protected/Leaves'))
const LeaveSummary = lazy(() => import('../pages/protected/LeavesSummary'))
const ApplicationLeaves = lazy(() => import('../pages/protected/ApplicationLeaves'))
const ApplicationSummary = lazy(() => import('../pages/protected/ApplicationSummary'))
const Noticeboard = lazy(() => import('../pages/protected/Noticeboard'))
const Chats = lazy(() => import('../pages/protected/Chat'))
const EmployeeDetail = lazy(() => import('../pages/protected/EmployeeDetail'))
const FileStorage = lazy(() => import('../pages/protected/FileStorage'))



const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/employees',
    component: Employees,
  },
  {
    path: '/attendance',
    component: Attendance,
  },
  {
    path: '/leads',
    component: Leads,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/assign-salary',
    component: AssignSalary,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/add-employees',
    component: EmployeesForm,
  },
  {
    path: '/add-announcement',
    component: AnnouncementForm,
  },
  {
    path: '/add-projects',
    component: ProjectForm,
  },
  {
    path: '/add-salary',
    component: AssignSalaryForm,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },

  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/new-leaves',
    component: NewLeaves,
  },
  {
    path: '/leaves-summary',
    component: LeaveSummary,
  },
  {
    path: '/application-leaves',
    component: ApplicationLeaves,
  },
  {
    path: '/application-summary',
    component: ApplicationSummary,
  },
  {
    path: '/noticeboard',
    component: Noticeboard,
  },
  {
    path: '/chats',
    component: Chats,
  },
  {
    path: '/employee-detail',
    component: EmployeeDetail,
  },
  {
    path: '/file-storage',
    component: FileStorage,
  },


]

export default routes
