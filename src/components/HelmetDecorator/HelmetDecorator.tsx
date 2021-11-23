import usePathWithoutLang from "common/router/usePathWithoutLang";
import { avaliableLanguages, fallbackLng } from "locales";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const hostname = `https://novel-cms-three.vercel.app`;

export interface HelmetDecoratorProps {
  lang?: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt: string;
}

const HelmetDecorator = ({
  title,
  description,
  imageUrl,
  imageAlt,
  lang,
}: HelmetDecoratorProps) => {
  const { pathWithoutLang } = usePathWithoutLang();
  const { i18n } = useTranslation();

  return (
    <Helmet>
      <html lang={lang || i18n.language} />
      <title>Novel | {title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* {imageUrl && <meta property="og:image" content={hostname + imageUrl} />} */}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta
        property="og:url"
        content={hostname + window.location.pathname + window.location.search}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image:alt" content={imageAlt} />

      {avaliableLanguages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang === fallbackLng ? `x-default` : lang}
          href={
            hostname +
            `${
              lang === fallbackLng
                ? pathWithoutLang
                : `/${lang}${pathWithoutLang}`
            }`
          }
        />
      ))}
    </Helmet>
  );
};

export default HelmetDecorator;
