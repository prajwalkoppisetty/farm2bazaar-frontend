import React from "react";
import { useAuth } from "../src/AuthContext";
import ProductList from "../Components/ProductList";

function Products() {
  const { user } = useAuth();

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">👨‍🌾 Hello, {user?.farmername || "Farmer"}!</h1>
        <ProductList forFarmer={true} />
      </div>
    </main>
  );
}

export default Products;
 