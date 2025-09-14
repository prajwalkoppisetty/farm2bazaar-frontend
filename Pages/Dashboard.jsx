import React from "react";
import { useAuth } from "../src/AuthContext";
import FarmerAnalytics from "../Components/Dashboard/FarmerAnalytics";
import RetailerAnalytics from "../Components/Dashboard/RetailerAnalytics";
import FarmerHistory from "../Components/Dashboard/FarmerHistory";
import FarmerStockSold from "../Components/Dashboard/FarmerStockSold";
import RetailerHistory from "../Components/Dashboard/RetailerHistory";
import RetailerStockBought from "../Components/Dashboard/RetailerStockBought";
import FarmerMostSoldCategory from "../Components/Dashboard/FarmerMostSoldCategory";
import FarmerMarketPriceGraph from "../Components/Dashboard/FarmerMarketPriceGraph";
import RetailerMarketPriceGraph from "../Components/Dashboard/RetailerMarketPriceGraph";
import FarmerTransactions from "../Components/Dashboard/FarmerTransactions";
import ProductProfitAnalysis from "../Components/Dashboard/ProductProfitAnalysis";
import PurchaseAnalysis from "../Components/Dashboard/PurchaseAnalysis";
export default function Dashboard() {
  const { userRole, isLoggedIn } = useAuth();

  const renderFarmerDashboard = () => (
    <div className="space-y-6">
      <FarmerAnalytics />
      <ProductProfitAnalysis />
      <FarmerTransactions />
      <FarmerHistory />
      <FarmerStockSold />
      <FarmerMostSoldCategory />
      <FarmerMarketPriceGraph />
    </div>
  );

  const renderRetailerDashboard = () => (
    <div className="space-y-6">
      <RetailerAnalytics />
      <PurchaseAnalysis />
      <RetailerHistory />
      <RetailerStockBought />
      <RetailerMarketPriceGraph />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Dashboard</h1>
      {isLoggedIn ? (
        userRole === "farmer" ? (
          renderFarmerDashboard()
        ) : userRole === "retailer" ? (
          renderRetailerDashboard()
        ) : (
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md"
            role="alert"
          >
            <h2 className="font-bold text-xl mb-2">Welcome!</h2>
            <p className="text-lg">
              Your role is not recognized. Please contact support if you believe
              this is an error.
            </p>
          </div>
        )
      ) : (
        <div
          className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md"
          role="alert"
        >
          <h2 className="font-bold text-xl mb-2">
            Please log in to view your dashboard.
          </h2>
          <p className="text-lg">
            You need to be logged in to access the dashboard features.
          </p>
        </div>
      )}
    </div>
  );
}

