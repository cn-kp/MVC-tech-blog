var modal3 = document.getElementById("myModal3");

var currentPostId

var modalCommentBtn = document.querySelectorAll(".addCommentBtn");
modalCommentBtn.forEach((element) => {
  element.addEventListener("click", function () {
    console.log("click");
    currentPostId= element.getAttribute("data-value")
    modal3.style.display = "block";
  });
});

var canxBtn = document.getElementById("canx3");
canxBtn.addEventListener("click",function(){
    document.getElementById("comment").value = "";
    modal3.style.display = "none";
});


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {    
        document.getElementById("comment").value = "";
        modal.style.display = "none";
    }
}
window.onclick = function(event) {
    if (event.target == modal3) {    
        modal3.style.display = "none";
    }
}

const commentHandler = document.querySelector('.commentBtn');
    commentHandler.addEventListener('click', async (event) => {
  
        const id = currentPostId
        const text = document.querySelector("#comment").value.trim()
  
        const response = await fetch(`/api/comment/${id}`, {
          method: "POST",
          body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
    });
  
        if (response.ok) {
          document.location.replace("/");
        } else {
          alert("Failed to add comment");
        }
      }
    )
;
  
// modalCommentBtn.addEventListener("click",function(){
//   // event.preventDefault();
//   console.log("click")
//     modal.style.display = "block";
// });
