import type {NextConfig} from 'next';
const nextConfig:NextConfig={allowedDevOrigins:['*.e2b.app'],serverExternalPackages:['better-sqlite3','playwright'],async headers(){return [{source:'/:path*',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'}]},{source:'/api/:path*',headers:[{key:'Cache-Control',value:'private, no-store'}]}];}};
export default nextConfig;
