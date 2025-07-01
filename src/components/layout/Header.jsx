import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, MicOff as MicVocal, Users, Calendar, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';

const Header = () => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold ${
      isActive
        ? 'bg-slate-900 text-white'
        : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-200">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800 font-oswald uppercase">
          <MicVocal className="w-8 h-8 text-slate-900" />
          EventHorizon
        </NavLink>
        <div className="flex items-center gap-2 md:gap-4">
            <NavLink to="/" className={navLinkClasses}>
                <LayoutDashboard className="w-5 h-5" />
                <span className="hidden md:inline">Dashboard</span>
            </NavLink>
            <NavLink to="/artists" className={navLinkClasses}>
                <Users className="w-5 h-5" />
                <span className="hidden md:inline">Artists</span>
            </NavLink>
            <NavLink to="/events" className={navLinkClasses}>
                <Calendar className="w-5 h-5" />
                <span className="hidden md:inline">Events</span>
            </NavLink>
            
            <Separator orientation="vertical" className="h-8 mx-2 hidden md:block" />

            {isAuthenticated ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar>
                                <AvatarImage src={user.user_metadata?.avatar_url} alt="User avatar" />
                                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Logged In</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link to="/login">
                    <Button>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                    </Button>
                </Link>
            )}
        </div>
      </nav>
    </header>
  );
};

export default Header;