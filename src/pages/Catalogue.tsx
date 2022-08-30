import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { RootState } from "../store";
import { ProductType } from "../types/products.types";
import "../styles/products.styles.css"
import { useEffect, useMemo, useState } from "react";
import { addToCartAction, setActiveCategoryAction, setCartAction } from "../actions/products.actions";

const Catalogue=()=>{

    const {allProducts, allCategories, activeCategory, activeProducts, cart} = useSelector((state: RootState) => state.productReducer);
    const [search, setSearch] = useState<string>("")
    const dispatch=useDispatch()
    
    const filteredProducts = useMemo(() =>{
        if(activeCategory){
            if(search){
                return activeProducts.filter((prod) =>prod.title.toLowerCase().includes(search.toLowerCase()))
            }
           return activeProducts
        }else{
            return allProducts.filter((prod) =>prod.title.toLowerCase().includes(search.toLowerCase()))
        }},[allProducts, search, activeCategory])

    return(
        <div>
            <div className="search-box row center no-wrap">
                <input value={search} className="search-input" type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="Search..."/>
                <div className="btn-primary search-btn" style={{backgroundColor: "var(--primary-400)", cursor:"default"}}>Search</div>
            </div>
            <div className="row center">
                Filter by Category: 
                {allCategories.map((cate)=>
                    <div className="category" 
                         key={cate} 
                         style={{borderBottom: cate===activeCategory ? "2px solid var(--primary-color)": "",color: cate===activeCategory ? 'var(--primary-color)' : 'var(--secondary-700)', cursor:"pointer"}}
                         onClick={()=>dispatch(setActiveCategoryAction(cate))}
                    >
                        {cate}
                    </div>
                )}
                {activeCategory ? <button role="filter-btn" onClick={()=>dispatch(setActiveCategoryAction(""))}> Remove Filter</button>:""}
            </div>
            <div className="row center">
            {(filteredProducts.map((prod)=><ProductCard key={prod.id} {...prod}/>))}
            </div>
        </div>
    )
}

export default Catalogue;