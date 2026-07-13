import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://arrelat.cat'
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`

export default function Seo({ title, description, image, path, noindex }) {
  const url = path ? `${SITE_URL}${path}` : SITE_URL
  const ogImage = image || DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={url} />
    </Helmet>
  )
}
