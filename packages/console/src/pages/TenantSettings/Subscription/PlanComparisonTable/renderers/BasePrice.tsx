import DynamicT from '@/ds-components/DynamicT';

import TableDataWrapper from '../components/TableDataWrapper';

type Props = {
  value?: string;
};

function BasePrice({ value }: Props) {
  if (value === undefined) {
    return <DynamicT forKey="subscription.quota_table.contact" />;
  }

  /**
   * `basePrice` is a string value representing the price in cents, we need to convert the value from cents to dollars.
   */
  return (
    <TableDataWrapper>
      <DynamicT
        forKey="subscription.quota_table.monthly_price"
        interpolation={{ value: Number(value) / 100 }}
      />
    </TableDataWrapper>
  );
}

export default BasePrice;
