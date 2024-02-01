import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const rapidApiKey= import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

 console.log(rapidApiKey);
// const options = {
//     method: 'GET',
//     url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
//     params: {
//       url: 'https://time.com/6266679/musk-ai-open-letter/',
//       length: '3'
//     },
//     headers: {
//       'X-RapidAPI-Key': '97d00653a0msh5db5be6a7736582p1510d2jsn39405bf7ab4e',
//       'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
//     }
//   };

export const articleApi = createApi({
    reducerPath: 'articleApi',
 
    // baseQuery defines which api to call using baseUrl.
    baseQuery: fetchBaseQuery({
        baseUrl:'https://article-extractor-and-summarizer.p.rapidapi.com/',

        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key', rapidApiKey),
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')
            
            return headers;
        }
    }),

    endpoints: (builder)=>({
        // getSummary : the name of the function which returns the summarized article from the url.
        getSummary: builder.query({
            query:(params)=>`/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
})

//redux-toolkit automatically create the hooks from the end-points
// with useLazy the hook does not run when the app intial loads rather it runs only when it is triggered.
export const { useLazyGetSummaryQuery } = articleApi;