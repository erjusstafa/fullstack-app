import { useParams } from "react-router-dom";
import { Product } from "../types";
import { handleCustomAPI } from "../../../api";
import buyButton from "../../../assets/buynow.png";
import "./style.scss";
import { useLanguage } from "../../../contextApi/LanguageContext";
import DialogCart from "./DialogCart";
import RightMenu from "../RightMenu";
import { useState } from "react";
import { useGetDetail } from "../../../api/queryHooks";
import { useEshopData } from "../../../contextApi/EshopDataContext";
import { Img } from "../../../shared/UI/Img";
import { ApiResponse } from "./types";

 
function EshopDetailsItem() {
  const { documentId } = useParams<{ documentId: string }>();
  if (!documentId) {
    throw new Error("Invalid documentId: documentId must be a string or number.");
  }
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { language } = useLanguage();
  const { addProductToCart, detailData, setDetailData, cart } = useEshopData();

    const {
      isLoading,
      isError,
      error,
    } = useGetDetail< ApiResponse, Product>(
      ['eshop-item', documentId, language],
      `eshops?filters[documentId][$eq]=${documentId}&populate=*&locale=${language}`,
      documentId,
      (url) => handleCustomAPI(url, "GET"),
      (data) => {
        const product = data.data.find((item) => item.documentId === documentId);
        if (!product) throw new Error("Product not found");
        setDetailData(product); 
        return product;
      }
    );
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p style={{ color: "red" }}>{error?.message}</p>;
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
        <RightMenu type="openCart"   />
      </div>
      <div className="product_details">
        <div className="product_image">
          <Img src={detailData.eshop.media} alt={detailData.eshop.name} />
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

          <Img
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