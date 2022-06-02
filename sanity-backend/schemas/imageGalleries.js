export default {
    name: 'imageGalleries',
    title: 'Image Galleries',
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
        name: 'featuredImage',
        title: 'Featured Image',
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
        name: 'imageGallery',
        title: 'Image Gallery',
        type: 'gallery'
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
      }
    ]
  }
  