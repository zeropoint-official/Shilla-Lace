export const getPageQuery = /* GraphQL */ `
  query getPage($handle: String!) {
    pageByHandle(handle: $handle) {
      id
      title
      handle
      body
      bodySummary
      seo {
        title
        description
      }
      createdAt
      updatedAt
    }
  }
`;

export const getPagesQuery = /* GraphQL */ `
  query getPages {
    pages(first: 100) {
      edges {
        node {
          id
          title
          handle
          body
          bodySummary
          seo {
            title
            description
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;
