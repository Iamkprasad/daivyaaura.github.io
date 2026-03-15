import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 border border-border/50 hover:border-primary/30">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={`${import.meta.env.BASE_URL}${product.image.startsWith('/') ? product.image.slice(1) : product.image}`}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {product.discount > 0 && (
              <span className="absolute top-3 left-3 bg-gradient-gold text-cosmic text-xs font-display font-bold px-3 py-1 rounded-full shadow-gold">
                {product.discount}% OFF
              </span>
            )}
            {product.bestseller && (
              <span className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-display font-bold px-3 py-1 rounded-full">
                Bestseller
              </span>
            )}
          </div>
          <div className="p-4">
            <span className="text-xs font-body text-muted-foreground uppercase tracking-widest">
              {product.category}
            </span>
            <h3 className="font-heading font-bold text-lg mt-1 text-card-foreground line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mt-1.5">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="text-xs font-medium text-muted-foreground font-body">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-display font-bold text-foreground">
                  ₹{product.salePrice}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-muted-foreground line-through font-body">
                    ₹{product.regularPrice}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={handleAdd}
                className="bg-gradient-gold text-cosmic hover:opacity-90 shadow-gold"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
