/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

// opción de Next.js, para evitar que cachee de forma
// estática la ruta, y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
  console.log('entra en la petición get de handlesignin')

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  console.log(code)
  const cookieStore = cookies()
  if (code != null) {
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
      }
    )
    // usando el código que le hemos pasado por URL
    // nos devuelve la sesión del usuario
    await supabase.auth.exchangeCodeForSession(code)
    console.log('ha ido bien')
  }
  console.log('creo que perfecto')
  return NextResponse.redirect(requestUrl.origin)
}
