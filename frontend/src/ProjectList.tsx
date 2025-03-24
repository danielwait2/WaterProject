import { Project } from './types/project.ts';
import { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchProjects = async () => {
            const categoryParams = selectedCategories
                .map((cat: any) => `projectTypes=${encodeURIComponent(cat)}`)
                .join('&');
            const response = await fetch(
                `https://localhost:5000/api/Water/AllProjects?pageSize=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length > 0 ? `&${categoryParams}` : ''}`,
                {
                    credentials: 'include',
                }
            );
            const data = await response.json();
            setProjects(data.projects);
            setTotalItems(data.totalNumProjects);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchProjects();
    }, [pageSize, pageNumber, totalItems, selectedCategories]); //dependency array or what to watch for
    return (
        <>
            {projects.map((p) => (
                <div id="projectCard" className="card">
                    <h3 className="card-title">{p.projectName}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li>
                                <strong>Project Type: </strong>
                                {p.projectType}
                            </li>
                            <li>
                                <strong>Regional Program: </strong>
                                {p.projectRegionalProgram}
                            </li>
                            <li>
                                <strong>Impact: </strong>
                                {p.projectImpact} Individuals Served
                            </li>
                            <li>
                                <strong>Phase: </strong>
                                {p.projectPhase}
                            </li>
                            <li>
                                <strong>Functionality Status: </strong>

                                {p.projectFunctionalityStatus}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
            <br />

            <button
                disabled={pageNumber === 1}
                onClick={() => setPageNumber(pageNumber - 1)}
            >
                Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setPageNumber(index + 1)}
                    disabled={pageNumber === index + 1}
                >
                    {index + 1}
                </button>
            ))}

            <button
                disabled={pageNumber === totalPages}
                onClick={() => setPageNumber(pageNumber + 1)}
            >
                Next
            </button>

            <br />
            <label>
                Results per page:
                <select
                    value={pageSize}
                    onChange={(p) => {
                        setPageSize(Number(p.target.value));
                        setPageNumber(1); // Reset page number when page size changes
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default ProjectList;
