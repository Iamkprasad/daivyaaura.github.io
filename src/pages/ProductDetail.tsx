import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Minus, Plus, ArrowLeft, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: products = [], isLoading } = useProducts();
  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Product Not Found</h1>
        <Button asChild className="bg-gradient-gold text-cosmic font-display"><Link to="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart`);
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = encodeURIComponent(`Check out ${product.name} on Daivyaura!`);
    window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-body">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-border">/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="text-border">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-xl overflow-hidden bg-muted border border-border/50 shadow-card"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-xs font-body text-muted-foreground uppercase tracking-widest">{product.category} • {product.sku}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-body">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-display font-bold text-foreground">₹{product.salePrice}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through font-body">₹{product.regularPrice}</span>
                  <span className="bg-gradient-gold text-cosmic font-display font-bold text-xs px-3 py-1 rounded-full shadow-gold">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-foreground/70 mb-6 font-body leading-relaxed">{product.shortDescription}</p>

            {/* Quantity & Add */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-border/50 rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-muted transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-display font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-muted transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button onClick={handleAdd} size="lg" className="flex-1 bg-gradient-gold text-cosmic hover:opacity-90 font-display text-sm tracking-wider shadow-glow">
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
            </div>

            <div className="flex gap-3 mb-6">
              <Button asChild variant="outline" size="lg" className="flex-1 font-display text-sm tracking-wider border-primary/30 hover:bg-primary/10">
                <Link to="/checkout">Buy Now</Link>
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare} className="border-border/50 hover:bg-muted">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Benefits list */}
            <div className="bg-muted/50 rounded-xl p-5 space-y-2.5">
              <p className="font-display font-bold text-sm uppercase tracking-wider text-foreground/80 mb-3">Key Benefits</p>
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-body">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground/70">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mt-12">
          <TabsList className="w-full justify-start border-b bg-transparent p-0 gap-8">
            <TabsTrigger value="description" className="font-display text-sm tracking-wider data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-0">Description</TabsTrigger>
            <TabsTrigger value="ingredients" className="font-display text-sm tracking-wider data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-0">Ingredients</TabsTrigger>
            <TabsTrigger value="usage" className="font-display text-sm tracking-wider data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-0">How to Use</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6 text-foreground/80 leading-relaxed font-body">
            {product.fullDescription}
          </TabsContent>
          <TabsContent value="ingredients" className="pt-6 text-foreground/80 font-body">
            {product.ingredients}
          </TabsContent>
          <TabsContent value="usage" className="pt-6 text-foreground/80 font-body">
            {product.usage}
          </TabsContent>
        </Tabs>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-6">You May Also <span className="text-gradient-gold">Like</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
