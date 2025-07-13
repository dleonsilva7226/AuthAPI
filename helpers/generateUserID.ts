import type {User} from "../interfaces/types";

const generateUserId = (users: User[]) => {
  return users.length + 1;
}

export default generateUserId;