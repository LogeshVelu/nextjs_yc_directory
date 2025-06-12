import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const appStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('startup').title('Startups'),
    ])




// import StructureBuilder from 'sanity/structure';

// const structure = (S: ReturnType<typeof StructureBuilder>) =>
//   S.list()
//     .title('Content')
//     .items([
//           S.documentTypeListItem('author').title('Authors'),
//           S.documentTypeListItem('startup').title('Startups'),
//     ]);

// export default structure;








