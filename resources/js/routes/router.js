import Home from '../components/home/Index.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import CustomerMain from '../components/customers/Main.vue'
import CustomerList from '../components/customers/List.vue'
import NewCustomer from '../components/customers/New.vue'
import EditCustomer from '../components/customers/Edit.vue'
import Customer from '../components/customers/View.vue'
import PageNotFound  from '../components/layouts/errors/404.vue'

export const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'auth.login',
        props: true
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/customers',
        component: CustomerMain,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '/',
                component: CustomerList,
            },
            {
                path: 'new',
                component: NewCustomer
            },
            {
                path: ':id',
                component: Customer,
                name: 'customers.view',
                props: true
            },
            {
                path: ':id/edit',
                component: EditCustomer
            }
        ]
    },
    {
        path: '*',
        component: PageNotFound
    }
];