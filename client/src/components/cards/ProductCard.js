import React from 'react'
import {Card, Skeleton} from 'antd'
import {EteOutlined, EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons"

import Torta from "../../images/Torta.JPG";
import {Link} from 'react-router-dom';
import {showAverage} from "../../functions/rating"
const {Meta} = Card;

const ProductCard = ({product}) => {
    
    const {title, description, images, slug, price} = product;
    
return(
    <>

{product && product.ratings && product.ratings.length > 0 ? ( showAverage(product) ) : ( 
        <div className="text-center pt-1 pb-3">No rating yet</div>
     )}
    <Card
        cover={
            <img src={images && images.length ? images[0].url : Torta} 
                style={{height: "150px", objectFit:"cover"}
                }
                className="p-1"
                />
    }

    actions={[
        <Link to={`/product/${slug}`}>
         <EyeOutlined 
         className="text-primary"/> <br/> View Product
        </Link>,
        <>
            <ShoppingCartOutlined className="text-primary"/> <br/> View Product
        </>,
    ]}
    >
        <Meta 
            title={`${title} - $${price}`} 
            description={`${description && description.substring(0, 40)}...`}

        />
    </Card>
    </>
)}

export default ProductCard;