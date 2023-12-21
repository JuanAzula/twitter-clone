/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { AuthButtonClient } from './auth-button-client'

export default async function AuthButtonServer () {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get (name: string) {
          return cookieStore.get(name)?.value
        },
        set (name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove (name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        }
      }
    })
  const { data: { session } } = await supabase.auth.getSession()

  return <AuthButtonClient session ={session} />
}
