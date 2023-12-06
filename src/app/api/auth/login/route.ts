import { NextRequest, NextResponse } from 'next/server';

import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';

import { ExamSession, ExamUser } from '../../_types/type';

const users: ExamUser[] = [
  { username: 'user1', password: 'password1', email: 'user1@gmail.com', id: 1 },
  { username: 'user2', password: 'password2', email: 'user2@gmail.com', id: 2 },
  // Add more users as needed
];

const sessionFilePath = path.join(process.cwd(), 'example/sessions.json');

const generateRandomSessionId = (length: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('hex'));
      }
    });
  });
};

const getSessions = async () => {
  let sessions: ExamSession[] = [];
  // eslint-disable-next-line no-console
  console.log(sessionFilePath);
  if (fs.existsSync(sessionFilePath)) {
    const data = fs.readFileSync(sessionFilePath, 'utf-8');
    sessions = JSON.parse(data);
  }
  return sessions;
};

const saveSessions = async (sessions: ExamSession[]) => {
  fs.writeFileSync(sessionFilePath, JSON.stringify(sessions));
};

function wait(sec: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000); // 3000 milliseconds = 3 seconds
  });
}

export async function POST(req: NextRequest) {
  await wait(3);
  const { username, password } = await req.json();

  // Check if the username and password are correct
  const user = users.find((user) => user.username === username && user.password === password);
  const sessions = await getSessions();
  const currentSessions = sessions.find((session) => session.user && session.user.id === user?.id);
  if (currentSessions) {
    return NextResponse.json({ info: 'User already logged in', sessionId: currentSessions.sessionId, isSuccessful: true });
  }

  if (user) {
    // Generate a random session ID (this is just for demonstration, you should use a more secure method)
    const sessionId = await generateRandomSessionId(10);
    const sessionData: ExamSession = { sessionId: sessionId, user };
    sessions.push(sessionData);
    await saveSessions(sessions);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    // Here, you might want to set up a session mechanism (e.g., using cookies or a session store)
    // For simplicity, we'll just return the session ID

    return NextResponse.json({ sessionId: sessionId, isSuccessful: true, ...userWithoutPassword });
  } else {
    return NextResponse.json({ error: 'Invalid username or password', isSuccessful: false });
  }
}
