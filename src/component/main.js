import React, { useEffect, useState } from 'react';
import styles from './main.module.scss';

export default function Main() {
    const [data, setData] = useState([])
    console.log(data);

    useEffect(() => {
        async function fetchData() {
          let response = await fetch('https://unique-yew-307513-default-rtdb.europe-west1.firebasedatabase.app/delivery.json');
          response = await response.json()
          setData(response);
        }
        fetchData();
      }, []);

    return (
        <div className={styles.mainFeald}>
            <div className={styles.tableHeader}>
                <p>Date</p>
                <p>Name</p>
                <p>Quantity</p>
                <p>Distance</p>
            </div>
            {data.map((item, index)=>{
                return <div key={index} className={styles.itemsStyle}>
                        <p>{item.data}</p>
                        <p>{item.name}</p>
                        <p>{item.people}</p>
                        <p>{item.distance}</p>
                    </div>
                }) 
            }
        </div>
    )
}