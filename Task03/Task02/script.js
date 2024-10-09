document.getElementById("projectForm").addEventListener("submit", function(event) {
    event.preventDefault();

    
    const name = document.getElementById("projectName").value;
    const description = document.getElementById("projectDescription").value;
    const goal = document.getElementById("fundingGoal").value;

    
    const project = document.createElement("div");
    project.className = "project";

    const projectHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <p><strong>Goal:</strong> $${goal}</p>
        <label for="contribution">Contribute ($):</label>
        <input type="number" id="contribution" placeholder="Enter amount">
        <button class="contributeBtn">Contribute</button>
        <p><strong>Total Contributions:</strong> $<span class="total-contributions">0</span></p>
    `;
    project.innerHTML = projectHTML;

    
    document.getElementById("projects").appendChild(project);

    
    document.getElementById("projectForm").reset();

    
    project.querySelector(".contributeBtn").addEventListener("click", function() {
        const contributionInput = project.querySelector("#contribution");
        const contributionAmount = parseFloat(contributionInput.value);
        const totalContributionsElement = project.querySelector(".total-contributions");

        if (contributionAmount && contributionAmount > 0) {
            const currentTotal = parseFloat(totalContributionsElement.textContent);
            totalContributionsElement.textContent = (currentTotal + contributionAmount).toFixed(2);
            contributionInput.value = "";
        }
    });
});
