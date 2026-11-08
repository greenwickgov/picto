import {Password} from '@convex-dev/auth/providers/Password';
import {convexAuth} from '@convex-dev/auth/server';
import {ConvexError} from 'convex/values';
export const {auth,signIn,signOut,store,isAuthenticated}=convexAuth({providers:[Password({
 profile(params){const email=String(params.email||'').trim().toLowerCase();if(email.length>254||!/^\S+@\S+\.\S+$/.test(email))throw new ConvexError('Enter a valid email address.');return {email};},
 validatePasswordRequirements(password){if(password.length<12||password.length>128)throw new ConvexError('Use a password between 12 and 128 characters.');}
})]});
