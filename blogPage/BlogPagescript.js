let main_container=document.querySelector(".main_container");


function addCard(blogLink,blogImgUrl,blogTitle,blogDesc,authorPhoto,authorName,publistDate,topicTags){
    let card_container=document.createElement("div");
    card_container.classList.add("card_container");
    main_container.appendChild(card_container);

    let upperpart=document.createElement("div");
    upperpart.classList.add("upperpart");
    card_container.appendChild(upperpart);

    let card_image_container=document.createElement("a");
    card_image_container.classList.add("card_image_container");
    card_image_container.href=blogLink;
    upperpart.appendChild(card_image_container);


    let card_image=document.createElement("img");
    card_image.classList.add("card_image");
    card_image.src=blogImgUrl;
    card_image_container.appendChild(card_image);
    card_image.alt="card 1 image";
    card_image.loading="lazy";


    let card_title_container=document.createElement("div");
    card_title_container.classList.add("card_title_container");
    upperpart.appendChild(card_title_container);


    let card_title_anchor=document.createElement("a");
    card_title_anchor.classList.add("card_title_anchor");
    card_title_anchor.href=blogLink;
    card_title_container.appendChild(card_title_anchor);

    let card_title=document.createElement("h2");
    card_title.classList.add("card_title");
    card_title.textContent=blogTitle;
    card_title_anchor.appendChild(card_title);
    card_title_anchor.target="_blank";


    let card_desc=document.createElement("p");
    card_desc.classList.add("card_desc");
    card_desc.textContent=blogDesc;
    card_title_container.appendChild(card_desc);


    let card_footer_container=document.createElement("div");
    card_footer_container.classList.add("card_footer_container");
    card_container.appendChild(card_footer_container);

    let author_container=document.createElement("div");
    author_container.classList.add("author_container");
    card_footer_container.appendChild(author_container);

    let author_avatar_container=document.createElement("div");
    author_avatar_container.classList.add("author_avatar_container");
    author_container.appendChild(author_avatar_container);

    let author_avatar=document.createElement("img");
    author_avatar.classList.add("author_avatar");
    author_avatar.src=authorPhoto;
    author_avatar_container.appendChild(author_avatar);
    author_avatar.alt="author avatar";
    author_avatar.loading="lazy";

    let author_info_container=document.createElement("div");
    author_info_container.classList.add("author_info_container");
    author_container.appendChild(author_info_container);

    let author_name=document.createElement("span");
    author_name.classList.add("author_name");
    author_name.textContent=authorName;
    author_info_container.appendChild(author_name);

    let author_date=document.createElement("span");
    author_date.classList.add("author_date");
    author_date.textContent=publistDate;
    author_info_container.appendChild(author_date);

    let card_tag=document.createElement("div");
    card_tag.classList.add("card_tag");
    
    card_footer_container.appendChild(card_tag);

    let card_tag_container=document.createElement("span");
    card_tag_container.classList.add("card_tag_container");
    card_tag_container.textContent=topicTags;
    card_tag.appendChild(card_tag_container);
}

addCard("./../Blogs/Blog1/blogpage.html","./../Blogs/Blog1/files/firstimg.jpg",'The Democratization of AI',"Discover how AI tools and technologies are becoming accessible to everyone, from smallbusinesses toindividual developers. This blog explores current trends, industry impacts, open-sourcecontributions, andfuture prospects, highlighting how democratizing AI is reshaping innovation and growth.","./../images/IMG_20240306_201207.jpg","Pradumna Mishra","July 21, 2024","AI,Technology");
addCard("./../Blogs/Blog2/blogpage.html","./../Blogs/Blog2/files/63-Shah-Rukh-Khan.jpg",'Shah Rukh Khan: The King of Bollywood',"This blog explores the legendary career, cinematic contributions, philanthropic efforts, and future prospects of Shah Rukh Khan, lighting how his journey has redefined the landscape of Indian cinema and global entertainment.","./../images/6b16411f-6e21-4d53-b6b2-fcae10641d8f.jpeg","Sandipto Roy","July 21, 2024","Celebrity");
addCard("./../Blogs/Blog3/blogpage.html","./../Blogs/Blog3/files/mainimg.jpg",'Algorithm: Depth first Search',"Discover the Depth First Search algorithm, a key tool for graph traversal. Learn its principles, implementation, and real-world applications, from pathfinding to puzzle-solving.","./../images/IMG_20240306_201207.jpg","Pradumna Mishra","July 21, 2024","Algorithm");
addCard("./../Blogs/Blog4/blogpage.html","./../Blogs/Blog4/files/mainimg.jpg",'The Physics Behind Cricket: Unveiling the Science of the Game',"Cricket is a blend of skill and physics. Concepts like projectile motion, momentum, force, friction, and aerodynamics shape every play. Understanding these principles can deepen your appreciation for the game. Dive into the science behind cricket and see the sport in a new light!","./../images/IMG_20240306_201207.jpg","Pradumna Mishra","July 21, 2024","Sports");

