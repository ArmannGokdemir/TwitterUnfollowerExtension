//code block for unfollowing users who dont follow
var followingList =
  document.querySelector(
    'div.css-175oi2r[aria-label="Zaman Akışı: Takip ediliyor"]'
  ) ||
  document.querySelector('div.css-175oi2r[aria-label="Timeline: Following"]');
let flag = false;
let num = 1;
const followButtons = '[data-testid$="-unfollow"]';
const confirmButton = '[data-testid$="confirmationSheetConfirm"]';
const users = new Set();
const goodPeople = new Set();
let usersArr = [];
let goodPeopleArr = [];

const loadingBackground = document.createElement("div");
loadingBackground.classList.add("search-container-bg");

const svgBase64 = btoa(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><radialGradient id='a11' cx='.66' fx='.66' cy='.3125' fy='.3125' gradientTransform='scale(1.5)'><stop offset='0' stop-color='rgb(29 155 240)'></stop><stop offset='.3' stop-color='rgb(29 155 240)' stop-opacity='.9'></stop><stop offset='.6' stop-color='rgb(29 155 240)' stop-opacity='.6'></stop><stop offset='.8' stop-color='rgb(29 155 240)' stop-opacity='.3'></stop><stop offset='1' stop-color='rgb(29 155 240)' stop-opacity='0'></stop></radialGradient><circle transform-origin='center' fill='none' stroke='url(#a11)' stroke-width='21' stroke-linecap='round' stroke-dasharray='200 1000' stroke-dashoffset='0' cx='100' cy='100' r='70'><animateTransform type='rotate' attributeName='transform' calcMode='spline' dur='1.1' values='360;0' keyTimes='0;1' keySplines='0 0 1 1' repeatCount='indefinite'></animateTransform></circle><circle transform-origin='center' fill='none' opacity='.2' stroke='rgb(29 155 240)' stroke-width='21' stroke-linecap='round' cx='100' cy='100' r='70'></circle></svg>"
);

// Create an img element with a data URL containing the SVG

const loadingSpinner = document.createElement("img");
loadingSpinner.src = `data:image/svg+xml;base64,${svgBase64}`;
loadingSpinner.classList.add("loading");

loadingBackground.appendChild(loadingSpinner);
document.body.appendChild(loadingBackground);

// Gather everyone not following back
const scrollFunc = function () {
  if (flag) {
    clearInterval(interval);
    usersArr = Array.from(users);
    goodPeopleArr = Array.from(goodPeople);
    loadingBackground.classList.add("hidden");
    loadingSpinner.classList.add("hidden");
    // Check if everyone is following back
    if (users.size > 1) {
      console.log(
        "At last we meet end of page now the time has come for a little"
      );
      console.log("cleanup..");

      createUserList();
    } else console.log("You are being followed by all your followers wow.. ");
  }

  // Get user cells
  for (let i of followingList.children[0].children) {
    // Select Following You element on user elements that indicates the user is following back
    let div = i.querySelectorAll(
      ".css-1rynq56.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-qvutc0.r-37j5jr.r-1gkfh8e.r-56xrmm.r-majxgm.r-sqpuna.r-s1qlax.r-1vvnge1.r-z32n2g.r-13hce6t"
    );

    // Checking if following you element there
    if (div.length != 1) users.add(i);
    else goodPeople.add(i);
  }
  window.scrollTo(0, num * 1000);
  // Stop scrolling when reached the end of page
  if (num * 1000 > document.body.scrollHeight) {
    flag = true;
  }
  num++;
};

// Unfollow People
const unfollow = async (division) => {
  const followBtn = division.querySelector(followButtons);
  if (followBtn) {
    await followBtn.click();
    const unFollowBtn = document.querySelector(confirmButton);
    await unFollowBtn.click();
  }
};

const unfollowAll = async function () {
  for (let i of usersArr) {
    try {
      unfollow(i);
    } catch (e) {
      console.log(e);
    }
  }
  console.log(`Successfully unfollowed ${usersArr.length} have a great day..`);
  document.body.style.overflow = "auto";
  users.clear();
};
//initiating process
let interval = setInterval(scrollFunc, 1000);

// Create UI elements
const createUserList = function () {
  // Delete last blank div
  usersArr.pop();

  // Create container div
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("search-container-bg");

  // Create search container
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");

  // Create search input
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.placeholder = "Search for users..";
  searchInput.classList.add("search-input");

  // Create search icon
  const searchIcon = document.createElement("div");
  searchIcon.classList.add("search-icon");

  // Create user list ul
  const userList = document.createElement("ul");
  userList.classList.add("user-list");

  //Create init button
  const startButton = document.createElement("button");
  startButton.classList.add("button");
  startButton.textContent = "Start Unfollowing";
  startButton.addEventListener("click", () => {
    loadingBackground.classList.remove("hidden");
    loadingSpinner.classList.remove("hidden");
    usersArr = Array.from(users);
    usersArr.pop();
    unfollowAll();
    document.body.style.overflow = "auto";
    containerDiv.classList.add("hidden");
    alert(`Successfully unfollowed ${usersArr.length} people`);
    loadingBackground.classList.add("hidden");
    loadingSpinner.classList.add("hidden");
    location.reload();
  });

  // Create close list button
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.textContent = "X";
  closeButton.addEventListener("click", () => {
    document.body.style.overflow = "auto";
    document.body.removeChild(containerDiv);
    location.reload();
  });

  // Create Farewell List title
  const usersTitle = document.createElement("h1");
  usersTitle.classList.add("users-title");
  usersTitle.textContent = "Farewell List";

  // Create Info Panel
  const userCount = document.createElement("p");
  userCount.classList.add("info-panel");
  userCount.textContent = `Not Following: ${usersArr.length} Following: ${
    goodPeopleArr.length
  } Total Count: ${usersArr.length + goodPeopleArr.length}`;

  // Create user list items li with username and displayname
  const usersList = usersArr.map((user) => {
    return {
      username: user.querySelector(
        'div.css-1rynq56.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-18u37iz.r-1wvb978[dir="ltr"]>span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3'
      ).textContent,
      displayname: user.querySelector(
        "span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3"
      ).textContent,
      element: user,
    };
  });

  // Create not following users
  usersList.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.classList.add("user-item");
    userItem.setAttribute("data-username", user.username);

    const displayName = document.createElement("div");
    displayName.classList.add("display-name");
    displayName.textContent = user.displayname;

    const username = document.createElement("div");
    username.classList.add("username");
    username.textContent = `${user.username}`;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      userItem.remove();
      users.delete(user.element);
    });

    userItem.appendChild(displayName);
    userItem.appendChild(username);
    userItem.appendChild(removeButton);

    userList.appendChild(userItem);
  });

  // Filter users with search input
  const handleSearchInput = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const userItems = document.querySelectorAll(".user-item");

    userItems.forEach((userItem) => {
      const username = userItem.getAttribute("data-username").toLowerCase();
      const displayName = userItem.textContent.trim().toLowerCase();
      if (username.includes(searchTerm) || displayName.includes(searchTerm)) {
        userItem.style.display = "block";
      } else {
        userItem.style.display = "none";
      }
    });
  };

  // Add event listener for the search input
  searchInput.addEventListener("input", handleSearchInput);

  // Append elements
  searchContainer.appendChild(closeButton);
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchIcon);
  searchContainer.appendChild(usersTitle);
  searchContainer.appendChild(userList);
  searchContainer.appendChild(startButton);
  searchContainer.appendChild(userCount);
  containerDiv.appendChild(searchContainer);
  document.body.appendChild(containerDiv);
  document.body.style.overflow = "hidden";
};
