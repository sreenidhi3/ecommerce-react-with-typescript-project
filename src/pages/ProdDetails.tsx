import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCartActionA, removeFromCartActionA } from "../actions/products.actions";
import { RootState } from "../store";
import { ProductType } from "../types/products.types";

interface props{
    id: number
}
export const SingleProduct:FC<props>=({id})=>{
    const {isUserLoggedIn} = useSelector((state: RootState) => state.loginReducer);
    const {allProducts,cart} = useSelector((state: RootState) => state.productReducer);
    const [product, setProduct] = useState<ProductType>(allProducts[1])
    const [added, setAdded] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        let p:ProductType = allProducts.filter((prod)=>prod.id === id)[0];
        console.log(p, id)
        setProduct(p)
        let add = cart.filter((it)=>it.id===id).length
        add ? setAdded(true) : setAdded(false)
    }, [id])
    
    const handleCart=(id:number)=>{
        if(!isUserLoggedIn)
            navigate("/login")
        else{
            if(added){
                dispatch(removeFromCartActionA(id))
            }else{
                dispatch(addToCartActionA(id))
            }
            setAdded(!added)
        }
    }
    return (
    <div className="p-2 col center"> 
            <div className="row" style={{padding:"0 0.7rem",border:"1px solid var(--secondary-400)", borderRadius:"0.2rem"}}>
                <img className="img" src={product.image} alt={product.title}/>
            </div>
            <div className="col center">
                <h1 className="text-center">{product.title}</h1>
                <h3 className="text-center">$ {product.price}</h3>
                <p style={{textTransform:"capitalize", width:"80%"}}>{product.description}</p>
                <button onClick={()=>handleCart(id)} className={added ?"btn-added-to-cart":"btn-primary-full"} style={{width: "15rem"}}>{added ? "Remove From Cart" : "Add To Cart"}</button>
                <p></p>
            </div>
    </div>
    )
}

const ProdDetails=()=>{
    let { prodId } = useParams();
    const navigate = useNavigate()
    const {allProducts} = useSelector((state: RootState) => state.productReducer);
    const [productId, setProductId] = useState<number>(1)
    const isValidId=()=>{
        const isValid = allProducts.filter((it)=>it.id == parseInt(prodId as string)).length
        return isValid
    }
    useEffect(()=>{
        isValidId() ? setProductId(parseInt(prodId as string)): navigate("/error")
    },[productId])

    return(
        isValidId() ? <SingleProduct id={productId}/>: <div></div>
    )
}

export default ProdDetails;