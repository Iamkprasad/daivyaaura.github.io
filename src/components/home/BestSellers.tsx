import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shop/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { getBestsellers } from "@/data/products";
import { motion } from "framer-motion";

export default function BestSellers() {
  const { data: products = [] } = useProducts();
  const bestsellers = getBestsellers(products);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="font-heading text-sm text-primary font-semibold uppercase tracking-[0.2em]">Most Popular</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Best <span className="text-gradient-gold">Sellers</span>
            </h2>
            <p className="mt-3 text-muted-foreground font-body">Our most loved products by customers</p>
          </motion.div>
          <Button asChild variant="ghost" className="hidden md:flex text-primary font-heading text-base">
            <Link to="/shop">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Button asChild className="bg-gradient-gold text-cosmic font-display text-sm tracking-wider">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
