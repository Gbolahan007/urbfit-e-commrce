import { createServerClient } from "./supabase";

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

export async function getProductsByBrand(brandSlug: string) {
  const supabase = createServerClient();

  // 1️⃣ Fetch brand details by slug
  const { data: brand, error: brandError } = await supabase
    .from("brands")
    .select("*")
    .ilike("slug", brandSlug)
    .single();

  if (brandError) {
    console.error("Error fetching brand:", brandError.message);
    throw new Error("Could not fetch brand details");
  }

  if (!brand) {
    throw new Error("Brand not found");
  }

  // 2️⃣ Fetch all products whose products.brands === brand.name
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .ilike("brands", brand.name);

  if (productsError) {
    console.error("Error fetching products:", productsError.message);
    throw new Error("Could not fetch products for this brand");
  }

  // 3️⃣ Fetch all brands with the same slug (e.g. all Adidas entries)
  const { data: relatedBrands, error: relatedBrandsError } = await supabase
    .from("brands")
    .select("*")
    .ilike("slug", brand.slug);

  if (relatedBrandsError) {
    console.error("Error fetching related brands:", relatedBrandsError.message);
    throw new Error("Could not fetch related brands");
  }

  return {
    brand,
    products: products ?? [],
    relatedBrands: relatedBrands ?? [],
    count: products?.length ?? 0,
  };
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
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching brands:", error.message);
    throw new Error("Could not fetch product brands");
  }
  console.log(data);
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
