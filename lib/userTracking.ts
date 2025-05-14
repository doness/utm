import Cookies from 'js-cookie';

const USER_ID_COOKIE = 'utm_user_id';

export function getOrCreateUserId(): string {
  let userId = Cookies.get(USER_ID_COOKIE);

  if (!userId) {
    userId = crypto.randomUUID();
    Cookies.set(USER_ID_COOKIE, userId, { expires: 365 });
  }

  return userId;
}