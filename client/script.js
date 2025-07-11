console.log("Job portal loaded");

document.getElementById("jobForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const company = document.getElementById("company").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !company || !description) {
    alert("Please fill in all fields!");
    return;
  }

  const job = { title, company, description };

  const response = await fetch("http://localhost:5000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(job)
  });

  if (response.ok) {
    alert("Job added successfully!");
    document.getElementById("jobForm").reset();
    fetchJobs(); // Refresh job list
  } else {
    alert("Failed to post job");
  }
});

async function fetchJobs() {
  const res = await fetch("http://localhost:5000/jobs");
  const jobs = await res.json();

  const container = document.getElementById("jobsContainer");
  container.innerHTML = "";

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-card";
    div.innerHTML = `
      <h3>${job.title}</h3>
      <h4>${job.company}</h4>
      <p>${job.description}</p>
    `;
    container.appendChild(div);
  });
}

fetchJobs();
