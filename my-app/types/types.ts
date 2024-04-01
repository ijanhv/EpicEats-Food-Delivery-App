interface MenuItem {
    id?: string;
    _id?: string;
    name?: string;
    category?: string;
    description?: string;
    image?: string;
    quantity?: number;
    featured?: boolean;
    tags?: string[];
    price?: number;
}

interface Order {
    _id?: string;
    customer: User;
    items: MenuItem[];
    total: number,
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    location?: string;
}

interface User {
    userId?: string;
    _id?: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

interface BasketState {
    _id: string;
    items: MenuItem[];
    total: number;
}