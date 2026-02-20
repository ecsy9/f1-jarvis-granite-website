import './SectionPage.css';

function SectionPage({ title, children }) {
  return (
    <main className="section-page">
      <div className="section-page__container">
        <h1 className="section-page__title">{title}</h1>
        <div className="section-page__content">
          {children}
        </div>
      </div>
    </main>
  );
}

export default SectionPage;
