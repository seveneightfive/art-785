import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const login = async (email) => {
        setLoading(true);
        toast({
            title: "📬 Check your email!",
            description: "We've sent a magic link to your inbox. Click it to log in.",
        });
        // In a real scenario, this would call Supabase
        // const { error } = await supabase.auth.signInWithOtp({ email });
        // if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
        
        // Simulating a delay
        setTimeout(() => setLoading(false), 1000);
    };
    
    const logout = () => {
        // In a real scenario, this would call Supabase
        // await supabase.auth.signOut();
        setUser(null);
        toast({ title: "👋 You've been logged out." });
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};