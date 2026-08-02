const postForm = document.querySelector('#postForm');       
const postTitleInput = document.querySelector('#postTitle'); 
const postImageInput = document.querySelector('#postImage'); 
const postBodyInput = document.querySelector('#postBody');   
const postList = document.querySelector('.postList');

document.addEventListener('DOMContentLoaded', loadPosts);

function loadPosts() {
  const posts = getPostsFromLocalStorage(); 
  renderAllPosts(posts);                    
}

function renderAllPosts(posts) {

  postList.innerHTML = '';

  if (posts.length === 0) {
    postList.innerHTML = '<p class="empty-state">No posts yet. Be the first to write one!</p>';
    return;
  }

  posts.forEach(post => addPostToDom(post));
}

postForm.addEventListener('submit', addPost);

function addPost(event) {
    
  event.preventDefault();

  const title = postTitleInput.value.trim();
  const image = postImageInput.value.trim();
  const body = postBodyInput.value.trim();

  if (title === '' || body === '') {
    alert('Please enter a post title and post body.');
    return; 
  }

  const post = {
    id: Date.now(),   
    title: title,
    image: image,      
    body: body,
  };

  savePostToLocalStorage(post);

  postTitleInput.value = '';
  postImageInput.value = '';
  postBodyInput.value = '';
  postTitleInput.focus();

  const posts = getPostsFromLocalStorage();
  renderAllPosts(posts);
}

function addPostToDom(post) {
  const emptyState = postList.querySelector('.empty-state');
  if (emptyState) emptyState.remove();

  const div = document.createElement('div');
  div.className = 'post-item';

  div.dataset.id = post.id;

  div.innerHTML = `
    <h3 class="post-title">${escapeHtml(post.title)}</h3>
    ${post.image ? `<img class="post-image" src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}">` : ''}
    <p class="post-body">${escapeHtml(post.body)}</p>
    <div class="post-actions">
      <button type="button" class="edit-btn">Edit</button>
      <button type="button" class="delete-btn">Delete</button>
    </div>
  `;

  postList.appendChild(div);

  attachEventListener(post, div);
}

function attachEventListener(post, div) {
  const editBtn = div.querySelector('.edit-btn');
  const deleteBtn = div.querySelector('.delete-btn');

  editBtn.addEventListener('click', function () {
    handleEdit(post.id);
  });

  deleteBtn.addEventListener('click', function () {
    handleDelete(post.id, div);
  });
}

function handleEdit(id) {
  const posts = getPostsFromLocalStorage();

  const post = posts.find(p => p.id === id);
  if (!post) return;

  const newTitle = prompt('Edit post title', post.title);
  if (newTitle === null || newTitle.trim() === '') return; 
  const newBody = prompt('Edit post content', post.body);
  if (newBody === null || newBody.trim() === '') return;

  const newImage = prompt('Edit image URL (leave blank for none)', post.image || '');
  if (newImage === null) return; 

  updatePost(id, newTitle.trim(), newBody.trim(), newImage.trim());

  const updatedPosts = getPostsFromLocalStorage();
  renderAllPosts(updatedPosts);
}

function updatePost(id, newTitle, newBody, newImage) {
  const posts = getPostsFromLocalStorage();
  const post = posts.find(p => p.id === id);

  if (post) {
    post.title = newTitle;
    post.body = newBody;
    post.image = newImage;

    localStorage.setItem('posts', JSON.stringify(posts));
  }
}

function handleDelete(id, div) {
  let posts = getPostsFromLocalStorage();

  posts = posts.filter(p => p.id !== id);

  localStorage.setItem('posts', JSON.stringify(posts));

  div.remove();

  if (posts.length === 0) {
    renderAllPosts(posts);
  }
}

function savePostToLocalStorage(post) {
  const posts = getPostsFromLocalStorage(); 
  posts.push(post);                         
  localStorage.setItem('posts', JSON.stringify(posts)); 
}

function getPostsFromLocalStorage() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  return posts;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;   
  return div.innerHTML;     
}