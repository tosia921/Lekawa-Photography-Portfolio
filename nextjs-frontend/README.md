# ATL Photography website

This is a freelance project designed and developed by myself. ATL Photography is a photography business based in Nottingham and i had a great pleasure to work on their new website with a focus on showcasing their past and recent work and bring new clients.

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

After the initial talk with a client and collecting all their future website requirements:

- Multilanguage (English and Polish)
- ability to easily change and add new content to the website
- Galleries featuring their work by a different categories
- "Modeling Page" showcasing their collaboration with the fashion and clothing industry
- "Publications Page" showcasing their photos being featured in fashion/clothing magazines all around the world.
- Short and sweet about us page- Pricing Page
- Contact Page

With the basic idea of how the website should look and feel for its future users, i started to design it in Adobe XD, and after few revisions, we decided on its final look.

For the tech stack I decided to choose:

- Next JS as the front-end framework, thanks to its static generation and built-in support for i18n routes/content.
- Strapi CMS for content management

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Live Site URL: [Add live site URL here](https://www.atlphotography.co.uk)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles
- [GraphQL](https://graphql.org/) - Query Language for Strapi Graphql API
- [Apollo/Client](https://www.npmjs.com/package/@apollo/client) - GraphQL Caching client
- [React Hook Form](https://react-hook-form.com/) - Forms validation library
- [next-i18next](https://github.com/isaachinman/next-i18next) - Library to manage translation content
- [nodemailer](https://nodemailer.com/) - Module for Node.js applications to allow email sending.
- [react-markdown](https://github.com/remarkjs/react-markdown) - For transforming Markdown content into HTML

### What I learned

This project really made me think a lot of how to structure my code in a clean manner, how to solve complex problems and deliver on all features requested by a client.

You can see the most important things i learned while building this project below:

- How to use Next.js to build super fast and SEO friendly websites.

- How to use Strapi CMS, create different types, components and relations

- How deploy both Next.js to Vercel and Strapi to Digital Ocean and setting webhooks to trigger automatic rebuilds when User updates content

- How to build multilanguage website (handle i18n routing and translations)

```js
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    localeDetection: false,
  },
};
```

- How to use Next.js Image component for lazy loading

```js
<Image
  className="ImageAlicja"
  src="/images/alicjaHome.jpg"
  alt="Women in Hat"
  layout="responsive"
  width={2550}
  height={1650}
  quality={75}
  priority
/>
};
```

- How to query for Strapi GraphQL API using getStaticProps, GraphQL and Apollo Client

```js
export async function getStaticProps({ locale }) {
  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL_API,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
            query {
                imageGalleries(locale: "${locale}") {
                    id
                    Name
                    slug
                    FeaturedImage {
                        AltText
                        Image {
                            alternativeText
                            url
                            width
                            height
                        }
                    }
                    GalleryImages {
                        Alt
                        Image {
                            url
                            width
                            height
                        }
                    }
                }
                publications(locale: "${locale}") {
                    id
                    Title
                    Slug
                    HomePage
                    FeaturedImage {
                        AltText
                        Image {
                            url
                            width
                            height
                        }
                    }
                    SmallText1
                    SmallText2
                    Location
                    Date
                }
            }
        `,
  });

  return {
    props: {
      currLocale: locale,
      imageGalleries: data.imageGalleries,
      publications: data.publications,
      ...(await serverSideTranslations(locale, [
        "common",
        "commons",
        "navigation",
        "homepage",
        "footer",
      ])),
      // Will be passed to the page component as props
    },
  };
}
```

- How to generate static pages in Next.js using getStaticPaths(for each language)

```js
// getStaticPaths async function that generates url for each static gallery page.
export async function getStaticPaths({ locales }) {
    const client = new ApolloClient({
        uri: process.env.STRAPI_GRAPHQL_API,
        cache: new InMemoryCache(),
    });

    // GraphQL query
    const { data } = await client.query({
        query: gql`
            query {
                publications(locale: "en") {
                    Slug
                }
            }
        `,
    });

    // empty array for future paths
    const paths = [];

    // adding generated path for each available local, each Publication gets its own page URL.
    locales.forEach((local) => {
        data.publications.forEach((publication) => {
            paths.push({ params: { slug: publication.Slug }, locale: local });
        });
    });

    return {
        paths,
        fallback: false,
    };
}
};
```

- How to use Next.js router hook to push user do different locale

```js
// Checking on initial render what locale is user currently on, and setting select list initial state accordingly.
useEffect(() => {
  if (router.locale === "en") {
    setSelected("EN");
  } else if (router.locale === "pl") {
    setSelected("PL");
  }
}, [router.locale]);

// function that handles redirecting user to different locale when changing Language in select Lang dropdown.
const handleSelectedLang = () => {
  if (selected === "EN") {
    router.push(router.asPath, router.asPath, { locale: "pl" });
  } else if (selected === "PL") {
    router.push(router.asPath, router.asPath, { locale: "en" });
  }
};
```

- How to create next.js api routes and send emails using nodemailer

```js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from "nodemailer";

export default async (req, res) => {
  const { fullname, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    const emailResponse = await transporter.sendMail({
      from: email,
      to: "tomaszposiadala@gmail.com",
      subject: `Contact form submission from ${fullname}`,
      html: `<p>You have a new contact form submission</p><br>
            <p><strong>Name: </strong>${fullname}</p>
            <p><strong>Email: </strong>${email}</p>
            <p><strong>Message: </strong>${message}</p>
            `,
    });

    console.log("Message Sent", emailResponse.messageId);
  } catch (err) {
    console.log(err);
  }

  console.log(req.body);
  res.status(200).json(req.body);
};
```

```js
const proudOfThisFunc = () => {
  console.log("🎉");
};
```

### Continued development

In my future projects i would definitly like to continue using Next.js, most likely build a e-commerce website that handles user authentication and authorization. Build a custom Checkout flow and Cart component.

### Useful resources

- [Next.js Docs](https://nextjs.org/docs) - Very well written docs, i was coming back to them whatever i have any syntax/implementation problems.
- [Strapi CMS docs](https://strapi.io/documentation/developer-docs/latest/getting-started/introduction.html) - Helpful when creating types and relations.
- [Youtube Playlist](https://www.youtube.com/playlist?list=PLUBR53Dw-Ef_oTLzPB3G5CdLWnGOSsec3) - Amazing series on how to build websites with Next.js and Strapi as CMS
- [Youtube Video](https://www.youtube.com/watch?v=WrmndNpWSJw&t=1954s) - Another one on Next.js + Strapi and how to deploy them to Digital Ocean

## Author

- Website - [Tomasz Posiadala](https://www.tomaszposiadala.co.uk)
- LinkedIn - [Tomasz Posiadala](https://www.linkedin.com/in/tomasz-posiadala/)
