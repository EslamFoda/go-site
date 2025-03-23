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
import BackgroundImage from "@/components/shared/backgroundImage";
import DesignLabel from "@/components/shared/label";

interface DesignProps {
  section: any;
  pageId: string;
}

enum SubscriptionPlanType {
  ONETIME = "One-Time",
  SUBSCRIPTION = "Subscription",
}

function Design2({ pageId, section }: DesignProps) {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const { AnimatePresence, motion } = useMotion();
  const [activePlan, setActivePlan] = useState<number>(0);
  const pricingStyle = section?.style as PricingStyle;
  const pricingContent = section?.content as PricingContent;
  const { spacing, background, border, sectionBackground, text } =
    pricingStyle.designSettings;
  const bgMuted = sectionBackground.color === "gray";
  const bgPrimary = sectionBackground.color === "primary";

  const titleContainerClassName = cn("space-y-3", {
    "text-primary-foreground": sectionBackground.color === "primary",
    "text-white":
      sectionBackground.textColor === "light" &&
      sectionBackground.media.imageUrl,
    "text-black":
      sectionBackground.textColor === "dark" &&
      sectionBackground.media.imageUrl,
  });

  const subTitleClassName = cn({
    "text-primary-foreground": sectionBackground.color === "primary",
    "text-muted-foreground": sectionBackground.color !== "primary",
    hidden: !pricingContent.subtitle,
    "text-white":
      sectionBackground.textColor === "light" &&
      sectionBackground.media.imageUrl,
    "text-black":
      sectionBackground.textColor === "dark" &&
      sectionBackground.media.imageUrl,
  });

  const sectionTitleClassName = cn("text-4xl", {
    hidden: !pricingContent.title,
  });

  const subItemClassNames = cn(
    "flex flex-col gap-5 gap-y-3 relative rounded-md overflow-hidden",
    {
      "bg-muted p-5": background,
      "outline outline-[1px] outline-muted p-5": border,
      "bg-background": bgMuted || bgPrimary,
    }
  );

  const planToggleContainerClassNames = cn(
    "h-10 bg-muted rounded-md flex items-center justify-center min-w-32 max-md:w-full shrink-0 p-1",
    {
      "bg-background": bgMuted || bgPrimary,
    }
  );

  const titleClassName = cn(
    text === "s" && "text-sm",
    text === "m" && "text-base",
    text === "l" && "text-lg"
  );

  const sectionBgClassName = cn("flex flex-col relative overflow-hidden", {
    "bg-primary": sectionBackground.color === "primary",
    "bg-muted": sectionBackground.color === "gray",
    "bg-background": sectionBackground.color === "none",
    "min-h-screen": sectionBackground.height === "fill",
    "h-auto": sectionBackground.height === "fit",
    "justify-start": sectionBackground.align === "start",
    "justify-center": sectionBackground.align === "center",
    "justify-end": sectionBackground.align === "end",
    "container max-w-container rounded-md": sectionBackground.width === "fit",
  });
  const mainSection = cn("flex flex-col overflow-hidden", {
    "container max-w-container my-4": sectionBackground.width === "fit",
  });

  const sectionInnerContainer = cn("z-0 gap-10 w-full", {
    "container max-w-container": sectionBackground.width === "fill",
  });

  const pricingHeaderContainer = cn(
    "flex max-md:flex-col gap-3 items-start justify-center",
    {
      "justify-between":
        pricingContent.title || pricingContent.subtitle || pricingContent.label,
    }
  );

  useEffect(() => {
    const defaultPlanIndex = pricingContent.subscriptionPlans.findIndex(
      (plan) => plan.default
    );

    setActivePlan(defaultPlanIndex !== -1 ? defaultPlanIndex : 0);
  }, [pricingContent]);

  return (
    <section className={mainSection}>
      <div className={sectionBgClassName}>
        <BackgroundImage
          imageUrl={sectionBackground.media.imageUrl}
          parallax={sectionBackground.parallax}
          blur={sectionBackground.blur}
          blurEffect={sectionBackground.blurEffect}
          greyScale={sectionBackground.greyScale}
          overlay={sectionBackground.overlay}
          overlayEffect={sectionBackground.overlayEffect}
          backgroundColor={sectionBackground.color}
        />
        <div
          className={sectionInnerContainer}
          style={{
            paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
            paddingBottom: isDesktop
              ? spacing.bottom.desktop
              : spacing.bottom.mobile,
          }}
        >
          <div className="space-y-4">
            <div className={pricingHeaderContainer}>
              <div className={titleContainerClassName}>
                <DesignLabel
                  text={pricingContent.label}
                  sectionBackground={sectionBackground.color}
                />
                <h1 className={sectionTitleClassName}>
                  {pricingContent.title}
                </h1>
                <p className={subTitleClassName}>{pricingContent.subtitle}</p>
              </div>
              {pricingContent.planType ===
                SubscriptionPlanType.SUBSCRIPTION && (
                <div className={planToggleContainerClassNames}>
                  {pricingContent.subscriptionPlans.map((plan, i) => {
                    if (!plan.billingCycle) return null;

                    const onePlanBillingCycle =
                      pricingContent.subscriptionPlans.filter(
                        (plan) => plan.billingCycle
                      ).length === 1;

                    return (
                      <div
                        key={i}
                        className={cn(
                          "h-full p-1 flex items-center min-w-[70px] max-md:w-full justify-center text-xs break-keep cursor-pointer rounded-md transition-colors",
                          {
                            "bg-muted":
                              (activePlan === i || onePlanBillingCycle) &&
                              (bgMuted || bgPrimary),
                            "bg-background":
                              (activePlan === i || onePlanBillingCycle) &&
                              !bgMuted &&
                              !bgPrimary,
                            "w-full": onePlanBillingCycle,
                          }
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
                        style={{
                          padding: isDesktop
                            ? spacing.padding.desktop
                            : spacing.padding.mobile,
                        }}
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
                          background={sectionBackground.color}
                        />
                        <div>
                          <h5 className={titleClassName}>
                            {subscription.title}
                          </h5>
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
                                (bgMuted || bgPrimary || border) &&
                                !subscription.featured.isActive,
                            })}
                            onClick={() => {
                              if (plan.button.link) {
                                // Ensure the link has http/https prefix
                                let finalLink = plan.button.link;
                                if (
                                  !finalLink.startsWith("http://") &&
                                  !finalLink.startsWith("https://")
                                ) {
                                  finalLink = "https://" + finalLink;
                                }

                                if (plan.button.openNewTab) {
                                  window.open(
                                    finalLink,
                                    "_blank",
                                    "noopener,noreferrer"
                                  );
                                } else {
                                  window.location.href = finalLink;
                                }
                              }
                            }}
                          >
                            {plan.button.text}
                          </Button>
                        )}
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
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Design2;
