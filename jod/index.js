// get the elements
const getJoke = document.getElementById("getJoke");
const output = document.getElementById("output");
const jokeTitle = document.getElementById("jokeTitle");

// function that will get the jokes
async function returnJokes(event) {
  event.preventDefault();
  const jokesEndpoint = "https://api.jokes.one/jod"; // limited ot 10 requests per hour

  // get response in form of json
  let resp = await fetch(jokesEndpoint, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const jsonData = await resp.json();

  // get the joke and title, respectively
  const joke = jsonData.contents.jokes[0].joke.text;
  const title = jsonData.contents.jokes[0].joke.title;

  // put joke and title into HTML
  jokeTitle.textContent = title;
  output.textContent = joke;
}

// create event listener (triggered by click of button)
getJoke.addEventListener("click", returnJokes);
