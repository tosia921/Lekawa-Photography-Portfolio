export default {
    name: 'publicationList',
    title: 'Publications List',
    type: 'document',
    fields: [
      {
        name: 'publicationsList',
        title: 'Publications List',
        type: 'textList',
      }
    ],
    preview: {
      select: {
        title: 'publicationsList.en'
      }
    }
  }
  