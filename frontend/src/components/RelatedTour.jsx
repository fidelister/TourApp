import React, { useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBCardTitle,
    MDBContainer,
    MDBIcon,
    MDBCol,
    MDBRow,
} from "mdb-react-ui-kit";
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

const excerpt = (str) => {
    if (str.length > 40) {
        str = str.substring(0, 40) + " ...";
    }
    return str;
};

function RelatedTour({ relatedTours, tourId }) {
    let [relatedState, setRelatedState] = useState(null);
    let [itemState, setitemState] = useState(null);

    useEffect(() => {
        if (relatedTours && relatedTours.length > 0) {
            relatedTours.map(item => item._id === tourId && setitemState(item))
            if (itemState) {
                let temp = [];
                for (let i = 0; i < itemState.tags.length; i++) {
                    relatedTours.filter(item => item._id !== tourId).map(item => item.tags.includes(itemState.tags[i]) && temp.push(item))
                }
                setRelatedState(temp)
            }
        }
    }, [relatedTours])

    if (!relatedState) return <>loading</>

    return (
        <>
            {/* {console.log(relatedState)} */}
            <h4>Related Tours</h4>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>

                {relatedState.map((item, index) => (
                    <MDBCol key={index}>
                        <MDBCard>
                            <Link to={`/singleTour/${item._id}`}>
                                <MDBCardImage
                                                src={item.imageFile}
                                                alt={item.title}
                                                height={200}
                                            />
                                <span className="text-start tag-card">
                                    {item.tags.map((tag) => (
                                        <Link to={`/tours/tags/${tag}`}></Link>
                                    ))}
                                </span>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start'>
                                        {item.title}
                                    </MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        {excerpt(item.description)}
                                    </MDBCardText>
                                </MDBCardBody>
                                </Link>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
        </>
    )
}

export default RelatedTour