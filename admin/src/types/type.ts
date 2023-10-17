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
    _id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    featured: boolean;
    description: string;
    category: string;

}

