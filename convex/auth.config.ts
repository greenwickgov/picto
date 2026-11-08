// Set these in the Convex dashboard for an OIDC provider before enabling live sign-in.
export default {providers:process.env.AUTH_ISSUER&&process.env.AUTH_APPLICATION_ID?[{domain:process.env.AUTH_ISSUER,applicationID:process.env.AUTH_APPLICATION_ID}]:[]};
