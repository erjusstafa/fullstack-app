import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { handleCustomAPI } from "../../../../api";
import { Product } from "../../types";
import "./style.scss";
import RightMenu from "../../RightMenu";

type ApiResponse = {
  data: Product[];
};

function EshopPackageDetailsItem() {
  const { documentId } = useParams<{ documentId: string }>();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<ApiResponse, Error, Product>({
    queryKey: ["eshop-package-details", documentId],
    queryFn: async () => {
      if (!documentId) throw new Error("No document ID provided");
      return handleCustomAPI(
        `eshop-packages?filters[documentId][$eq]=${documentId}&populate=*`,
        "GET"
      ) as Promise<ApiResponse>;
    },
    enabled: !!documentId, // Only run query if documentId exists
    select: (data) => {
      const product = data.data.find((item) => item.documentId === documentId);
      if (!product) throw new Error("Product not found");
      return product;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p style={{ color: "red" }}>{error?.message}</p>;
  if (!response) return <p>No data available</p>;

  return (
    <>
      <div className="filter_eshop_container">
        <div style={{ display: "flex", gap: ".6rem" }}></div>
        <RightMenu type="openCart" />
      </div>
      <div className="package-card">
        <div>
          <h2 className="title">{response.eshop.name}</h2>
          <table className="details">
            <tbody>
              <tr>
                <td className="label_des">Description</td>
                <td className="value">{response.eshop.description}</td>
              </tr>
              <tr>
                <td className="label">Price</td>
                <td className="price">{response.eshop.price} LEKË</td>
              </tr>
            </tbody>
          </table>
          <button className="buy-now">BUY NOW</button>
        </div>
        <div className="info">
          <p>To purchase this package you must:</p>
          <ul>
            <li>
              <Link to="/selfcare/login" className="login">
                log in
              </Link>{" "}
              to log in
            </li>
            <li>
              <Link to="/selfcare/register" className="signup">
                Sign up
              </Link>{" "}
              to create an account
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default EshopPackageDetailsItem;