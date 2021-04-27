import React, { useEffect, useState } from 'react';
import styles from './main.module.scss';
import Modal from './modal/modal';

 const Main = () => {
    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPageNunberLimit, setMaxPageNunberLimit] = useState(3)
    const [minPageNunberLimit, setMinPageNunberLimit] = useState(0) 
    const [isRouteModalVisible, setIsRouteModalVisible] = useState(false)   
    const itemsPerPage = 5;
    const pageNunberLimit = 3;

    const pages = [];
    for(let i=1; i<=Math.ceil(newData.length/itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newData.slice(indexOfFirstItem, indexOfLastItem);

    function handleClick(event) {
        setCurrentPage(Number(event.target.id));
    }


    const renderPageNumber = pages.map(number => {
        if(number < maxPageNunberLimit+1 && number > minPageNunberLimit) {
            return ( <li key={number}
                        id={number}
                        className={currentPage === number ? `${styles.active}` : null}
                        onClick={handleClick}>
                        {number}
                    </li>
            )
        } else {
            return null;
        }       
    })

    function handlePrevtBtn() {
        setCurrentPage(currentPage - 1);
        if((currentPage - 1)%pageNunberLimit === 0) {
            setMaxPageNunberLimit(maxPageNunberLimit - pageNunberLimit);
            setMinPageNunberLimit(minPageNunberLimit - pageNunberLimit);
        }
    }

    function handleNextBtn() {
        setCurrentPage(currentPage+1);
        if(currentPage+1 > maxPageNunberLimit) {
            setMaxPageNunberLimit(maxPageNunberLimit + pageNunberLimit);
            setMinPageNunberLimit(minPageNunberLimit + pageNunberLimit);
        }
    }

    let pageDecrementBtn = null;
    if(minPageNunberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevtBtn}>&hellip;</li>
    }

    let pageIncrementBtn = null;
    if(pages.length > maxPageNunberLimit) {
        pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>
    }

    async function fetchData() {
        try{
            let response = await fetch('https://unique-yew-307513-default-rtdb.europe-west1.firebasedatabase.app/delivery.json');
            response = await response.json()
            setData(response);
            setNewData(response)
            setIsloading(false)
        }catch(e){console.log(e)}        
      }

    useEffect(() => {
        fetchData();
    }, []);

    function sortDistanceUp() {
        setNewData([...newData.sort((prev, next) => prev.distance - next.distance)])
    }

    function sortDistanceDown() {
        const newArr = JSON.parse(JSON.stringify(newData))
        setNewData(newArr.sort((prev, next) => next.distance - prev.distance))
    }

    function sortPeopleUp() {
        setNewData([...newData.sort((prev, next) => prev.people - next.people)])
    }

    function sortPeopleDown() {
        setNewData([...newData.sort((prev, next) => next.people - prev.people)])
    }

    function searchCity(e) {      
        let value = e.target.value;
        let newValue= value.toLowerCase();
        setNewData(data.filter(item => item.name.toLowerCase().includes(newValue)));
       };

    function closeModal() {
        setIsRouteModalVisible(false)
    }  

    return (
        <div className={styles.mainFeald}>
            <div className={styles.buttonFeald}>
                <span onClick={()=>fetchData()}>UPDATE</span>
                <span onClick={()=>setIsRouteModalVisible(true)}>ADD ROUTE</span>
            </div>
            {isRouteModalVisible && <Modal closeModal={closeModal} />}
            <ul className={styles.tableHeader}>
                 <li>Date</li>        
                <li>Name
                    <input onChange={searchCity} type='text' placeholder='ENTER CITY'/>
                </li>
                <li>Quantity
                    <ul>
                        <li onClick={()=>sortPeopleUp()}>Ascending</li>
                        <li onClick={()=>sortPeopleDown()}>Descending</li>
                    </ul>
                </li>
                <li>Distance
                    <ul>
                        <li onClick={()=>sortDistanceUp()}>Ascending</li>
                        <li onClick={()=>sortDistanceDown()}>Descending</li>
                    </ul>
                </li>
            </ul>
            {isLoading
             ?<div className={styles.itemsStyle}><p>LOADING...</p></div>
             :<div className={styles.itemsFeald}>
                {currentItems.map(item=>{
                    return <div key={item.id} className={styles.itemsStyle}>
                        <p>{item.data}</p>
                        <p>{item.name}</p>
                        <p>{item.people}</p>
                        <p>{item.distance}</p>
                    </div>
                }) 
            }
             </div>
            }
            <ul className={styles.renderPageNumber}>
                <li><button onClick={handlePrevtBtn} disabled={currentPage === pages[0] ? true : false}>Prev</button></li>
                {pageDecrementBtn}
                {renderPageNumber}
                {pageIncrementBtn}
                <li><button onClick={handleNextBtn} disabled={currentPage === pages[pages.length-1] ? true : false}>Next</button></li>
            </ul>
        </div>
    )
}

export default Main;