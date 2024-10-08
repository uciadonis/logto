import { ReservedPlanId } from '@logto/schemas';
import { cond, conditional } from '@silverhand/essentials';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useContext, useMemo } from 'react';

import { type NewSubscriptionPeriodicUsage } from '@/cloud/types/router';
import { SubscriptionDataContext } from '@/contexts/SubscriptionDataProvider';
import { TenantsContext } from '@/contexts/TenantsProvider';
import DynamicT from '@/ds-components/DynamicT';
import { formatPeriod } from '@/utils/subscription';

import PlanUsageCard, { type Props as PlanUsageCardProps } from './PlanUsageCard';
import styles from './index.module.scss';
import { usageKeys, usageKeyPriceMap, usageKeyMap, titleKeyMap, tooltipKeyMap } from './utils';

type Props = {
  readonly periodicUsage?: NewSubscriptionPeriodicUsage;
};

function PlanUsage({ periodicUsage: rawPeriodicUsage }: Props) {
  const {
    currentSubscriptionQuota,
    currentSubscriptionUsage,
    currentSubscription: currentSubscriptionFromNewPricingModel,
  } = useContext(SubscriptionDataContext);
  const { currentTenant } = useContext(TenantsContext);

  const { currentPeriodStart, currentPeriodEnd, planId, isAddOnAvailable } =
    currentSubscriptionFromNewPricingModel;

  const periodicUsage = useMemo(
    () =>
      rawPeriodicUsage ??
      conditional(
        currentTenant && {
          mauLimit: currentTenant.usage.activeUsers,
          tokenLimit: currentTenant.usage.tokenUsage,
        }
      ),
    [currentTenant, rawPeriodicUsage]
  );

  if (!periodicUsage) {
    return null;
  }

  const onlyShowPeriodicUsage =
    planId === ReservedPlanId.Free || (!isAddOnAvailable && planId === ReservedPlanId.Pro);

  const usages: PlanUsageCardProps[] = usageKeys
    // Show all usages for Pro plan and only show MAU and token usage for Free plan
    .filter(
      (key) =>
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        isAddOnAvailable || (onlyShowPeriodicUsage && (key === 'mauLimit' || key === 'tokenLimit'))
    )
    .map((key) => ({
      usage:
        key === 'mauLimit' || key === 'tokenLimit'
          ? periodicUsage[key]
          : currentSubscriptionUsage[key],
      usageKey: `subscription.usage.${usageKeyMap[key]}`,
      titleKey: `subscription.usage.${titleKeyMap[key]}`,
      unitPrice: usageKeyPriceMap[key],
      ...conditional(
        planId === ReservedPlanId.Pro && {
          tooltipKey: `subscription.usage.${tooltipKeyMap[key]}`,
        }
      ),
      ...cond(
        (key === 'tokenLimit' || key === 'mauLimit') && { quota: currentSubscriptionQuota[key] }
      ),
    }));

  return (
    <div>
      <div className={classNames(styles.planCycle, styles.planCycleNewPricingModel)}>
        <DynamicT
          forKey="subscription.plan_cycle"
          interpolation={{
            period: formatPeriod({
              periodStart: currentPeriodStart,
              periodEnd: currentPeriodEnd,
            }),
            renewDate: dayjs(currentPeriodEnd).add(1, 'day').format('MMM D, YYYY'),
          }}
        />
      </div>
      <div className={styles.newPricingModelUsage}>
        {usages.map((props, index) => (
          <PlanUsageCard
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={classNames(styles.cardItem, onlyShowPeriodicUsage && styles.periodicUsage)}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}

export default PlanUsage;
