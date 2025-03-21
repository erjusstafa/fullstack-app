import { Link } from "react-router-dom";
import { FooterCardProps } from "../types";

const FooterCard: React.FC<FooterCardProps> = ({   mainTitle, items }) => {
  return (
    <div  >
      <h2 className="mainTitle"> {mainTitle}</h2>
      <div className="list_item" >
        {items.map((item,index) => (
          <Link key={index} to={item.url}>{item.title}</Link>
        ))}
      </div>
    </div>
  );
};

export default FooterCard;
