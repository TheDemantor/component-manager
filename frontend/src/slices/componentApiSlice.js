import { apiSlice } from "./apiSlice.js";
import { COMPONENT_URL } from "../constants.js";

const componentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComponents: builder.query({
            query: ({keyword}) => ({
                url: COMPONENT_URL,
                params: {keyword},
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Components'],
        }),
        getComponentsDetails: builder.query({
            query: (id) => ({
                url:`${COMPONENT_URL}/${id}`,
            }),
            keepUnusedDataFor: 5
        }),
        createComponent: builder.mutation({
            query: () => ({
                url:COMPONENT_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Components']
        }),
        updateComponent: builder.mutation({
            query: (data) => ({
              url: `${COMPONENT_URL}/${data.componentId}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['Components'],
        }),
        uploadComponentImage: builder.mutation({
            query: (data) => ({
              url: `api/upload`,
              method: 'POST',
              body: data,
            })
        }),
        deleteComponent: builder.mutation({
            query: (ComponentId) => ({
              url: `${COMPONENT_URL}/${ComponentId}`,
              method: 'DELETE',
            }),
            providesTags: ['Components'],
        }),
        createRecommendation: builder.mutation({
            query: (data) => ({
              url: `${COMPONENT_URL}/${data.itemId}/reviews`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ['Components'],
        }),

    })
})

export const { 
    useGetComponentsQuery , 
    useGetComponentsDetailsQuery,
    useCreateComponentMutation,
    useUpdateComponentMutation,
    useUploadComponentImageMutation,
    useDeleteComponentMutation,
    useCreateRecommendationMutation,
    
} 
    = componentApiSlice;