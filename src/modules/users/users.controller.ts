import { Request, Response } from 'express';
import { createNewUser, getAllUsers, getUserByIdService, updateUserById, deleteUserById } from './users.service'; // Import the service functions

export const createUser = async (req: Request, res: Response): Promise<void> => {
  console.log('Request body:', req.body);  

  const requiredFields = [
    'userId', 'username', 'password', 'fullName', 'age', 'email', 'hobbies', 'address'
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400).json({
        message: `Missing required field: ${field}`,
      });
      return; 
    }
  }

  
  const { fullName, address } = req.body;
  if (!fullName.firstName || !fullName.lastName) {
    res.status(400).json({
      message: 'Missing full name details (firstName or lastName)',
    });
    return; 
  }

  if (!address.street || !address.city || !address.country) {
    res.status(400).json({
      message: 'Missing address details (street, city, or country)',
    });
    return; 
  }

  try {
    const userData = req.body; 
    const newUser = await createNewUser(userData); 

    res.status(201).json({
      message: 'User created successfully!',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Failed to create user.',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers(); 

    res.status(200).json({
      message: 'Users retrieved successfully!',
      users,
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({
      message: 'Failed to retrieve users.',
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; 

  try {
    const user = await getUserByIdService(Number(userId));

    if (!user) {
      res.status(404).json({
        message: 'User not found.',
      });
      return; 
    }

    res.status(200).json({
      message: 'User retrieved successfully!',
      user,
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({
      message: 'Failed to retrieve user.',
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; 
  const updatedData = req.body; 

  try {
    const updatedUser = await updateUserById(Number(userId), updatedData); 

    if (!updatedUser) {
      res.status(404).json({
        message: 'User not found.',
      });
      return; 
    }

    res.status(200).json({
      message: 'User updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      message: 'Failed to update user.',
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; 

  try {
    const user = await getUserByIdService(Number(userId)); 

    if (!user) {
      res.status(404).json({
        message: 'User not found.',
      });
      return; 
    }

    
    await deleteUserById(Number(userId));

    res.status(200).json({
      message: 'User deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      message: 'Failed to delete user.',
      error: error instanceof Error ? error.message : error,
    });
  }
};
