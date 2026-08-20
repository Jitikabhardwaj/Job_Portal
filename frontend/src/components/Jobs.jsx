import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {

    const { allJobs } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allJobs);

    const [selectedFilters, setSelectedFilters] = useState({
        Location: "",
        Industry: "",
        Salary: ""
    });

    // Filter change hone par ye function chalega
    const handleFilterChange = (filters) => {
        setSelectedFilters(filters);
    };

    useEffect(() => {

        let filteredJobs = [...allJobs];

        // =========================
        // LOCATION FILTER
        // =========================

        if (selectedFilters.Location) {

            filteredJobs = filteredJobs.filter((job) =>
                job.location
                    ?.toLowerCase()
                    .includes(selectedFilters.Location.toLowerCase())
            );
        }

        // =========================
        // INDUSTRY FILTER
        // =========================

        if (selectedFilters.Industry) {

            const industry = selectedFilters.Industry.toLowerCase();

            filteredJobs = filteredJobs.filter((job) => {

                const title = job.title?.toLowerCase() || "";
                const description = job.description?.toLowerCase() || "";

                const requirements = Array.isArray(job.requirements)
                    ? job.requirements.join(" ").toLowerCase()
                    : "";

                return (
                    title.includes(industry) ||
                    description.includes(industry) ||
                    requirements.includes(industry)
                );
            });
        }

        // =========================
        // SALARY FILTER
        // =========================

        if (selectedFilters.Salary) {

            filteredJobs = filteredJobs.filter((job) => {

                const salary = Number(job.salary);

                if (selectedFilters.Salary === "0-40k") {
                    return salary >= 0 && salary <= 40000;
                }

                if (selectedFilters.Salary === "42-1lakh") {
                    return salary > 40000 && salary <= 100000;
                }

                if (selectedFilters.Salary === "1lakh to 5lakh") {
                    return salary > 100000 && salary <= 500000;
                }

                return true;
            });
        }

        setFilterJobs(filteredJobs);

    }, [allJobs, selectedFilters]);


    return (
        <div>

            <Navbar />

            <div className='max-w-7xl mx-auto mt-5'>

                <div className='flex gap-5'>

                    {/* FILTER SECTION */}

                    <div className='w-20%'>

                        <FilterCard
                            onFilterChange={handleFilterChange}
                        />

                    </div>


                    {/* JOB SECTION */}

                    {
                        filterJobs.length <= 0 ? (

                            <span>Job not found</span>

                        ) : (

                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>

                                <div className='grid grid-cols-3 gap-4'>

                                    {
                                        filterJobs.map((job) => (

                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}
                                            >

                                                <Job job={job} />

                                            </motion.div>

                                        ))
                                    }

                                </div>

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default Jobs