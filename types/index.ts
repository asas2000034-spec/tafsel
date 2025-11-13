export type UserRole = 'customer' | 'designer' | 'factory' | 'marketer';

export interface User {
  id: string;
  email: string;
  role?: UserRole;
  createdAt: string;
}

export interface Wallet {
  totalBalance: number;
  freeBalance: number;
  lockedBalance: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  designerId?: string;
  factoryId?: string;
  nftId?: string;
  category: string;
}

export interface Design {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  nftMinted: boolean;
  designerId: string;
  mode?: 'store' | 'auction';
  createdAt: string;
}

export interface BlankProduct {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  colors: string[];
  sizes: string[];
  factoryId: string;
}

export interface Order {
  id: string;
  productId: string;
  customerId: string;
  factoryId?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  shippingAddress: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  marketerId: string;
  productUrl: string;
  trackingLink: string;
  qrCode: string;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: string;
}
