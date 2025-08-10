import type { ProductionCompany } from '@entities/movie/model/types';

interface ProductionCompaniesProps {
  companies: ProductionCompany[];
  maxCompanies?: number;
}

export const ProductionCompanies = ({
  companies,
  maxCompanies = 3,
}: ProductionCompaniesProps) => {
  if (!companies || companies.length === 0) {
    return null;
  }

  const displayCompanies = companies.slice(0, maxCompanies);

  return (
    <div className="movie-detail-view__section">
      <h3 className="movie-detail-view__section-title">Production Companies</h3>
      <div className="movie-detail-view__companies">
        {displayCompanies.map((company) => (
          <div key={company.id} className="movie-detail-view__company">
            {company.logoPath && (
              <img
                src={company.logoPath}
                alt={company.name}
                className="movie-detail-view__company-logo"
                loading="lazy"
                decoding="async"
              />
            )}
            <span className="movie-detail-view__company-name">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
