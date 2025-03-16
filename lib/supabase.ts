import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 인증된 사용자용 Supabase 클라이언트 생성
export async function createAuthClient() {
  const { getToken } = await auth();
  const supabaseToken = await getToken({ template: 'supabase' });
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseToken}`,
        },
      },
    }
  );
}

// 관리자용 클라이언트 (기존 코드)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    // 중요: 서비스 계정이 RLS를 우회하도록 설정
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js/2.x.x',
      },
    },
  }
);