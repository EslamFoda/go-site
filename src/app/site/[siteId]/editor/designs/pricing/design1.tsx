import { Button } from "@/components/ui/button";
import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/lib/utils";
import {
  closeChooseIcon,
  closePagesTab,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { PricingContent, PricingStyle } from "@/types/sectionsTypes/pricing";
import { CheckIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import AlternatingLabel from "./AlternatingLabel";
import { useMediaQuery } from "react-responsive";

interface DesignProps {
  section: any;
  pageId: string;
}

enum SubscriptionPlanType {
  ONETIME = "One-Time",
  SUBSCRIPTION = "Subscription",
}

function Design1({ pageId, section }: DesignProps) {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { AnimatePresence, motion } = useMotion();
  const [activePlan, setActivePlan] = useState<number>(0);
  const pricingStyle = section?.style as PricingStyle;
  const pricingContent = section?.content as PricingContent;
  const { spacing } = pricingStyle.designSettings;

  const bgMuted =
    section?.style.designSettings.sectionBackground.color === "gray";

  const sectionBgClassName = cn(
    "flex flex-col",
    pricingStyle.designSettings.sectionBackground.color === "primary" &&
      "bg-primary",
    pricingStyle.designSettings.sectionBackground.color === "gray" &&
      "bg-muted",
    pricingStyle.designSettings.sectionBackground.color === "none" &&
      "bg-background",
    pricingStyle.designSettings.sectionBackground.height === "fill" &&
      "h-screen",
    pricingStyle.designSettings.sectionBackground.height === "fit" && "h-auto",
    pricingStyle.designSettings.sectionBackground.align === "start" &&
      "justify-start",
    pricingStyle.designSettings.sectionBackground.align === "center" &&
      "justify-center",
    pricingStyle.designSettings.sectionBackground.align === "end" &&
      "justify-end"
  );

  const textColorClassName = cn({
    "text-primary-foreground":
      pricingStyle.designSettings.sectionBackground.color === "primary",
  });
  const subTitleColor =
    section.style.designSettings.sectionBackground.color === "primary"
      ? "text-primary-foreground"
      : "text-muted-foreground";

  const subItemClassNames = cn(
    "flex flex-col gap-5 gap-y-3 relative rounded-md overflow-hidden",
    {
      "bg-muted p-5": pricingStyle.designSettings.background,
      "outline outline-[1px] outline-muted p-5":
        pricingStyle.designSettings.border,
      "bg-background": bgMuted,
    }
  );

  const titleClassName = cn(
    pricingStyle.designSettings.text === "s" && "text-sm",
    pricingStyle.designSettings.text === "m" && "text-base",
    pricingStyle.designSettings.text === "l" && "text-lg"
  );

  useEffect(() => {
    const defaultPlanIndex = pricingContent.subscriptionPlans.findIndex(
      (plan) => plan.default
    );

    setActivePlan(defaultPlanIndex !== -1 ? defaultPlanIndex : 0);
  }, [pricingContent]);

  return (
    <section
      className={sectionBgClassName}
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
        dispatch(closeChooseIcon());
      }}
    >
      <div
        className="container max-w-container gap-10 w-full"
        style={{
          paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
          paddingBottom: isDesktop
            ? spacing.bottom.desktop
            : spacing.bottom.mobile,
        }}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className={textColorClassName}>
              <h1 className="text-4xl">{pricingContent.title}</h1>
              <p className={subTitleColor}>{pricingContent.subtitle}</p>
            </div>
            {pricingContent.planType === SubscriptionPlanType.SUBSCRIPTION && (
              <div className="h-10 bg-muted rounded-md flex items-center justify-center min-w-40 p-1">
                {pricingContent.subscriptionPlans.map((plan, i) => {
                  if (!plan.billingCycle) return null;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "h-full p-1 flex items-center min-w-[70px] justify-center text-xs break-keep cursor-pointer rounded-md transition-colors",
                        activePlan === i ? "bg-background" : ""
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePlan(i);
                      }}
                    >
                      {plan.billingCycle}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
            style={{
              gap: isDesktop ? spacing.gap.desktop : spacing.gap.mobile,
            }}
          >
            <AnimatePresence>
              {pricingContent.subscriptions.map(
                (subscription, index: number) => {
                  const plan =
                    pricingContent.planType === SubscriptionPlanType.ONETIME
                      ? subscription.oneTimePlan
                      : subscription.price[activePlan || 0];
                  return (
                    <motion.div
                      layout
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "tween" }}
                      key={subscription.id || index}
                      className={subItemClassNames}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(updateSelectedSection(pageId, section.id));
                        dispatch(updateSelectedItem(subscription));
                        dispatch(closeChooseIcon());
                        dispatch(closePagesTab());
                      }}
                    >
                      <AlternatingLabel
                        isActive={subscription.featured.isActive}
                        featuredText={subscription.featured.text}
                        offerText={plan.offer}
                      />
                      <div>
                        <h5 className={titleClassName}>{subscription.title}</h5>
                        <p className="text-muted-foreground text-sm">
                          {subscription.text}
                        </p>
                        <div className="flex gap-2">
                          {plan.isSale && (
                            <h3 className="text-3xl font-bold">
                              {pricingContent.currency.symbol}
                              {plan.salePrice}
                            </h3>
                          )}
                          <h3
                            className={cn("text-3xl font-bold", {
                              "line-through text-muted-foreground/50":
                                plan.isSale,
                            })}
                          >
                            {pricingContent.currency.symbol}
                            {plan.originalPrice}
                          </h3>
                        </div>
                        {pricingContent.planType ===
                          SubscriptionPlanType.SUBSCRIPTION && (
                          <span className="text-sm">
                            {
                              pricingContent.subscriptionPlans[activePlan]
                                .cycleDuration
                            }
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col justify-between gap-4 h-full">
                        <div className="space-y-3">
                          {subscription.benefits.map((benefit, i) => (
                            <div
                              key={benefit.id}
                              className="flex items-center gap-1 text-muted-foreground"
                            >
                              <CheckIcon
                                className={cn({
                                  "text-primary":
                                    subscription.featured.isActive,
                                })}
                                size={16}
                              />
                              <span className="text-xs">{benefit.title}</span>
                            </div>
                          ))}
                        </div>

                        {plan.button.text && (
                          <Button
                            variant={
                              subscription.featured.isActive
                                ? "default"
                                : "outline"
                            }
                            className={cn("whitespace-normal", {
                              "bg-background hover:bg-background":
                                !subscription.featured.isActive,
                              "bg-muted hover:bg-muted":
                                (pricingStyle.designSettings.sectionBackground
                                  .color === "gray" ||
                                  pricingStyle.designSettings.border) &&
                                !subscription.featured.isActive,
                            })}
                            onClick={() => {
                              if (plan.button.link) {
                                if (plan.button.openNewTab) {
                                  // Open in new tab
                                  window.open(
                                    plan.button.link,
                                    "_blank",
                                    "noopener,noreferrer"
                                  );
                                } else {
                                  // Open in same tab
                                  window.location.href = plan.button.link;
                                }
                              }
                            }}
                          >
                            {plan.button.text}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                }
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Design1;
