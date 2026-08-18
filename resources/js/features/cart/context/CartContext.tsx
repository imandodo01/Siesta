import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

export type CartItem = {
    id: number;
    sku: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    quantity: number;
};

type ProductLike = {
    id: number;
    sku: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
};

type CartContextValue = {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    total: number;
    addItem: (product: ProductLike) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
};

const CART_STORAGE_KEY = "siesta-cart";
const CartContext = createContext<CartContextValue | undefined>(undefined);

function readCartFromStorage(): CartItem[] {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
        return rawCart ? (JSON.parse(rawCart) as CartItem[]) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(readCartFromStorage);

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (product: ProductLike) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
                        : item,
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                return {
                    ...item,
                    quantity: Math.min(quantity, item.stock),
                };
            }),
        );
    };

    const removeItem = (id: number) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const itemCount = useMemo(
        () => items.reduce((total, item) => total + item.quantity, 0),
        [items],
    );

    const subtotal = useMemo(
        () => items.reduce((total, item) => total + item.price * item.quantity, 0),
        [items],
    );

    const total = subtotal;

    const value = useMemo<CartContextValue>(
        () => ({
            items,
            itemCount,
            subtotal,
            total,
            addItem,
            updateQuantity,
            removeItem,
            clearCart,
        }),
        [items, itemCount, subtotal, total],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
}
