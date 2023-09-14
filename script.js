document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json";
    const container = document.getElementById("blog-container");

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            
            data.slice(0, 3).forEach((post) => {
                createBlogPostCard(post);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

    function createBlogPostCard(post) {
        const card = document.createElement("div");
        card.classList.add("vw-card");

        const img = document.createElement("img");
        if (post.featured_media && post.featured_media) {
            img.src = post.featured_media;
        } 
        
        const header = createHeader("CLOUD AND SERVER");

        const title = document.createElement("h4");
        title.textContent = `${post.title.rendered}`;
        title.style.color = "rgba(65,140,176,255)";

        const date = new Date(post.date); 
        const formattedDate = formatDate(date); 

       const sourceAndDate = document.createElement("p");
       sourceAndDate.style.fontStyle = "italic";
       sourceAndDate.textContent = `By ${post.author} on ${formattedDate}`;

       const footer = createFooter("Article");
       

       card.appendChild(header);
        card.appendChild(img);
        
        card.appendChild(title);
        card.appendChild(sourceAndDate);
        card.appendChild(footer);
        
        container.appendChild(card);
    }
    function formatDate(date) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
    
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
    
        return `${day} ${monthNames[monthIndex]} ${year}`;
    }

    function createHeader(headerText) {
        
        const header = document.createElement("div");
        header.classList.add("header"); 
    
        
        const dottedLine = document.createElement("hr");
        dottedLine.classList.add("dotted-line"); 
        dottedLine.style.marginTop = "10px";
        
        const headerTextElement = document.createElement("div");
        headerTextElement.classList.add("header-text");
        headerTextElement.textContent = headerText; 
    
        header.appendChild(headerTextElement);
        header.appendChild(dottedLine); 
         
    
        return header;
    }
    function createFooter(footerText) {
        const footer = document.createElement("div");
        footer.classList.add("footer");     
        
        const footerTextElement = document.createElement("div");
        footerTextElement.classList.add("footer-text"); 
        footerTextElement.textContent = footerText;     

        const footerDottedLine = document.createElement("hr");
        footerDottedLine.classList.add("dotted-line");
        footerDottedLine.style.height= "0.5px"; 
    
        footer.appendChild(footerDottedLine); 
        footer.appendChild(footerTextElement); 
    
        return footer;
    }
});