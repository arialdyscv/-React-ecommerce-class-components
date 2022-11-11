import { gql } from "@apollo/client";

export const PRODUCT_INFO = (productId) => gql`
    query {
        product( id: ${JSON.stringify(productId)}){
            id
            name
            description
            gallery
            inStock
            brand
            attributes {
                id
                name
                type
                items {
                    id
                    value
                    displayValue
                }
            }
            prices {
                amount
                currency {
                    label
                    symbol
                }
            }
        }
        
    }`;

export const PRODUCT_LIST = gql`
  query fetchProducts {
    categories {
      name
      products {
        id
        name
        brand
        description
        gallery
        inStock
        attributes {
          id
          name
          type
          items {
            displayValue
            value
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

export const CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

export const CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
