import { reactive } from "vue";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export const store = reactive({
  user: null as User | null,
  error: null as string | null,
  message: null as string | null,
  getUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          this.user = user;
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  },
});
