/** @jsx jsx */
import { jsx } from '@emotion/core';
import Head from 'next/head';

interface Meta {
  title: string;
  description: string;
  image: string;
  url: string;
  keywords: string;
}

export const createOgTags = ({ title, description, image, url }: Omit<Meta, "keywords">) => ({
  'og:title': title,
  'og:description': description,
  'og:image': image,
  'og:image:type': 'image/jpeg',
  'og:url': url,
  'og:locale': 'ko_KR',
  'og:site_name': title,
  'og:image:width': 346,
  'og:image:height': 196,
});

export const CreateTwitterTags = ({ title, description, image }: Pick<Meta, "title" | "description" | "image">) => ({
  'twitter:card': 'summary',
  'twitter:title': title,
  'twitter:description': description,
  'twitter:image': image,
});

const Helmet: React.FC<Meta> = ({
  title, description, image, url, keywords,
}) => {
  const ogTags = createOgTags({ title, description, image, url });
  const twitterTags = CreateTwitterTags({ title, description, image });
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta charSet="UTF-8" />
      <meta name="author" content="tmmoond8"></meta>
      {
        <>
          {Object.entries(ogTags).map(([key, value]) => (
            <meta key={key} name={key} content={value.toString()} />
          ))}
        </>
      }
      {
        <>
          {Object.entries(twitterTags).map(([key, value]) => (
            <meta key={key} name={key} content={value.toString()} />
          ))}
        </>
      }
      <link
        rel="shortcut icon"
        href="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566826573/noticon/favicon_j7lf1k.ico"
      />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
}

export default Helmet;