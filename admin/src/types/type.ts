interface Order {
    [x: string]: any;
    _id: string;
    customer: Customer;
    status: string;
    total: number;
    createdAt: string;
    updatedAt: string;
    createdAtDate: string;
    createdAtTime: string;
    menuItem: MenuItem[];
}

interface Customer {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    createdAt: string;
    updatedAt: string;
}

interface MenuItem {
    _id?: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
    veg: boolean;
    featured: boolean;
    tags: string[];
    description: string;
    category: string;

}

interface DashboardDetails {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    averageSale: number;
}

interface RevenueByDay {
    Monday: number;
    Tuesday: number;
    Wednesday: number;
    Thursday: number;
    Friday: number;
    Saturday: number;
    Sunday: number;

}

interface RevenueByMonth {
    Jan: number;
    Feb: number;
    Mar: number;
    Apr: number;
    May: number;
    Jun: number;
    Jul: number;
    Aug: number;
    Sep: number;
    Oct: number;
    Nov: number;
    Dec: number;
    
}