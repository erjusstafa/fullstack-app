// EshopDetailsItem.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import { handleCustomAPI } from "../../../api";
import buyButton from "../../../assets/buynow.png";
import "./style.scss";
import { useLanguage } from "../../../contextApi/LanguageContext";
import { useEshopData } from "../../../contextApi/EshopData";
import DialogCart from "./DialogCart";
import RightMenu from "../RightMenu";

function EshopDetailsItem() {
  const { documentId } = useParams<{ documentId: string }>();
  const [detailData, setDetailData] = useState<Product | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const { addProductToCart } = useEshopData();

  useEffect(() => {
    if (documentId) {
      const fetchData = async () => {
        try {
          const response = await handleCustomAPI(
            `eshops?filters[documentId][$eq]=${documentId}&populate=*&locale=${language}`,
            "GET"
          );
          if (response.data && response.data.length > 0) {
            const product = response.data.find(
              (item: Product) => item.documentId === documentId
            );
            if (product) {
              setDetailData(product);
            } else {
              setError("No data found");
            }
          } else {
            setError("No data found");
          }
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "An error occurred"
          );
        }
      };

      fetchData();
    }
  }, [documentId, language]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!detailData) {
    return <p>No data available</p>;
  }

  return (
    <>
      <div
        style={{
          maxWidth: "95%",
          display: "flex",
          justifyContent: "flex-end",
          margin: " 1rem 0",
        }}
      >
        <RightMenu type="openCart"  detailData={detailData} />
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

          {openDialog && <DialogCart detailData={detailData} setOpenDialog={setOpenDialog} />}
        </div>
      </div>
    </>
  );
}

export default EshopDetailsItem;
