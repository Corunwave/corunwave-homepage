type PageHeroProps = {
  title: string;
  description: string;
};

/* Shared subpage hero (preview company-hero). Static server component: no client JS. */
const PageHero = ({ title, description }: PageHeroProps) => {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero__content">
        <h1 id="page-hero-title" className="page-hero__title">
          {title}
        </h1>
        <p className="page-hero__description">{description}</p>
      </div>
    </section>
  );
};

export default PageHero;
