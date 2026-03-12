import { cookies } from "next/headers";

interface Session {
  userId: string;
  name: string;
}

export async function getSession(): Promise<Session | null> {
  const _cookies = await cookies();
  const token = _cookies.get("fit-ai-token")?.value;

  if (!token) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );
    return { userId: payload.sub, name: payload.name };
  } catch {
    return null;
  }
}
