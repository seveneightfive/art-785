import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const { login, loading } = useAuth();
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await login(email);
        if (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "📬 Check your email!",
                description: "We've sent a magic link to your inbox. Click it to log in.",
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Login - EventHorizon</title>
                <meta name="description" content="Login to your EventHorizon account." />
            </Helmet>
            <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-full max-w-sm mx-auto shadow-2xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
                            <CardDescription>Enter your email to receive a magic link.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Magic Link'
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </>
    );
};

export default Login;