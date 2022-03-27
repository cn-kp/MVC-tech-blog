var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");



// The button that opens the modal
var modalBtn = document.querySelector("#addPost");
modalBtn.addEventListener("click",function(event){
  // event.preventDefault();
  console.log("click")
    modal.style.display = "block";
});

const modalBtn2s = document.querySelectorAll('.updateBtn');
modalBtn2s.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        const id = event.target.getAttribute("data-value");
        const postTitle = "title_" + id;
        const postText = "text_" + id;
        
        document.getElementById("title2").value = document.getElementById(postTitle).innerHTML;
        document.getElementById("text2").value = document.getElementById(postText).innerHTML;
        document.getElementById("confirm2").setAttribute("data-value",id);
        modal2.style.display = "block";
    });
});


// When the user clicks the "Cancel" button, close the modal and clear fields

var canxBtn = document.getElementById("canx");
canxBtn.addEventListener("click",function(){
    document.getElementById("title").value = "";
    document.getElementById("text").value = "";
    modal.style.display = "none";
});

var canxBtn2 = document.getElementById("canx2");
canxBtn2.addEventListener("click",function(){
    modal2.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {    
        document.getElementById("title").value = "";
        document.getElementById("text").value = "";
        modal.style.display = "none";
    }
}
window.onclick = function(event) {
    if (event.target == modal2) {    
        modal2.style.display = "none";
    }
}

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title").value.trim();
    const text = document.querySelector("#text").value.trim();
   
    if (title && text) {
      const response = await fetch(`/api/dashboard`, {
        method: "POST",
        body: JSON.stringify({ title, text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to create post");
      }
    }
  };
  
  
  const delButtonHandler = document.querySelectorAll('.deleteBtn');
  delButtonHandler.forEach(btn => {
    btn.addEventListener('click', async (event) => {
  
      if (event.target.hasAttribute("data-value")) {
        const id = event.target.getAttribute("data-value");
  
  
        const response = await fetch(`/api/dashboard/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to delete post");
        }
      }
    })
  });
  
  const updateFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title2").value.trim();
    const text = document.querySelector("#text2").value.trim();
   
    if (title && text) {
      if (event.target.hasAttribute("data-value")) {
        const id = event.target.getAttribute("data-value");
        console.log(id);
        const response = await fetch(`/api/dashboard/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title,text }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to update post");
        }
      }
    }
  };
    
  document.querySelector("#confirm").addEventListener("click", newFormHandler);
  document.querySelector("#confirm2").addEventListener("click", updateFormHandler);