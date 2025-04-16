import Sprint from '../models/sprint.model.js';
import { ApiError } from './api.utils.js';

export const checkUserRole = async (boardId, userId, requiredRole = []) => {
    // const board = await Board.findById(boardId);
    // if (!board) {
    //     throw new ApiError(404, 'Board not found');
    // }

    // // Find the member with the given userId
    // const member = board.members.find((m) => m.user.toString() === userId.toString());
    // if (!member) {
    //     throw new ApiError(403, 'Access denied. User is not a member of this board.');
    // }

    // // If requiredRole is provided and the user's role is not in the allowed roles array
    // if (requiredRole.length > 0 && !requiredRole.includes(member.role)) {
    //     throw new ApiError(403, 'Access denied. User does not have sufficient permissions.');
    // }

    // // Allow Guest to perform the action if explicitly allowed in requiredRole
    // if (member.role === 'Guest' && !requiredRole.includes('Guest')) {
    //     throw new ApiError(403, 'Access denied. Guests cannot perform this operation.');
    // }

    // return member.role; // Return the user's role if needed for further checks
};

export const getWorkspaceByBoardId = async (boardId) => {
    // Find the board by ID
    // const board = await Board.findById(boardId);
    // if (!board) {
    //     throw new ApiError(404, 'Board not found');
    // }

    // // Find the folder associated with the board
    // const folder = await Folder.findById(board.folderId);
    // if (!folder) {
    //     throw new ApiError(404, 'Folder not found');
    // }

    // // Find the workspace associated with the folder
    // const workspace = await Workspace.findById(folder.workspace).populate('members');
    // if (!workspace) {
    //     throw new ApiError(404, 'Workspace not found');
    // }
    // return { board, folder, workspace };
};


// Check Admin in workspace
export const checkAdminRoleInWorkspace = async (boardId, userId) => {
    // // Fetch workspace by workspaceId
    // const { workspace } = await getWorkspaceByBoardId(boardId);  // Assuming getWorkspaceById fetches workspace by workspaceId

    // // Ensure workspace exists
    // if (!workspace) {
    //     throw new ApiError(404, 'Workspace not found.');  // Use throw instead of next in non-express functions
    // }

    // // Check if the user is an Admin of the workspace
    // const isAdmin = workspace.members.some(member =>
    //     member.user.toString() === userId && member.role === 'Admin'
    // );

    // return isAdmin;

};

// Ccheck Admin by workspace 
export const checkAdminByWorkspace = async (workspaceId, userId) => {
    // // Fetch workspace by workspaceId
    // const workspace = await Workspace.findById(workspaceId);

    // // Ensure workspace exists
    // if (!workspace) {
    //     throw new ApiError(404, 'Workspace not found.');  // Use throw instead of next in non-express functions
    // }

    // // Check if the user is an Admin of the workspace
    // const isAdmin = workspace.members.some(member =>
    //     member.user.toString() === userId && member.role === 'Admin'
    // );

    // return isAdmin;
};

// Check Admin by folder in workspace
export const checkAdminByFolderInWorkspace = async (folderId, userId) => {
    // // Fetch folder by folderId
    // const folder = await Folder.findById(folderId);

    // // Ensure folder exists
    // if (!folder) {
    //     throw new ApiError(404, 'Folder not found.');  // Use throw instead of next in non-express functions
    // }

    // // Fetch workspace by workspaceId
    // const workspace = await Workspace.findById(folder.workspace);

    // // Ensure workspace exists
    // if (!workspace) {
    //     throw new ApiError(404, 'Workspace not found.');  // Use throw instead of next in non-express functions
    // }

    // // Check if the user is an Admin of the workspace
    // const isAdmin = workspace.members.some(member =>
    //     member.user.toString() === userId && member.role === 'Admin'
    // );

    // return isAdmin;
};

// Check Admin by sprint in board
export const checkAdminBySprintInBoard = async (sprintId, userId) => {
    // Fetch sprint by sprintId
    const sprint = await Sprint.findById(sprintId).populate({ path: 'boardId', select: 'folderId' });

    // Ensure sprint exists
    if (!sprint) {
        throw new ApiError(404, 'Sprint not found.');  // Use throw instead of next in non-express functions
    }

    // Fetch folder by folderId
    const isAdmin = await checkAdminByFolderInWorkspace(sprint.boardId.folderId, userId);

    return isAdmin;

};