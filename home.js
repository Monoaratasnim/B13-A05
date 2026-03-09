const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const searchURL = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";

let allIssues = [];
const spinner = document.getElementById("spinner");

// Show only selected container
const showOnlyContainer = (containerId) => {
["allContainer", "openContainer", "closedContainer"].forEach(id => {
document.getElementById(id).style.display =
id === containerId ? "grid" : "none";
});
};

// ALL TAB
const allTabLoad = () => {
spinner.classList.remove("hidden"); // show spinner

if (allIssues.length > 0) {
displayPost(allIssues, "allContainer");
issueSummary(allIssues);
showOnlyContainer("allContainer");
spinner.classList.add("hidden"); // hide spinner
return;
}

fetch(url)
.then(res => res.json())
.then(data => {
allIssues = data.data;
displayPost(allIssues, "allContainer");
issueSummary(allIssues);
showOnlyContainer("allContainer");
spinner.classList.add("hidden");
})
.catch(err => {
console.log(err);
spinner.classList.add("hidden");
});
};

// OPEN TAB
const openTabLoad = () => {
spinner.classList.remove("hidden");

if (allIssues.length === 0) {
allTabLoad();
spinner.classList.add("hidden");
return;
}

const openIssues = allIssues.filter(issue => issue.status.toLowerCase() === "open");
displayPost(openIssues, "openContainer");
issueSummary(openIssues);
showOnlyContainer("openContainer");
spinner.classList.add("hidden");
};

// CLOSED TAB
const closedTabLoad = () => {
spinner.classList.remove("hidden");

if (allIssues.length === 0) {
allTabLoad();
spinner.classList.add("hidden");
return;
}

const closedIssues = allIssues.filter(issue => issue.status.toLowerCase() === "closed");
displayPost(closedIssues, "closedContainer");
issueSummary(closedIssues);
showOnlyContainer("closedContainer");
spinner.classList.add("hidden");
};

// ISSUE COUNT
const issueSummary = (posts) => {
document.getElementById("totalIssues").innerText = `${posts.length} Issues`;
};

// DISPLAY POSTS
const displayPost = (posts, containerId) => {
const container = document.getElementById(containerId);
container.innerHTML = "";

posts.forEach(post => {
let borderColor = "";
let statusImg = "";

if (post.status.toLowerCase() === "open") {
borderColor = "border-t-4 border-green-500";
statusImg = "assets/Open-Status.png";
}
if (post.status.toLowerCase() === "closed") {
borderColor = "border-t-4 border-purple-500";
statusImg = "assets/Closed- Status .png";
}

const card = document.createElement("div");

card.innerHTML = `
<div onclick="openIssueModal(${post.id})"
class="cursor-pointer bg-white rounded-lg p-5 shadow-md flex flex-col justify-between ${borderColor}">

<!-- Card Header: Status image left, Priority right -->
<div class="flex justify-between items-center mb-3 flex-wrap sm:flex-nowrap gap-4">
    <div class="shrink-0">
        <img src="${statusImg}" alt="${post.status}" class="w-6 h-6 object-contain"/>
    </div>

    <div class="shrink-0">
        <span class="text-sm bg-gray-100 px-3 py-1 rounded-full">${post.priority}</span>
    </div>
</div>

<!-- Title -->
<h2 class="font-semibold text-base mb-2 truncate">${post.title}</h2>

<!-- Description -->
<p class="text-sm text-gray-500 mb-3 line-clamp-2">
    ${post.description ? post.description : ""}
</p>

<!-- Tags -->
<div class="flex gap-2 mb-4 flex-wrap">
    <span class="text-sm bg-red-100 text-red-500 px-2 py-1 rounded-full">BUG</span>
    <span class="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">HELP WANTED</span>
</div>

<!-- Footer -->
<div class="border-t pt-3 text-sm text-gray-500 flex justify-between flex-wrap">
    <p>#${post.id} by ${post.assignee}</p>
    <p>${new Date(post.createdAt).toLocaleDateString()}</p>
</div>

</div>
`;

container.appendChild(card);
});
};

// SEARCH FUNCTION
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
const query = searchInput.value.trim().toLowerCase();
if (!query) return;

spinner.classList.remove("hidden"); // show spinner

fetch(searchURL + encodeURIComponent(query))
.then(res => res.json())
.then(data => {
let results = data.data || [];

results = results.filter(issue =>
issue.title.toLowerCase().includes(query)
);

let currentContainer = "allContainer";

if (document.getElementById("openTab").checked)
currentContainer = "openContainer";

if (document.getElementById("closedTab").checked)
currentContainer = "closedContainer";

if (currentContainer === "openContainer")
results = results.filter(issue =>
    issue.status.toLowerCase() === "open"
);

if (currentContainer === "closedContainer")
results = results.filter(issue =>
    issue.status.toLowerCase() === "closed"
);

displayPost(results, currentContainer);
issueSummary(results);
showOnlyContainer(currentContainer);

searchInput.value = "";
spinner.classList.add("hidden"); // hide spinner
})
.catch(err => {
console.log(err);
spinner.classList.add("hidden"); // hide spinner on error
});
});

// MODAL
const openIssueModal = (id) => {
fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
.then(res => res.json())
.then(data => {
const issue = data.data;

document.getElementById("modalTitle").innerText = issue.title;
document.getElementById("modalDescription").innerText = issue.description;
document.getElementById("modalAssignee").innerText = issue.assignee;
document.getElementById("modalAuthor").innerText = `Opened by ${issue.author}`;
document.getElementById("modalDate").innerText = new Date(issue.createdAt).toLocaleDateString();

const status = document.getElementById("modalStatus");
status.innerText = issue.status;
status.className = issue.status.toLowerCase() === "open" ? "badge badge-success" : "badge badge-secondary";

const priority = document.getElementById("modalPriority");
priority.innerText = issue.priority;
if(issue.priority === "HIGH") priority.className = "badge badge-error";
else if(issue.priority === "MEDIUM") priority.className = "badge badge-warning";
else priority.className = "badge badge-success";

document.getElementById("issueModal").showModal();
});
};

// INITIAL LOAD
allTabLoad();