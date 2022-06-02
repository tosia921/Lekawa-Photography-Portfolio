export default {
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    fields: [
      {
        name: 'pageContent1',
        title: 'Page Content 1',
        type: 'localeStringText',
      },
      {
        name: 'aboutImage1',
        title: 'About Image 1',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'altText',
            title: 'Alt Text',
            type: 'localeString',
          }
        ]
      },
      {
        name: 'pageContent2',
        title: 'Page Content 2',
        type: 'localeStringText',
      },
      {
        name: 'aboutImage2',
        title: 'About Image 2',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'altText',
            title: 'Alt Text',
            type: 'localeString',
          }
        ]
      },
    ]
  }
  