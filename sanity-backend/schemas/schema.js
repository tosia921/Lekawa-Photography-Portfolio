// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContentEnglish from './blockContentEnglish'
import blockContentPolish from './blockContentPolish'
import publication from './publication'
import gallery from './gallery'
import imageGalleries from './imageGalleries'
import aboutPage from './aboutPage'
import modelingPage from './modelingPage'
import textList from './textList'
import publicationsList from './publicationsList'


const localeString = {
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fields: [
      {
          title: 'English',
          name: 'en',
          type: 'string'
      },
      {
          title: 'Polish',
          name: 'pl',
          type: 'string'
      }
  ]
}
const localeStringText = {
  title: 'Localized String Text',
  name: 'localeStringText',
  type: 'object',
  fields: [
      {
          title: 'English',
          name: 'en',
          type: 'text',
          rows: 10
      },
      {
          title: 'Polish',
          name: 'pl',
          type: 'text',
          rows: 10
      }
  ]
}

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    publication,
    imageGalleries,
    aboutPage,
    modelingPage,
    textList,
    publicationsList,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContentEnglish,
    blockContentPolish,
    localeString,
    localeStringText,
    gallery
  ]),
})
