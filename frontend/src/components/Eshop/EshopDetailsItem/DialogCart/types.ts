import { Product } from "../../types"

export interface DialogBoxInterface{
    detailData: Product;
    setOpenDialog : (dialog : boolean) => void
}