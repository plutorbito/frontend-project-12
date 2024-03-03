import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getAuthHeader from './utils/getAuthHeader';

export const backendApi = createApi({
  reducerPath: 'backend',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      headers.set('Authorization', getAuthHeader().Authorization);
    },
  }),
  endpoints: (builder) => ({
    sendLoginData: builder.mutation({
      query: (loginData) => ({
        url: 'login',
        method: 'POST',
        body: loginData,
      }),
    }),

    sendNewUserData: builder.mutation({
      query: (newUserData) => ({
        url: 'signup',
        method: 'POST',
        body: newUserData,
      }),
    }),

    getMessages: builder.query({
      query: () => ({
        url: 'messages',
        method: 'GET',
      }),
    }),

    sendMessage: builder.mutation({
      query: (message) => ({
        url: 'messages',
        method: 'POST',
        body: message,
      }),
    }),

    getChannels: builder.query({
      query: () => ({
        url: 'channels',
        method: 'GET',
      }),
    }),

    addChannels: builder.mutation({
      query: (channel) => ({
        url: 'channels',
        method: 'POST',
        body: channel,
      }),
    }),

    removeChannels: builder.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
        body: id,
      }),
    }),

    renameChannels: builder.mutation({
      query: ({ id, newName }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: { name: newName },
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetChannelsQuery,
  useSendLoginDataMutation,
  useAddChannelsMutation,
  useRemoveChannelsMutation,
  useRenameChannelsMutation,
  useSendNewUserDataMutation,
} = backendApi;
