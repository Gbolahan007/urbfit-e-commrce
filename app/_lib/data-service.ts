import { createServerClient } from "./supabase";
import { createClientBrowser } from "./supabaseClient";

export async function getCategory() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("subCategory")
    .select("*")
    .eq("gender", "men");

  if (error) {
    console.error("Error fetching men categories:", error.message);
    throw new Error("Could not fetch category products");
  }

  return data ?? [];
}

export async function getWomenCategory() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("subCategory")
    .select("*")
    .eq("gender", "women");

  if (error) {
    console.error("Error fetching women categories:", error.message);
    throw new Error("Could not fetch category products");
  }

  return data ?? [];
}

export async function getProducts() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Could not fetch trending products");
  }

  return data ?? [];
}
export async function getProductsByBrand(brand: string) {
  const supabase = createServerClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("brands", brand);

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Could not fetch products for this brand");
  }

  return products ?? [];
}

export async function getProductDetail(slug: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product detail:", error.message);
    throw new Error("Could not fetch product detail");
  }

  return data;
}
export async function getProductCategory(gender: string, category: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("gender", gender)
    .eq("category", category);

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Could not fetch products");
  }

  return data;
}

export async function getMenProducts() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("gender", "men");

  if (error) {
    console.error("Error fetching men products:", error.message);
    throw new Error("Could not fetch products");
  }

  return data ?? [];
}

export async function getWomenProducts() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("gender", "women");

  if (error) {
    console.error("Error fetching women products:", error.message);
    throw new Error("Could not fetch products");
  }

  return data ?? [];
}
export async function getKidsProducts() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("gender", "kids");

  if (error) {
    console.error("Error fetching kids products:", error.message);
    throw new Error("Could not fetch products");
  }

  return data ?? [];
}

export async function getTopPicks() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_top_picks", true);

  if (error) {
    console.error("Error fetching top picks:", error.message);
    throw new Error("Could not fetch top picks products");
  }

  return data ?? [];
}
export async function getHomePicks() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_top_picks", false);

  if (error) {
    console.error("Error fetching top picks:", error.message);
    throw new Error("Could not fetch top picks products");
  }

  return data ?? [];
}

export async function getTrendingNew() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_trending", true);

  if (error) {
    console.error("Error fetching trending products:", error.message);
    throw new Error("Could not fetch trending products");
  }

  return data ?? [];
}

export async function getBrands() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .in("name", ["Dior", "Vans", "ASOS", "Lacoste", "New Balance", "Boden"]) // Filter specific brands
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching brands:", error.message);
    throw new Error("Could not fetch product brands");
  }

  return data ?? [];
}

export async function getAllBrands() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("brand").select("*");

  if (error) {
    console.error("Error fetching brands:", error.message);
    throw new Error("Could not fetch product brands");
  }
  return data ?? [];
}

export async function getRelatedProducts(category: string, slug: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("slug", slug);

  if (error) {
    console.error("Error fetching related products:", error.message);
    throw new Error("Related products could not be loaded");
  }

  return data ?? [];
}

export async function getProductsByBrandId(category: string) {
  const supabase = createServerClient();
  const { data: products, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  if (productError) {
    console.error("Error fetching products:", productError.message);
    throw new Error("Could not fetch products details");
  }

  if (!products) {
    throw new Error("products not found");
  }

  return products ?? [];
}

export async function getFilteredProducts(category?: string, color?: string) {
  const supabase = createServerClient();

  let query = supabase.from("products").select("*");

  if (category && category !== "collection") {
    query = query.eq("gender", category);
  }

  if (color) {
    query = query.ilike("colour", color);
  }

  const { data, error } = await query;
  console.log(data);
  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Could not fetch products");
  }

  return data ?? [];
}

export async function fetchProductsBySearch(search?: string) {
  const supabase = createClientBrowser();

  if (!search || search.trim().length < 2) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(
      `name.ilike.%${search.trim()}%,category.ilike.%${search.trim()}%,gender.ilike.%${search.trim()}%`
    );

  if (error) {
    console.error("❌ Error fetching searched products:", error.message);
    throw new Error("Could not fetch searched products");
  }

  console.log("✅ Search results:", data);
  return data ?? [];
}
