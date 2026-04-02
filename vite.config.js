import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const localFallbackArticles = [
  {
    id: 'fallback-mushaira-archives',
    title: 'How Digital Archives Are Bringing Classical Urdu Poetry to New Readers',
    description: 'A look at how online collections, annotated texts, and searchable poetry libraries are helping readers rediscover classical poets and difficult vocabulary.',
    image: '',
    url: 'https://rekhta.org',
    publishedAt: '2026-04-02T08:00:00.000Z',
    source: 'Solace Library Notes',
  },
  {
    id: 'fallback-poetry-readings',
    title: 'Why Live Poetry Readings Still Matter in the Age of Short-Form Content',
    description: 'From mushairas to campus readings, spoken poetry continues to create a stronger emotional connection than passive scrolling.',
    image: '',
    url: 'https://rekhta.org',
    publishedAt: '2026-04-01T14:30:00.000Z',
    source: 'Solace Editorial',
  },
  {
    id: 'fallback-ghazal-guide',
    title: 'A Beginner’s Guide to Reading Ghazals Without Feeling Lost',
    description: 'Key ideas like matla, maqta, radeef, qafiya, ishq, hijr, and wafa explained in a reader-friendly way for new poetry lovers.',
    image: '',
    url: 'https://rekhta.org',
    publishedAt: '2026-03-31T10:15:00.000Z',
    source: 'Solace Reader Guide',
  },
];

function decodeXml(value = '') {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getTagValue(block, tagName) {
  const match = block.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
  return match ? decodeXml(match[1].trim()) : '';
}

function extractMetaContent(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return decodeXml(match[1].trim());
    }
  }

  return '';
}

function absolutizeUrl(url, baseUrl) {
  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return url;
  }
}

async function enrichArticle(article) {
  try {
    const response = await fetch(article.url, {
      redirect: 'follow',
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; SolaceNewsBot/1.0)',
      },
    });

    if (!response.ok) {
      return article;
    }

    const finalUrl = response.url || article.url;
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return { ...article, url: finalUrl };
    }

    const html = await response.text();
    const image = extractMetaContent(html, [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    ]);

    return {
      ...article,
      url: finalUrl,
      image: image ? absolutizeUrl(image, finalUrl) : article.image,
    };
  } catch {
    return article;
  }
}

async function enrichArticles(articles) {
  return Promise.all(articles.map((article) => enrichArticle(article)));
}

function parseGoogleNewsRss(xml) {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return items.slice(0, 10).map((item, index) => {
    const title = getTagValue(item, 'title');
    const source = getTagValue(item, 'source') || 'Google News';
    const url = getTagValue(item, 'link');
    const publishedAt = getTagValue(item, 'pubDate');
    const cleanTitle = title.replace(/\s+-\s+[^-]+$/, '');

    return {
      id: url || `google-news-${index}`,
      title: cleanTitle || title || 'Poetry news',
      description: 'Latest worldwide coverage related to poetry, poets, shayari, and literature.',
      image: '',
      url,
      publishedAt,
      source,
    };
  }).filter((article) => article.url);
}

async function fetchGNewsArticles(apiKey) {
  const query = [
    '"poetry"',
    'poet',
    'shayari',
    'ghazal',
    '"urdu poetry"',
    'literature',
    'mushaira',
  ].join(' OR ');

  const url = new URL('https://gnews.io/api/v4/search');
  url.searchParams.set('q', query);
  url.searchParams.set('lang', 'en');
  url.searchParams.set('max', '10');
  url.searchParams.set('apikey', apiKey);

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GNews request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return (data.articles || []).map((article, index) => ({
    id: article.url || `${article.source?.name || 'source'}-${index}`,
    title: article.title,
    description: article.description,
    image: article.image,
    url: article.url,
    publishedAt: article.publishedAt,
    source: article.source?.name || 'Unknown source',
  }));
}

async function fetchFallbackArticles() {
  const rssUrl = new URL('https://news.google.com/rss/search');
  rssUrl.searchParams.set('q', 'poetry OR poet OR shayari OR ghazal OR "urdu poetry" OR literature OR mushaira');
  rssUrl.searchParams.set('hl', 'en-US');
  rssUrl.searchParams.set('gl', 'US');
  rssUrl.searchParams.set('ceid', 'US:en');

  const response = await fetch(rssUrl);

  if (!response.ok) {
    throw new Error(`Fallback news feed failed: ${response.status}`);
  }

  const xml = await response.text();
  const parsed = parseGoogleNewsRss(xml);
  return enrichArticles(parsed);
}

function createLocalFallbackPayload(message = '') {
  return {
    articles: localFallbackArticles,
    provider: 'local-fallback',
    message,
  };
}

function registerNewsMiddleware(server, apiKey, cache, setCache) {
  server.middlewares.use('/api/news', async (_req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (cache.payload && Date.now() < cache.expiresAt) {
      res.end(JSON.stringify(cache.payload));
      return;
    }

    try {
      const articles = apiKey
        ? await fetchGNewsArticles(apiKey)
        : await fetchFallbackArticles();

      const payload = {
        articles: articles.length > 0 ? articles : localFallbackArticles,
        provider: apiKey ? 'gnews' : 'google-news-rss',
      };

      setCache({
        payload,
        expiresAt: Date.now() + (15 * 60 * 1000),
      });

      res.end(JSON.stringify(payload));
    } catch (error) {
      const payload = createLocalFallbackPayload(
        error instanceof Error ? error.message : 'Unable to fetch poetry news.'
      );

      setCache({
        payload,
        expiresAt: Date.now() + (15 * 60 * 1000),
      });

      res.end(JSON.stringify(payload));
    }
  });
}

function poetryNewsApi(mode) {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GNEWS_API_KEY;
  let cache = {
    expiresAt: 0,
    payload: null,
  };

  return {
    name: 'poetry-news-api',
    configureServer(server) {
      registerNewsMiddleware(server, apiKey, cache, (nextCache) => {
        cache = nextCache;
      });
    },
    configurePreviewServer(server) {
      registerNewsMiddleware(server, apiKey, cache, (nextCache) => {
        cache = nextCache;
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Solace/' : '/',
  plugins: [react(), poetryNewsApi(mode)],
  server: {
    port: 5173,
    open: true,
  },
}));
