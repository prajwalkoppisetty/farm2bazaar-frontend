import React from "react";
import { useAuth } from "../src/AuthContext";
import ProductList from "../Components/ProductList";

export default function Shopping() {
  const { user } = useAuth();

  return (
    <main className="bg-gradient-to-b from-emerald-100 to-emerald-50 text-slate-900 min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-emerald-800">
          🛒 Welcome, {user?.owner_name || "Retailer"}!
        </h1>
        <ProductList forFarmer={false} />
      </div>
    </main>
  );
}

