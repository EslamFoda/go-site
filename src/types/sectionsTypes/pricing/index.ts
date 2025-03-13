import { SectionBackground, Spacing, TextSizeType } from "@/types/common";

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
  originalPrice: string;
  salePrice: string;
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

export interface OneTimePlan {
  id: string;
  originalPrice: string;
  salePrice: string;
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
  price: SubscriptionPriceOption[];
  featured: Featured;
}

export interface SubscriptionPlanItem {
  billingCycle: string;
  cycleDuration: string;
  default: boolean;
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
  subscriptionPlans: SubscriptionPlanItem[];
  subscriptions: SubscriptionPlan[];
}

export interface PricingStyle {
  designName: string;
  designSettings: {
    text: TextSizeType;
    background: boolean;
    border: boolean;
    spacing: Spacing;
    sectionBackground: SectionBackground;
  };
}
