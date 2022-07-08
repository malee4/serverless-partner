const getJoke = document.getElementById('getJoke');
        const output = document.getElementById("output");
        
        async function returnJokes(event) {
            event.preventDefault()
            const jokesEndpoint = "https://api.jokes.one/jod";
            
            // should get it in the form of a json
            let resp = await fetch(jokesEndpoint, {
                "method": "GET",
                headers: {
                    "Content-type":"application/json"
                }
            });
            const jsonData = await resp.json();
            const joke = jsonData.contents.jokes[0].joke.text
            output.textContent = joke
        }

        getJoke.addEventListener('click', returnJokes)