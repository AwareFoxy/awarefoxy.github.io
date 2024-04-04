import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const openDb = async () => {
  return open({
    filename: './example.db',
    driver: sqlite3.Database,
  });
};

const initDb = async () => {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
    )
  `);
  const adminExists = await db.get("SELECT * FROM users WHERE username = 'admin'");
  if (!adminExists) {
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['admin', 'admin123']);
  }
};

const login = async (username: string, password: string) => {
  const db = await openDb();
  const user = await db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

  if (user) {
    alert("Login successful");
  } else {
    alert("Login failed");
  }
};

const loginButton = document.getElementById("loginButton");
if (loginButton) {
  loginButton.addEventListener("click", async () => {
    const usernameElement = document.getElementById("username");
    const passwordElement = document.getElementById("password");
    if (usernameElement && passwordElement) {
      const username = (usernameElement as HTMLInputElement).value;
      const password = (passwordElement as HTMLInputElement).value;

      await login(username, password);
    }
  });
}

window.onload = async () => {
  await initDb();
};