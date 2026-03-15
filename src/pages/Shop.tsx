import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "@/components/shop/ProductCard";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [sortBy, setSortBy] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useProducts();

  const filtered = useMemo(() => {
    let list = selectedCategory === "All" ? [...products] : products.filter((p) => p.category === selectedCategory);

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "price-low": list.sort((a, b) => a.salePrice - b.salePrice); break;
      case "price-high": list.sort((a, b) => b.salePrice - a.salePrice); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [selectedCategory, sortBy, searchQuery, products]);

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="font-heading text-sm text-primary font-semibold uppercase tracking-[0.2em]">Our Collection</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-2">
            Our <span className="text-gradient-gold">Products</span>
          </h1>
          <p className="text-muted-foreground font-body mb-6">Discover divine energy products for your spiritual journey</p>
        </motion.div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, category, or keyword..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-card text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-display tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-gold text-cosmic shadow-gold font-bold"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-card text-sm font-body"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20 font-body">
            {searchQuery ? `No products found for "${searchQuery}"` : "No products found in this category."}
          </p>
        )}
        </>
        )}
      </div>
    </section>
  );
}
