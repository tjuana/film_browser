interface MovieDetailsProps {
  status?: string;
  budget?: number;
  revenue?: number;
  popularity?: number;
}

interface DetailItemProps {
  label: string;
  value: string | number;
  formatter?: (value: number) => string;
}

const DetailItem = ({ label, value, formatter }: DetailItemProps) => {
  const displayValue =
    typeof value === 'number' && formatter ? formatter(value) : value;

  return (
    <div className="movie-detail-view__detail-item">
      <span className="movie-detail-view__detail-label">{label}:</span>
      <span className="movie-detail-view__detail-value">{displayValue}</span>
    </div>
  );
};

export const MovieDetails = ({
  status,
  budget,
  revenue,
  popularity,
}: MovieDetailsProps) => {
  const formatCurrency = (amount: number) =>
    `$${amount.toLocaleString('en-US')}`;
  const formatPopularity = (pop: number) => pop.toFixed(1);

  const hasAnyDetails =
    status ||
    (budget && budget > 0) ||
    (revenue && revenue > 0) ||
    popularity !== undefined;

  if (!hasAnyDetails) {
    return null;
  }

  return (
    <div className="movie-detail-view__section">
      <h3 className="movie-detail-view__section-title">Movie Details</h3>
      <div className="movie-detail-view__details">
        {(status && <DetailItem label="Status" value={status} />) || null}
        {(budget && budget > 0 && (
          <DetailItem
            label="Budget"
            value={budget}
            formatter={formatCurrency}
          />
        )) ||
          null}
        {(revenue && revenue > 0 && (
          <DetailItem
            label="Revenue"
            value={revenue}
            formatter={formatCurrency}
          />
        )) ||
          null}
        {(popularity !== undefined && (
          <DetailItem
            label="Popularity"
            value={popularity}
            formatter={formatPopularity}
          />
        )) ||
          null}
      </div>
    </div>
  );
};
