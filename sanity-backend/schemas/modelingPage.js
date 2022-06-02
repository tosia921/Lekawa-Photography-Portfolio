export default {
  name: 'modelingPage',
  title: 'Modeling Page',
  type: 'document',
  fields: [
    {
      name: 'pageText',
      title: 'Page Text',
      type: 'localeStringText',
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
