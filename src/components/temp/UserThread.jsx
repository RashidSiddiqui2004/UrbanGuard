
import React from 'react' 
// import "./thread.css"

const UserThread = () => {

    const discussionTextarea = document.getElementById('discussionTextarea');
    const mentionDropdown = document.getElementById('mentionDropdown');

    discussionTextarea.addEventListener('input', handleInput);

    function handleInput() {
        const text = discussionTextarea.value;
        const cursorIndex = discussionTextarea.selectionStart;
        const lastAtSymbolIndex = text.lastIndexOf('@', cursorIndex - 1);

        if (lastAtSymbolIndex !== -1) {
            const searchTerm = text.substring(lastAtSymbolIndex + 1, cursorIndex);
            const users = getCommentedUsers(); // Replace with your logic to fetch commented users

            displayMentionDropdown(users, searchTerm);
        } else {
            hideMentionDropdown();
        }
    }

    function getCommentedUsers() {
        // Replace this with your logic to fetch the list of commented users
        // For example, you might want to fetch users from the server or a data source
        return ['user1', 'user2', 'user3'];
    }

    function displayMentionDropdown(users, searchTerm) {
        mentionDropdown.innerHTML = '';

        users.forEach(user => {
            if (user.toLowerCase().includes(searchTerm.toLowerCase())) {
                const mentionItem = document.createElement('div');
                mentionItem.classList.add('mentionItem');
                mentionItem.textContent = user;
                mentionItem.addEventListener('click', () => replaceTextWithMention(user));
                mentionDropdown.appendChild(mentionItem);
            }
        });

        if (mentionDropdown.children.length > 0) {
            showMentionDropdown();
        } else {
            hideMentionDropdown();
        }
    }

    function replaceTextWithMention(username) {
        const cursorIndex = discussionTextarea.selectionStart;
        const lastAtSymbolIndex = discussionTextarea.value.lastIndexOf('@', cursorIndex - 1);

        const newText = discussionTextarea.value.slice(0, lastAtSymbolIndex + 1) + username + ' ' + discussionTextarea.value.slice(cursorIndex);
        discussionTextarea.value = newText;
        hideMentionDropdown();
    }

    function showMentionDropdown() {
        const cursorPosition = getCaretCoordinates(discussionTextarea, discussionTextarea.selectionEnd);
        mentionDropdown.style.top = `${cursorPosition.top + 20}px`;
        mentionDropdown.style.left = `${cursorPosition.left}px`;
        mentionDropdown.style.display = 'block';
    }

    function hideMentionDropdown() {
        mentionDropdown.style.display = 'none';
    }

    function getCaretCoordinates(element, position) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(element.firstChild, position);
        range.setEnd(element.firstChild, position);
        const rect = range.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }

    return (
        <div>
            <textarea id="discussionTextarea" placeholder="Type your message here..."></textarea>
            <div id="mentionDropdown"></div>

        </div>
    )
}

export default UserThread