import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { RootState } from "../store";
import { ProductType } from "../types/products.types";
import "../styles/products.styles.css"
import { useEffect, useMemo, useState } from "react";
import {setActiveCategoryAction } from "../actions/products.actions";
import { setActiveAction} from "../actions/login.actions";

const Catalogue=()=>{

    const {allProducts, allCategories, activeCategory, activeProducts} = useSelector((state: RootState) => state.productReducer);
    const [search, setSearch] = useState<string>("")
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(setActiveAction(1))
    },[])

    useEffect(()=>{
        if(activeCategory){
            setFilteredProducts(activeProducts)
        }else{
            if(!search){
                setFilteredProducts([...allProducts])
            }
        }

    },[allProducts, activeProducts])


    const handleSearch=()=>{
        dispatch(setActiveCategoryAction(""))
        setSearch(search)
        let prods = allProducts.filter((prod) =>prod.title.toLowerCase().includes(search.toLowerCase()))
        setFilteredProducts([...prods])
    }

    const handleClick=()=>{
        if(search){
            setSearch("")
        }
        if(activeCategory){
            setFilteredProducts([...activeProducts])
        }
        setFilteredProducts([...activeProducts])
        // let prods = activeProducts.filter((prod) =>prod.title.toLowerCase().includes(search.toLowerCase()))
    }
        
    return(
        <div>
            <div className="search-box row center no-wrap">
                <input autoFocus={true} value={search} className="search-input" type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="Search..."/>
                <button onClick={()=>handleSearch()} className="btn-primary search-btn" style={{backgroundColor: "var(--primary-400)", cursor:"pointer"}}>Search</button>
            </div>
            
            <div className="row center">
                Filter by Category: 
                <div className="category" 
                         key={"all"} 
                         style={{borderBottom: activeCategory==="" ? "2px solid var(--primary-color)": "",color: activeCategory==="" ? 'var(--primary-color)' : 'var(--secondary-700)', cursor:"pointer"}}
                         onClick={()=>{
                            dispatch(setActiveCategoryAction(""))
                            setFilteredProducts([...allProducts])
                        }}
                    >
                        {"All"}
                    </div>
                {
                allCategories.map((cate)=>
                    <div className="category" 
                         key={cate} 
                         style={{borderBottom: cate===activeCategory ? "2px solid var(--primary-color)": "",color: cate===activeCategory ? 'var(--primary-color)' : 'var(--secondary-700)', cursor:"pointer"}}
                         onClick={()=>{
                            dispatch(setActiveCategoryAction(cate))
                            handleClick()
                        }}
                    >
                        {cate}
                    </div>
                )}
                {/* {activeCategory ? <button role="filter-btn" onClick={()=>dispatch(setActiveCategoryAction(""))}> Remove Filter</button>:""} */}
            </div>
            <div className="row center">
            {filteredProducts.length ? filteredProducts.map((prod)=><ProductCard key={prod.id} {...prod}/>): <p style={{padding:"1rem", color:"var(--red-700)"}}>No Products Found.</p>}
            </div>
        </div>
    )
}

export default Catalogue;