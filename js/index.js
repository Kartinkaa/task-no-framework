const IP_URL = "https://api.ipify.org/?format=json";
const BASE_URL = "http://localhost:3000";

//getting greeting and ip for home page
const header = fetch(IP_URL)
  .then((response) => response.json())
  .then((body) => {
    document.getElementById(
      "header"
    ).innerHTML = `<h1 class="centerHead1">WELCOME!</h1> <h3 class="centerHead2">Your IP is ${body.ip}</h3>`;
  })
  .catch((e) => alert(`Something went wrong: ${e}`));

//getting name from /profile
const getProfile = async () => {
  try {
    const response = await fetch(`${BASE_URL}/profile`);
    const body = await response.json();
    document.getElementById(
      "profile"
    ).innerHTML = `This is your name: <bold>${body.name.toUpperCase()}</bold>`;
  } catch (error) {
    alert(`Something went wrong: ${error}`);
  }
};
getProfile();

const changeName = () => {
  const newName = document.getElementById("newName");
  const value = newName.value.trim();
  newName.value = "";
  if (value !== "") {
    try {
      fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value,
        }),
      }).then((response) => response.json());
      location.reload(true);
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  }
};
