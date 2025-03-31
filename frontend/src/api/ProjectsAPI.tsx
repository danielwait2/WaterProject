import { Project } from "../types/project";

interface FetchProjectsResponse {
    projects: Project[];
    totalNumProjects: number;
}

const API_URL = 'https://waterprojectwaitbackend.azurewebsites.net/api';

export const fetchProjects = async (
    pageSize: number,
    pageNumber: number,
    selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
    try {
        const categoryParams = selectedCategories
        .map((cat: any) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');
        const response = await fetch(
            `${API_URL}/Water/AllProjects?pageSize=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length > 0 ? `&${categoryParams}` : ''}`,
            {
                credentials: 'include',
            }
        );    
    if (!response.ok){
        throw new Error('Failed to fetch projects');
    }   
        return await response.json();
    } catch (error) {
        console.error('Error fetching projects', error);
        throw error;
    }
    

};

// Promise means that the function will return a value in the future ( not immediate)
// await means that the function will wait for the promise to resolve before continuing
export const addProject = async (newProject: Project): Promise<Project> => {
    try {
        const response = await fetch(`${API_URL}/Water/AddProject`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        });

        if (!response.ok) {
            throw new Error('Failed to add project');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding project', error);
        throw error;
    }
};

export const updateProject = async (
    projectId: number,
    updatedProject: Project
): Promise<Project> => {
    try {
        const response = await fetch(`${API_URL}/Water/UpdateProject/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject),
        });

        if (!response.ok) {
            throw new Error('Failed to update project');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating project', error);
        throw error;
    }
};

export const deleteProject = async (projectId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/Water/DeleteProject/${projectId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
    } catch (error) {
        console.error('Error deleting project', error);
        throw error;
    }
};
