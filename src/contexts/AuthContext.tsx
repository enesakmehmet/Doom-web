import { createContext, useContext, useState, ReactNode } from 'react';

// Define user type
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: false,
  error: null
});

// Mock user data for demo purposes
const mockUsers = [
  {
    id: '1',
    username: 'doomslayer',
    email: 'doom@slayer.com',
    password: 'password123',
    name: 'Doom Slayer'
  },
  {
    id: '2',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if there's a saved user in localStorage on initial load
  useState(() => {
    const savedUser = localStorage.getItem('doomUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email and password
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Create user object without the password
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('doomUser', JSON.stringify(userWithoutPassword));
        setIsLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    username: string, 
    email: string, 
    password: string, 
    name: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = mockUsers.some(
        u => u.email === email || u.username === username
      );
      
      if (userExists) {
        setError('User with this email or username already exists');
        setIsLoading(false);
        return false;
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser = {
        id: (mockUsers.length + 1).toString(),
        username,
        email,
        password,
        name
      };
      
      // Add to mock users (in a real app, this would be handled by the backend)
      mockUsers.push(newUser);
      
      // Log in the new user
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('doomUser', JSON.stringify(userWithoutPassword));
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('An error occurred during registration');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('doomUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
