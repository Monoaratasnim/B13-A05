const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const searchURL = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";

let allIssues = [];

// ALL TAB
const allTabLoad = () => {
    if (allIssues.length > 0) {
        displayPost(allIssues, "allContainer");
        issueSummary(allIssues);
        showOnlyContainer("allContainer");
        return;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            displayPost(allIssues, "allContainer");
            issueSummary(allIssues);
            showOnlyContainer("allContainer");
        })
        .catch(err => console.log(err));
};

// OPEN TAB
const openTabLoad = () => {
    if (allIssues.length === 0) {
        allTabLoad();
        return;
    }
    const openIssues = allIssues.filter(issue => issue.status.toLowerCase() === "open");
    displayPost(openIssues, "openContainer");
    issueSummary(openIssues);
    showOnlyContainer("openContainer");
};

// CLOSED TAB
const closedTabLoad = () => {
    if (allIssues.length === 0) {
        allTabLoad();
        return;
    }
    const closedIssues = allIssues.filter(issue => issue.status.toLowerCase() === "closed");
    displayPost(closedIssues, "closedContainer");
    issueSummary(closedIssues);
    showOnlyContainer("closedContainer");
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
        const card = document.createElement("div");

        // Set top border color based on status
        let borderColor = "";
        if (post.status.toLowerCase() === "open") borderColor = "border-t-4 border-green-500";
        if (post.status.toLowerCase() === "closed") borderColor = "border-t-4 border-purple-500";

        card.innerHTML = `
        <div class="bg-white  rounded-lg p-4 shadow-sm h-64 max-w-6xl flex flex-col justify-between ${borderColor}">
            <div>
                <div class="flex justify-between items-center mb-2">
                    <span class="text-xs bg-gray-100 px-2 py-1 rounded-full">${post.priority}</span>
                </div>
                <h2 class="font-semibold text-sm mb-2">${post.title}</h2>
                <p class="text-xs text-gray-500 mb-3">${post.description ? post.description.slice(0,80) : ""}...</p>
                <div class="flex gap-2 mb-3">
                    <span class="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">BUG</span>
                    <span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">HELP WANTED</span>
                </div>
            </div>
            <div class="border-t pt-2 text-xs text-gray-500 flex justify-between">
                <p>#${post.id} by ${post.assignee}</p>
                <p>${new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        `;
        container.appendChild(card);
    });
};

// HELPER: show only the selected container
const showOnlyContainer = (containerId) => {
    ["allContainer", "openContainer", "closedContainer"].forEach(id => {
        document.getElementById(id).style.display = id === containerId ? "grid" : "none";
    });
};

// SEARCH FUNCTIONALITY
const searchInput = document.querySelector('input[placeholder="Search issues..."]');
const searchBtn = document.querySelector('button.btn-primary');

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    fetch(searchURL + encodeURIComponent(query))
        .then(res => res.json())
        .then(data => {
            let results = data.data || [];

            // Filter results by title only
            results = results.filter(issue => issue.title.toLowerCase().includes(query));

            // Determine current tab
            let currentContainer = "allContainer";
            if (document.getElementById("openTab").checked) currentContainer = "openContainer";
            if (document.getElementById("closedTab").checked) currentContainer = "closedContainer";

            // Filter by status if Open or Closed tab is active
            if (currentContainer === "openContainer") {
                results = results.filter(issue => issue.status.toLowerCase() === "open");
            }
            if (currentContainer === "closedContainer") {
                results = results.filter(issue => issue.status.toLowerCase() === "closed");
            }

            displayPost(results, currentContainer);
            issueSummary(results);
            showOnlyContainer(currentContainer);

            // Clear input after search
            searchInput.value = "";
        })
        .catch(err => console.log(err));
});

// INITIAL LOAD
allTabLoad();