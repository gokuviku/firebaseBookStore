import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";


const ViewOrderDetail = () => {
    const params = useParams()
    const firebase = useFirebase()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        firebase.getOrders(params.bookId)
            .then((orders) => setOrders(orders.docs))
    }, [])

    return (
        <div className="container mt-3" >
            <h1>Orders</h1>
            <div>
                {
                    orders.map(order => {
                        const data = order.data()
                        return (
                            <div key={order.id} className="mt-5" style={{ border: "1px solid", padding: "10px" }} >
                                <h3>Order By : {data.displayName}</h3>
                                <p>Qty : {data.qty}</p>
                                <p>Email : {data.email}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ViewOrderDetail