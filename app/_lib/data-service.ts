import supabase from "./supabase";

export async function getCategory() {
  const { data, error } = await supabase.from("subCategory").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not fetch category products");
  }
  return data ?? [];
}

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not fetch products");
  }
  return data ?? [];
}
export async function getTopPicks() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_top_picks", true);

  if (error) {
    console.error(error);
    throw new Error("Could not fetch top picks products");
  }
  return data ?? [];
}

export async function getTrendingNew() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_trending", true);

  if (error) {
    console.error(error);
    throw new Error("Could not fetch trending products");
  }
  console.log(data);
  return data ?? [];
}

export async function getBrands() {
  const { data, error } = await supabase.from("brands").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not fetch products brands");
  }
  return data ?? [];
}
