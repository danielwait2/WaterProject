import { Project } from './types/project.ts';
import { useEffect, useState } from 'react';

function ProjectList(){

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('https://localhost:5000/api/Water/AllProjects');
            const data = await response.json();
            setProjects(data);
        };

        fetchProjects();
    }, []);
    return (
        <>
            <h1>Water Project List</h1>
            <br />
            {projects.map((p) => (
                <div id='projectCard'>
                    <h3>{p.projectName}</h3>

                    <ul>
                        <li>Project Type: {p.projectType}</li>
                        <li>Regional Program: {p.projectRegionalProgram}</li>
                        <li>Impact: {p.projectImpact}</li>
                        <li>Phase: {p.projectPhase} Individuals Served</li>
                        <li>Functionality Status: {p.projectFunctionalityStatus}</li>
                    </ul>

                </div>
            ))}
        </>
    );
}

export default ProjectList;