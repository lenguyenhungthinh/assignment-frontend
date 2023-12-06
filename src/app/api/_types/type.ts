// types.ts
export type ExamUser = {
  username: string;
  password: string;
  email?: string;
  id: number;
};

export type ExamSession = {
  sessionId: string;
  user: ExamUser;
};
