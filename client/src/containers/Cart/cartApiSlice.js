import { gql } from "@apollo/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export const cartApiSlice = createApi({
  reducerPath: "cartApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchCart: builder.query({
      query: () => ({
        url: "/graphql",
        body: {
          query: `
            query fetchCart {
              fetchCart {
                id
                quantity
                product {
                  id
                  name
                  category
                  price
                  description
                  image
                }
                status
              }
            }
          `,
        },
      }),
    }),
    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "graphql",
        body: {
          query: `
          mutation addToCart($productId: String!, $quantity: Int!) {
            data: addToCart(productId: $productId, quantity: $quantity) {
              id
              quantity
              product {
                id
                name
                category
                price
                description
                image
              }
              status
            }
          }
        `,
        },
        variables: { productId, quantity },
      }),
    }),
    incrementProductQuantity: builder.mutation({
      query: ({ cartId, quantity }) => ({
        url: "graphql",
        body: {
          query: gql`
            mutation incrementProductQuantity(
              $cartId: String!
              $quantity: Int!
            ) {
              data: incrementProductQuantity(
                cartId: $cartId
                quantity: $quantity
              ) {
                id
                quantity
                product {
                  id
                  name
                  category
                  price
                  description
                  image
                }
                status
              }
            }
          `,
        },
        variables: { cartId, quantity },
      }),
    }),
    decrementProductQuantity: builder.mutation({
      query: ({ cartId, quantity }) => ({
        url: "graphql",
        body: {
          query: gql`
            mutation decrementProductQuantity(
              $cartId: String!
              $quantity: Int!
            ) {
              data: decrementProductQuantity(
                cartId: $cartId
                quantity: $quantity
              ) {
                id
                quantity
                product {
                  id
                  name
                  category
                  price
                  description
                  image
                }
                status
              }
            }
          `,
        },
        variables: { cartId, quantity },
      }),
    }),
    removeFromCart: builder.mutation({
      query: ({ cartId }) => ({
        url: "graphql",
        body: {
          query: gql`
            mutation removeFromCart($cartId: String!) {
              data: removeFromCart(cartId: $cartId) {
                id
              }
            }
          `,
        },
        variables: { cartId },
      }),
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncrementProductQuantityMutation,
  useDecrementProductQuantityMutation,
} = cartApiSlice;