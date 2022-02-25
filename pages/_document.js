import Document, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../theme'
import { ColorModeScript } from '@chakra-ui/react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
        <Html>
            <Head>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
              `,
                }}
              />
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
  }
}

export default MyDocument