import { UserModel } from './users.model'; 
import { IUser } from './users.interface'; 



export const createNewUser = async (userData: IUser) => {
  try {
    console.log('Creating user with data:', userData); 
    const newUser = await UserModel.create(userData); 
    return {
      userId: newUser.userId,
      username: newUser.username,
      fullName: newUser.fullName,
      age: newUser.age,
      email: newUser.email,
      isActive: newUser.isActive,
      hobbies: newUser.hobbies,
      address: newUser.address,
    };
  } catch (error) {
    console.error('Error in createNewUser service:', error);
    throw new Error('Could not create user.');
  }
};

export const getAllUsers = async (): Promise<any> => {
  try {
    const users = await UserModel.find({}, 'username fullName age email address'); // Filter fields
    return users;
  } catch (error) {
    throw new Error('Error retrieving users: ' + error);
  }
};

export const getUserByIdService = async (userId: number): Promise<any> => {
  try {
    const user = await UserModel.findOne({ userId }).select('-password'); 
    return user; 
  } catch (error) {
    throw new Error('Error retrieving user: ' + error);
  }
};

export const updateUserById = async (userId: number, updatedData: IUser) => {
  try {
    const user = await UserModel.findOne({ userId });

    if (!user) {
      return null;
    }

    user.set(updatedData);
    await user.save(); 

    return {
      userId: user.userId,
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      isActive: user.isActive,
      hobbies: user.hobbies,
      address: user.address,
    };
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Could not update user.');
  }
};

export const deleteUserById = async (userId: number): Promise<void> => {
  try {
    const user = await UserModel.findOne({ userId });

    if (!user) {
      throw new Error('User not found.');
    }

    await UserModel.deleteOne({ userId }); 
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Could not delete user.');
  }
};
