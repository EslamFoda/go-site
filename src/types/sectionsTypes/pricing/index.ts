export interface Benefit {
  id: string;
  title: string;
}

export interface PricingButton {
  text: string;
  link: string;
  openNewTab?: boolean;
}

export interface Featured {
  isActive: boolean;
  text: string;
}

export interface BasePrice {
  originalPrice: number;
  salePrice: number;
  isSale: boolean;
}

export interface OneTimePrice extends BasePrice {
  offer: string;
  button: PricingButton;
}

export interface SubscriptionPriceOption extends BasePrice {
  offer: string;
  button: PricingButton;
}

export interface SubscriptionPrice {
  monthly: SubscriptionPriceOption;
  yearly: SubscriptionPriceOption;
}

export interface OneTimePlan {
  id: string;
  originalPrice: number;
  salePrice: number;
  isSale: boolean;
  offer: string;
  button: PricingButton;
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  text: string;
  benefits: Benefit[];
  oneTimePlan: OneTimePlan;
  price: SubscriptionPrice;
  featured: Featured;
}

export interface SubscriptionPlanSettings {
  billingCycle: string;
  cycleDuration: string;
  default: boolean;
}

export interface SubscriptionPlans {
  plan1: SubscriptionPlanSettings;
  plan2: SubscriptionPlanSettings;
  plan3: SubscriptionPlanSettings;
}

export enum SubscriptionPlanType {
  ONETIME = "One-Time",
  SUBSCRIPTION = "Subscription",
}

export interface PricingCurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface PricingContent {
  label: string;
  title: string;
  subtitle: string;
  currency: PricingCurrency;
  planType: SubscriptionPlanType.ONETIME | SubscriptionPlanType.SUBSCRIPTION;
  subscriptionPlans: SubscriptionPlans;
  subscriptions: SubscriptionPlan[];
}

export interface PricingStyle {
  designName: string;
  designSettings: {
    text: string;
    background: boolean;
    sectionBackground: {
      color: string;
      media: string;
      height: string;
      spacing: string;
    };
  };
}
