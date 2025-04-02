import { Link, useParams } from "react-router-dom";
import { handleCustomAPI } from "../../../../api";
import { useEffect, useState } from "react";
import { Product } from "../../types";
import "./style.scss";
import RightMenu from "../../RightMenu";

function EshopPackageDetailsItem() {
  const { documentId } = useParams<{ documentId: string }>();
  const [detailData, setDetailData] = useState<Product | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (documentId) {
      const fetchData = async () => {
        try {
          const response = await handleCustomAPI(
            `eshop-packages?filters[documentId][$eq]=${documentId}&populate=*`,
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
  }, [documentId]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!detailData) {
    return <p>No data available</p>;
  }

  return (
    <> <div className="filter_eshop_container">
    <div style={{ display: "flex", gap: ".6rem" }}></div>
    <RightMenu type="openCart" />
  </div>
    <div className="package-card">
      <div>
        {" "}
        <h2 className="title">{detailData.eshop.name}</h2>
        <table className="details">
          <tbody>
            <tr>
              <td className="label_des">Description</td>
              <td className="value">{detailData.eshop.description}</td>
            </tr>
            <tr>
              <td className="label">Price</td>
              <td className="price">{detailData.eshop.price} LEKË</td>
            </tr>
          </tbody>
        </table>
        <button className="buy-now">BUY NOW</button>
      </div>
      <div className="info">
        <p>To purchase this package you must:</p>
        <ul>
          <li>
            <Link to={"/selfcare/login"} className="login">log in</Link> to log in
          </li>
          <li>
            <Link to={"/selfcare/register"} className="signup">Sign up</Link> to create an account
          </li>
        </ul>
      </div>
    </div>
   </>
  );
}

export default EshopPackageDetailsItem;
