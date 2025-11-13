import { User, Wallet, Product, Design, BlankProduct, Order, Campaign } from '@/types';

// Simple in-memory store (في الواقع، ستستخدم قاعدة بيانات حقيقية)
class Store {
  private users: Map<string, User> = new Map();
  private wallets: Map<string, Wallet> = new Map();
  private products: Map<string, Product> = new Map();
  private designs: Map<string, Design> = new Map();
  private blankProducts: Map<string, BlankProduct> = new Map();
  private orders: Map<string, Order> = new Map();
  private campaigns: Map<string, Campaign> = new Map();

  constructor() {
    // إضافة بيانات تجريبية
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // منتجات تجريبية
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'تي شيرت بتصميم حصري',
        description: 'تي شيرت قطني مريح بتصميم فني فريد',
        price: 150,
        image: '/products/tshirt1.jpg',
        category: 'clothing',
      },
      {
        id: '2',
        name: 'كوب قهوة مخصص',
        description: 'كوب سيراميك عالي الجودة مع تصميمك',
        price: 75,
        image: '/products/mug1.jpg',
        category: 'accessories',
      },
      {
        id: '3',
        name: 'تي شيرت بريميوم',
        description: 'تي شيرت فاخر بجودة عالية',
        price: 200,
        image: '/products/tshirt2.jpg',
        category: 'clothing',
      },
    ];

    sampleProducts.forEach(p => this.products.set(p.id, p));
  }

  // User methods
  createUser(user: User) {
    this.users.set(user.id, user);
    // إنشاء محفظة فارغة للمستخدم
    this.wallets.set(user.id, {
      totalBalance: 0,
      freeBalance: 0,
      lockedBalance: 0,
    });
    return user;
  }

  getUser(id: string) {
    return this.users.get(id);
  }

  updateUser(id: string, updates: Partial<User>) {
    const user = this.users.get(id);
    if (user) {
      this.users.set(id, { ...user, ...updates });
    }
    return this.users.get(id);
  }

  // Wallet methods
  getWallet(userId: string) {
    return this.wallets.get(userId);
  }

  topUpWallet(userId: string, amount: number, isBNPL: boolean) {
    const wallet = this.wallets.get(userId);
    if (wallet) {
      const freeAmount = isBNPL ? amount * 0.7 : amount;
      const lockedAmount = isBNPL ? amount * 0.3 : 0;
      
      this.wallets.set(userId, {
        totalBalance: wallet.totalBalance + amount,
        freeBalance: wallet.freeBalance + freeAmount,
        lockedBalance: wallet.lockedBalance + lockedAmount,
      });
    }
    return this.wallets.get(userId);
  }

  deductFromWallet(userId: string, amount: number) {
    const wallet = this.wallets.get(userId);
    if (wallet) {
      let remaining = amount;
      let newLockedBalance = wallet.lockedBalance;
      let newFreeBalance = wallet.freeBalance;

      // استخدام الرصيد المقفل أولاً
      if (wallet.lockedBalance > 0) {
        const deductFromLocked = Math.min(wallet.lockedBalance, remaining);
        newLockedBalance -= deductFromLocked;
        remaining -= deductFromLocked;
      }

      // ثم استخدام الرصيد الحر
      if (remaining > 0) {
        newFreeBalance -= remaining;
      }

      this.wallets.set(userId, {
        totalBalance: wallet.totalBalance - amount,
        freeBalance: newFreeBalance,
        lockedBalance: newLockedBalance,
      });
    }
    return this.wallets.get(userId);
  }

  // Product methods
  getAllProducts() {
    return Array.from(this.products.values());
  }

  getProduct(id: string) {
    return this.products.get(id);
  }

  createProduct(product: Product) {
    this.products.set(product.id, product);
    return product;
  }

  // Design methods
  createDesign(design: Design) {
    this.designs.set(design.id, design);
    return design;
  }

  getDesign(id: string) {
    return this.designs.get(id);
  }

  getDesignsByDesigner(designerId: string) {
    return Array.from(this.designs.values()).filter(d => d.designerId === designerId);
  }

  // Blank Product methods
  createBlankProduct(product: BlankProduct) {
    this.blankProducts.set(product.id, product);
    return product;
  }

  getBlankProduct(id: string) {
    return this.blankProducts.get(id);
  }

  getBlankProductsByFactory(factoryId: string) {
    return Array.from(this.blankProducts.values()).filter(p => p.factoryId === factoryId);
  }

  getAllBlankProducts() {
    return Array.from(this.blankProducts.values());
  }

  // Order methods
  createOrder(order: Order) {
    this.orders.set(order.id, order);
    return order;
  }

  getOrder(id: string) {
    return this.orders.get(id);
  }

  getOrdersByCustomer(customerId: string) {
    return Array.from(this.orders.values()).filter(o => o.customerId === customerId);
  }

  getOrdersByFactory(factoryId: string) {
    return Array.from(this.orders.values()).filter(o => o.factoryId === factoryId);
  }

  updateOrderStatus(orderId: string, status: Order['status']) {
    const order = this.orders.get(orderId);
    if (order) {
      this.orders.set(orderId, { ...order, status });
    }
    return this.orders.get(orderId);
  }

  // Campaign methods
  createCampaign(campaign: Campaign) {
    this.campaigns.set(campaign.id, campaign);
    return campaign;
  }

  getCampaign(id: string) {
    return this.campaigns.get(id);
  }

  getCampaignsByMarketer(marketerId: string) {
    return Array.from(this.campaigns.values()).filter(c => c.marketerId === marketerId);
  }
}

export const store = new Store();
