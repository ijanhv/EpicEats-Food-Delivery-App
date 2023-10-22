interface MenuItem {
    _id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    quantity: number;
    featured: boolean;
    tags: string[];
    price: number;
}

interface Order {
    _id: string;
    user: User;
    items: MenuItem[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface BasketState {
    _id: string;
    items: MenuItem[];
    total: number;
    
}