import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types";
import { handleCustomAPI } from "../../../api";
import buyButton from "../../../assets/buynow.png";
import "./style.scss";
import { useLanguage } from "../../../contextApi/LanguageContext";
import { useEshopData } from "../../../contextApi/EshopData";
import DialogCart from "./DialogCart";
import RightMenu from "../RightMenu";
import { useState } from "react";

function EshopDetailsItem() {
  const { documentId } = useParams<{ documentId: string }>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { language } = useLanguage();
  const { addProductToCart, detailData, setDetailData, cart } = useEshopData();

  // React Query for data fetching
  const { isLoading, error } = useQuery<Product>({
    queryKey: ['eshop-item', documentId, language],
    queryFn: async () => {
      if (!documentId) throw new Error("No document ID provided");
      
      const response = await handleCustomAPI(
        `eshops?filters[documentId][$eq]=${documentId}&populate=*&locale=${language}`,
        "GET"
      ) as { data: Product[] };
      
      const product = response.data?.find(
        (item: Product) => item.documentId === documentId
      );
      
      if (!product) throw new Error("Product not found");
      
      setDetailData(product); // Update context
      return product;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    enabled: !!documentId, 
    initialData: detailData || undefined, // Use context data as initial data
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error.message}</p>;
  if (!detailData) return <p>No data available</p>;

  return (
    <>
      <div
        style={{
          maxWidth: "95%",
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem 0",
        }}
      >
        <RightMenu type="openCart" detailData={detailData} />
      </div>
      <div className="product_details">
        <div className="product_image">
          <img src={detailData.eshop.media} alt={detailData.eshop.name} />
        </div>
        <div className="product_info">
          <h1>{detailData.eshop.name}</h1>
          <p className="description">{detailData.eshop.description}</p>
          <p className="price">
            {detailData.eshop.price} <span>Leke</span>
          </p>
          <p className="rating">Rating: {detailData.eshop.rating}</p>
          <p className="type">Type: {detailData.eshop.type}</p>
          <p className="brand">Brand: {detailData.eshop.marka}</p>
          <p className="color">Color: {detailData.eshop.color}</p>

          <img
            src={buyButton}
            alt=""
            onClick={() => {
              addProductToCart(detailData);
              setOpenDialog(true);
            }}
          />

          {openDialog && cart.length > 0 && (
            <DialogCart setOpenDialog={setOpenDialog} />
          )}
        </div>
      </div>
    </>
  );
}

export default EshopDetailsItem;