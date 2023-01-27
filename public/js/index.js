

const createPostButton = document.querySelector('.create-topic-and-top-users-container button')
createPostButton.addEventListener('click',()=>{
    location.href = "/post";
})


const likeAndDislikeButton = document.querySelectorAll('.post-name-container button')
console.log(likeAndDislikeButton);

likeAndDislikeButton.forEach(button => {
    button.addEventListener('click',(e)=>{
        console.log(button.getAttribute('name'));
        if(button.getAttribute('name') === 'like'){
            likeAndDislikeAction('like',button.className)
        }else if(button.getAttribute('name') === 'dislike'){
            likeAndDislikeAction('dislike',button.className)
        }
        function likeAndDislikeAction(target,id){ 
            const data = {target:target,id:id};

            fetch("http://localhost:3000/vote", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
            }).then(res => {
            console.log("Request complete! response:", res);
            });

        }
    })
});