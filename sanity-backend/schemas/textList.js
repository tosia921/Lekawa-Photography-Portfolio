export default {
    name: 'textList',
    type: 'object',
    title: 'Text List',
    fields: [
      {
        name: 'list',
        type: 'array',
        title: 'List',
        of: [
          {
            name: 'publicationName',
            type: 'object',
            title: 'Publication Name',
            fields: [
              {
                name: 'name',
                type: 'localeString',
                title: 'Name',
              },
            ],
          },
        ],
        options: {
          layout: 'list',
        },
      },
    ],
  };