// /** @type {import('next').NextConfig} */
const withEnv = require('dotenv').config();

// const nextConfig = {}

// module.exports = nextConfig


module.exports = {
    env: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
};