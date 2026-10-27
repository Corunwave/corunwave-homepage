type PageHeroProps = {
  title: string;
  description: string;
  /** "compact" shrinks the description for long copy that must stay on its authored lines. */
  descriptionSize?: "default" | "compact";
};

/* Shared subpage hero (preview company-hero). Static server component: no client JS. */
const PageHero = ({
  title,
  description,
  descriptionSize = "default",
}: PageHeroProps) => {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero__content">
        <h1 id="page-hero-title" className="page-hero__title">
          {title}
        </h1>
        <p
          className={
            descriptionSize === "compact"
              ? "page-hero__description page-hero__description--compact"
              : "page-hero__description"
          }
        >
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
