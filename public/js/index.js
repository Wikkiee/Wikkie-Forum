

const createPostButton = document.querySelector('.create-topic-and-top-users-container button')
createPostButton.addEventListener('click',()=>{
    location.href = "/post";
})


const likeAndDislikeButton = document.querySelectorAll('.post-name-container button')

const classList = []
likeAndDislikeButton.forEach(button => {
    classList.push(button.className)
    button.addEventListener('click',(e)=>{
        console.log(classList);

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
            })
            .then( res =>{
                if(res.status == 200){
                   return res.json()
                }else{
                    return 0;
                }
            })
            .then(response => {
                if(response !== 0){
                    if(response.operation){
                        if(target === 'like'){
                            document.querySelectorAll('.post-name-container h1')[parseInt(button.className)-1].innerHTML = parseInt(document.querySelectorAll('.post-name-container h1')[parseInt(button.className)-1].innerHTML) + 1
                        }else if(target === 'dislike'){
                            document.querySelectorAll('.post-name-container h1')[parseInt(button.className)-1].innerHTML = parseInt(document.querySelectorAll('.post-name-container h1')[parseInt(button.className)-1].innerHTML) - 1
                        }
                        
                    }else{
                        console.log('Operation failed');
                    }
                }
            })
            .catch( err => console.log(err))
        }
    })
});