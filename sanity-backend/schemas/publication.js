export default {
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'previewImage',
      title: 'Small Preview Card Image',
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
      name: 'smallText1',
      title: 'Small Text 1',
      type: 'localeString',
    },
    {
      name: 'smallText2',
      title: 'Small Text 2',
      type: 'localeString',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'localeString',
    },
    {
      name: 'Date',
      title: 'date',
      type: 'datetime',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'localeString',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'localeString',
    },
    {
      name: 'isHomepage',
      title: 'Show in Homepage Carousel',
      type: 'boolean',
    },
    {
      name: 'isDisplayedTop',
      title: 'Display at the top of the publications',
      type: 'boolean',
    },
    {
      name: 'bodyEnglish',
      title: 'Body English',
      type: 'blockContentEnglish',
    },
    {
      name: 'bodyPolish',
      title: 'Body Polish',
      type: 'blockContentPolish',
    },
  ]
}
