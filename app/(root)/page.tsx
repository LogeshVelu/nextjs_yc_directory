import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";



export default async function Home({searchParams}:{ searchParams: Promise<{ query?: string }> }) {
  
  const query = (await searchParams).query;
  const params = {search: query || null};
  // const posts = await client.fetch(STARTUPS_QUERY);

  const session = await auth();

  const {data:posts} = await sanityFetch({query: STARTUPS_QUERY, params });


// const posts = [{
//   _createAt:new Date(),
//   views:55,
//   author:{_id:1, name:'Logesh'},
//   _id:1,
//   description:'This is a description',
//   image:'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
//   category:"Robots",
//   title:"We Robots"
// }];

  return (<>
    <section className="pink_container">
      <h1 className="heading">Pitch Your Startup, <br /> Connect with Entrepreneurs</h1>
      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
      </p>
      <SearchForm query={query} />
    </section>

    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : 'All Startups'}
      </p>

      <ul className='mt-7 card_grid'>
        {posts?.length > 0 ? (
          posts.map((post:StartupCardType) => (
            <StartupCard key={post?._id}  post={post}  />
          ))
        ): (
          <p className="no-results"> No startups found</p>
        )}
      </ul>

    </section>
    <SanityLive />
    </>  );  
}
