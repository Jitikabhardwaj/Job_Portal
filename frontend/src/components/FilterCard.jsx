import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = ({ onFilterChange }) => {

    const [selectedFilters, setSelectedFilters] = useState({
        Location: "",
        Industry: "",
        Salary: ""
    });

    const changeHandler = (filterType, value) => {

        const updatedFilters = {
            ...selectedFilters,
            [filterType]: value
        };

        setSelectedFilters(updatedFilters);

        // Parent component ko selected filters bhejenge
        onFilterChange(updatedFilters);
    };

    return (
        <div className='w-full bg-white p-3 rounded-md'>

            <h1 className='font-bold text-lg'>Filter Jobs</h1>

            <hr className='mt-3' />

            {
                filterData.map((data, index) => (

                    <div key={index} className='mt-4'>

                        <h1 className='font-bold text-lg'>
                            {data.filterType}
                        </h1>

                        <RadioGroup
                            value={selectedFilters[data.filterType]}
                            onValueChange={(value) =>
                                changeHandler(data.filterType, value)
                            }
                        >

                            {
                                data.array.map((item, idx) => {

                                    const itemId = `id-${index}-${idx}`;

                                    return (
                                        <div
                                            key={itemId}
                                            className='flex items-center space-x-2 my-2'
                                        >

                                            <RadioGroupItem
                                                value={item}
                                                id={itemId}
                                            />

                                            <Label htmlFor={itemId}>
                                                {item}
                                            </Label>

                                        </div>
                                    )
                                })
                            }

                        </RadioGroup>

                    </div>
                ))
            }

            {/* Clear Filters */}
            <button
                onClick={() => {
                    const clearedFilters = {
                        Location: "",
                        Industry: "",
                        Salary: ""
                    };

                    setSelectedFilters(clearedFilters);
                    onFilterChange(clearedFilters);
                }}
                className='mt-4 text-sm text-red-600 font-semibold'
            >
                Clear All Filters
            </button>

        </div>
    )
}

export default FilterCard