document.getElementById('fetchComments').addEventListener('click', async () => {
    const postUrl = document.getElementById('postUrl').value;
    if (!postUrl) {
        alert('Please enter an Instagram post URL');
        return;
    }

    const apiUrl = 'https://api.apify.com/v2/acts/apify~instagram-comment-scraper/run-sync-get-dataset-items';
    const token = 'apify_api_UV83Z7PL6BAGFkvfuO22YDWnNhwBBM0LEJkI'; // Your Apify API token
    const input = {
        directUrls: [postUrl],
        resultsType: 'comments'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(input)
        });

        const data = await response.json();
        displayComments(data);
    } catch (error) {
        console.error('Error fetching comments:', error);
        alert('Failed to fetch comments');
    }
});

function displayComments(comments) {
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = ''; // Clear previous comments

    if (comments.length === 0) {
        commentsContainer.textContent = 'No comments found';
        return;
    }

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.textContent = comment.text || 'No text';
        commentsContainer.appendChild(commentDiv);
    });
}
