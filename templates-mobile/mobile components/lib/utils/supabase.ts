// This file is deprecated.
// The static Supabase client has been removed to prevent its use without proper authentication.
//
// To interact with Supabase, please use the `useSupabase()` hook, which is provided
// by the `SupabaseProvider`. This ensures that all requests are authenticated
// with the user's Clerk session token.
//
// Example:
// import { useSupabase } from '@/lib/SupabaseProvider';
//
// const MyComponent = () => {
//   const supabase = useSupabase();
//
//   const fetchData = async () => {
//     if (!supabase) return;
//     const { data } = await supabase.from('my_table').select('*');
//     // ...
//   }
// }
export {};