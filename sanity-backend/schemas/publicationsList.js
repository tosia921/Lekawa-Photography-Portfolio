export default {
  name: 'publicationList',
  title: 'Publications List',
  type: 'document',
  fields: [
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'publicationsList',
      title: 'Publications List',
      type: 'textList'
    }
  ],
  preview: {
    select: {
      title: 'title.en'
    }
  }
}
  