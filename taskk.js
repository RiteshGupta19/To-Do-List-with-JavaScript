let form = document.querySelector("form");
let main = document.querySelector(".main");
let clear = document.querySelector(".call");
form.addEventListener("submit", (event) => {
  let name = event.target.name.value;
  let email = event.target.email.value;
  let cont = event.target.contact.value;
  let check = 0;
  let udata = JSON.parse(localStorage.getItem("data")) ?? [];
  for (let x of udata) {
    if (x.email == email || x.cont == cont) {
      check = 1;
      break;
    }
  }
  if (check == 1) {
    alert("email or number repeated");
  } else {
    udata.push({
      name: name,
      email: email,
      contact: cont,
    });
    localStorage.setItem("data", JSON.stringify(udata));
    event.target.reset();
  }
  displaydata();
  event.preventDefault();
});

let displaydata = () => {
  let udata = JSON.parse(localStorage.getItem("data")) ?? [];
  let disp = "";

  udata.forEach((element, i) => {
    disp += ` <div class=" shadow-lg  position-relative pb-3 px-3 bg-white my-5 mx-3">
  <span  class="d-inline fs-2 position-absolute top-0 end-0 me-3" onclick="del(${i})">&times;</span>
  <div class="d-flex mt-5">
  <h4>Name: &nbsp;</h4>
  <h4 >${element.name}</h4>
  </div>
  <div class="d-flex">
  <h4>Email: &nbsp;</h4>
  <h4 > ${element.email}</h4>
  </div>
  <div class="d-flex">
  <h4>Contact: &nbsp;</h4>
  <h4 >${element.contact}</h4>
  </div>
  <button class="btn btn-primary" onclick="edit(${i})">edit</button>
</div> `;
  });
  main.innerHTML = disp;
};

let del = (i) => {
  let udata = JSON.parse(localStorage.getItem("data")) ?? [];
  udata.splice(i, 1);
  localStorage.setItem("data", JSON.stringify(udata));
  displaydata();
};

let edit = (i) => {
  let udata = JSON.parse(localStorage.getItem("data")) ?? [];
  form.name.value = udata[i].name;
  form.email.value = udata[i].email;
  form.contact.value = udata[i].contact;
  document.getElementById("sub").style.display = "none";
  let updateBtn = document.getElementById("idd");
  updateBtn.onclick = () => update(i);
  form.appendChild(updateBtn);
  document.getElementById("idd").style.display = "block";
};

let update = (i) => {
  let udata = JSON.parse(localStorage.getItem("data")) ?? [];
  udata[i].name = form.name.value;
  udata[i].email = form.email.value;
  udata[i].contact = form.contact.value;
  localStorage.setItem("data", JSON.stringify(udata));
  document.getElementById("sub").style.display = "block";
  document.getElementById("idd").style.display = "none";
  form.reset();
  displaydata();
};

clear.addEventListener("click", () => {
  localStorage.clear("data");
  displaydata();
});
displaydata();
