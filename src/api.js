const pathApi = "https://wedev-api.sky.pro/api/leaderboard";

export async function getLeaders() {
  const response = await fetch(pathApi, {
    method: "GET",
  });
  if (!response.ok & (response.status === 500)) {
    throw new Error("Ошибка соединения");
  }

  const data = await response.json();
  return data;
}

export async function postLeader({ user, timeUser }) {
  const response = await fetch(pathApi, {
    method: "POST",
    body: JSON.stringify({
      name: user,
      time: timeUser,
    }),
  });

  if (!response.ok & (response.status === 500)) {
    throw new Error("Ошибка сервера");
  } else if (response.status === 400) {
    throw new Error("Плохой запрос");
  }
  const data = await response.json();
  return data;
}
