import React, { useState } from 'react'

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const[filteredItems, setFilteredItems] = useState([]);
    const[selectedCategory, setSelectedCategory] = useState("all");
    const[sortOption, setSortOption] = useState("default");

    //loading data
    useEffect(() => {
        //fetch data from the backend
        const fetchData = async () => {
            try{
                const response = await fetch("/menu.json");
                const data = await response.json();
                setMenu(data);
                setFilteredItems(data)
            }catch (error){
                console.log("Error fetching data", error)
            }
        }
        fetchData();
    },[])

    //filtering data based on category
    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);

        setFilteredItems(filtered);
        setSelectedCategory(category);
    }

    //show all data funtion
    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
    }

    //sorting based on A-Z
    const handleSortChange = (option) => {
        setSortOption(option);

        let sortedItems = [...filteredItems]

        //logic
        switch(option){
            case"A-":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name))
                break;
            case "Z-A":
                sortedItems.sort((a, b) => a.name.localeCompare(a.name))
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price)
                break;
            case "high-t-low":
                sortedItems.sort((a, b) => b.price - a.price)
                break;
            default:
                break;
        }
    }

    return (
        <div className='section-container bg-gradient-to-r from-[#fafafa] from-0% to-[#fcfcfc] to-100%'>
            <div className='py-48 flex flex-col justify-center items-center gap-8'>
                {/*Texto*/}
                <div className='text-center space-y-7 px-4'>
                    <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                        Dive into the pleasures of the best <span className='text-orange'>food</span>
                    </h2>
                    <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
                        Come with family & feel the joy of mouthwatering food such as Hamburgers and more for a moderate cost
                    </p>
                    <button className='btn bg-orange px-8 py-3 font-semibold text-white rounded-full'>
                        Order Now
                    </button>
                </div>
                {/*menu shop*/}
                <div className='section-container'>

                </div>
            </div>
        </div>
    )
}

export default Menu;

