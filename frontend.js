
async function loadMps() {

    const container = document.getElementById("mps-container");

    try {
        const response = await fetch("/api/mps");

        if (!response.ok) {
            throw new Error("Tietojen hakeminen epäonnistui");
        }

        const mps = await response.json();

        container.innerHTML = "";

        mps.forEach(mp => {

            const person = document.createElement("div");
            person.className = "mp-card";

            const name = document.createElement("h3");
            name.textContent = mp.first + " " + mp.last;

            const party = document.createElement("p");
            party.textContent = "Puolue: " + mp.party;

            const constituency = document.createElement("p");
            constituency.textContent = "Vaalipiiri: " + mp.constituency;

            person.appendChild(name);
            person.appendChild(party);
            person.appendChild(constituency);

            container.appendChild(person);
        });

    } catch (error) {
        container.textContent = "Tietojen lataaminen epäonnistui.";
        console.error(error);
    }
}

loadMps();
