// Get the upload button and other elements
const uploadBtn = document.getElementById('uploadBtn');
const uploadProgress = document.getElementById('uploadProgress');
const fileInput = document.createElement('input');

// Set attributes for the file input
fileInput.type = 'file';
fileInput.style.display = 'none'; // Hide the file input

// Append it to the body to trigger click events
document.body.appendChild(fileInput);

// When the 'Upload File' button is clicked, trigger the hidden file input
uploadBtn.addEventListener('click', () => fileInput.click());

// When a file is chosen, display the file name and enable the upload button
fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        // Display file name, you can add more logic here to display file information
        const fileNameDisplay = document.createElement('span');
        fileNameDisplay.textContent = `Selected file: ${this.files[0].name}`;
        document.body.appendChild(fileNameDisplay);

        // Enable the progress bar and start simulating the upload process
        uploadProgress.value = 0;
        uploadProgress.hidden = false;
        startUploadSimulation(uploadProgress);
    }
});

// Function to simulate the upload process
function startUploadSimulation(progressBar) {
    const interval = 100; // Interval time in milliseconds
    const step = 10; // Incremental step for each interval

    const simulateUpload = setInterval(() => {
        if (progressBar.value + step <= progressBar.max) {
            progressBar.value += step; // Increment the progress bar value
        } else {
            progressBar.value = progressBar.max; // Complete the progress
            clearInterval(simulateUpload); // Clear the interval
            alert('File uploaded successfully!');
            uploadProgress.hidden = true; // Hide the progress bar
        }
    }, interval);
}


// Simulated file data - replace this with a real API call in production
const filesData = [
    { id: 1, name: 'tongxunlu3.vcf', location: '/sdcard', operation: 'Delete' },
    { id: 2, name: 'longene.mashangwan_2.5.1_2501.apk', location: '/sdcard', operation: 'Delete' },
    { id: 3, name: 'com.iqiyi.video_9.10.0_81180.apk', location: '/sdcard', operation: 'Delete' },
    { id: 4, name: 'base.apk', location: '/sdcard', operation: 'Delete' },
    // ... more files
];

// Function to render file list
function renderFileList(files) {
    const fileListElement = document.getElementById('fileList');
    fileListElement.innerHTML = ''; // Clear existing list
    
    files.forEach(file => {
        const row = `<tr>
            <td>${file.id}</td>
            <td>${file.name}</td>
            <td>${file.location}</td>
            <td><button class="delete-btn">Delete</button></td>
        </tr>`;
        
        fileListElement.innerHTML += row;
    });
}

// Call the function to render the file list on page load
renderFileList(filesData);

// Event listener for delete buttons (delegation)
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('tr');
        const fileId = row.firstElementChild.textContent;
        deleteFile(fileId); // You need to implement deleteFile function to work with backend
        row.remove(); // Remove the row from the table
    }
});

// Simulate file deletion - replace with a real API call
function deleteFile(fileId) {
    // Here you would make an API call to delete the file on the backend
    console.log(`File with ID ${fileId} would be deleted.`);
}
