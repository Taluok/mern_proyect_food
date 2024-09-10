import React, { useState, useEffect } from 'react';
import Cards from '../../../components/Cards';
import { } from 'react-icons/fa'

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");

    // Cargar datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/menu.json");
                const data = await response.json();
                setMenu(data);
                setFilteredItems(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    // Filtrar por categoría
    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
    };

    // Mostrar todo
    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
    };

    // Ordenar elementos
    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedItems = [...filteredItems];

        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        setFilteredItems(sortedItems);
    };

    return (
        <div className='section-container bg-gradient-to-r from-[#fafafa] from-0% to-[#fcfcfc] to-100%'>
            <div className='py-48 flex flex-col justify-center items-center gap-8'>
                {/* Texto */}
                <div className='text-center space-y-7 px-4'>
                    <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                        Dive into the pleasures of the best <span className='text-orange'>food</span>
                    </h2>
                    <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
                        Come with family & feel the joy of mouthwatering food such as Hamburgers and more for a moderate cost.
                    </p>
                    <button className='btn bg-orange px-8 py-3 font-semibold text-white rounded-full'>
                        Order Now
                    </button>
                </div>

                {/* Filtros y ordenación */}
                <div className='w-full max-w-3xl mx-auto'>
                    <div className='flex justify-between mb-4'>
                        {/* Filtro de categoría */}
                        <select
                            className='border p-2'
                            value={selectedCategory}
                            onChange={(e) => filterItems(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="burgers">Burgers</option>
                            <option value="pizzas">Pizzas</option>
                            <option value="desserts">Desserts</option>
                            {/* Añade más categorías según tu menú */}
                        </select>

                        {/* Ordenación */}
                        <select
                            className='border p-2'
                            value={sortOption}
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="low-to-high">Price: Low to High</option>
                            <option value="high-to-low">Price: High to Low</option>
                        </select>
                    </div>
                    <div>
                        <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
                            <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
                            <button onClick={() => filterItems("hamburger")} className={selectedCategory === "hamburger" ? "active" : ""}>Hambuger</button>
                            <button onClick={() => filterItems("pizza")} className={selectedCategory === "pizza" ? "active" : ""}>Pizza</button>
                            <button onClick={() => filterItems("desserts")} className={selectedCategory === "desserts" ? "active" : ""}>Desserts</button>
                            <button onClick={() => filterItems("drinks")} className={selectedCategory === "drinks" ? "active" : ""}>Drinks</button>
                        </div>

                        <div>
                            <div>
                                
                            </div>
                        </div>
                    </div>

                    {/* Renderizado del menú */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            filteredItems.map((item) => (
                                <Cards key={item._id} item={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;


