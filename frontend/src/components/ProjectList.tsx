import { Project } from '../types/project.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api/ProjectsAPI.tsx';
import Pagination from './Pagination.tsx';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const data = await fetchProjects(
                    pageSize,
                    pageNumber,
                    selectedCategories
                );

                setProjects(data.projects);
                setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, [pageSize, pageNumber, selectedCategories]); //dependency array or what to watch for

    if (loading) {
        return <p>Loading projects...</p>;
    }
    if (error) {
        return <p className="text-red-500">Error loading projects: {error}</p>;
    }

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
                        <button
                            className="btn btn-success"
                            onClick={() =>
                                navigate(
                                    `/donate/${p.projectName}/${p.projectId}`
                                )
                            }
                        >
                            Donate
                        </button>
                    </div>
                </div>
            ))}
            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNumber}
                onPageSizeChange={setPageSize}/>
        </>
    );
}

export default ProjectList;
