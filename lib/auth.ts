import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function getBearerToken(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

export async function verifySupabaseJwt(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function getUserFromRequest(request: NextRequest) {
  const supabase = await createClient();
  
  // Try to get user from cookies first
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    return user;
  }
  
  // If no user from cookies, try JWT from Authorization header
  const token = await getBearerToken(request);
  if (token && await verifySupabaseJwt(token)) {
    const { data: { user: jwtUser } } = await supabase.auth.getUser(token);
    return jwtUser;
  }
  
  return null;
}
