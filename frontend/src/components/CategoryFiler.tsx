import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
    selectedCategories,
    setSelectedCategories,
}: {
    selectedCategories: string[];
    setSelectedCategories: (selectedCategories: string[]) => void;
}) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    'https://waterprojectwaitbackend.azurewebsites.net/api/Water/GetProjectTypes'
                );
                const data = await response.json();
                console.log('Fetched Categories: ', data);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };
        fetchCategories();
    }, []);

    function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((x) => x !== target.value)
            : [...selectedCategories, target.value];

        setSelectedCategories(updatedCategories);
    }

    return (
        <div className="category-filter">
            <h5> Project Types </h5>
            <div className="category-list">
                {categories.map((c) => (
                    <div className="category-item" key={c}>
                        <input
                            className="category-checkbox"
                            type="checkbox"
                            id={c}
                            name={c}
                            value={c}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={c}> {c} </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;
