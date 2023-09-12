import { Dispatch, SetStateAction } from "react";

import {QAMode} from "../interfaces/enums";

export interface UserDesc {
  userId: string|undefined;
}

export interface FileURLSubmission {
  fileURL: string;
}

export interface QuestionSubmission {
  question: string;
}

export interface QuestionAndAnswer {
  question: string;
  answer: string | undefined;
  question_id: string;
  qa_mode: QAMode;
}

export interface FileItem {
  name: string;
  url: string;
}