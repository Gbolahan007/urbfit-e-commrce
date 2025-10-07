import supabase from "./supabase";

export async function getCategory() {
  const { data, error } = await supabase
    .from("subCategory")
    .select("*")
    .eq("gender", "men");

  if (error) {
    console.error(error);
    throw new Error("Could not fetch category products");
  }
  return data ?? [];
}
export async function getWomenCategory() {
  const { data, error } = await supabase
    .from("subCategory")
    .select("*")
    .eq("gender", "women");

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
    throw new Error("Could not fetch trending products");
  }
  console.log(data);
  return data ?? [];
}

export async function getProductDetail(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product detail:", error);
    throw new Error("Could not fetch product detail");
  }

  return data;
}

export async function getMenProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("gender", "men");

  if (error) {
    console.error(error);
    throw new Error("Could not fetch products");
  }

  return data ?? [];
}

export async function getwomenProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("gender", "women");

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

export async function getRelatedProducts(category: string, slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("slug", slug);

  if (error) {
    console.error(error);
    throw new Error("Related products could not be loaded");
  }

  return data;
}
