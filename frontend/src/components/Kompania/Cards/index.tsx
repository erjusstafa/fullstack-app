import { cardsInterface } from "../types"
import "./style.scss"

export const CardItem = ({item}:{item:cardsInterface}) =>{
    return (
        <div className="wrapper_card">
            <h4>{item.title}</h4>
            <img src={item.img} alt="" />
            <p>{item.description}</p>
            <div className="read_more">
                <span>Lexo akoma</span>
            </div>
        </div>
    )
}