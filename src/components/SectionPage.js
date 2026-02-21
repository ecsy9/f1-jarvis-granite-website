import { useState, useEffect, useRef } from 'react';
import './SectionPage.css';

function SectionPage({ title, children }) {
  const contentRef = useRef(null);
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const h2s = Array.from(el.querySelectorAll('h2'));
    const items = h2s.map((h, i) => {
      const id = `s-${i}`;
      h.id = id;
      return { id, label: h.textContent.trim() };
    });
    setHeadings(items);

    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-10% 0% -80% 0%' }
    );
    h2s.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="section-page">
      <div className="section-page__container">
        <h1 className="section-page__title">{title}</h1>
        <div className="section-page__body">
          <div className="section-page__content" ref={contentRef}>
            {children}
          </div>
          {headings.length > 1 && (
            <nav className="section-toc" aria-label="On this page">
              <p className="section-toc__heading">On this page</p>
              <ul className="section-toc__list">
                {headings.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`section-toc__link${activeId === id ? ' section-toc__link--active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </main>
  );
}

export default SectionPage;
